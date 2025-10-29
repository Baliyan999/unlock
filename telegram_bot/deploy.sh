#!/bin/bash

# Скрипт деплоя Telegram бота Unlock на сервер

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции для вывода
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

# Проверка переменных окружения
check_env() {
    if [ ! -f ".env" ]; then
        error "Файл .env не найден!"
        info "Создайте файл .env с токеном бота:"
        info "BOT_TOKEN=your_bot_token_here"
        info "LOG_LEVEL=INFO"
        exit 1
    fi
    
    source .env
    
    if [ -z "$BOT_TOKEN" ]; then
        error "BOT_TOKEN не найден в .env файле!"
        exit 1
    fi
    
    log "✅ Переменные окружения проверены"
}

# Установка Docker (если не установлен)
install_docker() {
    if ! command -v docker &> /dev/null; then
        warning "Docker не установлен. Устанавливаю..."
        
        # Обновляем пакеты
        sudo apt-get update
        
        # Устанавливаем Docker
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        
        # Добавляем пользователя в группу docker
        sudo usermod -aG docker $USER
        
        # Устанавливаем Docker Compose
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        
        log "✅ Docker установлен"
        warning "⚠️  Перезайдите в систему для применения изменений группы docker"
    else
        log "✅ Docker уже установлен"
    fi
}

# Создание systemd сервиса
create_systemd_service() {
    info "Создаю systemd сервис для автозапуска..."
    
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

    sudo systemctl daemon-reload
    sudo systemctl enable unlock-bot.service
    
    log "✅ Systemd сервис создан и включен"
}

# Деплой бота
deploy_bot() {
    log "🚀 Начинаю деплой бота..."
    
    # Останавливаем старые контейнеры
    docker-compose down 2>/dev/null || true
    
    # Собираем и запускаем новый контейнер
    docker-compose up -d --build
    
    # Ждем запуска
    sleep 10
    
    # Проверяем статус
    if docker-compose ps | grep -q "unlock-bot.*Up"; then
        log "✅ Бот успешно запущен!"
        info "Статус: $(docker-compose ps)"
    else
        error "❌ Ошибка при запуске бота"
        info "Логи: docker-compose logs"
        exit 1
    fi
}

# Показать статус
show_status() {
    log "📊 Статус бота:"
    docker-compose ps
    
    log "📋 Логи бота:"
    docker-compose logs --tail=20
}

# Показать помощь
show_help() {
    echo "Скрипт деплоя Telegram бота Unlock"
    echo ""
    echo "Использование: $0 [команда]"
    echo ""
    echo "Команды:"
    echo "  deploy     - Полный деплой бота"
    echo "  start      - Запустить бота"
    echo "  stop       - Остановить бота"
    echo "  restart    - Перезапустить бота"
    echo "  status     - Показать статус"
    echo "  logs       - Показать логи"
    echo "  update     - Обновить бота"
    echo "  install    - Установить Docker и создать сервис"
    echo "  help       - Показать эту справку"
    echo ""
}

# Основная логика
case "${1:-help}" in
    deploy)
        check_env
        install_docker
        create_systemd_service
        deploy_bot
        show_status
        ;;
    start)
        docker-compose up -d
        show_status
        ;;
    stop)
        docker-compose down
        log "Бот остановлен"
        ;;
    restart)
        docker-compose restart
        show_status
        ;;
    status)
        show_status
        ;;
    logs)
        docker-compose logs -f
        ;;
    update)
        check_env
        deploy_bot
        show_status
        ;;
    install)
        install_docker
        create_systemd_service
        log "Установка завершена. Запустите: $0 deploy"
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

