from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional, List
from datetime import datetime
import re

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    display_name: str = Field(..., min_length=2, max_length=20, description="Имя должно содержать от 2 до 20 символов")

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100, description="Пароль должен содержать от 8 до 100 символов")
    
    @field_validator('display_name')
    @classmethod
    def validate_display_name(cls, v):
        if not v or not v.strip():
            raise ValueError('Имя не может быть пустым')
        if len(v.strip()) < 2:
            raise ValueError('Имя должно содержать минимум 2 символа')
        if len(v.strip()) > 20:
            raise ValueError('Имя не может содержать более 20 символов')
        # Проверяем, что имя содержит только буквы, пробелы, дефисы и апострофы
        if not re.match(r"^[a-zA-Zа-яА-ЯёЁ\s\-']+$", v.strip()):
            raise ValueError('Имя может содержать только буквы, пробелы, дефисы и апострофы')
        return v.strip()
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Пароль должен содержать минимум 8 символов')
        if len(v) > 100:
            raise ValueError('Пароль не может содержать более 100 символов')
        # Проверяем наличие хотя бы одной буквы и одной цифры
        if not re.search(r'[a-zA-Z]', v):
            raise ValueError('Пароль должен содержать хотя бы одну букву')
        if not re.search(r'\d', v):
            raise ValueError('Пароль должен содержать хотя бы одну цифру')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Review schemas
class ReviewBase(BaseModel):
    author: str = Field(..., min_length=2, max_length=50, description="Имя автора отзыва")
    text: str = Field(..., min_length=10, max_length=1000, description="Текст отзыва")
    rating: int = Field(..., ge=1, le=5, description="Оценка от 1 до 5 звезд")
    is_student: bool = Field(default=False, description="Является ли учеником Unlock")
    image_url: Optional[str] = Field(None, description="URL изображения (опционально)")

class ReviewCreate(BaseModel):
    text: str = Field(..., min_length=10, max_length=1000, description="Текст отзыва")
    rating: int = Field(..., ge=1, le=5, description="Оценка от 1 до 5 звезд")
    is_student: bool = Field(default=False, description="Является ли учеником Unlock")
    image_url: Optional[str] = Field(None, description="URL изображения (опционально)")
    
    @field_validator('text')
    @classmethod
    def validate_text(cls, v):
        if not v or not v.strip():
            raise ValueError('Текст отзыва не может быть пустым')
        if len(v.strip()) < 10:
            raise ValueError('Текст отзыва должен содержать минимум 10 символов')
        if len(v.strip()) > 1000:
            raise ValueError('Текст отзыва не может содержать более 1000 символов')
        return v.strip()

class ReviewResponse(ReviewBase):
    id: int
    user_id: Optional[int] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    user: Optional[UserResponse] = None  # Может быть null для анонимных отзывов
    
    class Config:
        from_attributes = True

class ReviewUpdate(BaseModel):
    author: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[int] = None
    is_student: Optional[bool] = None
    image_url: Optional[str] = None
    status: Optional[str] = None

# Lead schemas
class LeadBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Имя должно содержать от 2 до 50 символов")
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20, description="Номер телефона")
    message: Optional[str] = Field(None, max_length=1000, description="Комментарий")
    language_level: Optional[str] = Field(None, description="Уровень языка")
    preferred_time: Optional[str] = Field(None, description="Предпочтительное время")
    format: Optional[str] = Field(None, description="Формат обучения")
    promocode: Optional[str] = Field(None, description="Промокод")
    promocode_discount_info: Optional[str] = Field(None, description="Информация о скидке промокода")
    final_price: Optional[str] = Field(None, description="Итоговая цена")
    source: str = Field(..., description="Источник заявки: lead или calculator")

    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError('Имя не может быть пустым')
        if len(v.strip()) < 2:
            raise ValueError('Имя должно содержать минимум 2 символа')
        if len(v.strip()) > 50:
            raise ValueError('Имя не может содержать более 50 символов')
        return v.strip()

    @field_validator('source')
    @classmethod
    def validate_source(cls, v):
        if v not in ['lead', 'calculator']:
            raise ValueError('Источник заявки должен быть "lead" или "calculator"')
        return v

class LeadCreate(LeadBase):
    pass

class LeadResponse(LeadBase):
    id: int
    user_id: Optional[int] = None
    user: Optional[UserResponse] = None
    status: str
    admin_note: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    admin_note: Optional[str] = None

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Promocode schemas
class PromocodeBase(BaseModel):
    code: str = Field(..., min_length=3, max_length=50, description="Код промокода")
    discount_percent: Optional[int] = Field(None, ge=0, le=100, description="Процент скидки (0-100)")
    discount_amount: Optional[int] = Field(None, ge=0, description="Фиксированная сумма скидки")
    expires_at: Optional[datetime] = Field(None, description="Дата окончания действия")
    usage_limit: Optional[int] = Field(None, ge=1, description="Ограничение по количеству использований")
    is_active: bool = Field(True, description="Активен ли промокод")

    @field_validator('code')
    @classmethod
    def validate_code(cls, v):
        if not v or not v.strip():
            raise ValueError('Код промокода не может быть пустым')
        if len(v.strip()) < 3:
            raise ValueError('Код промокода должен содержать минимум 3 символа')
        if len(v.strip()) > 50:
            raise ValueError('Код промокода не может содержать более 50 символов')
        return v.strip().upper()

    @field_validator('discount_percent', 'discount_amount')
    @classmethod
    def validate_discount(cls, v):
        if v is not None and v < 0:
            raise ValueError('Скидка не может быть отрицательной')
        return v

    # Валидация будет в API endpoint

class PromocodeCreate(PromocodeBase):
    pass

class PromocodeResponse(PromocodeBase):
    id: int
    usage_count: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class PromocodeUpdate(BaseModel):
    code: Optional[str] = None
    discount_percent: Optional[int] = None
    discount_amount: Optional[int] = None
    expires_at: Optional[datetime] = None
    usage_limit: Optional[int] = None
    is_active: Optional[bool] = None
    status: Optional[str] = None
