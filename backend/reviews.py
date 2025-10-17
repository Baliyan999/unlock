from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc

from database import get_db
from models import User, Review
from schemas import ReviewCreate, ReviewResponse, ReviewUpdate
from auth import get_current_user, get_current_admin_user

reviews_router = APIRouter()

# Публичные endpoints (доступны всем)
@reviews_router.post("/", response_model=ReviewResponse)
async def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db)
):
    """
    Создание публичного отзыва (без авторизации)
    Отзыв создается со статусом 'pending' (на модерации)
    """
    db_review = Review(
        user_id=None,  # Анонимный отзыв
        author=review.author,
        text=review.text,
        rating=review.rating,
        is_student=review.is_student,
        image_url=review.image_url,
        status="pending"  # По умолчанию на модерации
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.get("/public", response_model=List[ReviewResponse])
async def get_public_reviews(
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    Получение опубликованных отзывов (доступно всем)
    Показывает только отзывы со статусом 'published'
    """
    reviews = db.query(Review).filter(
        Review.status == "published"
    ).order_by(desc(Review.created_at)).offset(offset).limit(limit).all()
    return reviews

# Админские endpoints (требуют авторизации админа)
@reviews_router.get("/admin", response_model=List[ReviewResponse])
async def get_all_reviews_admin(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user),
    status_filter: Optional[str] = Query(None, description="Фильтр по статусу: pending, published, rejected, deleted"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    Получение всех отзывов для админа с возможностью фильтрации
    """
    query = db.query(Review)
    
    if status_filter:
        query = query.filter(Review.status == status_filter)
    
    reviews = query.order_by(desc(Review.created_at)).offset(offset).limit(limit).all()
    return reviews

@reviews_router.get("/admin/{review_id}", response_model=ReviewResponse)
async def get_review_admin(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение конкретного отзыва для админа
    """
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    return review

@reviews_router.put("/admin/{review_id}", response_model=ReviewResponse)
async def update_review_admin(
    review_id: int,
    review_update: ReviewUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Обновление отзыва админом (модерация)
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )

    # Обновляем только переданные поля
    update_data = review_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_review, field, value)

    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.patch("/admin/{review_id}/approve", response_model=ReviewResponse)
async def approve_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Одобрение отзыва (статус -> published)
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    db_review.status = "published"
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.patch("/admin/{review_id}/reject", response_model=ReviewResponse)
async def reject_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Отклонение отзыва (статус -> rejected)
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    db_review.status = "rejected"
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.patch("/admin/{review_id}/delete", response_model=ReviewResponse)
async def soft_delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Мягкое удаление отзыва (статус -> deleted)
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    db_review.status = "deleted"
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.patch("/admin/{review_id}", response_model=ReviewResponse)
async def update_review_admin(
    review_id: int,
    review_update: ReviewUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Обновление отзыва админом (статус, заметка).
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    # Обновляем только переданные поля
    update_data = review_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_review, key, value)
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.delete("/admin/{review_id}", response_model=ReviewResponse)
async def soft_delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Мягкое удаление отзыва (статус -> deleted)
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    db_review.status = "deleted"
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@reviews_router.delete("/admin/{review_id}/permanent", status_code=status.HTTP_204_NO_CONTENT)
async def hard_delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Полное удаление отзыва из базы данных (только для отзывов со статусом 'deleted')
    """
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Отзыв не найден"
        )
    
    # Проверяем, что отзыв уже удален (мягкое удаление)
    if db_review.status != "deleted":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Можно полностью удалить только отзывы со статусом 'deleted'"
        )
    
    # Полное удаление из базы данных
    db.delete(db_review)
    db.commit()
    return

@reviews_router.get("/admin-stats", response_model=dict)
async def get_review_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Получение статистики по отзывам для админа
    """
    total = db.query(Review).count()
    pending = db.query(Review).filter(Review.status == "pending").count()
    published = db.query(Review).filter(Review.status == "published").count()
    rejected = db.query(Review).filter(Review.status == "rejected").count()
    deleted = db.query(Review).filter(Review.status == "deleted").count()
    
    return {
        "total": total,
        "pending": pending,
        "published": published,
        "rejected": rejected,
        "deleted": deleted
    }