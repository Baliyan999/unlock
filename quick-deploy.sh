#!/bin/bash

# Быстрое развертывание UnlockLingua на сервере
# Использование: ./quick-deploy.sh

set -e

echo "🚀 Быстрое развертывание UnlockLingua..."

# Проверяем, что мы в правильной директории
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Ошибка: docker-compose.yml не найден. Запустите скрипт из корневой директории проекта."
    exit 1
fi

# Останавливаем существующие контейнеры
echo "🛑 Остановка существующих контейнеров..."
docker-compose down || true

# Создаем папку для данных базы данных
echo "📁 Создание папки для базы данных..."
mkdir -p backend/data
chmod 755 backend/data

# Копируем переменные окружения
echo "⚙️  Настройка переменных окружения..."
if [ ! -f ".env" ]; then
    cp env.production .env
    echo "✅ Скопированы переменные окружения из env.production"
else
    echo "✅ Файл .env уже существует"
fi

# Собираем и запускаем контейнеры
echo "🔨 Сборка и запуск контейнеров..."
docker-compose up --build -d

# Ждем запуска сервиса
echo "⏳ Ожидание запуска сервиса..."
sleep 15

# Проверяем статус
echo "🔍 Проверка статуса сервиса..."
if docker-compose ps | grep -q "unlock-app.*Up"; then
    echo "✅ Сервис успешно запущен!"
else
    echo "❌ Ошибка: сервис не запустился"
    echo "📋 Логи контейнера:"
    docker-compose logs unlock-app
    exit 1
fi

# Проверяем доступность API
echo "🌐 Проверка доступности API..."
sleep 5
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ API доступен!"
else
    echo "⚠️  API недоступен, но контейнер запущен. Проверьте логи:"
    echo "docker-compose logs unlock-app"
fi

echo ""
echo "🎉 Развертывание завершено!"
echo ""
echo "🔐 Данные для входа в админку:"
echo "  Email: albert.baliyan.666@gmail.com"
echo "  Пароль: 25788752Albert"
echo ""
echo "🌐 Ваш сайт доступен по адресу:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo "  Админка: https://your-domain.com/admin"
echo ""
echo "📋 Полезные команды:"
echo "  Просмотр логов: docker-compose logs -f unlock-app"
echo "  Остановка: docker-compose down"
echo "  Перезапуск: docker-compose restart"
echo "  Статус: docker-compose ps"
