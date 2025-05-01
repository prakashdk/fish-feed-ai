import mongoengine as me
from app.dto.feed_session_dto import FeedSessionDto
from dataclasses import asdict
from datetime import timezone, datetime
from typing import List
from app.configs.mongo_engine_connection import mongo_connect, mongo_disconnect
import logging


class FeedSession(me.Document):
    features = me.DictField(required=True)
    other_factors = me.DictField(required=True)
    baseline_feed = me.FloatField(required=True)
    adjustment_factor = me.FloatField(required=True)
    final_feed = me.FloatField(required=True)

    # Optional feedback (used for training)
    actual_feed = me.FloatField(null=True)
    leftover_feed = me.FloatField(null=True)
    actual_adjustment_factor = me.FloatField(null=True)
    feeded_at = me.DateTimeField(required=True)

    created_at = me.DateTimeField(
        default=lambda: datetime.now(timezone.utc), auto_now_add=True
    )

    meta = {"collection": "feed_sessions"}

    @property
    def id(self) -> str:
        return str(self.pk)


class FeedSessionRepo:

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def __connect(self, callback):
        return_value = None
        try:
            mongo_connect()
            return_value = callback()
        except Exception as e:
            self.logger.error(f"Error occurred while executing query: {e}")
        finally:
            mongo_disconnect()

        return return_value

    def insert_feed_session(self, dto: FeedSessionDto) -> None:
        now = datetime.now(timezone.utc)
        dto.created_at = now
        data = asdict(dto)
        self.__connect(lambda: FeedSession(**data).save())

    def get_last_inserted_feed_session(self) -> FeedSession:
        """Retrieve the last inserted FeedSession document."""
        return self.__connect(
            lambda: FeedSession.objects.order_by("-created_at").first()
        )

    def retrieve_all(self) -> List[FeedSessionDto]:
        """Retrieve all FeedSession documents."""
        return self.__connect(lambda: list(FeedSession.objects.all()))
