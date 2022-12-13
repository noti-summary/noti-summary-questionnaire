from pydantic import BaseModel
from typing import Optional

class Notification(BaseModel):
    appName: str
    category: str
    content: str
    notificationId: str
    postTime: str
    title: str
    userId: str


class Summary(BaseModel):
    userId: str
    summaryId: str
    # startTime: str
    # endTime: str
    # submitTime: str
    notification: list[Notification]
    summary: str
    reason: Optional[str] = None


class Questionnaire(BaseModel):
    # submitTime: str
    q1: int
    q2: int
    summary: str
    reason: str