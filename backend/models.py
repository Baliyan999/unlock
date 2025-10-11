from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    display_name = Column(String, nullable=False)
    role = Column(String, default="user")  # "user" or "admin"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    reviews = relationship("Review", back_populates="user")
    leads = relationship("Lead", back_populates="user")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Может быть null для анонимных отзывов
    author = Column(String, nullable=False)  # Имя автора отзыва
    text = Column(Text, nullable=False)  # Текст отзыва
    rating = Column(Integer, nullable=False)  # 1-5 stars
    is_student = Column(Boolean, default=False)  # Является ли учеником Unlock
    image_url = Column(String, nullable=True)  # URL изображения (опционально)
    status = Column(String, default="pending")  # pending, published, rejected, deleted
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="reviews")

class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Может быть null для анонимных заявок
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    message = Column(Text, nullable=True)
    language_level = Column(String, nullable=True)
    preferred_time = Column(String, nullable=True)
    format = Column(String, nullable=True)  # Формат обучения
    promocode = Column(String, nullable=True)  # Промокод
    promocode_discount_info = Column(String, nullable=True)  # Информация о скидке промокода (например: "10% скидка" или "500₽ скидка")
    final_price = Column(String, nullable=True)  # Итоговая цена
    source = Column(String, nullable=False)  # Источник заявки: "lead" или "calculator"
    status = Column(String, default="pending")  # "pending", "processed", "deleted"
    admin_note = Column(Text, nullable=True)  # Заметка администратора
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="leads")

class Promocode(Base):
    __tablename__ = "promocodes"
    
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True, nullable=False)  # Код промокода (например: WELCOME10)
    discount_percent = Column(Integer, nullable=True)  # Процент скидки
    discount_amount = Column(Integer, nullable=True)  # Фиксированная сумма скидки
    expires_at = Column(DateTime(timezone=True), nullable=True)  # Дата окончания действия
    usage_limit = Column(Integer, nullable=True)  # Ограничение по количеству использований
    usage_count = Column(Integer, default=0)  # Количество использований
    is_active = Column(Boolean, default=True)  # Активен ли промокод
    status = Column(String, default="active")  # "active", "inactive", "deleted"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
