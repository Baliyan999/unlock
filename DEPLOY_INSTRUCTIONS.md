# 🚀 Инструкция по развертыванию UnlockLingua

## ✅ Готовый билд создан!

Файл: `unlocklingua-ready.tar.gz` (5.0 MB)

## 📋 Пошаговая инструкция:

### 1. Загрузите архив на сервер
```bash
# Скопируйте файл unlocklingua-ready.tar.gz на ваш сервер
scp unlocklingua-ready.tar.gz user@your-server:/path/to/deployment/
```

### 2. На сервере - распакуйте архив
```bash
# Подключитесь к серверу
ssh user@your-server

# Перейдите в папку развертывания
cd /path/to/deployment/

# Распакуйте архив
tar -xzf unlocklingua-ready.tar.gz

# Перейдите в папку проекта
cd unlocklingua/
```

### 3. Запустите развертывание
```bash
# Сделайте скрипт исполняемым
chmod +x quick-deploy.sh

# Запустите автоматическое развертывание
./quick-deploy.sh
```

### 4. Готово! 🎉

После успешного развертывания ваш сайт будет доступен по адресу:
- **Frontend**: `http://your-domain.com:3000`
- **Backend API**: `http://your-domain.com:8000`
- **Админка**: `https://your-domain.com/admin`

## 🔐 Данные для входа в админку:
- **Email**: `albert.baliyan.666@gmail.com`
- **Пароль**: `25788752Albert`

## 📋 Полезные команды на сервере:

```bash
# Просмотр логов
docker-compose logs -f unlock-app

# Остановка сервиса
docker-compose down

# Перезапуск сервиса
docker-compose restart

# Проверка статуса
docker-compose ps

# Проверка API
curl http://localhost:8000/health
```

## 🆘 Если что-то пошло не так:

1. **Проверьте логи**:
   ```bash
   docker-compose logs unlock-app
   ```

2. **Перезапустите контейнеры**:
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

3. **Проверьте права доступа**:
   ```bash
   ls -la backend/data/
   chmod 755 backend/data
   ```

## 🔧 Что включено в билд:

- ✅ Готовый фронтенд (dist/)
- ✅ Настроенный бэкенд
- ✅ Автоматическая инициализация БД
- ✅ Ваши данные для админки
- ✅ Безопасный SECRET_KEY
- ✅ Docker конфигурация
- ✅ Скрипты развертывания

## 📞 Поддержка:

Если возникли проблемы, проверьте:
1. Логи контейнера: `docker-compose logs unlock-app`
2. Статус контейнеров: `docker-compose ps`
3. Доступность API: `curl http://localhost:8000/health`

---

**Удачного развертывания! 🎉**
