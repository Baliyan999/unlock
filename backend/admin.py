from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, Review, Lead
from schemas import ReviewResponse, ReviewUpdate, LeadResponse, LeadUpdate, UserResponse
from auth import get_current_admin_user

admin_router = APIRouter()

# Review management
@admin_router.get("/reviews", response_model=List[ReviewResponse])
async def get_all_reviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    reviews = db.query(Review).all()
    return reviews

@admin_router.put("/reviews/{review_id}", response_model=ReviewResponse)
async def update_review_status(
    review_id: int,
    review_update: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    update_data = review_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_review, field, value)
    
    db.commit()
    db.refresh(db_review)
    return db_review

@admin_router.delete("/reviews/{review_id}")
async def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    db.delete(db_review)
    db.commit()
    return {"message": "Review deleted successfully"}

# Lead management
@admin_router.get("/leads", response_model=List[LeadResponse])
async def get_all_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    leads = db.query(Lead).all()
    return leads

@admin_router.put("/leads/{lead_id}", response_model=LeadResponse)
async def update_lead_status(
    lead_id: int,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    update_data = lead_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_lead, field, value)
    
    db.commit()
    db.refresh(db_lead)
    return db_lead

# User management
@admin_router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    users = db.query(User).all()
    return users

@admin_router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@admin_router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Удаление пользователя (только для админов)
    """
    # Нельзя удалить самого себя
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Нельзя удалить самого себя"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    # Проверяем, что это не последний админ
    if user.role == "admin":
        admin_count = db.query(User).filter(User.role == "admin").count()
        if admin_count <= 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Нельзя удалить последнего администратора"
            )
    
    # Удаляем связанные данные (отзывы и заявки)
    # Устанавливаем user_id в null для отзывов и заявок
    db.query(Review).filter(Review.user_id == user_id).update({"user_id": None})
    db.query(Lead).filter(Lead.user_id == user_id).update({"user_id": None})
    
    # Удаляем пользователя
    db.delete(user)
    db.commit()
    
    return {"message": f"Пользователь {user.display_name} успешно удален"}
