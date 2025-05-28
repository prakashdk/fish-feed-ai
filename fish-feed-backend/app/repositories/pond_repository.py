from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.pond import Pond


class PondRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, pond: Pond) -> Pond:
        self.db.add(pond)
        self.db.commit()
        self.db.refresh(pond)
        return pond

    def get_by_id(self, pond_id: UUID) -> Pond | None:
        return self.db.query(Pond).filter(Pond.id == pond_id).first()

    def get_all_by_org(self, organization_id: UUID) -> list[Pond]:
        return self.db.query(Pond).filter(Pond.organization_id == organization_id).all()

    def update(self, pond_id: UUID, update_data: dict) -> Pond | None:
        pond = self.get_by_id(pond_id)
        if not pond:
            return None
        for key, value in update_data.items():
            setattr(pond, key, value)
        self.db.commit()
        self.db.refresh(pond)
        return pond

    def delete(self, pond_id: UUID) -> bool:
        pond = self.get_by_id(pond_id)
        if not pond:
            return False
        self.db.delete(pond)
        self.db.commit()
        return True
