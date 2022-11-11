from fastapi import APIRouter

from firestore_db import db
from models import Summary, Questionnaire

summary_router = APIRouter()

@summary_router.get("/undone/{userId}")
async def get_undone_summary_id(userId: str) -> list[str]:
    docs = db.collection(u'summary').where(u'userId', u'==', userId).where(u'summary', u'==', u'').stream()
    ids = [doc.to_dict()["summaryId"] for doc in docs]
    return ids


@summary_router.get("/{userId}/{summaryId}", response_model=Summary)
async def get_summary(userId: str, summaryId: str) -> Summary:
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
async def update_summary(userId: str, summaryId: str, input: Questionnaire) -> Questionnaire:
    doc_ref = db.collection(u'summary').document(f'{userId}_{summaryId}')
    doc_ref.update({u'summary': input.summary})
    return input
