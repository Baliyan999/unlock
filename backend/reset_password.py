#!/usr/bin/env python3
"""
Скрипт для изменения пароля пользователя
Использование: python reset_password.py <email> <новый_пароль>
"""

import sys
import os
from dotenv import load_dotenv

# Добавляем текущую директорию в путь Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import User
from auth import get_password_hash

def reset_password(email: str, new_password: str):
    """Изменяет пароль пользователя"""
    db = SessionLocal()
    try:
        # Находим пользователя
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"❌ Пользователь с email {email} не найден")
            return False
        
        # Хешируем новый пароль
        new_password_hash = get_password_hash(new_password)
        
        # Обновляем пароль
        user.password_hash = new_password_hash
        db.commit()
        
        print(f"✅ Пароль успешно изменен для пользователя: {user.display_name} ({email})")
        return True
        
    except Exception as e:
        print(f"❌ Ошибка при изменении пароля: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Использование: python reset_password.py <email> <новый_пароль>")
        print("\nПример:")
        print("  python reset_password.py user@example.com MyNewPassword123")
        sys.exit(1)
    
    email = sys.argv[1]
    new_password = sys.argv[2]
    
    if reset_password(email, new_password):
        sys.exit(0)
    else:
        sys.exit(1)

