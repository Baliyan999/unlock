from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database import get_db
from models import User, Lead, Promocode
from schemas import LeadCreate, LeadResponse, LeadUpdate
from auth import get_current_user, get_current_admin_user, get_current_user_optional

leads_router = APIRouter()

def validate_promocode(promocode: str, db: Session) -> None:
    """
    Валидация промокода. Проверяет существование и активность промокода.
    """
    if not promocode or not promocode.strip():
        return  # Пустой промокод - это нормально
    
    # Ищем промокод в базе данных
    db_promocode = db.query(Promocode).filter(Promocode.code == promocode.strip().upper()).first()
    
    if not db_promocode:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Промокод '{promocode}' не найден"
        )
    
    if not db_promocode.is_active or db_promocode.status != "active":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Промокод '{promocode}' неактивен"
        )
    
    # Проверяем, не истек ли промокод
    if db_promocode.expires_at:
        from datetime import datetime
        if datetime.now() > db_promocode.expires_at:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Промокод '{promocode}' истек"
            )
    
    # Проверяем лимит использований
    if db_promocode.usage_limit and db_promocode.usage_count >= db_promocode.usage_limit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Промокод '{promocode}' исчерпан"
        )

@leads_router.post("/", response_model=LeadResponse)
async def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):
    """
    Создание новой заявки. Анонимная заявка без авторизации.
    """
    # Валидируем промокод, если он указан
    promocode_obj = None
    promocode_discount_info = None
    if lead.promocode:
        validate_promocode(lead.promocode, db)
        # Получаем объект промокода для увеличения счетчика
        promocode_obj = db.query(Promocode).filter(Promocode.code == lead.promocode.strip().upper()).first()
        
        # Формируем информацию о скидке промокода
        if promocode_obj:
            if promocode_obj.discount_percent:
                promocode_discount_info = f"{promocode_obj.discount_percent}% скидка"
            elif promocode_obj.discount_amount:
                promocode_discount_info = f"{promocode_obj.discount_amount} сум скидка"
    
    db_lead = Lead(
        name=lead.name,
        email=lead.email or 'no-email@example.com',  # Fallback email если не предоставлен
        phone=lead.phone,
        message=lead.message,
        language_level=lead.language_level,
        preferred_time=lead.preferred_time,
        format=lead.format,
        promocode=lead.promocode,
        promocode_discount_info=promocode_discount_info,
        final_price=lead.final_price,
        source=lead.source,
        user_id=None,
        status="pending"
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    # Увеличиваем счетчик использований промокода
    if promocode_obj:
        promocode_obj.usage_count += 1
        db.add(promocode_obj)
        db.commit()
        print(f"Промокод {promocode_obj.code} использован. Текущее количество использований: {promocode_obj.usage_count}")
    
    return db_lead

@leads_router.get("/my", response_model=List[LeadResponse])
async def get_my_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Получение заявок текущего пользователя (только для авторизованных пользователей).
    """
    leads = db.query(Lead).filter(Lead.user_id == current_user.id).options(joinedload(Lead.user)).all()
    return leads

# Admin endpoints for leads
@leads_router.get("/admin", response_model=List[LeadResponse])
async def get_all_leads_admin(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение всех заявок для админа (включая pending, processed, deleted).
    """
    leads = db.query(Lead).options(joinedload(Lead.user)).all()
    return leads

@leads_router.get("/admin/{lead_id}", response_model=LeadResponse)
async def get_lead_admin(
    lead_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение конкретной заявки для админа.
    """
    lead = db.query(Lead).options(joinedload(Lead.user)).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@leads_router.patch("/admin/{lead_id}", response_model=LeadResponse)
async def update_lead_admin(
    lead_id: int,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Обновление заявки админом (статус, заметка).
    """
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Обновляем только переданные поля
    update_data = lead_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_lead, field, value)
    
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@leads_router.delete("/admin/{lead_id}", response_model=LeadResponse)
async def delete_lead_admin(
    lead_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Мягкое удаление заявки (статус -> deleted).
    """
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Заявка не найдена"
        )
    
    db_lead.status = "deleted"
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@leads_router.delete("/admin/{lead_id}/hard")
async def hard_delete_lead_admin(
    lead_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Безвозвратное удаление заявки из базы данных.
    """
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Заявка не найдена"
        )
    
    # Проверяем, что заявка уже в статусе deleted
    if db_lead.status != "deleted":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Можно безвозвратно удалять только заявки со статусом 'deleted'"
        )
    
    # Удаляем заявку из базы данных
    db.delete(db_lead)
    db.commit()
    
    return {"message": "Заявка безвозвратно удалена"}

@leads_router.get("/admin-stats", response_model=dict)
async def get_lead_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение статистики по заявкам для админа.
    """
    total = db.query(Lead).count()
    pending = db.query(Lead).filter(Lead.status == "pending").count()
    processed = db.query(Lead).filter(Lead.status == "processed").count()
    deleted = db.query(Lead).filter(Lead.status == "deleted").count()
    
    return {
        "total": total,
        "pending": pending,
        "processed": processed,
        "deleted": deleted
    }
