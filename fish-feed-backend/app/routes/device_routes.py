from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.models.device_dto import DeviceDto, DeviceCreate, DeviceUpdate
from app.services.device_service import DeviceService
from app.configs.postgre import get_db

device_router = APIRouter()


@device_router.post("/", response_model=DeviceDto, status_code=status.HTTP_201_CREATED)
def create_device(payload: DeviceCreate, db: Session = Depends(get_db)):
    service = DeviceService(db)
    device = service.create_device(payload.dict())
    return device


@device_router.get("/{device_id}", response_model=DeviceDto)
def get_device(device_id: UUID, db: Session = Depends(get_db)):
    service = DeviceService(db)
    device = service.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@device_router.get("/pond/{pond_id}", response_model=List[DeviceDto])
def list_devices_by_pond(pond_id: UUID, db: Session = Depends(get_db)):
    service = DeviceService(db)
    return service.list_devices_by_pond(pond_id)


@device_router.put("/{device_id}", response_model=DeviceDto)
def update_device(
    device_id: UUID, update_data: DeviceUpdate, db: Session = Depends(get_db)
):
    update_data.device_id = device_id
    service = DeviceService(db)
    updated_device = service.update_device(
        device_id, update_data.model_dump(exclude_unset=True)
    )
    if not updated_device:
        raise HTTPException(status_code=404, detail="Device not found")
    return updated_device


@device_router.delete("/{device_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_device(device_id: UUID, db: Session = Depends(get_db)):
    service = DeviceService(db)
    success = service.delete_device(device_id)
    if not success:
        raise HTTPException(status_code=404, detail="Device not found")
    return None
