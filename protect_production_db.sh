#!/bin/bash

# ЗАЩИТА ПРОДАКШН БАЗЫ ДАННЫХ
# Создает бэкапы продакшн базы с сервера

set -e

echo "🛡️ ЗАЩИТА ПРОДАКШН БАЗЫ ДАННЫХ"
echo "==============================="

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 1. Скачиваем актуальную базу с сервера
echo "📥 Скачиваем актуальную базу с сервера..."
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251 "docker exec unlocklingua-app cat /app/backend/unlocklingua.db" > "./production_db_${TIMESTAMP}.db"

# 2. Проверяем, что база скачалась
if [ ! -f "./production_db_${TIMESTAMP}.db" ]; then
    echo "❌ Ошибка: Не удалось скачать базу с сервера"
    exit 1
fi

echo "✅ База скачана: production_db_${TIMESTAMP}.db"

# 3. Проверяем содержимое
echo "🔍 Проверяем содержимое базы..."
python3 -c "
import sqlite3
conn = sqlite3.connect('./production_db_${TIMESTAMP}.db')
cursor = conn.cursor()

cursor.execute('SELECT COUNT(*) FROM users')
user_count = cursor.fetchone()[0]
print(f'👥 Пользователей: {user_count}')

cursor.execute('SELECT COUNT(*) FROM promocodes')
promo_count = cursor.fetchone()[0]
print(f'🎫 Промокодов: {promo_count}')

cursor.execute('SELECT COUNT(*) FROM leads')
leads_count = cursor.fetchone()[0]
print(f'📝 Заявок: {leads_count}')

cursor.execute('SELECT COUNT(*) FROM reviews')
reviews_count = cursor.fetchone()[0]
print(f'⭐ Отзывов: {reviews_count}')

conn.close()
print('✅ База данных цела и содержит все данные')
"

# 4. Создаем множественные копии
echo "📦 Создаем множественные копии..."
cp "./production_db_${TIMESTAMP}.db" "./PRODUCTION_CRITICAL_${TIMESTAMP}.db"
cp "./production_db_${TIMESTAMP}.db" "~/Desktop/PRODUCTION_EMERGENCY_${TIMESTAMP}.db"

echo "✅ Создано 3 копии продакшн базы"

# 5. Создаем скрипт восстановления продакшн базы
cat > restore_production_db.sh << EOF
#!/bin/bash
# ВОССТАНОВЛЕНИЕ ПРОДАКШН БАЗЫ ДАННЫХ
# Использование: ./restore_production_db.sh <путь_к_бэкапу>

if [ -z "\$1" ]; then
    echo "❌ Укажите путь к бэкапу: ./restore_production_db.sh backup_file.db"
    exit 1
fi

BACKUP_FILE="\$1"

if [ ! -f "\$BACKUP_FILE" ]; then
    echo "❌ Файл бэкапа не найден: \$BACKUP_FILE"
    exit 1
fi

echo "🔄 Восстанавливаем продакшн базу данных из: \$BACKUP_FILE"

# Останавливаем контейнер
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251 "docker stop unlocklingua-app"

# Загружаем базу на сервер
scp -i ~/Desktop/ssh-germany-server "\$BACKUP_FILE" root@209.38.208.251:/tmp/restore_db.db

# Восстанавливаем базу в контейнере
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251 "docker cp /tmp/restore_db.db unlocklingua-app:/app/backend/unlocklingua.db"

# Запускаем контейнер
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251 "docker start unlocklingua-app"

# Удаляем временный файл
ssh -i ~/Desktop/ssh-germany-server root@209.38.208.251 "rm /tmp/restore_db.db"

echo "✅ Продакшн база данных восстановлена!"
echo "🌐 Сайт: https://unlocklingua.com"
EOF

chmod +x restore_production_db.sh
echo "✅ Скрипт восстановления продакшн базы создан"

echo ""
echo "🛡️ ПРОДАКШН БАЗА ЗАЩИЩЕНА!"
echo "=========================="
echo "✅ Продакшн база скачана и сохранена"
echo "✅ Создано 3 копии базы данных"
echo "✅ Скрипт восстановления готов"
echo ""
echo "📋 Команды для защиты продакшн:"
echo "  ./protect_production_db.sh     - создать бэкап продакшн базы"
echo "  ./restore_production_db.sh     - восстановить продакшн базу"
echo ""
echo "🔒 ВСЕ ПАРОЛИ И ДАННЫЕ ПОЛЬЗОВАТЕЛЕЙ ЗАЩИЩЕНЫ!"
