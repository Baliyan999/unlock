#!/bin/bash

# Скрипт для загрузки бота на сервер Germany

set -e

# Настройки сервера
SERVER_IP="209.38.208.251"
SERVER_USER="root"
SSH_KEY="$HOME/Desktop/ssh-germany-server"
SERVER_PATH="/opt/docker/unlock-bot"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Проверка SSH ключа
check_ssh_key() {
    if [ ! -f "$SSH_KEY" ]; then
        error "SSH ключ не найден: $SSH_KEY"
        exit 1
    fi
    log "✅ SSH ключ найден"
}

# Проверка подключения к серверу
check_connection() {
    log "🔍 Проверяю подключение к серверу..."
    if ssh -i "$SSH_KEY" -o ConnectTimeout=10 -o BatchMode=yes "$SERVER_USER@$SERVER_IP" "echo 'Connection successful'" 2>/dev/null; then
        log "✅ Подключение к серверу успешно"
    else
        error "❌ Не удается подключиться к серверу"
        exit 1
    fi
}

# Создание директории на сервере
create_server_directory() {
    log "📁 Создаю директорию на сервере..."
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH"
    log "✅ Директория создана: $SERVER_PATH"
}

# Загрузка файлов
upload_files() {
    log "📤 Загружаю файлы бота на сервер..."
    
    # Список файлов для загрузки
    FILES=(
        "bot.py"
        "config.py"
        "start.py"
        "requirements.txt"
        "Dockerfile"
        "docker-compose.yml"
        "deploy.sh"
        "manage.sh"
        ".dockerignore"
        "README.md"
        "DEPLOYMENT.md"
        "SERVER_DEPLOY.md"
    )
    
    # Загружаем каждый файл
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            log "📄 Загружаю: $file"
            scp -i "$SSH_KEY" "$file" "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"
        else
            warning "⚠️  Файл не найден: $file"
        fi
    done
    
    log "✅ Файлы загружены"
}

# Создание .env файла на сервере
create_env_file() {
    log "⚙️  Создаю .env файл на сервере..."
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cat > $SERVER_PATH/.env << 'EOF'
BOT_TOKEN=8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY
LOG_LEVEL=INFO
EOF"
    log "✅ .env файл создан"
}

# Установка Docker на сервере
install_docker() {
    log "🐳 Проверяю Docker на сервере..."
    
    if ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "docker --version" 2>/dev/null; then
        log "✅ Docker уже установлен"
    else
        log "📦 Устанавливаю Docker..."
        ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "
            curl -fsSL https://get.docker.com -o get-docker.sh
            sh get-docker.sh
            curl -L 'https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)' -o /usr/local/bin/docker-compose
            chmod +x /usr/local/bin/docker-compose
        "
        log "✅ Docker установлен"
    fi
}

# Запуск бота
start_bot() {
    log "🚀 Запускаю бота на сервере..."
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "
        cd $SERVER_PATH
        chmod +x deploy.sh manage.sh
        ./deploy.sh deploy
    "
    log "✅ Бот запущен"
}

# Проверка статуса
check_status() {
    log "📊 Проверяю статус бота..."
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "
        cd $SERVER_PATH
        ./deploy.sh status
    "
}

# Показать помощь
show_help() {
    echo "Скрипт загрузки Telegram бота Unlock на сервер"
    echo ""
    echo "Использование: $0 [команда]"
    echo ""
    echo "Команды:"
    echo "  upload     - Загрузить файлы на сервер"
    echo "  deploy     - Полный деплой (загрузка + запуск)"
    echo "  start      - Запустить бота на сервере"
    echo "  stop       - Остановить бота на сервере"
    echo "  restart    - Перезапустить бота на сервере"
    echo "  status     - Проверить статус бота"
    echo "  logs       - Показать логи бота"
    echo "  help       - Показать эту справку"
    echo ""
    echo "Настройки сервера:"
    echo "  IP: $SERVER_IP"
    echo "  Пользователь: $SERVER_USER"
    echo "  Путь: $SERVER_PATH"
    echo ""
}

# Основная логика
case "${1:-help}" in
    upload)
        check_ssh_key
        check_connection
        create_server_directory
        upload_files
        create_env_file
        log "✅ Загрузка завершена!"
        ;;
    deploy)
        check_ssh_key
        check_connection
        create_server_directory
        upload_files
        create_env_file
        install_docker
        start_bot
        check_status
        log "🎉 Деплой завершен!"
        ;;
    start)
        check_ssh_key
        ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && ./deploy.sh start"
        ;;
    stop)
        check_ssh_key
        ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && ./deploy.sh stop"
        ;;
    restart)
        check_ssh_key
        ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && ./deploy.sh restart"
        ;;
    status)
        check_ssh_key
        check_status
        ;;
    logs)
        check_ssh_key
        ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "cd $SERVER_PATH && ./deploy.sh logs"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Неизвестная команда: $1"
        show_help
        exit 1
        ;;
esac
