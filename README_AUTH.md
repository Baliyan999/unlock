# Инструкция по запуску системы авторизации

## Что было реализовано

### Backend (FastAPI + PostgreSQL)
- ✅ Модели: User, Review, Lead
- ✅ JWT авторизация с access + refresh токенами
- ✅ Эндпоинты авторизации: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`
- ✅ Эндпоинты отзывов: `/reviews` (POST), `/reviews/public` (GET)
- ✅ Админ-эндпоинты: `/admin/reviews`, `/admin/leads`, `/admin/users`
- ✅ Эндпоинты лидов: `/leads` (POST), `/leads/my` (GET)

### Frontend (Vue 3)
- ✅ Страницы входа и регистрации: `/login`, `/register`
- ✅ Админ-панель: `/admin` (только для пользователей с ролью admin)
- ✅ Интеграция авторизации с формами отзывов и лидов
- ✅ Модальные окна для неавторизованных пользователей
- ✅ Кнопки входа/выхода в Header

## Настройка и запуск

### 1. Backend

#### Установка зависимостей
```bash
cd backend
pip install -r requirements.txt
```

#### Настройка базы данных
1. Создайте PostgreSQL базу данных:
```sql
CREATE DATABASE unlocklingua;
```

2. Создайте файл `.env` в папке `backend`:
```env
DATABASE_URL=postgresql://user:password@localhost/unlocklingua
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

#### Запуск миграций
```bash
cd backend
alembic upgrade head
```

#### Запуск сервера
```bash
cd backend
python run.py
```

Backend будет доступен по адресу: http://localhost:8000

### 2. Frontend

#### Установка зависимостей
```bash
pnpm install
```

#### Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```env
VITE_API_URL=http://localhost:8000
```

#### Запуск frontend
```bash
pnpm dev
```

Frontend будет доступен по адресу: http://localhost:5173

## Функциональность

### Для неавторизованных пользователей
- ✅ Просмотр сайта (все страницы, блог, калькулятор)
- ✅ При попытке оставить отзыв → модальное окно с предложением войти
- ✅ При попытке записаться на урок → модальное окно с предложением войти

### Для авторизованных пользователей (роль: user)
- ✅ Оставление отзывов через форму
- ✅ Запись на пробный урок через форму
- ✅ Просмотр своих отзывов и заявок

### Для администраторов (роль: admin)
- ✅ Доступ к админ-панели `/admin`
- ✅ Модерация отзывов (публикация/скрытие/удаление)
- ✅ Просмотр всех заявок на уроки
- ✅ Управление статусами заявок
- ✅ Просмотр списка пользователей

## Создание первого администратора

Для создания первого администратора выполните SQL запрос:

```sql
INSERT INTO users (email, password_hash, display_name, role, created_at) 
VALUES (
  'admin@unlocklingua.com', 
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8.8.8.8', -- пароль: admin123
  'Администратор', 
  'admin', 
  NOW()
);
```

Или используйте API для регистрации, а затем вручную измените роль в базе данных.

## API Endpoints

### Авторизация
- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход
- `POST /auth/logout` - Выход
- `GET /auth/me` - Получение информации о текущем пользователе

### Отзывы
- `POST /reviews` - Создание отзыва (требует авторизации)
- `GET /reviews/public` - Получение опубликованных отзывов
- `GET /reviews/my` - Получение своих отзывов (требует авторизации)

### Лиды
- `POST /leads` - Создание заявки (требует авторизации)
- `GET /leads/my` - Получение своих заявок (требует авторизации)

### Админ-панель
- `GET /admin/reviews` - Все отзывы (только admin)
- `PUT /admin/reviews/{id}` - Обновление отзыва (только admin)
- `DELETE /admin/reviews/{id}` - Удаление отзыва (только admin)
- `GET /admin/leads` - Все заявки (только admin)
- `PUT /admin/leads/{id}` - Обновление заявки (только admin)
- `GET /admin/users` - Все пользователи (только admin)

## Безопасность

- ✅ JWT токены хранятся в HttpOnly cookies
- ✅ Пароли хешируются с помощью bcrypt
- ✅ CORS настроен для фронтенда
- ✅ Проверка ролей на уровне API
- ✅ Валидация данных с помощью Pydantic

## Структура базы данных

### Таблица users
- `id` - Primary key
- `email` - Уникальный email
- `password_hash` - Хеш пароля
- `display_name` - Отображаемое имя
- `role` - Роль (user/admin)
- `created_at` - Дата создания

### Таблица reviews
- `id` - Primary key
- `user_id` - Foreign key на users
- `content` - Текст отзыва
- `rating` - Оценка (1-5)
- `is_published` - Опубликован ли отзыв
- `created_at` - Дата создания
- `updated_at` - Дата обновления

### Таблица leads
- `id` - Primary key
- `user_id` - Foreign key на users
- `name` - Имя
- `email` - Email
- `phone` - Телефон
- `message` - Сообщение
- `language_level` - Уровень языка
- `preferred_time` - Предпочтительное время
- `status` - Статус (new/contacted/converted/closed)
- `created_at` - Дата создания
