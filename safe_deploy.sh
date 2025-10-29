#!/bin/bash

# Безопасное развертывание с автоматическим бэкапом
# Использование: ./safe_deploy.sh

set -e

echo "🚀 Безопасное развертывание UnlockLingua..."

# 1. Создаем бэкап базы данных
echo "📦 Создаем бэкап базы данных..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="./backend/data/unlocklingua_backup_${TIMESTAMP}.db"

if [ -f "./backend/data/unlocklingua.db" ]; then
    cp "./backend/data/unlocklingua.db" "$BACKUP_FILE"
    echo "✅ Бэкап создан: $BACKUP_FILE"
else
    echo "⚠️ База данных не найдена в ./backend/data/"
fi

# 2. Останавливаем контейнеры
echo "⏹️ Останавливаем контейнеры..."
docker-compose down

# 3. Обновляем код (если нужно)
echo "📥 Обновляем код..."
# git pull  # Раскомментируйте, если используете git

# 4. Пересобираем и запускаем
echo "🔨 Пересобираем и запускаем..."
docker-compose up --build -d

# 5. Проверяем, что все работает
echo "🔍 Проверяем сервисы..."
sleep 10

# Проверяем API
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ API работает"
else
    echo "❌ API не отвечает"
fi

# Проверяем фронтенд
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Фронтенд работает"
else
    echo "❌ Фронтенд не отвечает"
fi

echo "🎉 Развертывание завершено!"
echo "📊 Бэкап базы: $BACKUP_FILE"
echo "🌐 Сайт: http://localhost:3000"
echo "🔧 API: http://localhost:8000"
