from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class DeviceBase(BaseModel):
    pond_id: UUID
    device_type: str
    device_id: Optional[str] = None
    model: Optional[str] = None
    manufacturer: Optional[str] = None
    status: Optional[str] = "active"
    is_active: Optional[bool] = True
    additional_attributes: Optional[dict] = None
    installed_at: Optional[datetime] = None
    last_maintenance_at: Optional[datetime] = None


class DeviceCreate(DeviceBase):
    pass


class DeviceUpdate(BaseModel):
    device_type: Optional[str]
    device_id: Optional[str]
    model: Optional[str]
    manufacturer: Optional[str]
    status: Optional[str]
    is_active: Optional[bool]
    additional_attributes: Optional[dict]
    installed_at: Optional[datetime]
    last_maintenance_at: Optional[datetime]


class DeviceDto(DeviceBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
