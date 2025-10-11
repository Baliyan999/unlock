"""
Строгая проверка авторизации для админки
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import get_current_user, get_current_admin_user

admin_auth_router = APIRouter()

@admin_auth_router.get("/check-access")
async def check_admin_access(current_admin: User = Depends(get_current_admin_user)):
    """
    Строгая проверка доступа к админке
    Возвращает 403 если пользователь не админ
    """
    if current_admin.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ запрещен. Требуются права администратора."
        )
    
    return {
        "access_granted": True,
        "user": {
            "id": current_admin.id,
            "email": current_admin.email,
            "display_name": current_admin.display_name,
            "role": current_admin.role
        }
    }

@admin_auth_router.get("/verify-token")
async def verify_admin_token(current_user: User = Depends(get_current_user)):
    """
    Проверка токена и роли пользователя
    """
    return {
        "authenticated": True,
        "is_admin": current_user.role == "admin",
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "display_name": current_user.display_name,
            "role": current_user.role
        }
    }
