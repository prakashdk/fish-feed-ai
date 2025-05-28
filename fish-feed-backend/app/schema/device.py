import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
from app.configs.schema_base import Base


class Device(Base):
    __tablename__ = "devices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pond_id = Column(UUID(as_uuid=True), ForeignKey("ponds.id"), nullable=True)
    device_type = Column(String, nullable=False)
    device_id = Column(String, nullable=True, unique=True)
    model = Column(String, nullable=True)
    manufacturer = Column(String, nullable=True)
    additional_attributes = Column(JSONB, nullable=True)
    status = Column(String, nullable=False, default="active")
    is_active = Column(Boolean, nullable=False, default=True)
    installed_at = Column(DateTime(timezone=True), nullable=True)
    last_maintenance_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(
        DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc),
        nullable=False,
    )

    pond = relationship("Pond", back_populates="devices")
