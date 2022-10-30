from fastapi import FastAPI
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter

from resolver import Query, Mutation


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)