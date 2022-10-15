from fastapi import FastAPI
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.schema.config import StrawberryConfig

from firestore_db import db
from schema import Summary


@strawberry.type
class Query:
    @strawberry.field
    def summary(self, user_id: str, summary_id: str) -> Summary:
        doc = db.collection(u'summary').document(f'{user_id}_{summary_id}').get()
        return Summary(**doc.to_dict())


@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_summary(self, user_id: str, summary_id: str, summary: str, reason: str) -> None:
        doc_ref = db.collection(u'summary').document(f'{user_id}_{summary_id}')
        doc_ref.update({u'summary': summary, u'reason': reason})


schema = strawberry.Schema(query=Query, mutation=Mutation, config=StrawberryConfig(auto_camel_case=False))
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)