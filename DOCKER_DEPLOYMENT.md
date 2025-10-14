# 🐳 Docker развертывание UnlockLingua

## 📦 Готовый архив: `unlocklingua-docker.tar.gz` (36 MB)

### ✅ Что включено:
- Готовый фронтенд (dist/)
- Настроенный бэкенд с вашими данными
- Оптимизированный Dockerfile с Nginx
- Docker Compose конфигурация
- Автоматические скрипты развертывания

---

## 🚀 ИНСТРУКЦИЯ ПО DOCKER РАЗВЕРТЫВАНИЮ:

### 1. Требования к серверу:
- **Docker** (версия 20.10+)
- **Docker Compose** (версия 2.0+)
- **Минимум 1GB RAM**
- **Минимум 2GB свободного места**

### 2. Загрузите архив на сервер:
```bash
scp unlocklingua-docker.tar.gz user@your-server:/home/user/
```

### 3. На сервере - распакуйте и запустите:
```bash
# Подключитесь к серверу
ssh user@your-server

# Перейдите в папку
cd /home/user/

# Распакуйте архив
tar -xzf unlocklingua-docker.tar.gz

# Перейдите в папку проекта
cd unlocklingua-deploy/

# Запустите Docker развертывание
chmod +x docker-deploy.sh
./docker-deploy.sh
```

### 4. Готово! 🎉

---

## 🔐 ДАННЫЕ ДЛЯ АДМИНКИ:
- **URL**: `http://your-server:8000/admin`
- **Email**: `albert.baliyan.666@gmail.com`
- **Пароль**: `25788752Albert`

---

## 🌐 ПОРТЫ:
- **Frontend**: http://your-server:3000
- **Backend API**: http://your-server:8000
- **API Docs**: http://your-server:8000/docs

---

## 📋 ПОЛЕЗНЫЕ DOCKER КОМАНДЫ:

### Основные команды:
```bash
# Просмотр логов
docker-compose logs -f unlock-app

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Статус
docker-compose ps

# Вход в контейнер
docker exec -it unlocklingua-app bash
```

### Управление контейнером:
```bash
# Перезапуск приложения
docker-compose restart unlock-app

# Обновление (пересборка)
docker-compose up --build -d

# Полная пересборка
docker-compose down
docker-compose up --build -d

# Просмотр ресурсов
docker stats unlocklingua-app
```

### Проверка здоровья:
```bash
# Проверка API
curl http://localhost:8000/health

# Проверка фронтенда
curl http://localhost:3000

# Проверка логов
docker-compose logs unlock-app --tail=50
```

---

## 🆘 РЕШЕНИЕ ПРОБЛЕМ:

### 1. Контейнер не запускается:
```bash
# Проверьте логи
docker-compose logs unlock-app

# Проверьте статус
docker-compose ps

# Перезапустите
docker-compose down
docker-compose up --build -d
```

### 2. Порты заняты:
```bash
# Проверьте занятые порты
netstat -tlnp | grep :3000
netstat -tlnp | grep :8000

# Измените порты в docker-compose.yml
# Например: "3001:3000" вместо "3000:3000"
```

### 3. Проблемы с правами:
```bash
# Проверьте права на папку данных
ls -la backend/data/

# Установите правильные права
chmod 755 backend/data
```

### 4. Нехватка места:
```bash
# Очистите неиспользуемые образы
docker system prune -a

# Проверьте использование места
docker system df
```

---

## 🔧 НАСТРОЙКА ПРОИЗВОДИТЕЛЬНОСТИ:

### Увеличение ресурсов:
```yaml
# В docker-compose.yml добавьте:
services:
  unlock-app:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'
```

### Настройка Nginx:
```bash
# Вход в контейнер
docker exec -it unlocklingua-app bash

# Редактирование конфигурации Nginx
nano /etc/nginx/sites-available/default

# Перезапуск Nginx
nginx -s reload
```

---

## 📁 СТРУКТУРА ПРОЕКТА:
```
unlocklingua-deploy/
├── dist/                    # Готовый фронтенд
├── backend/                 # Бэкенд приложение
├── docker-compose.yml       # Docker Compose конфигурация
├── Dockerfile              # Docker образ с Nginx
├── docker-deploy.sh        # Скрипт Docker развертывания
├── quick-deploy.sh         # Универсальный скрипт
├── start_production.sh     # Скрипт ручного запуска
├── env.production         # Переменные окружения
├── .dockerignore          # Игнорируемые файлы
└── README.md              # Документация
```

---

## 🎯 ПРЕИМУЩЕСТВА DOCKER РАЗВЕРТЫВАНИЯ:

- ✅ **Изоляция**: Приложение работает в изолированной среде
- ✅ **Портативность**: Работает на любом сервере с Docker
- ✅ **Масштабируемость**: Легко масштабировать и обновлять
- ✅ **Надежность**: Автоматический перезапуск при сбоях
- ✅ **Простота**: Один скрипт для полного развертывания
- ✅ **Nginx**: Оптимизированная раздача статических файлов

**ВСЕ ГОТОВО ДЛЯ DOCKER РАЗВЕРТЫВАНИЯ! 🐳**
