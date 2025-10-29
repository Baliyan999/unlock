#!/bin/bash

# Скрипт управления Telegram ботом Unlock

BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$BOT_DIR/venv"
PID_FILE="$BOT_DIR/bot.pid"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
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

# Проверка виртуального окружения
check_venv() {
    if [ ! -d "$VENV_DIR" ]; then
        error "Виртуальное окружение не найдено!"
        info "Создаю виртуальное окружение..."
        python3 -m venv "$VENV_DIR"
        if [ $? -ne 0 ]; then
            error "Не удалось создать виртуальное окружение"
            exit 1
        fi
    fi
    
    if [ ! -f "$VENV_DIR/bin/activate" ]; then
        error "Файл активации виртуального окружения не найден!"
        exit 1
    fi
}

# Установка зависимостей
install_deps() {
    log "Устанавливаю зависимости..."
    source "$VENV_DIR/bin/activate"
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        error "Не удалось установить зависимости"
        exit 1
    fi
    log "Зависимости установлены успешно!"
}

# Запуск бота
start_bot() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        warning "Бот уже запущен (PID: $(cat $PID_FILE))"
        return 0
    fi
    
    check_venv
    
    if [ ! -f ".env" ]; then
        error "Файл .env не найден!"
        info "Создайте файл .env с токеном бота:"
        info "BOT_TOKEN=your_bot_token_here"
        exit 1
    fi
    
    log "Запускаю бота..."
    source "$VENV_DIR/bin/activate"
    nohup python start.py > bot.log 2>&1 &
    echo $! > "$PID_FILE"
    
    sleep 2
    
    if kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        log "Бот запущен успешно! (PID: $(cat $PID_FILE))"
        info "Логи: tail -f bot.log"
    else
        error "Не удалось запустить бота"
        rm -f "$PID_FILE"
        exit 1
    fi
}

# Остановка бота
stop_bot() {
    if [ ! -f "$PID_FILE" ]; then
        warning "PID файл не найден. Бот может быть не запущен."
        return 0
    fi
    
    PID=$(cat "$PID_FILE")
    
    if ! kill -0 "$PID" 2>/dev/null; then
        warning "Процесс с PID $PID не найден"
        rm -f "$PID_FILE"
        return 0
    fi
    
    log "Останавливаю бота (PID: $PID)..."
    kill "$PID"
    
    # Ждем завершения процесса
    for i in {1..10}; do
        if ! kill -0 "$PID" 2>/dev/null; then
            log "Бот остановлен успешно!"
            rm -f "$PID_FILE"
            return 0
        fi
        sleep 1
    done
    
    warning "Принудительно завершаю процесс..."
    kill -9 "$PID" 2>/dev/null
    rm -f "$PID_FILE"
    log "Бот остановлен!"
}

# Перезапуск бота
restart_bot() {
    log "Перезапускаю бота..."
    stop_bot
    sleep 2
    start_bot
}

# Статус бота
status_bot() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        log "Бот запущен (PID: $(cat $PID_FILE))"
        info "Время работы: $(ps -o etime= -p $(cat $PID_FILE) 2>/dev/null || echo 'неизвестно')"
    else
        warning "Бот не запущен"
        rm -f "$PID_FILE"
    fi
}

# Просмотр логов
logs_bot() {
    if [ -f "bot.log" ]; then
        tail -f bot.log
    else
        warning "Файл логов не найден"
    fi
}

# Показать помощь
show_help() {
    echo "Управление Telegram ботом Unlock"
    echo ""
    echo "Использование: $0 [команда]"
    echo ""
    echo "Команды:"
    echo "  start     - Запустить бота"
    echo "  stop      - Остановить бота"
    echo "  restart   - Перезапустить бота"
    echo "  status    - Показать статус бота"
    echo "  logs      - Показать логи бота"
    echo "  install   - Установить зависимости"
    echo "  help      - Показать эту справку"
    echo ""
}

# Основная логика
case "${1:-help}" in
    start)
        start_bot
        ;;
    stop)
        stop_bot
        ;;
    restart)
        restart_bot
        ;;
    status)
        status_bot
        ;;
    logs)
        logs_bot
        ;;
    install)
        check_venv
        install_deps
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

