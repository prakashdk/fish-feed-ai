from fastapi import APIRouter, Depends, HTTPException, status, Path
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.models.pond_dto import PondDto, PondCreate, PondUpdate
from app.configs.postgre import get_db
from app.services.pond_service import PondService

pond_router = APIRouter(prefix="/org/{org_id}/ponds")


@pond_router.post("/", response_model=PondDto, status_code=status.HTTP_201_CREATED)
def create_pond(org_id: UUID, payload: PondCreate, db: Session = Depends(get_db)):
    if payload.organization_id != org_id:
        raise HTTPException(status_code=400, detail="Organization ID mismatch")

    service = PondService(db)
    pond = service.create_pond(payload.dict())
    return pond


@pond_router.get("/", response_model=List[PondDto])
def list_ponds(org_id: UUID, db: Session = Depends(get_db)):
    service = PondService(db)
    return service.list_ponds_by_org(org_id)


@pond_router.get("/{pond_id}", response_model=PondDto)
def get_pond(org_id: UUID, pond_id: UUID = Path(...), db: Session = Depends(get_db)):
    service = PondService(db)
    pond = service.get_pond(pond_id)
    if not pond or pond.organization_id != org_id:
        raise HTTPException(status_code=404, detail="Pond not found")
    return pond


@pond_router.put("/{pond_id}", response_model=PondDto)
def update_pond(
    org_id: UUID, pond_id: UUID, update_data: PondUpdate, db: Session = Depends(get_db)
):
    service = PondService(db)
    pond = service.get_pond(pond_id)
    if not pond or pond.organization_id != org_id:
        raise HTTPException(status_code=404, detail="Pond not found")

    updated_pond = service.update_pond(pond_id, update_data.dict(exclude_unset=True))
    return updated_pond


@pond_router.delete("/{pond_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pond(org_id: UUID, pond_id: UUID, db: Session = Depends(get_db)):
    service = PondService(db)
    pond = service.get_pond(pond_id)
    if not pond or pond.organization_id != org_id:
        raise HTTPException(status_code=404, detail="Pond not found")

    success = service.delete_pond(pond_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete pond")
    return None
