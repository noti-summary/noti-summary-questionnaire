from fastapi import APIRouter

from firestore_db import db
from models import Summary, Questionnaire


summary_router = APIRouter()


@summary_router.get("/{userId}/{summaryId}", response_model=Summary)
async def getSummary(userId: str, summaryId: str) -> Summary:
    doc = db.collection(u'summary').document(f'{userId}_{summaryId}').get()
    doc = doc.to_dict()

    notis = []
    for nid in doc["notification"]:
        noti = db.collection(u'notification').document(f'{nid}').get()
        if noti.exists:
            notis.append(noti.to_dict())
    doc["notification"] = notis
    
    return doc


@summary_router.post("/{userId}/{summaryId}")
async def updateSummary(userId: str, summaryId: str, input: Questionnaire) -> Questionnaire:
    doc_ref = db.collection(u'summary').document(f'{userId}_{summaryId}')
    doc_ref.update({u'summary': input.summary})
    return input
