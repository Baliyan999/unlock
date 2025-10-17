#!/bin/bash

# UNLOCK Telegram Mini App - Управление

case "$1" in
    start)
        echo "🚀 Запуск UNLOCK Telegram Mini App..."
        cd "$(dirname "$0")"
        
        # Запуск бота
        nohup node bot.js > bot.log 2>&1 &
        BOT_PID=$!
        echo $BOT_PID > bot.pid
        echo "✅ Бот запущен с PID: $BOT_PID"
        
        # Запуск веб-сервера
        nohup node web-server.js > web.log 2>&1 &
        WEB_PID=$!
        echo $WEB_PID > web.pid
        echo "✅ Веб-сервер запущен с PID: $WEB_PID"
        
        echo "🌐 Веб-приложение: http://localhost:3001"
        echo "📱 Бот: @Unlock_lingua_bot"
        echo "📋 Логи бота: tail -f bot.log"
        echo "📋 Логи веб-сервера: tail -f web.log"
        ;;
        
    stop)
        echo "🛑 Остановка UNLOCK Telegram Mini App..."
        cd "$(dirname "$0")"
        
        # Остановка бота
        if [ -f bot.pid ]; then
            BOT_PID=$(cat bot.pid)
            kill $BOT_PID 2>/dev/null
            rm bot.pid
            echo "✅ Бот остановлен"
        fi
        
        # Остановка веб-сервера
        if [ -f web.pid ]; then
            WEB_PID=$(cat web.pid)
            kill $WEB_PID 2>/dev/null
            rm web.pid
            echo "✅ Веб-сервер остановлен"
        fi
        
        # Дополнительная очистка
        pkill -f "node bot.js" 2>/dev/null
        pkill -f "node web-server.js" 2>/dev/null
        ;;
        
    restart)
        echo "🔄 Перезапуск UNLOCK Telegram Mini App..."
        $0 stop
        sleep 2
        $0 start
        ;;
        
    status)
        echo "📊 Статус UNLOCK Telegram Mini App:"
        cd "$(dirname "$0")"
        
        # Проверка бота
        if [ -f bot.pid ]; then
            BOT_PID=$(cat bot.pid)
            if ps -p $BOT_PID > /dev/null 2>&1; then
                echo "✅ Бот: работает (PID: $BOT_PID)"
            else
                echo "❌ Бот: не работает"
            fi
        else
            echo "❌ Бот: не запущен"
        fi
        
        # Проверка веб-сервера
        if [ -f web.pid ]; then
            WEB_PID=$(cat web.pid)
            if ps -p $WEB_PID > /dev/null 2>&1; then
                echo "✅ Веб-сервер: работает (PID: $WEB_PID)"
            else
                echo "❌ Веб-сервер: не работает"
            fi
        else
            echo "❌ Веб-сервер: не запущен"
        fi
        
        # Проверка доступности
        if curl -s http://localhost:3001 > /dev/null 2>&1; then
            echo "✅ Веб-приложение: доступно на http://localhost:3001"
        else
            echo "❌ Веб-приложение: недоступно"
        fi
        ;;
        
    logs)
        echo "📋 Логи UNLOCK Telegram Mini App:"
        cd "$(dirname "$0")"
        
        case "$2" in
            bot)
                tail -f bot.log
                ;;
            web)
                tail -f web.log
                ;;
            *)
                echo "Использование: $0 logs [bot|web]"
                echo "  bot - логи бота"
                echo "  web - логи веб-сервера"
                ;;
        esac
        ;;
        
    test)
        echo "🧪 Тестирование UNLOCK Telegram Mini App..."
        cd "$(dirname "$0")"
        
        # Тест бота
        echo "📱 Тестирование бота..."
        BOT_RESPONSE=$(curl -s "https://api.telegram.org/bot8482483021:AAHeXNwoKj_GufU6Wz8bvUhwOaj3nn08Z1c/getMe")
        if echo "$BOT_RESPONSE" | grep -q '"ok":true'; then
            echo "✅ Бот: работает"
        else
            echo "❌ Бот: ошибка"
        fi
        
        # Тест веб-сервера
        echo "🌐 Тестирование веб-сервера..."
        if curl -s http://localhost:3001 > /dev/null 2>&1; then
            echo "✅ Веб-сервер: работает"
        else
            echo "❌ Веб-сервер: не работает"
        fi
        
        # Тест страниц
        echo "📄 Тестирование страниц..."
        for page in "" calculator form test blog reviews; do
            if curl -s "http://localhost:3001/$page" > /dev/null 2>&1; then
                echo "✅ Страница /$page: доступна"
            else
                echo "❌ Страница /$page: недоступна"
            fi
        done
        ;;
        
    *)
        echo "🎌 UNLOCK Telegram Mini App - Управление"
        echo ""
        echo "Использование: $0 {start|stop|restart|status|logs|test}"
        echo ""
        echo "Команды:"
        echo "  start   - Запустить бота и веб-сервер"
        echo "  stop    - Остановить бота и веб-сервер"
        echo "  restart - Перезапустить все сервисы"
        echo "  status  - Показать статус сервисов"
        echo "  logs    - Показать логи (bot|web)"
        echo "  test    - Протестировать все компоненты"
        echo ""
        echo "Примеры:"
        echo "  $0 start"
        echo "  $0 status"
        echo "  $0 logs bot"
        echo "  $0 test"
        ;;
esac
