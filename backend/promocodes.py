from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database import get_db
from models import Promocode
from schemas import PromocodeCreate, PromocodeResponse, PromocodeUpdate
from auth import get_current_admin_user, User

promocodes_router = APIRouter(tags=["promocodes"])

@promocodes_router.get("/", response_model=List[PromocodeResponse])
async def get_promocodes(
    status_filter: str = "all",
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение списка промокодов с фильтрацией по статусу.
    """
    query = db.query(Promocode)
    
    if status_filter == "active":
        query = query.filter(Promocode.status == "active", Promocode.is_active == True)
    elif status_filter == "inactive":
        query = query.filter(Promocode.status == "inactive", Promocode.is_active == False)
    elif status_filter == "deleted":
        query = query.filter(Promocode.status == "deleted")
    # Если status_filter == "all", возвращаем все промокоды
    
    promocodes = query.order_by(Promocode.created_at.desc()).all()
    return promocodes

@promocodes_router.get("/admin-stats", response_model=dict)
async def get_promocode_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение статистики по промокодам.
    """
    total = db.query(Promocode).count()
    active = db.query(Promocode).filter(Promocode.status == "active", Promocode.is_active == True).count()
    inactive = db.query(Promocode).filter(Promocode.status == "inactive", Promocode.is_active == False).count()
    deleted = db.query(Promocode).filter(Promocode.status == "deleted").count()
    
    return {
        "total": total,
        "active": active,
        "inactive": inactive,
        "deleted": deleted
    }

@promocodes_router.post("/", response_model=PromocodeResponse)
async def create_promocode(
    promocode: PromocodeCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Создание нового промокода.
    """
    # Проверяем, что код промокода уникален
    existing_promocode = db.query(Promocode).filter(Promocode.code == promocode.code).first()
    if existing_promocode:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Промокод с таким кодом уже существует"
        )
    
    db_promocode = Promocode(
        code=promocode.code,
        discount_percent=promocode.discount_percent,
        discount_amount=promocode.discount_amount,
        expires_at=promocode.expires_at,
        usage_limit=promocode.usage_limit,
        is_active=promocode.is_active,
        status="active" if promocode.is_active else "inactive"
    )
    
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode

@promocodes_router.get("/{promocode_id}", response_model=PromocodeResponse)
async def get_promocode(
    promocode_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение промокода по ID.
    """
    promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    return promocode

@promocodes_router.patch("/{promocode_id}", response_model=PromocodeResponse)
async def update_promocode(
    promocode_id: int,
    promocode_update: PromocodeUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Обновление промокода.
    """
    db_promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    
    # Проверяем уникальность кода, если он изменяется
    if promocode_update.code and promocode_update.code != db_promocode.code:
        existing_promocode = db.query(Promocode).filter(Promocode.code == promocode_update.code).first()
        if existing_promocode:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Промокод с таким кодом уже существует"
            )
    
    # Обновляем только переданные поля
    update_data = promocode_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_promocode, field, value)
    
    # Обновляем статус в зависимости от is_active
    if 'is_active' in update_data:
        if update_data['is_active']:
            db_promocode.status = "active"
        else:
            db_promocode.status = "inactive"
    
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode

@promocodes_router.delete("/{promocode_id}", response_model=PromocodeResponse)
async def delete_promocode(
    promocode_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Мягкое удаление промокода (статус -> deleted).
    """
    db_promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    
    db_promocode.status = "deleted"
    db_promocode.is_active = False
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode

@promocodes_router.delete("/{promocode_id}/hard")
async def hard_delete_promocode(
    promocode_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Безвозвратное удаление промокода из базы данных.
    """
    db_promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    
    # Проверяем, что промокод уже в статусе deleted
    if db_promocode.status != "deleted":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Можно безвозвратно удалять только промокоды со статусом 'deleted'"
        )
    
    # Удаляем промокод из базы данных
    db.delete(db_promocode)
    db.commit()
    
    return {"message": "Промокод безвозвратно удален"}

@promocodes_router.patch("/{promocode_id}/activate", response_model=PromocodeResponse)
async def activate_promocode(
    promocode_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Активация промокода.
    """
    db_promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    
    db_promocode.is_active = True
    db_promocode.status = "active"
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode

@promocodes_router.patch("/{promocode_id}/deactivate", response_model=PromocodeResponse)
async def deactivate_promocode(
    promocode_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Деактивация промокода.
    """
    db_promocode = db.query(Promocode).filter(Promocode.id == promocode_id).first()
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промокод не найден"
        )
    
    db_promocode.is_active = False
    db_promocode.status = "inactive"
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode

