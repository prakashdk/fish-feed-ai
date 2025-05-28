from sqlalchemy.orm import Session
from uuid import UUID
from app.repositories.species_repository import SpeciesRepository
from app.schema.species import Species


class SpeciesService:
    def __init__(self, db: Session):
        self.repo = SpeciesRepository(db)

    def create_species(self, data: dict) -> Species:
        species = Species(**data)
        return self.repo.create(species)

    def get_species(self, species_id: UUID) -> Species | None:
        return self.repo.get_by_id(species_id)

    def list_species(self) -> list[Species]:
        return self.repo.get_all()

    def update_species(self, species_id: UUID, update_data: dict) -> Species | None:
        return self.repo.update(species_id, update_data)

    def delete_species(self, species_id: UUID) -> bool:
        return self.repo.delete(species_id)
