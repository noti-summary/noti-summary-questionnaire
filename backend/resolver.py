import strawberry

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