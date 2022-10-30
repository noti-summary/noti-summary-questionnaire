import strawberry
from firebase_admin import firestore
from typing import List

from firestore_db import db


@strawberry.type
class Notification:
    userId: str
    notificationId: str
    postTime: str
    appName: str
    title: str
    content: str
    category: str


@strawberry.type
class Context:
    time: str


@strawberry.type
class Summary:
    userId: str
    summaryId: str
    startTime: str
    endTime: str
    submitTime: str
    notification: List[str]
    context: Context
    summary: str
    reason: str

    @strawberry.field
    def notificationInfo(self) -> List[Notification]:
        res = []
        for nid in self.notification:
            doc = db.collection(u'notification').document(f'{self.userId}_{nid}').get()
            if doc.exists:
                res.append(Notification(**doc.to_dict()))
        return res

