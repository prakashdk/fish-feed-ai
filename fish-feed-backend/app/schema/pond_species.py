from sqlalchemy import Table, Column, ForeignKey, String, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, declarative_base
import uuid
from datetime import datetime
from app.configs.schema_base import Base

pond_species = Table(
    "pond_species",
    Base.metadata,
    Column("pond_id", UUID(as_uuid=True), ForeignKey("ponds.id"), primary_key=True),
    Column(
        "species_id", UUID(as_uuid=True), ForeignKey("species.id"), primary_key=True
    ),
)
