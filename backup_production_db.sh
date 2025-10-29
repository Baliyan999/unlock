#!/bin/bash

# Скрипт для работы с продакшн базой данных
# Использование: ./backup_production_db.sh [server_user@server_host]

echo "🔍 Поиск продакшн базы данных..."

# Если переданы параметры подключения к серверу
if [ ! -z "$1" ]; then
    SERVER="$1"
    echo "📡 Подключение к серверу: $SERVER"
    
    # Создаем папку для бэкапа
    mkdir -p backend/production_backups
    BACKUP_NAME="production_db_$(date +%Y%m%d_%H%M%S).db"
    
    echo "📥 Скачивание базы данных с сервера..."
    
    # Проверяем путь в Docker контейнере
    ssh $SERVER "docker exec unlocklingua-app cat /app/backend/data/unlocklingua.db" > "backend/production_backups/$BACKUP_NAME" 2>/dev/null || \
    ssh $SERVER "docker exec unlocklingua-app cat /app/backend/unlocklingua.db" > "backend/production_backups/$BACKUP_NAME" 2>/dev/null || \
    ssh $SERVER "cat backend/data/unlocklingua.db" > "backend/production_backups/$BACKUP_NAME" 2>/dev/null || \
    ssh $SERVER "cat backend/unlocklingua.db" > "backend/production_backups/$BACKUP_NAME"
    
    if [ -f "backend/production_backups/$BACKUP_NAME" ] && [ -s "backend/production_backups/$BACKUP_NAME" ]; then
        echo "✅ База данных успешно скачана: backend/production_backups/$BACKUP_NAME"
        echo ""
        echo "📋 Следующие шаги:"
        echo "1. Запустите скрипт добавления промокода:"
        echo "   cd backend && source venv/bin/activate"
        echo "   python3 -c \"from database import get_db; from models import Promocode; from datetime import datetime, timedelta; db = next(get_db()); p = Promocode(code='UNLOCK100', discount_percent=100, is_active=True, status='active', usage_limit=1000, expires_at=datetime.now() + timedelta(days=365)); db.add(p); db.commit(); print('✅ Промокод добавлен')\""
        echo ""
        echo "2. Загрузите обновленную базу обратно на сервер:"
        echo "   scp backend/production_backups/$BACKUP_NAME $SERVER:~/unlocklingua.db.backup"
    else
        echo "❌ Не удалось скачать базу данных"
        echo "💡 Возможные пути базы на сервере:"
        echo "   - /app/backend/data/unlocklingua.db (в Docker контейнере)"
        echo "   - /app/backend/unlocklingua.db (в Docker контейнере)"
        echo "   - ~/unlock/backend/data/unlocklingua.db (на хосте)"
        echo "   - ~/unlock/backend/unlocklingua.db (на хосте)"
    fi
else
    echo "📋 Инструкция по работе с продакшн базой данных"
    echo ""
    echo "🔍 База данных на сервере может находиться в:"
    echo "   1. В Docker контейнере: /app/backend/data/unlocklingua.db"
    echo "   2. На хосте: backend/data/unlocklingua.db"
    echo ""
    echo "📥 Чтобы скачать базу с сервера:"
    echo "   ./backup_production_db.sh user@server.com"
    echo ""
    echo "📤 Чтобы загрузить базу на сервер:"
    echo "   scp backend/production_backups/your_backup.db user@server.com:~/unlocklingua.db"
    echo ""
    echo "🔧 Чтобы добавить промокод прямо на сервере:"
    echo "   ssh user@server.com"
    echo "   cd ~/unlock/backend"
    echo "   docker exec -it unlocklingua-app bash"
    echo "   cd /app/backend"
    echo "   python3 -c \"from database import get_db; from models import Promocode; from datetime import datetime, timedelta; db = next(get_db()); p = Promocode(code='UNLOCK100', discount_percent=100, is_active=True, status='active', usage_limit=1000, expires_at=datetime.now() + timedelta(days=365)); db.add(p); db.commit(); print('✅ Промокод добавлен')\""
fi

