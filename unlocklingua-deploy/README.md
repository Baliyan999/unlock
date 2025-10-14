# 🚀 UnlockLingua - Готовый билд для развертывания

## 📦 Что включено:
- ✅ Готовый фронтенд (dist/)
- ✅ Настроенный бэкенд с вашими данными
- ✅ Автоматическая инициализация базы данных
- ✅ Docker конфигурация
- ✅ Скрипты развертывания

## 🚀 БЫСТРОЕ РАЗВЕРТЫВАНИЕ:

### Вариант 1: Docker (Рекомендуется)
```bash
# Сделайте скрипт исполняемым
chmod +x quick-deploy.sh

# Запустите развертывание
./quick-deploy.sh
```

### Вариант 2: Ручной запуск
```bash
# Сделайте скрипт исполняемым
chmod +x start_production.sh

# Запустите приложение
./start_production.sh
```

## 🔐 ДАННЫЕ ДЛЯ АДМИНКИ:
- **URL**: `https://your-domain.com/admin`
- **Email**: `albert.baliyan.666@gmail.com`
- **Пароль**: `25788752Albert`

## 🌐 ПОРТЫ:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📋 ПОЛЕЗНЫЕ КОМАНДЫ:

### Docker команды:
```bash
# Просмотр логов
docker-compose logs -f unlock-app

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Статус
docker-compose ps

# Проверка API
curl http://localhost:8000/health
```

### Ручной запуск:
```bash
# Остановка (Ctrl+C)
# Перезапуск - просто запустите start_production.sh снова
```

## 🆘 ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК:

1. **Проверьте логи**:
   ```bash
   docker-compose logs unlock-app
   ```

2. **Перезапустите**:
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

3. **Проверьте права**:
   ```bash
   ls -la backend/data/
   chmod 755 backend/data
   ```

## 📁 СТРУКТУРА ПРОЕКТА:
```
unlocklingua-deploy/
├── dist/                    # Готовый фронтенд
├── backend/                 # Бэкенд приложение
├── docker-compose.yml       # Docker конфигурация
├── Dockerfile              # Docker образ
├── quick-deploy.sh         # Скрипт быстрого развертывания
├── start_production.sh     # Скрипт ручного запуска
├── build.sh               # Скрипт сборки
├── env.production         # Переменные окружения
└── README.md              # Этот файл
```

**ВСЕ ГОТОВО ДЛЯ ЗАГРУЗКИ! 🎉**
