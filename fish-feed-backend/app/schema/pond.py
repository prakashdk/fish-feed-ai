import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Float,
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
from app.schema.pond_species import pond_species
from app.configs.schema_base import Base


class Pond(Base):
    __tablename__ = "ponds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(
        UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False
    )
    name = Column(String, nullable=False)
    location = Column(Text, nullable=True)  # Could be GPS coords or address string
    size_sq_m = Column(Float, nullable=False)
    depth_m = Column(Float, nullable=False)
    species = relationship("Species", secondary=pond_species, back_populates="ponds")
    stocking_date = Column(Date, nullable=True)
    stocking_density = Column(Float, nullable=True)
    water_type = Column(String, nullable=True)
    status = Column(
        String, nullable=False, default="active"
    )  # e.g. active, maintenance, harvested
    is_active = Column(Boolean, nullable=False, default=True)
    additional_attributes = Column(JSONB, nullable=True)
    created_at = Column(
        DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc),
        nullable=False,
    )

    # Optional: relationship back to organization (if you want ORM cascade/join support)
    organization = relationship("Organization", back_populates="ponds")
    devices = relationship("Device", back_populates="pond")


# You would define Organization similarly with back_populates to ponds
