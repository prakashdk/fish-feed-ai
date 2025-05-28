from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.pond import Pond
from app.repositories.pond_repository import PondRepository


class PondService:
    def __init__(self, db: Session):
        self.repo = PondRepository(db)

    def create_pond(self, data: dict) -> Pond:
        pond = Pond(**data)
        return self.repo.create(pond)

    def get_pond(self, pond_id: UUID) -> Pond | None:
        return self.repo.get_by_id(pond_id)

    def list_ponds_by_org(self, organization_id: UUID) -> list[Pond]:
        return self.repo.get_all_by_org(organization_id)

    def update_pond(self, pond_id: UUID, update_data: dict) -> Pond | None:
        return self.repo.update(pond_id, update_data)

    def delete_pond(self, pond_id: UUID) -> bool:
        return self.repo.delete(pond_id)
