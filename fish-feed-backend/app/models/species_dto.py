from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class SpeciesBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    additional_attributes: Optional[dict] = None


class SpeciesCreate(SpeciesBase):
    pass


class SpeciesUpdate(BaseModel):
    name: Optional[str]
    scientific_name: Optional[str]
    additional_attributes: Optional[dict]


class SpeciesDto(SpeciesBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
