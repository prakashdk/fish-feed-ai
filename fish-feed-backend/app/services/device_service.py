from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.device import Device


class DeviceService:
    def __init__(self, db: Session):
        self.db = db

    def create_device(self, payload: dict):
        device = Device(**payload)
        self.db.add(device)
        self.db.commit()
        self.db.refresh(device)
        return device

    def get_device(self, device_id: UUID):
        return self.db.query(Device).filter(Device.id == device_id).first()

    def list_devices_by_pond(self, pond_id: UUID):
        return self.db.query(Device).filter(Device.pond_id == pond_id).all()

    def update_device(self, device_id: UUID, update_data: dict):
        device = self.get_device(device_id)
        if not device:
            return None
        for key, value in update_data.items():
            setattr(device, key, value)
        self.db.commit()
        self.db.refresh(device)
        return device

    def delete_device(self, device_id: UUID):
        device = self.get_device(device_id)
        if not device:
            return False
        self.db.delete(device)
        self.db.commit()
        return True
