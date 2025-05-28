from sqlalchemy.orm import Session
from uuid import UUID
from app.repositories.organisation_repository import OrganizationRepository
from app.schema.organisation import Organization


class OrganizationService:
    def __init__(self, db: Session):
        self.repo = OrganizationRepository(db)

    def create_organization(self, data: dict) -> Organization:
        org = Organization(**data)
        return self.repo.create(org)

    def get_organization(self, org_id: UUID) -> Organization | None:
        return self.repo.get_by_id(org_id)

    def list_organizations(self) -> list[Organization]:
        return self.repo.get_all()

    def update_organization(
        self, org_id: UUID, update_data: dict
    ) -> Organization | None:
        return self.repo.update(org_id, update_data)

    def delete_organization(self, org_id: UUID) -> bool:
        return self.repo.delete(org_id)
