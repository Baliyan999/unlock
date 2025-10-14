# 🗄️ Настройка базы данных на сервере

## Проблема
После развертывания сайта на хостинге база данных не работает.

## Решение

### 1. Автоматическое развертывание (рекомендуется)

```bash
# Запустите скрипт развертывания
./deploy_database.sh
```

Этот скрипт автоматически:
- Создаст папку для базы данных
- Настроит переменные окружения
- Запустит контейнеры
- Инициализирует базу данных
- Создаст администратора по умолчанию

### 2. Ручное развертывание

#### Шаг 1: Создание папки для базы данных
```bash
mkdir -p backend/data
chmod 755 backend/data
```

#### Шаг 2: Настройка переменных окружения
```bash
# Скопируйте файл с переменными окружения
cp env.production .env

# Отредактируйте .env файл, изменив:
# - SECRET_KEY на уникальный ключ
# - DATABASE_URL если нужно
```

#### Шаг 3: Запуск контейнеров
```bash
# Остановите существующие контейнеры
docker-compose down

# Соберите и запустите новые
docker-compose up --build -d
```

#### Шаг 4: Инициализация базы данных
```bash
# Войдите в контейнер
docker-compose exec unlock-app bash

# Запустите инициализацию
cd /app/backend
python init_db.py
```

### 3. Проверка работы

#### Проверка статуса контейнеров
```bash
docker-compose ps
```

#### Проверка логов
```bash
docker-compose logs -f unlock-app
```

#### Проверка API
```bash
curl http://localhost:8000/health
```

### 4. Доступ к админке

После успешной инициализации:
- **URL**: `http://your-domain.com/admin`
- **Email**: `admin@unlocklingua.com`
- **Пароль**: `admin123`

⚠️ **ОБЯЗАТЕЛЬНО ИЗМЕНИТЕ ПАРОЛЬ** после первого входа!

### 5. Структура базы данных

База данных SQLite создается в файле `backend/data/unlocklingua.db` и содержит:

- **users** - пользователи системы
- **reviews** - отзывы
- **leads** - заявки
- **promocodes** - промокоды

### 6. Резервное копирование

#### Создание бэкапа
```bash
# Скопируйте файл базы данных
cp backend/data/unlocklingua.db backup_$(date +%Y%m%d_%H%M%S).db
```

#### Восстановление из бэкапа
```bash
# Остановите контейнеры
docker-compose down

# Замените файл базы данных
cp backup_file.db backend/data/unlocklingua.db

# Запустите контейнеры
docker-compose up -d
```

### 7. Устранение проблем

#### Проблема: База данных не создается
```bash
# Проверьте права доступа
ls -la backend/data/

# Создайте папку заново
rm -rf backend/data
mkdir -p backend/data
chmod 755 backend/data
```

#### Проблема: Ошибки при запуске
```bash
# Просмотрите логи
docker-compose logs unlock-app

# Перезапустите контейнеры
docker-compose down
docker-compose up --build -d
```

#### Проблема: API недоступен
```bash
# Проверьте, что контейнер запущен
docker-compose ps

# Проверьте порты
netstat -tlnp | grep :8000
```

### 8. Мониторинг

#### Проверка размера базы данных
```bash
ls -lh backend/data/unlocklingua.db
```

#### Просмотр содержимого базы данных
```bash
# Установите sqlite3 если не установлен
sudo apt-get install sqlite3

# Подключитесь к базе данных
sqlite3 backend/data/unlocklingua.db

# Просмотрите таблицы
.tables

# Просмотрите структуру таблицы
.schema users

# Выйдите
.quit
```

## Контакты

Если у вас возникли проблемы, проверьте:
1. Логи контейнера: `docker-compose logs unlock-app`
2. Статус контейнеров: `docker-compose ps`
3. Доступность API: `curl http://localhost:8000/health`

