# 🚀 ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ UNLOCKLINGUA

## 📦 Готовый архив: `unlocklingua-final.tar.gz` (36 MB)

### ✅ Что включено:
- Готовый фронтенд (dist/)
- Настроенный бэкенд с вашими данными
- Автоматическая инициализация базы данных
- Docker конфигурация
- Скрипты развертывания

---

## 🚀 ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ:

### 1. Загрузите архив на сервер
```bash
scp unlocklingua-final.tar.gz user@your-server:/path/to/deployment/
```

### 2. На сервере - распакуйте и запустите
```bash
# Подключитесь к серверу
ssh user@your-server

# Перейдите в папку развертывания
cd /path/to/deployment/

# Распакуйте архив
tar -xzf unlocklingua-final.tar.gz

# Перейдите в папку проекта
cd unlocklingua-deploy/

# Запустите развертывание (Docker - рекомендуется)
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### 3. Альтернативный запуск (без Docker)
```bash
# Если Docker недоступен, используйте ручной запуск
chmod +x start_production.sh
./start_production.sh
```

### 4. Готово! 🎉

---

## 🔐 ДАННЫЕ ДЛЯ АДМИНКИ:
- **URL**: `https://your-domain.com/admin`
- **Email**: `albert.baliyan.666@gmail.com`
- **Пароль**: `25788752Albert`

---

## 🌐 ПОРТЫ:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📋 ПОЛЕЗНЫЕ КОМАНДЫ НА СЕРВЕРЕ:

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

---

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

4. **Проверьте порты**:
   ```bash
   netstat -tlnp | grep :8000
   netstat -tlnp | grep :3000
   ```

---

## 📁 СТРУКТУРА ПРОЕКТА:
```
unlocklingua-deploy/
├── dist/                    # Готовый фронтенд
├── backend/                 # Бэкенд приложение
│   ├── models.py           # Модели базы данных
│   ├── main.py             # Основной файл FastAPI
│   ├── auth.py             # Аутентификация
│   ├── requirements.txt    # Python зависимости
│   └── ...                 # Другие файлы бэкенда
├── docker-compose.yml       # Docker конфигурация
├── Dockerfile              # Docker образ
├── quick-deploy.sh         # Скрипт быстрого развертывания
├── start_production.sh     # Скрипт ручного запуска
├── build.sh               # Скрипт сборки
├── env.production         # Переменные окружения
├── .dockerignore          # Игнорируемые файлы для Docker
└── README.md              # Документация
```

---

## 🔧 ТРЕБОВАНИЯ К СЕРВЕРУ:

### Минимальные требования:
- **RAM**: 1 GB
- **CPU**: 1 ядро
- **Диск**: 2 GB свободного места
- **ОС**: Linux (Ubuntu 20.04+ рекомендуется)

### Рекомендуемые требования:
- **RAM**: 2 GB
- **CPU**: 2 ядра
- **Диск**: 5 GB свободного места
- **ОС**: Ubuntu 22.04 LTS

### Необходимое ПО:
- Docker и Docker Compose (для автоматического развертывания)
- ИЛИ Python 3.11+ (для ручного развертывания)

---

**ВСЕ ГОТОВО ДЛЯ ЗАГРУЗКИ! 🎉**

Архив `unlocklingua-final.tar.gz` содержит все необходимое для развертывания вашего сайта на любом сервере.
