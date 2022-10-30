import strawberry

from firestore_db import db
from schema import Summary


@strawberry.type
class Query:
    @strawberry.field
    def summary(self, userId: str, summaryId: str) -> Summary:
        doc = db.collection(u'summary').document(f'{userId}_{summaryId}').get()
        return Summary(**doc.to_dict())


@strawberry.type
class Mutation:
    @strawberry.mutation
    def updateSummary(self, userId: str, summaryId: str, summary: str, reason: str) -> None:
        doc_ref = db.collection(u'summary').document(f'{userId}_{summaryId}')
        doc_ref.update({u'summary': summary, u'reason': reason})