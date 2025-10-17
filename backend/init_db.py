#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных
Запускает миграции Alembic и создает базовые данные
"""

import os
import sys
from dotenv import load_dotenv

# Добавляем текущую директорию в путь Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import create_tables, engine, SessionLocal
from models import User, Review, Lead, Promocode
from utils import get_tashkent_now
import hashlib
import secrets

def hash_password(password: str) -> str:
    """Хеширует пароль"""
    salt = secrets.token_hex(16)
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}:{password_hash.hex()}"

def create_admin_user():
    """Создает администратора по умолчанию"""
    db = SessionLocal()
    try:
        # Проверяем, есть ли уже администратор
        admin = db.query(User).filter(User.role == "admin").first()
        if admin:
            print("Администратор уже существует")
            return
        
        # Создаем администратора
        admin_user = User(
            email="albert.baliyan.666@gmail.com",
            password_hash=hash_password("25788752Albert"),
            display_name="Администратор",
            role="admin"
        )
        
        db.add(admin_user)
        db.commit()
        print("Администратор создан:")
        print("Email: albert.baliyan.666@gmail.com")
        print("Пароль: 25788752Albert")
        print("✅ Администратор готов к работе!")
        
    except Exception as e:
        print(f"Ошибка при создании администратора: {e}")
        db.rollback()
    finally:
        db.close()

def create_sample_promocodes():
    """Создает примеры промокодов"""
    db = SessionLocal()
    try:
        # Удаляем старые промокоды и создаем новые
        db.query(Promocode).delete()
        
        # Создаем примеры промокодов
        sample_promocodes = [
            Promocode(
                code="WELCOME10",
                discount_percent=10,
                expires_at=None,
                usage_limit=100,
                is_active=True,
                status="active"
            ),
            Promocode(
                code="FIRST500",
                discount_amount=500,
                expires_at=None,
                usage_limit=50,
                is_active=True,
                status="active"
            )
        ]
        
        for promocode in sample_promocodes:
            db.add(promocode)
        
        db.commit()
        print("Созданы примеры промокодов:")
        print("- WELCOME10 (10% скидка)")
        print("- FIRST500 (500₽ скидка)")
        
    except Exception as e:
        print(f"Ошибка при создании промокодов: {e}")
        db.rollback()
    finally:
        db.close()

def main():
    """Основная функция инициализации"""
    print("🚀 Инициализация базы данных...")
    
    # Загружаем переменные окружения
    load_dotenv()
    
    # Создаем таблицы
    print("📋 Создание таблиц...")
    create_tables()
    print("✅ Таблицы созданы")
    
    # Создаем администратора
    print("👤 Создание администратора...")
    create_admin_user()
    
    # Создаем примеры промокодов
    print("🎫 Создание промокодов...")
    create_sample_promocodes()
    
    print("🎉 Инициализация завершена!")
    print("\n📝 Следующие шаги:")
    print("1. Измените пароль администратора")
    print("2. Настройте переменные окружения")
    print("3. Запустите приложение")

if __name__ == "__main__":
    main()
