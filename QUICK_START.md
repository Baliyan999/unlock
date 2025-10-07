# 🚀 Быстрый запуск системы UNLOCK

## ⚡ Автоматический запуск (рекомендуется)

### **Вариант 1: Один скрипт**
```bash
cd /Users/baliyan99/Desktop/сайт
node start-everything.js
```

### **Вариант 2: Bash скрипт**
```bash
cd /Users/baliyan99/Desktop/сайт
./start.sh
```

### **Вариант 3: Ручной запуск**
```bash
# Терминал 1: API + Бот
cd /Users/baliyan99/Desktop/сайт/api
node server.js &
node telegram-bot.js &

# Терминал 2: Сайт
cd /Users/baliyan99/Desktop/сайт
npm run dev
```

## 🌐 Что запустится:

- **📡 API сервер**: http://localhost:3001
- **🤖 Telegram бот**: активен
- **🌐 Сайт**: http://localhost:5173

## ✅ Проверка работы:

1. **Откройте сайт**: http://localhost:5173
2. **Проверьте отзывы**: должны загружаться автоматически
3. **Протестируйте бота**: отправьте `/start` в Telegram

## 🛑 Остановка:

Нажмите `Ctrl+C` в терминале

## 🔧 Если что-то не работает:

```bash
# Остановить все процессы
pkill -f "node.*telegram-bot"
pkill -f "node.*server"
pkill -f "vite"

# Запустить заново
node start-everything.js
```

## 📋 Что происходит автоматически:

1. **API сервер** запускается первым
2. **Telegram бот** подключается к API
3. **Сайт** загружает отзывы из API
4. **Все работает** без дополнительных действий

