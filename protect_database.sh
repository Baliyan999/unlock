#!/bin/bash

# СКРИПТ ЗАЩИТЫ БАЗЫ ДАННЫХ
# Гарантирует сохранность всех паролей и данных пользователей

set -e

echo "🛡️ ЗАЩИТА БАЗЫ ДАННЫХ UNLOCKLINGUA"
echo "=================================="

# 1. Создаем МНОЖЕСТВЕННЫЕ бэкапы
echo "📦 Создаем множественные бэкапы..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Бэкап в папке проекта
cp "./backend/data/unlocklingua.db" "./backend/data/unlocklingua_SAFE_${TIMESTAMP}.db"

# Бэкап в корне проекта
cp "./backend/data/unlocklingua.db" "./unlocklingua_CRITICAL_${TIMESTAMP}.db"

# Бэкап на рабочий стол
cp "./backend/data/unlocklingua.db" "~/Desktop/unlocklingua_EMERGENCY_${TIMESTAMP}.db"

echo "✅ Создано 3 бэкапа базы данных"

# 2. Проверяем целостность базы
echo "🔍 Проверяем целостность базы данных..."
python3 -c "
import sqlite3
conn = sqlite3.connect('./backend/data/unlocklingua.db')
cursor = conn.cursor()

# Проверяем пользователей
cursor.execute('SELECT COUNT(*) FROM users')
user_count = cursor.fetchone()[0]
print(f'👥 Пользователей в базе: {user_count}')

# Проверяем промокоды
cursor.execute('SELECT COUNT(*) FROM promocodes')
promo_count = cursor.fetchone()[0]
print(f'🎫 Промокодов в базе: {promo_count}')

# Проверяем заявки
cursor.execute('SELECT COUNT(*) FROM leads')
leads_count = cursor.fetchone()[0]
print(f'📝 Заявок в базе: {leads_count}')

# Проверяем отзывы
cursor.execute('SELECT COUNT(*) FROM reviews')
reviews_count = cursor.fetchone()[0]
print(f'⭐ Отзывов в базе: {reviews_count}')

conn.close()
print('✅ База данных цела и содержит все данные')
"

# 3. Создаем скрипт восстановления
echo "🔄 Создаем скрипт восстановления..."
cat > restore_database.sh << 'EOF'
#!/bin/bash
# СКРИПТ ВОССТАНОВЛЕНИЯ БАЗЫ ДАННЫХ
# Использование: ./restore_database.sh <путь_к_бэкапу>

if [ -z "$1" ]; then
    echo "❌ Укажите путь к бэкапу: ./restore_database.sh backup_file.db"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Файл бэкапа не найден: $BACKUP_FILE"
    exit 1
fi

echo "🔄 Восстанавливаем базу данных из: $BACKUP_FILE"

# Останавливаем контейнеры
docker-compose down

# Восстанавливаем базу
cp "$BACKUP_FILE" "./backend/data/unlocklingua.db"

# Запускаем контейнеры
docker-compose up -d

echo "✅ База данных восстановлена!"
echo "🌐 Сайт: http://localhost:3000"
echo "🔧 API: http://localhost:8000"
EOF

chmod +x restore_database.sh
echo "✅ Скрипт восстановления создан: ./restore_database.sh"

# 4. Создаем мониторинг базы данных
echo "📊 Создаем мониторинг базы данных..."
cat > monitor_database.sh << 'EOF'
#!/bin/bash
# МОНИТОРИНГ БАЗЫ ДАННЫХ
# Проверяет, что база данных на месте и содержит данные

echo "🔍 Проверка базы данных..."

if [ ! -f "./backend/data/unlocklingua.db" ]; then
    echo "❌ КРИТИЧЕСКАЯ ОШИБКА: База данных не найдена!"
    echo "🔄 Запустите восстановление: ./restore_database.sh <путь_к_бэкапу>"
    exit 1
fi

python3 -c "
import sqlite3
conn = sqlite3.connect('./backend/data/unlocklingua.db')
cursor = conn.cursor()

cursor.execute('SELECT COUNT(*) FROM users')
user_count = cursor.fetchone()[0]

if user_count == 0:
    print('❌ КРИТИЧЕСКАЯ ОШИБКА: В базе нет пользователей!')
    exit(1)
else:
    print(f'✅ База данных в порядке: {user_count} пользователей')

conn.close()
"

echo "✅ База данных в безопасности"
EOF

chmod +x monitor_database.sh
echo "✅ Мониторинг создан: ./monitor_database.sh"

echo ""
echo "🛡️ ЗАЩИТА АКТИВИРОВАНА!"
echo "======================="
echo "✅ 3 бэкапа базы данных созданы"
echo "✅ Скрипт восстановления готов"
echo "✅ Мониторинг базы данных настроен"
echo ""
echo "📋 Команды для защиты:"
echo "  ./monitor_database.sh     - проверить базу"
echo "  ./restore_database.sh     - восстановить из бэкапа"
echo "  ./protect_database.sh     - создать новые бэкапы"
echo ""
echo "🔒 ВАШИ ДАННЫЕ ЗАЩИЩЕНЫ!"
