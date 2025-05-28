# app/models/feed.py
from pydantic import BaseModel

class FeedRequest(BaseModel):
    left_over: float

class ActualFeedRequest(BaseModel):
    actual_feed: float
