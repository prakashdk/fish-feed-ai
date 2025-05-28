import logging
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from app.schema.feed_session import FeedSession


class FeedSessionRepository:
    def __init__(self, db: Session):
        self.db = db
        self.logger = logging.getLogger(__name__)

    def insert_feed_session(self, data: dict) -> FeedSession:
        try:
            feed_session = FeedSession(**data)
            self.db.add(feed_session)
            self.db.commit()
            self.db.refresh(feed_session)
            return feed_session
        except Exception as e:
            self.logger.error(f"Error inserting feed session: {e}")
            self.db.rollback()
            raise

    def get_last_inserted(self) -> Optional[FeedSession]:
        try:
            return (
                self.db.query(FeedSession)
                .order_by(FeedSession.created_at.desc())
                .first()
            )
        except Exception as e:
            self.logger.error(f"Error fetching last inserted feed session: {e}")
            return None

    def retrieve_all(self) -> List[FeedSession]:
        try:
            return self.db.query(FeedSession).all()
        except Exception as e:
            self.logger.error(f"Error retrieving all feed sessions: {e}")
            return []

    def get_by_species(self, species_id: UUID) -> List[FeedSession]:
        try:
            return (
                self.db.query(FeedSession)
                .filter(FeedSession.species_id == species_id)
                .order_by(FeedSession.feeded_at.desc())
                .all()
            )
        except Exception as e:
            self.logger.error(f"Error retrieving feed sessions by species: {e}")
            return []

    def get_by_pond(self, pond_id: UUID) -> List[FeedSession]:
        try:
            return (
                self.db.query(FeedSession)
                .filter(FeedSession.pond_id == pond_id)
                .order_by(FeedSession.feeded_at.desc())
                .all()
            )
        except Exception as e:
            self.logger.error(f"Error retrieving feed sessions by pond: {e}")
            return []
