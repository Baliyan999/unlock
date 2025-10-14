from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import get_current_user

admin_auth_router = APIRouter()

@admin_auth_router.get("/admin/check")
async def check_admin_access(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Проверка доступа к админ-панели
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ запрещен. Требуются права администратора."
        )
    
    return {
        "message": "Доступ разрешен",
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "display_name": current_user.display_name,
            "role": current_user.role
        }
    }

