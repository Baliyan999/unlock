#!/bin/bash

# Скрипт для поиска продакшн базы данных на сервере
# Использование: ./find_production_db.sh user@server.com

if [ -z "$1" ]; then
    echo "❌ Укажите адрес сервера: ./find_production_db.sh user@server.com"
    exit 1
fi

SERVER="$1"
echo "🔍 Поиск базы данных на сервере: $SERVER"

echo ""
echo "📋 Проверяем возможные расположения..."

# 1. Проверяем Docker контейнеры
echo "🐳 Проверяем Docker контейнеры..."
ssh $SERVER "docker ps --format 'table {{.Names}}\t{{.Status}}' | grep -i unlock || echo 'Контейнеры Unlock не найдены'"

echo ""
echo "📁 Ищем файлы .db на сервере..."
ssh $SERVER "find /home -name '*.db' -type f 2>/dev/null | head -10"
ssh $SERVER "find /opt -name '*.db' -type f 2>/dev/null | head -10"
ssh $SERVER "find /var -name '*.db' -type f 2>/dev/null | head -10"

echo ""
echo "🔍 Ищем папки с проектом Unlock..."
ssh $SERVER "find /home -name '*unlock*' -type d 2>/dev/null | head -10"
ssh $SERVER "find /opt -name '*unlock*' -type d 2>/dev/null | head -10"

echo ""
echo "📊 Проверяем размеры файлов .db (возможно, база с пользователями будет больше)..."
ssh $SERVER "find /home -name '*.db' -type f -exec ls -lh {} \; 2>/dev/null | sort -k5 -hr | head -10"

echo ""
echo "💡 Если нашли базу данных, скачайте её командой:"
echo "   scp $SERVER:/path/to/database.db ./production_database.db"
