from sqlalchemy.orm import Session
from uuid import UUID
from app.schema.species import Species


class SpeciesRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, species: Species) -> Species:
        self.db.add(species)
        self.db.commit()
        self.db.refresh(species)
        return species

    def get_by_id(self, species_id: UUID) -> Species | None:
        return self.db.query(Species).filter(Species.id == species_id).first()

    def get_all(self) -> list[Species]:
        return self.db.query(Species).all()

    def get_by_name(self, name: str) -> Species | None:
        return self.db.query(Species).filter(Species.name.ilike(name)).first()

    def update(self, species_id: UUID, update_data: dict) -> Species | None:
        species = self.get_by_id(species_id)
        if not species:
            return None
        for key, value in update_data.items():
            setattr(species, key, value)
        self.db.commit()
        self.db.refresh(species)
        return species

    def delete(self, species_id: UUID) -> bool:
        species = self.get_by_id(species_id)
        if not species:
            return False
        self.db.delete(species)
        self.db.commit()
        return True
