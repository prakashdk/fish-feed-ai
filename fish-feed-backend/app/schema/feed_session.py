from app.dto.feed_session_dto import FeedSessionDto
from dataclasses import asdict
from datetime import timezone, datetime
from typing import List
from app.configs.mongo_engine_connection import mongo_connect, mongo_disconnect
import logging


import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
from app.configs.schema_base import Base


class FeedSession(Base):
    __tablename__ = "feed_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    species_id = Column(UUID(as_uuid=True), ForeignKey("species.id"), nullable=False)
    pond_id = Column(UUID(as_uuid=True), ForeignKey("ponds.id"), nullable=True)
    organization_id = Column(
        UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=True
    )

    features = Column(JSONB, nullable=False)
    other_factors = Column(JSONB, nullable=False)
    baseline_feed = Column(Float, nullable=False)
    adjustment_factor = Column(Float, nullable=False)
    final_feed = Column(Float, nullable=False)

    actual_feed = Column(Float, nullable=True)
    leftover_feed = Column(Float, nullable=True)
    actual_adjustment_factor = Column(Float, nullable=True)
    trusted = Column(Boolean, default=True)  # for future data quality checks

    feeded_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    species = relationship("Species")
    pond = relationship("Pond")
    organization = relationship("Organization")
