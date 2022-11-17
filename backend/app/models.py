from pydantic import BaseModel


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
    # reason: str


class Questionnaire(BaseModel):
    # submitTime: str
    # esm: str
    # reason: str
    summary: str