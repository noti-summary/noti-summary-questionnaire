import strawberry
from firebase_admin import firestore
from typing import List

from firestore_db import db


@strawberry.type
class Notification:
    user_id: str
    notification_id: str
    time: str
    app_name: str
    title: str
    content: str
    category: str


@strawberry.type
class Context:
    time: str


@strawberry.type
class Summary:
    user_id: str
    summary_id: str
    start_time: str
    end_time: str
    notification: List[str]
    context: Context
    summary: str
    reason: str

    @strawberry.field
    def notification_info(self) -> List[Notification]:
        res = []
        for nid in self.notification:
            doc = db.collection(u'notification').document(f'{self.user_id}_{nid}').get()
            if doc.exists:
                res.append(Notification(**doc.to_dict()))
        return res

