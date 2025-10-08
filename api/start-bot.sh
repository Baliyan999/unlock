#!/bin/bash

# Telegram Bot Startup Script
# This script starts the Telegram bot with the new token

echo "🤖 Запуск Telegram бота UNLOCK..."

# Set the new bot token
export TELEGRAM_BOT_TOKEN="8482483021:AAHeXNwoKj_GufU6Wz8bvUhwOaj3nn08Z1c"
export VITE_TELEGRAM_BOT_TOKEN="8482483021:AAHeXNwoKj_GufU6Wz8bvUhwOaj3nn08Z1c"

# Set admin chat IDs
export TELEGRAM_CHAT_ID="718997850,5928219129,972247940"
export VITE_TELEGRAM_CHAT_IDS="718997850,5928219129,972247940"

echo "✅ Токен установлен: ${TELEGRAM_BOT_TOKEN:0:10}..."
echo "✅ Админские чаты: ${TELEGRAM_CHAT_ID}"

# Start the bot
node telegram-bot.js
