from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets
import os

from firestore_db import db
from models import Summary, Questionnaire

summary_router = APIRouter()

@summary_router.get("/undone/{userId}", response_model=list[str])
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


security = HTTPBasic()

@summary_router.get("/finish", response_model=list[str])
async def get_finish_summary_id(credentials: HTTPBasicCredentials = Depends(security)) -> list[str]:
    current_password_bytes = credentials.password.encode("utf8")
    correct_password_bytes = os.environ.get("admin_password").encode("utf8")
    is_correct_password = secrets.compare_digest(current_password_bytes, correct_password_bytes)

    if not is_correct_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    
    docs = db.collection(u'summary').where(u'userId', u'==', credentials.username).stream()
    
    ids = []
    for doc in docs:
        doc = doc.to_dict()
        if doc["summary"] != "":
            ids.append(doc["summaryId"])

    return ids


@summary_router.post("/{userId}/{summaryId}")
async def update_summary(userId: str, summaryId: str, input: Questionnaire) -> Questionnaire:
    doc_ref = db.collection(u'summary').document(f'{userId}_{summaryId}')
    doc_ref.update({u'summary': input.summary})
    doc_ref.update({u'reason': input.reason})

    # quest.
    doc_ref.update({u'q1': input.q1})
    doc_ref.update({u'q2': input.q2})
    return input
