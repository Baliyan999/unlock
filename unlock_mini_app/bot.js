const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

// Initialize bot
const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// Bot commands and handlers
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  const welcomeMessage = `
🎌 Добро пожаловать в UNLOCK, ${firstName}!

Изучайте китайский язык с нами:
• Подготовка к HSK 1-6
• Разговорная практика  
• Онлайн и офлайн занятия
• Группы и индивидуально

Выберите действие:`;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🏠 Главная', web_app: { url: `${config.WEB_APP_URL}/` } },
          { text: '💰 Калькулятор', web_app: { url: `${config.WEB_APP_URL}/calculator` } }
        ],
        [
          { text: '📝 Тест уровня', web_app: { url: `${config.WEB_APP_URL}/test` } },
          { text: '📚 Блог', web_app: { url: `${config.WEB_APP_URL}/blog` } }
        ],
        [
          { text: '👨‍🏫 Преподаватели', web_app: { url: `${config.WEB_APP_URL}/teachers` } },
          { text: '⭐ Отзывы', web_app: { url: `${config.WEB_APP_URL}/reviews` } }
        ],
        [
          { text: '📞 Контакты', callback_data: 'contacts' },
          { text: '📋 Записаться', web_app: { url: `${config.WEB_APP_URL}/form` } }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, keyboard);
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;

  if (data === 'contacts') {
    const contactsMessage = `
📞 Контакты UNLOCK:

📱 Телефон: ${config.SCHOOL_PHONE}
💬 Telegram: ${config.SCHOOL_TELEGRAM}
📍 Адрес: ${config.SCHOOL_ADDRESS}

🕒 Время работы:
Пн-Пт: 9:00 - 21:00
Сб-Вс: 10:00 - 18:00

Напишите нам в Telegram для записи на пробный урок!`;

    bot.sendMessage(chatId, contactsMessage);
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// Handle web app data
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const chatId = msg.chat.id;
    const data = JSON.parse(msg.web_app_data.data);
    
    if (data.type === 'lead_form') {
      const leadMessage = `
✅ Заявка получена!

Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
Уровень: ${data.level}
Формат: ${data.format}
Комментарий: ${data.comment}

Мы свяжемся с вами в ближайшее время!`;
      
      bot.sendMessage(chatId, leadMessage);
      
      // Отправляем уведомление администратору
      const adminMessage = `
🆕 Новая заявка из мини-приложения:

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}
📧 Email: ${data.email}
📊 Уровень: ${data.level}
📚 Формат: ${data.format}
💬 Комментарий: ${data.comment}
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
      
      // Здесь можно добавить отправку уведомления администратору
      console.log('New lead:', adminMessage);
    }
  }
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
🤖 Команды бота UNLOCK:

/start - Главное меню
/help - Эта справка
/contacts - Контактная информация
/price - Информация о ценах

🌐 Мини-приложение:
Используйте кнопки в меню для доступа к полному функционалу сайта UNLOCK.

📞 Поддержка: ${config.SCHOOL_TELEGRAM}`;

  bot.sendMessage(chatId, helpMessage);
});

// Price command
bot.onText(/\/price/, (msg) => {
  const chatId = msg.chat.id;
  const priceMessage = `
💰 Цены на курсы UNLOCK:

📚 Групповые занятия:
• HSK 1-6: от 500 000 сум/мес
• 8-12 уроков в месяц
• 80 минут каждый урок

👤 Индивидуальные занятия:
• 2 200 000 сум/мес
• 12 уроков в месяц
• 60 минут каждый урок

⚡ Интенсивный курс:
• Обсуждается с преподавателем

🎫 Промокоды:
• WELCOME10 - скидка 10%
• STUDENT15 - скидка 15%
• VIP20 - скидка 20%

Используйте калькулятор для точного расчета!`;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🧮 Калькулятор стоимости', web_app: { url: `${config.WEB_APP_URL}/calculator` } }]
      ]
    }
  };

  bot.sendMessage(chatId, priceMessage, keyboard);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

// Bot startup message
console.log(`🚀 UNLOCK Telegram Bot запущен!`);
console.log(`📱 Bot Token: ${config.BOT_TOKEN.substring(0, 10)}...`);
console.log(`🌐 Web App URL: ${config.WEB_APP_URL}`);
console.log(`📱 Бот: @Unlock_lingua_bot`);
console.log(`🌐 Веб-приложение: http://localhost:3001`);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});
