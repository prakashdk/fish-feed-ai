from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class PondBase(BaseModel):
    name: str
    location: Optional[str] = None
    size: Optional[float] = None
    is_active: Optional[bool] = True
    additional_attributes: Optional[dict] = None


class PondCreate(PondBase):
    organization_id: UUID


class PondUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
    size: Optional[float]
    is_active: Optional[bool]
    additional_attributes: Optional[dict]


class PondDto(PondBase):
    id: UUID
    organization_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
