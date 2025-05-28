from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.models.organisation_dto import (
    OrganizationDto,
    OrganizationCreate,
    OrganizationUpdate,
)
from app.services.organisation_service import OrganizationService
from app.configs.postgre import get_db

org_router = APIRouter()


@org_router.post(
    "/", response_model=OrganizationDto, status_code=status.HTTP_201_CREATED
)
def create_organization(payload: OrganizationCreate, db: Session = Depends(get_db)):
    service = OrganizationService(db)
    org = service.create_organization(payload.dict())
    return org


@org_router.get("/{org_id}", response_model=OrganizationDto)
def read_organization(org_id: UUID, db: Session = Depends(get_db)):
    service = OrganizationService(db)
    org = service.get_organization(org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org


@org_router.get("/", response_model=List[OrganizationDto])
def list_organizations(db: Session = Depends(get_db)):
    service = OrganizationService(db)
    return service.list_organizations()


@org_router.put("/{org_id}", response_model=OrganizationDto)
def update_organization(
    org_id: UUID, update_data: OrganizationUpdate, db: Session = Depends(get_db)
):
    service = OrganizationService(db)
    org = service.update_organization(org_id, update_data.dict(exclude_unset=True))
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org


@org_router.delete("/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_organization(org_id: UUID, db: Session = Depends(get_db)):
    service = OrganizationService(db)
    success = service.delete_organization(org_id)
    if not success:
        raise HTTPException(status_code=404, detail="Organization not found")
    return None
