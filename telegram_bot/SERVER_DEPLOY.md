# 🚀 Деплой бота на сервер Germany

## 📋 Информация о сервере

- **IP**: 209.38.208.251
- **Пользователь**: root
- **SSH ключ**: ~/Desktop/ssh-germany-server
- **Сайт**: /opt/docker/unlock
- **Бот**: /opt/docker/unlock-bot

## 🔑 Подключение к серверу

```bash
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251
```

## 📁 Подготовка директории

```bash
# Создаем директорию для бота
mkdir -p /opt/docker/unlock-bot
cd /opt/docker/unlock-bot
```

## 📤 Загрузка файлов бота

### Вариант 1: Через scp (с локального компьютера)

```bash
# Из директории сайта выполните:
cd /Users/baliyan99/Desktop/сайт

# Загружаем файлы бота на сервер
scp -i ~/Desktop/ssh-germany-server -r telegram_bot/* root@209.38.208.251:/opt/docker/unlock-bot/
```

### Вариант 2: Через git (на сервере)

```bash
# На сервере
cd /opt/docker/unlock-bot
git clone <your-repo-url> .
# Или загрузите файлы другим способом
```

## ⚙️ Настройка на сервере

### 1. Создание .env файла

```bash
# На сервере
cd /opt/docker/unlock-bot
nano .env
```

Содержимое `.env`:
```env
BOT_TOKEN=8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY
LOG_LEVEL=INFO
```

### 2. Установка Docker (если не установлен)

```bash
# Проверяем, установлен ли Docker
docker --version

# Если не установлен, устанавливаем
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Устанавливаем Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 3. Запуск бота

```bash
# Делаем скрипт исполняемым
chmod +x deploy.sh

# Запускаем деплой
./deploy.sh deploy
```

## 🔧 Альтернативный запуск (без скрипта)

```bash
# Собираем и запускаем контейнер
docker-compose up -d --build

# Проверяем статус
docker-compose ps
```

## 📊 Управление ботом

```bash
# Переходим в директорию бота
cd /opt/docker/unlock-bot

# Команды управления
./deploy.sh start      # Запустить
./deploy.sh stop       # Остановить
./deploy.sh restart    # Перезапустить
./deploy.sh status     # Статус
./deploy.sh logs       # Логи
```

## 🔍 Проверка работы

```bash
# Проверяем статус контейнера
docker-compose ps

# Смотрим логи
docker-compose logs -f

# Проверяем, что бот отвечает
curl "https://api.telegram.org/bot8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY/getMe"
```

## 🛡️ Настройка автозапуска

```bash
# Создаем systemd сервис
tee /etc/systemd/system/unlock-bot.service > /dev/null <<EOF
[Unit]
Description=Unlock Telegram Bot
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/docker/unlock-bot
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Включаем автозапуск
systemctl daemon-reload
systemctl enable unlock-bot.service
systemctl start unlock-bot.service
```

## 📋 Полная последовательность команд

```bash
# 1. Подключаемся к серверу
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251

# 2. Создаем директорию
mkdir -p /opt/docker/unlock-bot
cd /opt/docker/unlock-bot

# 3. Загружаем файлы (выполнить с локального компьютера)
# scp -i ~/Desktop/ssh-germany-server -r telegram_bot/* root@209.38.208.251:/opt/docker/unlock-bot/

# 4. Создаем .env файл
echo "BOT_TOKEN=8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY" > .env
echo "LOG_LEVEL=INFO" >> .env

# 5. Устанавливаем Docker (если нужно)
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 6. Запускаем бота
chmod +x deploy.sh
./deploy.sh deploy

# 7. Проверяем статус
./deploy.sh status
```

## 🔧 Устранение неполадок

### Бот не запускается

```bash
# Проверяем логи
docker-compose logs

# Проверяем .env файл
cat .env

# Проверяем токен
curl "https://api.telegram.org/bot8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY/getMe"
```

### Проблемы с правами

```bash
# Исправляем права
chmod +x deploy.sh manage.sh
chown -R root:root /opt/docker/unlock-bot
```

## 📞 Мониторинг

```bash
# Статус сервиса
systemctl status unlock-bot

# Логи сервиса
journalctl -u unlock-bot -f

# Логи контейнера
docker-compose logs -f
```

## 🎯 Результат

После успешного деплоя:
- ✅ Бот работает на сервере 209.38.208.251
- ✅ Автозапуск при перезагрузке
- ✅ Логирование и мониторинг
- ✅ Простое управление через скрипты

