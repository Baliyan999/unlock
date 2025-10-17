from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import User
from auth import get_current_admin_user

blog_router = APIRouter()

# Модели для блога
class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    slug: str
    language: str = "ru"
    status: str = "draft"
    cover: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    slug: Optional[str] = None
    language: Optional[str] = None
    status: Optional[str] = None
    cover: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: int
    title: str
    excerpt: str
    content: str
    slug: str
    language: str
    status: str
    cover: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Временное хранилище постов (в реальном проекте используйте базу данных)
blog_posts_storage = []

@blog_router.get("/", response_model=List[BlogPostResponse])
async def get_blog_posts(
    language: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Получение всех постов блога
    """
    posts = blog_posts_storage.copy()
    
    if language:
        posts = [p for p in posts if p.get("language") == language]
    
    if status:
        posts = [p for p in posts if p.get("status") == status]
    
    return posts

@blog_router.get("/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    """
    Получение конкретного поста блога
    """
    post = next((p for p in blog_posts_storage if p.get("id") == post_id), None)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пост не найден"
        )
    return post

@blog_router.post("/", response_model=BlogPostResponse)
async def create_blog_post(
    post: BlogPostCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Создание нового поста блога (только для админов)
    """
    # Проверяем, что slug уникален
    existing_post = next((p for p in blog_posts_storage if p.get("slug") == post.slug), None)
    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пост с таким slug уже существует"
        )
    
    # Создаем новый пост
    new_post = {
        "id": len(blog_posts_storage) + 1,
        "title": post.title,
        "excerpt": post.excerpt,
        "content": post.content,
        "slug": post.slug,
        "language": post.language,
        "status": post.status,
        "cover": post.cover,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    blog_posts_storage.append(new_post)
    return new_post

@blog_router.put("/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: int,
    post_update: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Обновление поста блога (только для админов)
    """
    post_index = next((i for i, p in enumerate(blog_posts_storage) if p.get("id") == post_id), None)
    if post_index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пост не найден"
        )
    
    # Обновляем пост
    post = blog_posts_storage[post_index]
    update_data = post_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        post[field] = value
    
    post["updated_at"] = datetime.now()
    
    return post

@blog_router.delete("/{post_id}")
async def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Удаление поста блога (только для админов)
    """
    post_index = next((i for i, p in enumerate(blog_posts_storage) if p.get("id") == post_id), None)
    if post_index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пост не найден"
        )
    
    # Удаляем пост
    deleted_post = blog_posts_storage.pop(post_index)
    
    return {"message": f"Пост '{deleted_post['title']}' успешно удален"}

@blog_router.patch("/{post_id}/status")
async def update_post_status(
    post_id: int,
    status_data: dict,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Изменение статуса поста (только для админов)
    """
    post_index = next((i for i, p in enumerate(blog_posts_storage) if p.get("id") == post_id), None)
    if post_index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пост не найден"
        )
    
    new_status = status_data.get("status")
    if new_status not in ["draft", "published", "archived"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Недопустимый статус"
        )
    
    post = blog_posts_storage[post_index]
    post["status"] = new_status
    post["updated_at"] = datetime.now()
    
    return {"message": f"Статус поста изменен на '{new_status}'"}

