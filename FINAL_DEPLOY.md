# 🚀 ФИНАЛЬНЫЙ БИЛД ДЛЯ РАЗВЕРТЫВАНИЯ

## 📦 Готовый архив: `unlocklingua-final.tar.gz` (2.1 MB)

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
cd unlocklingua/

# Запустите развертывание
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### 3. Готово! 🎉

---

## 🔐 ДАННЫЕ ДЛЯ АДМИНКИ:
- **URL**: `https://your-domain.com/admin`
- **Email**: `albert.baliyan.666@gmail.com`
- **Пароль**: `25788752Albert`

---

## 📋 ПОЛЕЗНЫЕ КОМАНДЫ НА СЕРВЕРЕ:

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

---

**ВСЕ ГОТОВО ДЛЯ ЗАГРУЗКИ! 🎉**

