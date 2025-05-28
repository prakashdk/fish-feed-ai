from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.organisation import Organization


class OrganizationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, organization: Organization) -> Organization:
        self.db.add(organization)
        self.db.commit()
        self.db.refresh(organization)
        return organization

    def get_by_id(self, organization_id: UUID) -> Organization | None:
        return (
            self.db.query(Organization)
            .filter(Organization.id == organization_id)
            .first()
        )

    def get_all(self) -> list[Organization]:
        return self.db.query(Organization).all()

    def update(self, organization_id: UUID, update_data: dict) -> Organization | None:
        org = self.get_by_id(organization_id)
        if not org:
            return None

        for key, value in update_data.items():
            setattr(org, key, value)

        self.db.commit()
        self.db.refresh(org)
        return org

    def delete(self, organization_id: UUID) -> bool:
        org = self.get_by_id(organization_id)
        if not org:
            return False

        self.db.delete(org)
        self.db.commit()
        return True
