from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class OrganizationBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = True
    additional_attributes: Optional[dict] = None


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    is_active: Optional[bool]
    additional_attributes: Optional[dict]


class OrganizationDto(OrganizationBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
