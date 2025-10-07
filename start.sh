#!/bin/bash

echo "🚀 Запуск системы UNLOCK..."
echo ""

# Останавливаем все предыдущие процессы
echo "🛑 Остановка предыдущих процессов..."
pkill -f "node.*telegram-bot" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Ждем немного
sleep 2

# Запускаем API сервер
echo "🌐 Запуск API сервера..."
cd api
node server.js &
API_PID=$!

# Ждем запуска API
sleep 3

# Запускаем Telegram бота
echo "🤖 Запуск Telegram бота..."
node telegram-bot.js &
BOT_PID=$!

# Возвращаемся в корень и запускаем сайт
cd ..
echo "🌐 Запуск сайта..."
npm run dev &
SITE_PID=$!

echo ""
echo "✅ ВСЯ СИСТЕМА ЗАПУЩЕНА!"
echo "📡 API сервер: http://localhost:3001"
echo "🤖 Telegram бот: активен"
echo "🌐 Сайт: http://localhost:5173"
echo ""
echo "🛑 Для остановки нажмите Ctrl+C"
echo ""

# Обработка завершения
trap 'echo ""; echo "🛑 Остановка системы..."; kill $API_PID $BOT_PID $SITE_PID 2>/dev/null; echo "✅ Система остановлена"; exit 0' INT

# Ждем
wait

