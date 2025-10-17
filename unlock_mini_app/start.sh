#!/bin/bash

# UNLOCK Telegram Mini App - Запуск
echo "🎌 Запуск UNLOCK Telegram Mini App..."

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js и попробуйте снова."
    exit 1
fi

# Проверка npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен. Установите npm и попробуйте снова."
    exit 1
fi

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

# Проверка конфигурации
echo "⚙️ Проверка конфигурации..."
if [ ! -f "config.js" ]; then
    echo "❌ Файл config.js не найден!"
    exit 1
fi

# Запуск бота
echo "🚀 Запуск Telegram бота..."
echo "📱 Токен бота: $(grep BOT_TOKEN config.js | cut -d"'" -f2 | cut -c1-10)..."
echo "🌐 Web App URL: $(grep WEB_APP_URL config.js | cut -d"'" -f2)"

# Запуск в фоновом режиме
nohup node bot.js > bot.log 2>&1 &
BOT_PID=$!

echo "✅ Бот запущен с PID: $BOT_PID"
echo "📋 Логи бота: bot.log"
echo ""
echo "🎯 Для остановки бота выполните: kill $BOT_PID"
echo "📊 Для просмотра логов: tail -f bot.log"
echo ""
echo "🎌 UNLOCK Telegram Mini App успешно запущен!"
echo "📱 Найдите вашего бота в Telegram и отправьте /start"
