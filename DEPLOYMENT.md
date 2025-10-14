# 🚀 Развертывание UNLOCK Chinese Language School

## ✅ Готово к продакшену!

Проект полностью подготовлен для развертывания в продакшене. Все локальные зависимости заменены на работу с базой данных.

## 🎯 Варианты развертывания

### 1. Простой запуск (рекомендуется)
```bash
./start_production.sh
```

### 2. Docker (для серверов)
```bash
docker-compose up -d
```

### 3. Ручной запуск
```bash
# Backend
cd backend && source venv/bin/activate && python main.py

# Frontend (в другом терминале)
npx serve -s dist -l 3000
```

## 📋 Что работает в продакшене

### ✅ Backend (FastAPI)
- **Авторизация**: JWT токены с правильным часовым поясом
- **База данных**: SQLite (легко заменить на PostgreSQL)
- **API**: Все эндпоинты работают
- **Загрузка файлов**: Изображения сохраняются в БД
- **Health Check**: `/health` с временем Ташкента

### ✅ Frontend (Vue.js)
- **Статический билд**: Оптимизирован для продакшена
- **Переводы**: Все языки работают
- **Авторизация**: Полная интеграция с backend
- **Админ-панель**: Все функции доступны
- **Адаптивность**: Работает на всех устройствах

### ✅ Функции
- **Отзывы**: Только для авторизованных пользователей
- **Заявки**: Анонимная отправка + админ-панель
- **Промокоды**: Полное управление
- **Блог**: Создание, редактирование, публикация
- **Пользователи**: Регистрация, авторизация, роли

## 🔧 Конфигурация

### Переменные окружения
Создайте файл `.env`:
```env
DATABASE_URL=sqlite:///./unlocklingua.db
SECRET_KEY=your-secret-key-here
VITE_API_URL=http://localhost:8000
```

### Для PostgreSQL (рекомендуется для продакшена)
```env
DATABASE_URL=postgresql://user:password@localhost/unlocklingua
```

## 🌐 Доступ

После запуска:
- **Сайт**: http://localhost:3000
- **API**: http://localhost:8000
- **Документация**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔐 Безопасность

1. **Измените SECRET_KEY** в продакшене
2. **Настройте HTTPS** (nginx/apache)
3. **Ограничьте доступ** к админ-панели
4. **Регулярно обновляйте** зависимости

## 📊 Мониторинг

- **Логи**: Проверяйте консоль серверов
- **Health Check**: `GET /health`
- **База данных**: SQLite файл в `backend/unlocklingua.db`

## 🛠️ Обслуживание

### Создание админа
```bash
cd backend
source venv/bin/activate
python -c "
from database import SessionLocal
from models import User
from auth import get_password_hash

db = SessionLocal()
admin = User(
    email='admin@unlock.uz',
    password_hash=get_password_hash('your-password'),
    display_name='Администратор',
    role='admin'
)
db.add(admin)
db.commit()
print('Admin created!')
"
```

### Резервное копирование
```bash
# База данных
cp backend/unlocklingua.db backup_$(date +%Y%m%d).db

# Изображения
tar -czf images_backup_$(date +%Y%m%d).tar.gz backend/public/images/
```

## 🚨 Устранение неполадок

### Backend не запускается
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Frontend не работает
```bash
npm install
npm run build
npx serve -s dist -l 3000
```

### Проблемы с базой данных
```bash
cd backend
rm unlocklingua.db
source venv/bin/activate
python -c "from database import engine, Base; Base.metadata.create_all(bind=engine)"
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи серверов
2. Убедитесь, что порты 3000 и 8000 свободны
3. Проверьте переменные окружения
4. Убедитесь, что все зависимости установлены

---

**🎉 Проект готов к продакшену!**

