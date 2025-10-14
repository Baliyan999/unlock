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

@promocodes_router.get("/validate/{promocode_code}")
async def validate_promocode(
    promocode_code: str,
    db: Session = Depends(get_db)
):
    """
    Валидация промокода (публичный endpoint).
    """
    from utils import get_tashkent_now
    from datetime import timezone
    
    db_promocode = db.query(Promocode).filter(
        Promocode.code == promocode_code.upper(),
        Promocode.status == "active",
        Promocode.is_active == True
    ).first()
    
    if not db_promocode:
        return {
            "valid": False,
            "message": "Промокод не найден"
        }
    
    # Проверяем срок действия (исправляем проблему с timezone)
    if db_promocode.expires_at:
        # Убеждаемся, что обе даты имеют timezone
        now = get_tashkent_now()
        if now.tzinfo is None:
            now = now.replace(tzinfo=timezone.utc)
        if db_promocode.expires_at.tzinfo is None:
            expires_at = db_promocode.expires_at.replace(tzinfo=timezone.utc)
        else:
            expires_at = db_promocode.expires_at
            
        if now > expires_at:
            return {
                "valid": False,
                "message": "Промокод истек"
            }
    
    # Проверяем лимит использований
    if db_promocode.usage_limit and db_promocode.usage_count >= db_promocode.usage_limit:
        return {
            "valid": False,
            "message": "Промокод исчерпан"
        }
    
    # Определяем тип и значение скидки
    discount_type = "percent" if db_promocode.discount_percent else "amount"
    discount_value = db_promocode.discount_percent if db_promocode.discount_percent else db_promocode.discount_amount
    
    return {
        "valid": True,
        "promocode": {
            "id": db_promocode.id,
            "code": db_promocode.code,
            "discount_type": discount_type,
            "discount_value": discount_value,
            "usage_limit": db_promocode.usage_limit,
            "usage_count": db_promocode.usage_count,
            "expires_at": db_promocode.expires_at.isoformat() if db_promocode.expires_at else None
        }
    }

