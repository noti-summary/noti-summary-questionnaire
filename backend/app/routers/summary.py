from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from google.cloud import firestore
import secrets
import os

from firestore_db import db
from models import Summary, Questionnaire

summary_router = APIRouter()

@summary_router.get("/undone/{userId}", response_model=list[str])
async def get_undone_summary_id(userId: str) -> list[str]:
    docs = db.collection(u'summary').where(u'userId', u'==', userId).where(u'summary', u'==', u'').stream()
    ids = [doc.to_dict()["summaryId"] async for doc in docs]
    return ids


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
    async for doc in docs:
        doc = doc.to_dict()
        if doc["summary"] != "":
            ids.append(doc["summaryId"])

    return ids


@summary_router.get("/appIcons", response_model=dict)
async def get_app_icons() -> dict:
    doc_ref = db.collection(u'appicon').document(u'appicons')
    doc = await doc_ref.get()
    doc = doc.to_dict()
    
    return doc


@summary_router.get("/{summaryId}", response_model=Summary)
async def get_summary(summaryId: str) -> Summary:
    doc_ref = db.collection(u'summary').document(f'{summaryId}')
    doc = await doc_ref.get()
    doc = doc.to_dict()

    notis = []
    for nid in doc["notifications"]:
        noti_ref = db.collection(u'notification').document(f'{nid}')
        noti = await noti_ref.get()
        if noti.exists:
            notis.append(noti.to_dict())

    doc["notifications"] = notis

    return doc


@summary_router.post("/{summaryId}", response_model=Questionnaire)
async def update_summary(summaryId: str, input: Questionnaire) -> Questionnaire:
    doc_ref = db.collection(u'summary').document(f'{summaryId}')

    await doc_ref.update({u'submitTime': input.submitTime})
    await doc_ref.update({u'esm': input.esm})
    await doc_ref.update({u'summary': input.summary})
    await doc_ref.update({u'reason': input.reason})

    if len(input.selectedNotifications):
        await doc_ref.update({u'selectedNotifications': firestore.DELETE_FIELD})
    for snoti in input.selectedNotifications:
        await doc_ref.update({u'selectedNotifications': firestore.ArrayUnion([snoti.dict()])})
    
    return input
