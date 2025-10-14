# UNLOCK Chinese Language School - Production Setup

## 🚀 Быстрый запуск

### Вариант 1: Автоматический скрипт
```bash
./start_production.sh
```

### Вариант 2: Docker
```bash
docker-compose up -d
```

### Вариант 3: Ручной запуск

#### 1. Backend
```bash
cd backend
source venv/bin/activate
python main.py
```

#### 2. Frontend
```bash
npm run build
npx serve -s dist -l 3000
```

## 📋 Требования

- Node.js 18+
- Python 3.11+
- npm или pnpm

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Backend
DATABASE_URL=sqlite:///./unlocklingua.db
SECRET_KEY=your-production-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Frontend
VITE_API_URL=http://localhost:8000
VITE_APP_ENV=production
```

### База данных

Проект использует SQLite для простоты развертывания. Для продакшена рекомендуется PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost/unlocklingua
```

## 🌐 Доступ

После запуска:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Структура проекта

```
unlock-chinese/
├── backend/                 # FastAPI backend
│   ├── main.py             # Главный файл приложения
│   ├── models.py           # Модели базы данных
│   ├── auth.py             # Авторизация
│   ├── admin.py            # Админ-панель
│   ├── reviews.py          # Отзывы
│   ├── leads.py            # Заявки
│   ├── promocodes.py       # Промокоды
│   ├── upload.py           # Загрузка файлов
│   └── utils.py            # Утилиты (время)
├── src/                    # Vue.js frontend
│   ├── components/         # Компоненты
│   ├── views/             # Страницы
│   ├── stores/            # Pinia store
│   ├── utils/             # Утилиты (время)
│   └── i18n/              # Переводы
├── public/                # Статические файлы
└── dist/                  # Собранный frontend
```

## 🔐 Безопасность

1. **Измените SECRET_KEY** в продакшене
2. **Настройте HTTPS** для продакшена
3. **Ограничьте доступ** к админ-панели
4. **Регулярно обновляйте** зависимости

## 📊 Мониторинг

- Логи backend: `backend/logs/`
- Health check: `GET /health`
- API документация: `/docs`

## 🛠️ Разработка

Для разработки:
```bash
# Backend
cd backend && source venv/bin/activate && python main.py

# Frontend
npm run dev
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи
2. Убедитесь, что все зависимости установлены
3. Проверьте переменные окружения
4. Убедитесь, что порты 3000 и 8000 свободны

