from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class PondBase(BaseModel):
    name: str
    location: Optional[str] = None
    size_sq_m: Optional[float] = None  # Pond size in square meters
    depth_m: Optional[float] = None  # Pond depth in meters
    stocking_date: Optional[datetime] = None  # Date when stocked
    stocking_density: Optional[int] = (
        None  # Number of fish/shrimp per square meter
    )
    water_type: Optional[str] = None  # e.g., freshwater, brackish, marine
    status: Optional[str] = "active"  # Pond status like active, inactive, drained
    is_active: Optional[bool] = True


class PondCreate(PondBase):
    organization_id: Optional[UUID] = None


class PondUpdate(BaseModel):
    name: str
    location: Optional[str] = None
    size_sq_m: Optional[float] = None  # Pond size in square meters
    depth_m: Optional[float] = None  # Pond depth in meters
    stocking_date: Optional[datetime] = None  # Date when stocked
    stocking_density: Optional[int] = (
        None  # Number of fish/shrimp per square meter
    )
    water_type: Optional[str] = None  # e.g., freshwater, brackish, marine
    status: Optional[str] = "active"  # Pond status like active, inactive, drained
    is_active: Optional[bool] = True


class PondDto(PondBase):
    id: UUID
    organization_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
