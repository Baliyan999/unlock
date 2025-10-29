# 🚀 Деплой Telegram бота Unlock на сервер

## 📋 Требования

- **ОС**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **RAM**: Минимум 512MB
- **Диск**: Минимум 1GB свободного места
- **Сеть**: Доступ к интернету

## 🛠️ Быстрый деплой

### 1. Подготовка сервера

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем необходимые пакеты
sudo apt install -y curl git
```

### 2. Загрузка бота на сервер

```bash
# Клонируем репозиторий или загружаем файлы
git clone <your-repo-url> unlock-bot
cd unlock-bot/telegram_bot

# Или загружаем файлы через scp/sftp
```

### 3. Настройка переменных окружения

```bash
# Создаем файл .env
nano .env
```

Содержимое `.env`:
```env
BOT_TOKEN=8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY
LOG_LEVEL=INFO
```

### 4. Автоматический деплой

```bash
# Делаем скрипт исполняемым
chmod +x deploy.sh

# Запускаем полный деплой
./deploy.sh deploy
```

## 🔧 Ручной деплой

### 1. Установка Docker

```bash
# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавляем пользователя в группу docker
sudo usermod -aG docker $USER

# Устанавливаем Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезаходим в систему
exit
# (заходим обратно)
```

### 2. Запуск бота

```bash
# Собираем и запускаем контейнер
docker-compose up -d --build

# Проверяем статус
docker-compose ps
```

### 3. Настройка автозапуска

```bash
# Создаем systemd сервис
sudo tee /etc/systemd/system/unlock-bot.service > /dev/null <<EOF
[Unit]
Description=Unlock Telegram Bot
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Включаем автозапуск
sudo systemctl daemon-reload
sudo systemctl enable unlock-bot.service
```

## 📊 Управление ботом

### Команды скрипта deploy.sh

```bash
./deploy.sh start      # Запустить бота
./deploy.sh stop       # Остановить бота
./deploy.sh restart    # Перезапустить бота
./deploy.sh status     # Показать статус
./deploy.sh logs       # Показать логи
./deploy.sh update     # Обновить бота
```

### Docker команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление
docker-compose pull
docker-compose up -d --build
```

### Systemd команды

```bash
# Запуск сервиса
sudo systemctl start unlock-bot

# Остановка сервиса
sudo systemctl stop unlock-bot

# Статус сервиса
sudo systemctl status unlock-bot

# Отключение автозапуска
sudo systemctl disable unlock-bot
```

## 🔍 Мониторинг

### Проверка работы бота

```bash
# Проверяем статус контейнера
docker-compose ps

# Смотрим логи
docker-compose logs --tail=50

# Проверяем системный сервис
sudo systemctl status unlock-bot
```

### Логи

```bash
# Логи бота
docker-compose logs -f unlock-bot

# Логи системы
sudo journalctl -u unlock-bot -f
```

## 🛡️ Безопасность

### Firewall

```bash
# Настраиваем UFW (если используется)
sudo ufw allow ssh
sudo ufw enable
```

### Обновления

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Обновляем Docker образы
docker-compose pull
docker-compose up -d
```

## 🔧 Устранение неполадок

### Бот не запускается

```bash
# Проверяем логи
docker-compose logs

# Проверяем .env файл
cat .env

# Проверяем токен бота
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe"
```

### Проблемы с Docker

```bash
# Перезапускаем Docker
sudo systemctl restart docker

# Очищаем старые контейнеры
docker system prune -a
```

### Проблемы с правами

```bash
# Исправляем права на файлы
sudo chown -R $USER:$USER .
chmod +x deploy.sh manage.sh
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `./deploy.sh logs`
2. Проверьте статус: `./deploy.sh status`
3. Убедитесь, что токен бота правильный
4. Проверьте доступность интернета

## 🎯 Результат

После успешного деплоя:

- ✅ Бот запущен и работает
- ✅ Автозапуск при перезагрузке сервера
- ✅ Логирование всех событий
- ✅ Мониторинг состояния
- ✅ Простое управление через скрипты

