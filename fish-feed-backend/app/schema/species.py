from sqlalchemy import Table, Column, ForeignKey, String, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, declarative_base
import uuid
from datetime import datetime, timezone
from app.configs.schema_base import Base
from .pond_species import pond_species


class Species(Base):
    __tablename__ = "species"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True)
    scientific_name = Column(String, nullable=True)
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

    ponds = relationship("Pond", secondary=pond_species, back_populates="species")
