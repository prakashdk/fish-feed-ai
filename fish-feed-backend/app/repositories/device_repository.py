from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.device import Device

class DeviceRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, device: Device) -> Device:
        self.db.add(device)
        self.db.commit()
        self.db.refresh(device)
        return device

    def get_by_id(self, device_id: UUID) -> Device | None:
        return self.db.query(Device).filter(Device.id == device_id).first()

    def get_all_by_pond(self, pond_id: UUID) -> list[Device]:
        return self.db.query(Device).filter(Device.pond_id == pond_id).all()

    def update(self, device_id: UUID, update_data: dict) -> Device | None:
        device = self.get_by_id(device_id)
        if not device:
            return None
        for key, value in update_data.items():
            setattr(device, key, value)
        self.db.commit()
        self.db.refresh(device)
        return device

    def delete(self, device_id: UUID) -> bool:
        device = self.get_by_id(device_id)
        if not device:
            return False
        self.db.delete(device)
        self.db.commit()
        return True
