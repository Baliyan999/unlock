# Настройка переменных окружения

## Создание .env файла

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_admin_chat_id_here

# Contact Information (from website)
PHONE_PRIMARY=+998772686886
PHONE_SECONDARY=+998337170228
WHATSAPP_NUMBER=+998337170228
EMAIL=unlocklingua@gmail.com
ADDRESS=улица Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж

# Social Media Links
TELEGRAM_BOT_USERNAME=test_my_assistant_123_bot
INSTAGRAM_URL=https://www.instagram.com/unlock.lingua/
YOUTUBE_VIDEO_ID=-TXh2rrNshI

# API Configuration
API_PORT=3001
DATABASE_URL=./api/db/reviews.db

# Email Configuration (for lead form)
RESEND_API_KEY=your_resend_api_key_here
LEADS_EMAIL_TO=unlocklingua@gmail.com

# Analytics
GA_ID=your_google_analytics_id_here

# Development
NODE_ENV=development
```

## Как получить токен Telegram-бота

1. Напишите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Введите имя бота (например: "UNLOCK Reviews Bot")
4. Введите username бота (например: "unlock_reviews_bot")
5. Скопируйте полученный токен и вставьте в `.env` файл

## Как получить Chat ID администратора

1. Напишите вашему боту
2. Отправьте любое сообщение
3. Откройте в браузере: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Найдите `"chat":{"id":` - это и есть ваш Chat ID

## Запуск без бота (для тестирования)

Если у вас пока нет токена бота, можете запустить только API:

```bash
cd api
npm run test
```

Это запустит API сервер без Telegram-бота.

## Запуск с ботом

После настройки .env файла:

```bash
cd api
npm install
npm start
```

## Проверка работы

1. **API**: http://localhost:3001/health
2. **Отзывы**: http://localhost:3001/api/reviews
3. **Бот**: Напишите боту в Telegram

## Troubleshooting

### Бот не отвечает
- Проверьте токен в .env файле
- Убедитесь, что бот запущен
- Проверьте логи: `npm run dev`

### API не работает
- Проверьте порт 3001
- Убедитесь, что база данных создана
- Проверьте права доступа к файлам

### Ошибки базы данных
- Удалите файл `api/db/reviews.db`
- Перезапустите API
- База создастся автоматически
