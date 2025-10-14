#!/bin/bash

# Docker развертывание UnlockLingua
# Использование: ./docker-deploy.sh

set -e

echo "🐳 Docker развертывание UnlockLingua..."

# Проверяем, что мы в правильной директории
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Ошибка: docker-compose.yml не найден. Запустите скрипт из корневой директории проекта."
    exit 1
fi

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Ошибка: Docker не установлен"
    echo "Установите Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Проверяем наличие Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Ошибка: Docker Compose не установлен"
    echo "Установите Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

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

# Останавливаем существующие контейнеры
echo "🛑 Остановка существующих контейнеров..."
docker-compose down || true

# Удаляем старые образы (опционально)
echo "🧹 Очистка старых образов..."
docker image prune -f || true

# Собираем и запускаем контейнеры
echo "🔨 Сборка и запуск контейнеров..."
docker-compose up --build -d

# Ждем запуска сервиса
echo "⏳ Ожидание запуска сервиса..."
sleep 20

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
sleep 10
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ API доступен!"
else
    echo "⚠️  API недоступен, но контейнер запущен. Проверьте логи:"
    echo "docker-compose logs unlock-app"
fi

# Проверяем доступность фронтенда
echo "🎨 Проверка доступности фронтенда..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Фронтенд доступен!"
else
    echo "⚠️  Фронтенд недоступен. Проверьте логи:"
    echo "docker-compose logs unlock-app"
fi

echo ""
echo "🎉 Docker развертывание завершено!"
echo ""
echo "🔐 Данные для входа в админку:"
echo "  Email: albert.baliyan.666@gmail.com"
echo "  Пароль: 25788752Albert"
echo ""
echo "🌐 Ваш сайт доступен по адресу:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo "  Админка: http://localhost:8000/admin"
echo ""
echo "📋 Полезные команды:"
echo "  Просмотр логов: docker-compose logs -f unlock-app"
echo "  Остановка: docker-compose down"
echo "  Перезапуск: docker-compose restart"
echo "  Статус: docker-compose ps"
echo "  Вход в контейнер: docker exec -it unlocklingua-app bash"
echo ""
echo "🔧 Управление контейнером:"
echo "  Перезапуск: docker-compose restart unlock-app"
echo "  Обновление: docker-compose up --build -d"
echo "  Полная пересборка: docker-compose down && docker-compose up --build -d"
