from pydantic import BaseModel
from typing import Dict, Any

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
    startTime: str
    endTime: str
    submitTime: str
    notifications: list[Notification]
    selectedNotifications: list[Notification]
    esm: Dict[str, Any]
    summary: str
    reason: str


class Questionnaire(BaseModel):
    submitTime: str
    selectedNotifications: list[Notification]
    esm: Dict[str, Any]
    summary: str
    reason: str