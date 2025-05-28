from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.models.species_dto import SpeciesDto, SpeciesCreate, SpeciesUpdate
from app.configs.postgre import get_db
from app.services.species_service import SpeciesService

species_router = APIRouter()


@species_router.post(
    "/", response_model=SpeciesDto, status_code=status.HTTP_201_CREATED
)
def create_species(payload: SpeciesCreate, db: Session = Depends(get_db)):
    service = SpeciesService(db)
    species = service.create_species(payload.dict())
    return species


@species_router.get("/", response_model=List[SpeciesDto])
def list_species(db: Session = Depends(get_db)):
    service = SpeciesService(db)
    return service.list_species()


@species_router.get("/{species_id}", response_model=SpeciesDto)
def get_species(species_id: UUID, db: Session = Depends(get_db)):
    service = SpeciesService(db)
    species = service.get_species(species_id)
    if not species:
        raise HTTPException(status_code=404, detail="Species not found")
    return species


@species_router.put("/{species_id}", response_model=SpeciesDto)
def update_species(
    species_id: UUID, update_data: SpeciesUpdate, db: Session = Depends(get_db)
):
    service = SpeciesService(db)
    updated_species = service.update_species(
        species_id, update_data.dict(exclude_unset=True)
    )
    if not updated_species:
        raise HTTPException(status_code=404, detail="Species not found")
    return updated_species


@species_router.delete("/{species_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_species(species_id: UUID, db: Session = Depends(get_db)):
    service = SpeciesService(db)
    success = service.delete_species(species_id)
    if not success:
        raise HTTPException(status_code=404, detail="Species not found")
    return None
