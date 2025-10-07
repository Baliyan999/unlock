require('dotenv').config({ path: '../.env' });
const TelegramBot = require('node-telegram-bot-api');
const { createReview, updateReviewStatus, getReviewsForAdmin, getReviewsByStatus, deleteReview } = require('./reviews');
const { 
  initPromoCodesDatabase, 
  createPromoCode, 
  getAllPromoCodes, 
  deactivatePromoCode, 
  deletePromoCode, 
  getPromoCodesStats,
  generatePromoCode 
} = require('./promo-codes');

// Получаем токен и chat IDs из переменных окружения
const BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_IDS = process.env.VITE_TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID;

console.log('🔍 Проверка конфигурации Telegram бота:');
console.log('Token:', BOT_TOKEN ? 'Found' : 'Not found');
console.log('Chat IDs:', ADMIN_CHAT_IDS);

// Инициализация бота
let bot = null;

if (BOT_TOKEN) {
  try {
    bot = new TelegramBot(BOT_TOKEN, { polling: true });
    console.log('🤖 Telegram бот инициализирован');
    
    // Инициализация базы данных промокодов
    initPromoCodesDatabase();
    
    console.log('🤖 Telegram бот запущен...');
  } catch (error) {
    console.error('❌ Ошибка инициализации бота:', error.message);
    bot = null;
  }
} else {
  console.log('⚠️ TELEGRAM_BOT_TOKEN не установлен. Бот не будет работать.');
  console.log('📝 Установите TELEGRAM_BOT_TOKEN в переменных окружения для работы бота.');
}

// Хранилище состояний пользователей
const userStates = new Map();

// Главная клавиатура
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📝 Оставить отзыв' }],
      [{ text: 'ℹ️ Информация о курсах' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Админская клавиатура
const adminKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📝 Оставить отзыв' }],
      [{ text: 'ℹ️ Информация о курсах' }],
      [{ text: '👨‍💼 Панель админа' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Главная админская панель
const adminPanelKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📋 Все об отзывах' }, { text: '🎫 Промокоды' }],
      [{ text: '🔙 Назад в главное меню' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Клавиатура для отзывов
const reviewsKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📋 Все отзывы' }, { text: '⏳ На модерации' }],
      [{ text: '✅ Одобренные' }, { text: '❌ Отклоненные' }],
      [{ text: '📊 Статистика' }, { text: '👑 Студенты' }],
      [{ text: '🔙 Назад в админ-панель' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Клавиатура для промокодов
const promoCodesKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '➕ Создать промокод' }, { text: '📋 Все промокоды' }],
      [{ text: '📊 Статистика промокодов' }],
      [{ text: '🔙 Назад в админ-панель' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Обработка команд
if (bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    // Проверяем, является ли пользователь админом
    const adminChatIds = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()) : [];
    const isAdmin = adminChatIds.includes(chatId.toString());
    
    console.log(`👤 Новый пользователь: ${msg.from.first_name} ${msg.from.last_name || ''} (@${msg.from.username || 'no_username'}) ${isAdmin ? '(АДМИН)' : ''}`);
    
    if (isAdmin) {
      bot.sendMessage(chatId, 
        `👋 Привет, ${msg.from.first_name}!\n\n` +
        `Добро пожаловать в бот UNLOCK! 🎓\n\n` +
        `Вы вошли как администратор! 👨‍💼\n\n` +
        `Доступные функции:\n` +
        `📝 Оставить отзыв о курсах\n` +
        `ℹ️ Получить информацию о программах\n` +
        `👨‍💼 Панель админа (управление отзывами)\n\n` +
        `Выберите действие:`,
        adminKeyboard
      );
    } else {
      bot.sendMessage(chatId, 
        `👋 Привет, ${msg.from.first_name}!\n\n` +
        `Добро пожаловать в бот UNLOCK! 🎓\n\n` +
        `Здесь вы можете:\n` +
        `📝 Оставить отзыв о курсах\n` +
        `ℹ️ Получить информацию о программах\n\n` +
        `Выберите действие:`,
        mainKeyboard
      );
    }
  });

  // Обработка текстовых сообщений
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;

    // Проверяем, является ли пользователь админом
    const adminChatIds = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()) : [];
    const isAdmin = adminChatIds.includes(chatId.toString());

    if (text === '📝 Оставить отзыв') {
      userStates.set(userId, { state: 'waiting_for_text' });
      bot.sendMessage(chatId, 
        '📝 Пожалуйста, напишите ваш отзыв о курсах китайского языка UNLOCK:\n\n' +
        'Расскажите о вашем опыте обучения, что вам понравилось, какие результаты вы получили.'
      );
    } else if (text === '👨‍💼 Панель админа') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `👨‍💼 Панель администратора\n\n` +
          `Добро пожаловать в админ-панель! Здесь вы можете:\n\n` +
          `📋 Все об отзывах - управление отзывами и модерация\n` +
          `🎫 Промокоды - создание и управление промокодами\n\n` +
          `Выберите раздел:`,
          adminPanelKeyboard
        );
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📋 Все об отзывах') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `📋 Управление отзывами\n\n` +
          `Здесь вы можете:\n\n` +
          `📋 Все отзывы - просмотреть все отзывы\n` +
          `⏳ На модерации - отзывы, ожидающие одобрения\n` +
          `✅ Одобренные - опубликованные отзывы\n` +
          `❌ Отклоненные - отклоненные отзывы\n` +
          `📊 Статистика - общая статистика по отзывам\n` +
          `👑 Студенты - отзывы от студентов UNLOCK\n\n` +
          `Выберите действие:`,
          reviewsKeyboard
        );
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📋 Все отзывы') {
      if (isAdmin) {
        console.log('📋 Админ запросил все отзывы');
        // Получаем все отзывы из базы данных
        getReviewsForAdmin().then(reviews => {
          console.log('📋 Получены отзывы из БД:', reviews.length);
          if (reviews.length === 0) {
            bot.sendMessage(chatId, '📋 Отзывов пока нет.');
            return;
          }
          
          let message = `📋 Все отзывы (${reviews.length}):\n\n`;
          reviews.slice(0, 10).forEach((review, index) => {
            const status = review.status === 'approved' ? '✅' : review.status === 'rejected' ? '❌' : '⏳';
            const student = review.is_student ? '👑' : '👤';
            message += `${index + 1}. ${status} ${student} ${review.first_name} ${review.last_name || ''}\n`;
            message += `   ⭐ ${review.rating}/5 | ${review.created_at}\n`;
            message += `   📝 ${review.text.substring(0, 50)}...\n\n`;
          });
          
          if (reviews.length > 10) {
            message += `... и еще ${reviews.length - 10} отзывов`;
          }
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения отзывов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении отзывов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '⏳ На модерации') {
      if (isAdmin) {
        // Получаем отзывы на модерации
        getReviewsByStatus('pending').then(reviews => {
          if (reviews.length === 0) {
            bot.sendMessage(chatId, '⏳ Отзывов на модерации нет.');
            return;
          }
          
          let message = `⏳ Отзывы на модерации (${reviews.length}):\n\n`;
          reviews.forEach((review, index) => {
            const student = review.is_student ? '👑' : '👤';
            message += `${index + 1}. ${student} ${review.first_name} ${review.last_name || ''}\n`;
            message += `   ⭐ ${review.rating}/5 | ${review.created_at}\n`;
            message += `   📝 ${review.text.substring(0, 50)}...\n\n`;
          });
          
          // Добавляем инструкции для модерации
          message += `\n\n📝 Для модерации используйте команды:\n`;
          reviews.slice(0, 5).forEach((review, index) => {
            message += `• Одобрить ${index + 1}: /approve_${review.id}\n`;
            message += `• Отклонить ${index + 1}: /reject_${review.id}\n`;
            message += `• Удалить ${index + 1}: /delete_${review.id}\n`;
            message += `• Подробнее ${index + 1}: /details_${review.id}\n\n`;
          });
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения отзывов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении отзывов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '✅ Одобренные') {
      if (isAdmin) {
        // Получаем одобренные отзывы
        getReviewsByStatus('approved').then(reviews => {
          if (reviews.length === 0) {
            bot.sendMessage(chatId, '✅ Одобренных отзывов нет.');
            return;
          }
          
          let message = `✅ Одобренные отзывы (${reviews.length}):\n\n`;
          reviews.slice(0, 10).forEach((review, index) => {
            const student = review.is_student ? '👑' : '👤';
            message += `${index + 1}. ${student} ${review.first_name} ${review.last_name || ''}\n`;
            message += `   ⭐ ${review.rating}/5 | ${review.created_at}\n`;
            message += `   📝 ${review.text.substring(0, 50)}...\n\n`;
          });
          
          if (reviews.length > 10) {
            message += `... и еще ${reviews.length - 10} отзывов`;
          }
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения отзывов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении отзывов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '❌ Отклоненные') {
      if (isAdmin) {
        // Получаем отклоненные отзывы
        getReviewsByStatus('rejected').then(reviews => {
          if (reviews.length === 0) {
            bot.sendMessage(chatId, '❌ Отклоненных отзывов нет.');
            return;
          }
          
          let message = `❌ Отклоненные отзывы (${reviews.length}):\n\n`;
          reviews.slice(0, 10).forEach((review, index) => {
            const student = review.is_student ? '👑' : '👤';
            message += `${index + 1}. ${student} ${review.first_name} ${review.last_name || ''}\n`;
            message += `   ⭐ ${review.rating}/5 | ${review.created_at}\n`;
            message += `   📝 ${review.text.substring(0, 50)}...\n\n`;
          });
          
          if (reviews.length > 10) {
            message += `... и еще ${reviews.length - 10} отзывов`;
          }
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения отзывов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении отзывов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📊 Статистика') {
      if (isAdmin) {
        // Получаем статистику
        getReviewsForAdmin().then(reviews => {
          const total = reviews.length;
          const pending = reviews.filter(r => r.status === 'pending').length;
          const approved = reviews.filter(r => r.status === 'approved').length;
          const rejected = reviews.filter(r => r.status === 'rejected').length;
          const students = reviews.filter(r => r.is_student).length;
          const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
          
          const message = `📊 Статистика отзывов:\n\n` +
            `📋 Всего отзывов: ${total}\n` +
            `⏳ На модерации: ${pending}\n` +
            `✅ Одобрено: ${approved}\n` +
            `❌ Отклонено: ${rejected}\n` +
            `👑 Студентов: ${students}\n` +
            `⭐ Средняя оценка: ${avgRating}/5\n\n` +
            `📈 Процент одобрения: ${total > 0 ? Math.round((approved / total) * 100) : 0}%`;
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения статистики:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении статистики.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '👑 Студенты') {
      if (isAdmin) {
        // Получаем отзывы студентов
        getReviewsForAdmin().then(reviews => {
          const studentReviews = reviews.filter(r => r.is_student);
          
          if (studentReviews.length === 0) {
            bot.sendMessage(chatId, '👑 Отзывов от студентов пока нет.');
            return;
          }
          
          let message = `👑 Отзывы студентов (${studentReviews.length}):\n\n`;
          studentReviews.slice(0, 10).forEach((review, index) => {
            const status = review.status === 'approved' ? '✅' : review.status === 'rejected' ? '❌' : '⏳';
            message += `${index + 1}. ${status} 👑 ${review.first_name} ${review.last_name || ''}\n`;
            message += `   ⭐ ${review.rating}/5 | ${review.created_at}\n`;
            message += `   📝 ${review.text.substring(0, 50)}...\n\n`;
          });
          
          if (studentReviews.length > 10) {
            message += `... и еще ${studentReviews.length - 10} отзывов от студентов`;
          }
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения отзывов студентов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении отзывов студентов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '🎫 Промокоды') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `🎫 Управление промокодами\n\n` +
          `Здесь вы можете:\n\n` +
          `➕ Создать промокод - создать новый промокод со скидкой\n` +
          `📋 Все промокоды - просмотреть все созданные промокоды\n` +
          `📊 Статистика промокодов - общая статистика по промокодам\n\n` +
          `Выберите действие:`,
          promoCodesKeyboard
        );
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '➕ Создать промокод') {
      if (isAdmin) {
        userStates.set(userId, { state: 'creating_promo_code' });
        bot.sendMessage(chatId, 
          `➕ Создание промокода\n\n` +
          `Введите данные для промокода в следующем формате:\n\n` +
          `КОД СКИДКА% КОЛИЧЕСТВО_ИСПОЛЬЗОВАНИЙ ОПИСАНИЕ\n\n` +
          `Примеры:\n` +
          `• WELCOME10 10 100 Приветственная скидка 10%\n` +
          `• STUDENT20 20 1 Скидка для студентов 20%\n` +
          `• SUMMER15 15 50 Летняя акция 15%\n\n` +
          `Где:\n` +
          `• КОД - уникальный код промокода (только буквы и цифры)\n` +
          `• СКИДКА% - процент скидки (1-100)\n` +
          `• КОЛИЧЕСТВО_ИСПОЛЬЗОВАНИЙ - сколько раз можно использовать (1-999999)\n` +
          `• ОПИСАНИЕ - описание промокода (необязательно)\n\n` +
          `Или введите "AUTO" для автоматической генерации кода.`
        );
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📋 Все промокоды') {
      if (isAdmin) {
        getAllPromoCodes().then(promoCodes => {
          if (promoCodes.length === 0) {
            bot.sendMessage(chatId, '📋 Промокодов пока нет.');
            return;
          }
          
          let message = '📋 Все промокоды:\n\n';
          promoCodes.forEach(promo => {
            const status = promo.is_active ? '✅' : '❌';
            const expires = promo.expires_at ? `\n⏰ Истекает: ${new Date(promo.expires_at).toLocaleDateString('ru-RU')}` : '';
            const description = promo.description ? `\n📝 ${promo.description}` : '';
            
            message += `${status} **${promo.code}**\n` +
                      `💰 Скидка: ${promo.discount_percent}%\n` +
                      `📊 Использовано: ${promo.used_count}/${promo.max_uses}\n` +
                      `👤 Создан: ${promo.created_by_username}\n` +
                      `📅 Дата: ${new Date(promo.created_at).toLocaleDateString('ru-RU')}${expires}${description}\n\n`;
          });
          
          message += `\n💡 Команды для управления:\n` +
                    `• Деактивировать: /deactivate_КОД\n` +
                    `• Удалить: /delete_КОД`;
          
          bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }).catch(error => {
          console.error('Ошибка получения промокодов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении промокодов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📊 Статистика промокодов') {
      if (isAdmin) {
        getPromoCodesStats().then(stats => {
          const message = `📊 Статистика промокодов:\n\n` +
                         `📋 Всего промокодов: ${stats.total}\n` +
                         `✅ Активных: ${stats.active}\n` +
                         `❌ Неактивных: ${stats.inactive}\n` +
                         `⏰ Истекших: ${stats.expired}\n` +
                         `🎯 Всего использований: ${stats.total_uses}`;
          
          bot.sendMessage(chatId, message);
        }).catch(error => {
          console.error('Ошибка получения статистики промокодов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении статистики промокодов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '🔙 Назад в админ-панель') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `👨‍💼 Панель администратора\n\n` +
          `Добро пожаловать в админ-панель! Здесь вы можете:\n\n` +
          `📋 Все об отзывах - управление отзывами и модерация\n` +
          `🎫 Промокоды - создание и управление промокодами\n\n` +
          `Выберите раздел:`,
          adminPanelKeyboard
        );
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '🔙 Назад в главное меню') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `👋 Добро пожаловать в бот UNLOCK! 🎓\n\n` +
          `Вы вошли как администратор! 👨‍💼\n\n` +
          `Доступные функции:\n` +
          `📝 Оставить отзыв о курсах\n` +
          `ℹ️ Получить информацию о программах\n` +
          `👨‍💼 Панель админа (управление отзывами)\n\n` +
          `Выберите действие:`,
          adminKeyboard
        );
      } else {
        bot.sendMessage(chatId, 
          `👋 Добро пожаловать в бот UNLOCK! 🎓\n\n` +
          `Здесь вы можете:\n` +
          `📝 Оставить отзыв о курсах\n` +
          `ℹ️ Получить информацию о программах\n\n` +
          `Выберите действие:`,
          mainKeyboard
        );
      }
    } else if (text === 'ℹ️ Информация о курсах') {
      bot.sendMessage(chatId, 
        '🎓 Информация о курсах UNLOCK:\n\n' +
        '📚 Программы обучения:\n' +
        '• HSK 1-6 (все уровни)\n' +
        '• Разговорный китайский\n' +
        '• Деловой китайский\n\n' +
        '👨‍🏫 Форматы обучения:\n' +
        '• Групповые занятия (до 15 человек)\n' +
        '• Индивидуальные занятия\n' +
        '• Интенсивные курсы\n\n' +
        '🌍 Языки преподавания:\n' +
        '• Русский\n' +
        '• Английский\n' +
        '• Узбекский\n' +
        '• Китайский\n' +
        '• Корейский\n\n' +
        '📞 Контакты:\n' +
        '• Телефон: +998772686886\n' +
        '• WhatsApp: +998337170228\n' +
        '• Email: unlocklingua@gmail.com\n' +
        '• Адрес: ул. Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж\n\n' +
        '🌐 Сайт: https://unlock.uz\n' +
        '📱 Instagram: @unlock.lingua'
      );
    } else if (text.startsWith('/approve_') || text.startsWith('/reject_') || text.startsWith('/delete_') || text.startsWith('/details_')) {
      // Обработка команд модерации
      if (isAdmin) {
        const reviewId = text.split('_')[1];
        const action = text.startsWith('/approve_') ? 'approved' : text.startsWith('/reject_') ? 'rejected' : text.startsWith('/delete_') ? 'deleted' : 'details';
        
        console.log('👨‍💼 Команда модерации:', {
          command: text,
          reviewId: reviewId,
          action: action,
          adminId: userId,
          adminUsername: msg.from.username
        });
        
        if (action === 'details') {
          // Показать подробности отзыва
          (async () => {
          try {
            const { getReviewById } = require('./reviews');
            const review = await getReviewById(reviewId);
            
            if (review) {
              const studentStatus = review.is_student ? '👑 Студент UNLOCK' : '👤 Обычный пользователь';
              const detailedMessage = 
                `👁️ Подробная информация об отзыве #${review.id}\n\n` +
                `👤 Пользователь: ${review.first_name} ${review.last_name || ''}\n` +
                `🆔 ID: ${review.user_id}\n` +
                `📱 Username: @${review.username || 'не указан'}\n` +
                `👑 Статус: ${studentStatus}\n` +
                `🌍 Страна: ${review.country_code || 'не указана'}\n` +
                `🗣️ Язык: ${review.language_code || 'не указан'}\n` +
                `💎 Premium: ${review.is_premium ? 'Да' : 'Нет'}\n` +
                `🤖 Бот: ${review.is_bot ? 'Да' : 'Нет'}\n` +
                `📱 Телефон: ${review.phone_number || 'не указан'}\n` +
                `🏙️ Город: ${review.city || 'не указан'}\n` +
                `🌐 Timezone: ${review.timezone || 'не указан'}\n` +
                `🌐 User Agent: ${review.user_agent || 'не указан'}\n` +
                `🌐 IP: ${review.ip_address || 'не указан'}\n` +
                `🌐 Referrer: ${review.referrer || 'не указан'}\n\n` +
                `📝 Полный текст отзыва:\n"${review.text}"\n\n` +
                `⭐ Оценка: ${review.rating}/5\n` +
                `📅 Создан: ${review.created_at}\n` +
                `📅 Одобрен: ${review.approved_at || 'не одобрен'}\n` +
                `👨‍💼 Админ: ${review.admin_username || 'не указан'}`;
              
              bot.sendMessage(chatId, detailedMessage);
            } else {
              bot.sendMessage(chatId, '❌ Отзыв не найден');
            }
          } catch (error) {
            console.error('Ошибка при получении деталей отзыва:', error);
            bot.sendMessage(chatId, '❌ Ошибка при получении информации об отзыве');
          }
          })();
        } else {
          // Выполнить действие модерации
          (async () => {
          try {
            let result;
            
            if (action === 'deleted') {
              result = await deleteReview(reviewId);
            } else {
              result = await updateReviewStatus(reviewId, action, userId, msg.from.username);
            }
            
            if (result.success || result.deleted) {
              let message;
              if (action === 'approved') {
                message = '✅ Отзыв одобрен и опубликован!';
              } else if (action === 'rejected') {
                message = '❌ Отзыв отклонен';
              } else {
                message = '🗑️ Отзыв удален';
              }
              
              bot.sendMessage(chatId, message);
              console.log(`📝 Отзыв ${reviewId} ${action === 'approved' ? 'одобрен' : action === 'rejected' ? 'отклонен' : 'удален'} админом ${userId}`);
            } else {
              if (result.changes === 0) {
                bot.sendMessage(chatId, '❌ Отзыв не найден или уже обработан');
              } else {
                bot.sendMessage(chatId, '❌ Ошибка при обработке отзыва');
              }
            }
          } catch (error) {
            console.error('Ошибка при обработке админ-действия:', error);
            bot.sendMessage(chatId, '❌ Произошла ошибка при обработке отзыва');
          }
          })();
        }
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text.startsWith('/deactivate_') || text.startsWith('/delete_')) {
      // Обработка команд управления промокодами
      if (isAdmin) {
        const code = text.split('_')[1];
        const action = text.startsWith('/deactivate_') ? 'deactivate' : 'delete';
        
        (async () => {
          try {
            let result;
            if (action === 'deactivate') {
              result = await deactivatePromoCode(code);
            } else {
              result = await deletePromoCode(code);
            }
            
            if (result.success) {
              const actionText = action === 'deactivate' ? 'деактивирован' : 'удален';
              bot.sendMessage(chatId, `✅ Промокод ${code} ${actionText} успешно!`);
              console.log(`🎫 Промокод ${code} ${actionText} админом ${userId}`);
            } else {
              bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
            }
          } catch (error) {
            console.error('Ошибка при управлении промокодом:', error);
            bot.sendMessage(chatId, '❌ Произошла ошибка при управлении промокодом');
          }
        })();
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else {
      const userState = userStates.get(userId);
      
      if (userState && userState.state === 'waiting_for_text') {
        if (text.length < 10) {
          bot.sendMessage(chatId, 'Пожалуйста, напишите более подробный отзыв (минимум 10 символов).');
          return;
        }
        
        // Сохраняем текст отзыва
        userState.text = text;
        userState.state = 'waiting_for_rating';
        userStates.set(userId, userState);
        
        bot.sendMessage(chatId, 
          `Спасибо за отзыв! Теперь отправьте оценку от 1 до 5 (только цифру):\n\n` +
          `1 - очень плохо\n` +
          `2 - плохо\n` +
          `3 - нормально\n` +
          `4 - хорошо\n` +
          `5 - отлично\n\n` +
          `Напишите цифру от 1 до 5:`
        );
      } else if (userState && userState.state === 'waiting_for_rating') {
        // Обработка ввода рейтинга
        const rating = parseInt(text);
        
        if (isNaN(rating) || rating < 1 || rating > 5) {
          bot.sendMessage(chatId, 
            '❌ Пожалуйста, введите только цифру от 1 до 5:\n\n' +
            '1 - очень плохо\n' +
            '2 - плохо\n' +
            '3 - нормально\n' +
            '4 - хорошо\n' +
            '5 - отлично'
          );
          return;
        }
        
        // Сохраняем рейтинг
        userState.rating = rating;
        userState.state = 'waiting_for_student_status';
        userStates.set(userId, userState);
        
        bot.sendMessage(chatId, 
          `✅ Оценка ${rating}/5 принята!\n\nТеперь уточните: являетесь ли вы студентом UNLOCK?\n\n` +
          `Напишите:\n` +
          `• "да" или "yes" - если вы студент UNLOCK\n` +
          `• "нет" или "no" - если вы не студент`
        );
      } else if (userState && userState.state === 'waiting_for_student_status') {
        // Обработка ввода статуса студента
        const textLower = text.toLowerCase().trim();
        let isStudent = null;
        
        if (textLower === 'да' || textLower === 'yes' || textLower === 'д' || textLower === 'y') {
          isStudent = true;
        } else if (textLower === 'нет' || textLower === 'no' || textLower === 'н' || textLower === 'n') {
          isStudent = false;
        } else {
          bot.sendMessage(chatId, 
            '❌ Пожалуйста, напишите "да" или "нет":\n\n' +
            '• "да" или "yes" - если вы студент UNLOCK\n' +
            '• "нет" или "no" - если вы не студент'
          );
          return;
        }
        
        // Сохраняем статус студента
        userState.is_student = isStudent;
        userState.state = 'submitted';
        userStates.set(userId, userState);
        
        // Отправляем сообщение о статусе
        const studentStatus = isStudent ? '👑 студент UNLOCK' : 'обычный пользователь';
        bot.sendMessage(chatId, 
          `✅ Статус: ${studentStatus}\n\n📤 Отправляем отзыв на модерацию...`
        );
        
        // Обрабатываем отправку отзыва
        (async () => {
        try {
          // Собираем максимальную информацию о пользователе
          const userInfo = msg.from;
          
          // Определяем страну по языку
          const countryByLanguage = {
            'ru': 'RU', 'en': 'US', 'uz': 'UZ', 'zh': 'CN', 'ko': 'KR',
            'uk': 'UA', 'kz': 'KZ', 'tr': 'TR', 'de': 'DE', 'fr': 'FR'
          };
          
          const countryCode = countryByLanguage[userInfo.language_code] || 'UNKNOWN';
          
          // Собираем всю доступную информацию
          const reviewData = {
            user_id: userId,
            username: userInfo.username || null,
            first_name: userInfo.first_name || null,
            last_name: userInfo.last_name || null,
            language_code: userInfo.language_code || null,
            is_bot: userInfo.is_bot || false,
            is_premium: userInfo.is_premium || false,
            phone_number: userInfo.phone_number || null,
            country_code: countryCode,
            city: null,
            timezone: null,
            text: userState.text,
            rating: userState.rating,
            user_agent: 'Telegram Bot',
            ip_address: null,
            referrer: 'Telegram Bot',
            is_student: isStudent
          };
          
          console.log('📊 Собранная информация о пользователе:', {
            user_id: reviewData.user_id,
            username: reviewData.username,
            name: `${reviewData.first_name} ${reviewData.last_name}`,
            language: reviewData.language_code,
            country: reviewData.country_code,
            is_premium: reviewData.is_premium,
            is_bot: reviewData.is_bot,
            is_student: reviewData.is_student
          });
          
          // Сохраняем отзыв в базу данных
          console.log('💾 Сохраняем отзыв в базу данных...');
          console.log('💾 Данные для сохранения:', {
            user_id: reviewData.user_id,
            text: reviewData.text.substring(0, 50) + '...',
            rating: reviewData.rating,
            is_student: reviewData.is_student
          });
          
          const review = await createReview(reviewData);
          console.log('✅ Отзыв сохранен в БД с ID:', review.id);
          console.log('✅ Полные данные сохраненного отзыва:', review);
          
          // Отправляем уведомление админам
          const adminChatIds = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()) : [];
          
          console.log('📤 Отправка уведомлений админам:', adminChatIds);
          console.log('📤 ADMIN_CHAT_IDS из .env:', ADMIN_CHAT_IDS);
          
          if (adminChatIds.length > 0) {
            console.log('📤 Начинаем отправку уведомлений...');
            const studentStatus = reviewData.is_student ? '👑 Студент UNLOCK' : '👤 Обычный пользователь';
            const adminMessage = 
              `📝 Новый отзыв для модерации\n\n` +
              `👤 Пользователь: ${reviewData.first_name} ${reviewData.last_name || ''}\n` +
              `🆔 ID: ${reviewData.user_id}\n` +
              `📱 Username: @${reviewData.username || 'не указан'}\n` +
              `👑 Статус: ${studentStatus}\n` +
              `🌍 Страна: ${reviewData.country_code}\n` +
              `🗣️ Язык: ${reviewData.language_code || 'не указан'}\n` +
              `💎 Premium: ${reviewData.is_premium ? 'Да' : 'Нет'}\n` +
              `🤖 Бот: ${reviewData.is_bot ? 'Да' : 'Нет'}\n\n` +
              `📝 Отзыв: ${userState.text}\n` +
              `⭐ Оценка: ${userState.rating}/5\n\n` +
              `🆔 ID отзыва: ${review.id}\n` +
              `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
            
            // Отправляем всем админам
            let successCount = 0;
            let errorCount = 0;
            
            for (const chatId of adminChatIds) {
              try {
                console.log(`📤 Отправка уведомления админу ${chatId}...`);
                const adminMessageWithCommands = adminMessage + 
                  `\n\n📝 Команды для модерации:\n` +
                  `• Одобрить: /approve_${review.id}\n` +
                  `• Отклонить: /reject_${review.id}\n` +
                  `• Удалить: /delete_${review.id}\n` +
                  `• Подробнее: /details_${review.id}`;
                
                await bot.sendMessage(chatId, adminMessageWithCommands);
                console.log(`✅ Уведомление отправлено админу ${chatId}`);
                successCount++;
              } catch (error) {
                console.error(`❌ Ошибка отправки админу ${chatId}:`, error.message);
                errorCount++;
              }
            }
            
            console.log(`📊 Результаты отправки: ✅ ${successCount}, ❌ ${errorCount}`);
            
            // Если ни одно уведомление не отправилось, выводим предупреждение
            if (successCount === 0) {
              console.error('⚠️ ВНИМАНИЕ: Ни одно уведомление администратору не было отправлено!');
              console.error('⚠️ Проверьте настройки TELEGRAM_CHAT_ID в .env файле');
            }
          } else {
            console.error('⚠️ ВНИМАНИЕ: ADMIN_CHAT_IDS не настроен!');
            console.error('⚠️ Установите TELEGRAM_CHAT_ID в .env файле');
          }
          
          // Отправляем финальное сообщение пользователю
          bot.sendMessage(chatId, 
            `✅ Отзыв отправлен на модерацию!\n\n` +
            `📝 Ваш отзыв: "${userState.text}"\n` +
            `⭐ Оценка: ${userState.rating}/5\n` +
            `👑 Статус: ${studentStatus}\n\n` +
            `Спасибо за отзыв! Мы рассмотрим его в ближайшее время.`
          );
          
        } catch (error) {
          console.error('Ошибка при отправке отзыва:', error);
          bot.sendMessage(chatId, '❌ Произошла ошибка при отправке отзыва. Попробуйте позже.');
        }
      }
    } else if (userState && userState.state === 'creating_promo_code') {
      // Обработка создания промокода
      if (isAdmin) {
        const parts = text.trim().split(' ');
        
        if (text.toUpperCase() === 'AUTO') {
          // Автоматическая генерация промокода
          userState.state = 'creating_promo_auto';
          userStates.set(userId, userState);
          
          bot.sendMessage(chatId, 
            `🔄 Автоматическая генерация промокода\n\n` +
            `Введите данные в формате:\n\n` +
            `СКИДКА% КОЛИЧЕСТВО_ИСПОЛЬЗОВАНИЙ ОПИСАНИЕ\n\n` +
            `Примеры:\n` +
            `• 10 100 Приветственная скидка 10%\n` +
            `• 20 1 Скидка для студентов 20%\n` +
            `• 15 50 Летняя акция 15%`
          );
        } else if (parts.length >= 3) {
          // Ручной ввод промокода
          const code = parts[0].toUpperCase();
          const discountPercent = parseInt(parts[1]);
          const maxUses = parseInt(parts[2]);
          const description = parts.slice(3).join(' ') || null;
          
          // Валидация
          if (!/^[A-Z0-9]+$/.test(code)) {
            bot.sendMessage(chatId, '❌ Код промокода должен содержать только буквы и цифры.');
            return;
          }
          
          if (isNaN(discountPercent) || discountPercent < 1 || discountPercent > 100) {
            bot.sendMessage(chatId, '❌ Скидка должна быть от 1 до 100 процентов.');
            return;
          }
          
          if (isNaN(maxUses) || maxUses < 1 || maxUses > 999999) {
            bot.sendMessage(chatId, '❌ Количество использований должно быть от 1 до 999999.');
            return;
          }
          
          // Создаем промокод
          try {
            const promoCode = await createPromoCode(
              code, 
              discountPercent, 
              maxUses, 
              userId, 
              msg.from.username || msg.from.first_name,
              description
            );
            
            userStates.delete(userId);
            
            bot.sendMessage(chatId, 
              `✅ Промокод создан успешно!\n\n` +
              `🎫 Код: **${code}**\n` +
              `💰 Скидка: ${discountPercent}%\n` +
              `📊 Использований: ${maxUses}\n` +
              `📝 Описание: ${description || 'Не указано'}\n\n` +
              `Промокод готов к использованию!`,
              { parse_mode: 'Markdown' }
            );
          } catch (error) {
            console.error('Ошибка создания промокода:', error);
            if (error.message.includes('UNIQUE constraint failed')) {
              bot.sendMessage(chatId, '❌ Промокод с таким кодом уже существует. Попробуйте другой код.');
            } else {
              bot.sendMessage(chatId, '❌ Ошибка при создании промокода. Попробуйте позже.');
            }
          }
        } else {
          bot.sendMessage(chatId, 
            '❌ Неверный формат. Используйте:\n\n' +
            'КОД СКИДКА% КОЛИЧЕСТВО_ИСПОЛЬЗОВАНИЙ ОПИСАНИЕ\n\n' +
            'Или введите "AUTO" для автоматической генерации кода.'
          );
        }
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (userState && userState.state === 'creating_promo_auto') {
      // Обработка автоматической генерации промокода
      if (isAdmin) {
        const parts = text.trim().split(' ');
        
        if (parts.length >= 2) {
          const discountPercent = parseInt(parts[0]);
          const maxUses = parseInt(parts[1]);
          const description = parts.slice(2).join(' ') || null;
          
          // Валидация
          if (isNaN(discountPercent) || discountPercent < 1 || discountPercent > 100) {
            bot.sendMessage(chatId, '❌ Скидка должна быть от 1 до 100 процентов.');
            return;
          }
          
          if (isNaN(maxUses) || maxUses < 1 || maxUses > 999999) {
            bot.sendMessage(chatId, '❌ Количество использований должно быть от 1 до 999999.');
            return;
          }
          
          // Генерируем уникальный код
          let code;
          let attempts = 0;
          do {
            code = generatePromoCode();
            attempts++;
          } while (attempts < 10); // Защита от бесконечного цикла
          
          // Создаем промокод
          try {
            const promoCode = await createPromoCode(
              code, 
              discountPercent, 
              maxUses, 
              userId, 
              msg.from.username || msg.from.first_name,
              description
            );
            
            userStates.delete(userId);
            
            bot.sendMessage(chatId, 
              `✅ Промокод создан успешно!\n\n` +
              `🎫 Код: **${code}**\n` +
              `💰 Скидка: ${discountPercent}%\n` +
              `📊 Использований: ${maxUses}\n` +
              `📝 Описание: ${description || 'Не указано'}\n\n` +
              `Промокод готов к использованию!`,
              { parse_mode: 'Markdown' }
            );
          } catch (error) {
            console.error('Ошибка создания промокода:', error);
            bot.sendMessage(chatId, '❌ Ошибка при создании промокода. Попробуйте позже.');
          }
        } else {
          bot.sendMessage(chatId, 
            '❌ Неверный формат. Используйте:\n\n' +
            'СКИДКА% КОЛИЧЕСТВО_ИСПОЛЬЗОВАНИЙ ОПИСАНИЕ\n\n' +
            'Пример: 10 100 Приветственная скидка 10%'
          );
        }
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    }
  });

  // Обработка callback запросов
  bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = message.chat.id;
    const userId = callbackQuery.from.id;
    
    console.log('🔘 Callback получен:', {
      data: data,
      userId: userId,
      chatId: chatId,
      from: callbackQuery.from.username
    });
    
    
    // Обработка выбора статуса студента
    if (data.startsWith('student_')) {
      console.log('👑 Обработка статуса студента:', data);
      const isStudent = data === 'student_yes';
      const userState = userStates.get(userId);
      
      console.log('👑 Состояние пользователя:', {
        userId: userId,
        state: userState?.state,
        hasUserState: !!userState
      });
      
      if (!userState || userState.state !== 'waiting_for_student_status') {
        console.log('❌ Неправильное состояние пользователя');
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Произошла ошибка. Пожалуйста, начните заново.',
          show_alert: true
        });
        return;
      }
      
          // Обновляем состояние пользователя
          userState.is_student = isStudent;
          userState.state = 'submitted';
          userStates.set(userId, userState);
          
          // Обновляем сообщение, убирая кнопки
          const studentStatus = isStudent ? '👑 студент UNLOCK' : 'обычный пользователь';
          bot.editMessageText(
            `✅ Статус: ${studentStatus}\n\n📤 Отправляем отзыв на модерацию...`,
            {
              chat_id: chatId,
              message_id: message.message_id,
              reply_markup: {
                inline_keyboard: []
              }
            }
          );
          
          // Сразу отправляем отзыв админу
      try {
        // Собираем максимальную информацию о пользователе
        const userInfo = callbackQuery.from;
        
        // Определяем страну по языку
        const countryByLanguage = {
          'ru': 'RU', 'en': 'US', 'uz': 'UZ', 'zh': 'CN', 'ko': 'KR',
          'uk': 'UA', 'kz': 'KZ', 'tr': 'TR', 'de': 'DE', 'fr': 'FR'
        };
        
        const countryCode = countryByLanguage[userInfo.language_code] || 'UNKNOWN';
        
        // Собираем всю доступную информацию
        const reviewData = {
          user_id: userId,
          username: userInfo.username || null,
          first_name: userInfo.first_name || null,
          last_name: userInfo.last_name || null,
          language_code: userInfo.language_code || null,
          is_bot: userInfo.is_bot || false,
          is_premium: userInfo.is_premium || false,
          phone_number: userInfo.phone_number || null,
          country_code: countryCode,
          city: null,
          timezone: null,
          text: userState.text,
          rating: userState.rating,
          user_agent: 'Telegram Bot',
          ip_address: null,
          referrer: 'Telegram Bot',
          is_student: isStudent
        };
        
        console.log('📊 Собранная информация о пользователе:', {
          user_id: reviewData.user_id,
          username: reviewData.username,
          name: `${reviewData.first_name} ${reviewData.last_name}`,
          language: reviewData.language_code,
          country: reviewData.country_code,
          is_premium: reviewData.is_premium,
          is_bot: reviewData.is_bot,
          is_student: reviewData.is_student
        });
        
        // Сохраняем отзыв в базу данных
        console.log('💾 Сохраняем отзыв в базу данных...');
        console.log('💾 Данные для сохранения:', {
          user_id: reviewData.user_id,
          text: reviewData.text.substring(0, 50) + '...',
          rating: reviewData.rating,
          is_student: reviewData.is_student
        });
        
        const review = await createReview(reviewData);
        console.log('✅ Отзыв сохранен в БД с ID:', review.id);
        console.log('✅ Полные данные сохраненного отзыва:', review);
        
        // Отправляем подтверждение пользователю
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Отзыв отправлен на модерацию! Спасибо!',
          show_alert: true
        });
        
        // Отправляем уведомление админам
        const adminChatIds = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()) : [];
        
        console.log('📤 Отправка уведомлений админам:', adminChatIds);
        console.log('📤 ADMIN_CHAT_IDS из .env:', ADMIN_CHAT_IDS);
        
        if (adminChatIds.length > 0) {
          console.log('📤 Начинаем отправку уведомлений...');
          const studentStatus = reviewData.is_student ? '👑 Студент UNLOCK' : '👤 Обычный пользователь';
          const adminMessage = 
            `📝 Новый отзыв для модерации\n\n` +
            `👤 Пользователь: ${reviewData.first_name} ${reviewData.last_name || ''}\n` +
            `🆔 ID: ${reviewData.user_id}\n` +
            `📱 Username: @${reviewData.username || 'не указан'}\n` +
            `👑 Статус: ${studentStatus}\n` +
            `🌍 Страна: ${reviewData.country_code}\n` +
            `🗣️ Язык: ${reviewData.language_code || 'не указан'}\n` +
            `💎 Premium: ${reviewData.is_premium ? 'Да' : 'Нет'}\n` +
            `🤖 Бот: ${reviewData.is_bot ? 'Да' : 'Нет'}\n\n` +
            `📝 Отзыв: ${userState.text}\n` +
            `⭐ Оценка: ${userState.rating}/5\n\n` +
            `🆔 ID отзыва: ${review.id}\n` +
            `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
          
          // Отправляем всем админам
          let successCount = 0;
          let errorCount = 0;
          
          for (const chatId of adminChatIds) {
            try {
              console.log(`📤 Отправка уведомления админу ${chatId}...`);
              const adminMessageWithCommands = adminMessage + 
                `\n\n📝 Команды для модерации:\n` +
                `• Одобрить: /approve_${review.id}\n` +
                `• Отклонить: /reject_${review.id}\n` +
                `• Удалить: /delete_${review.id}\n` +
                `• Подробнее: /details_${review.id}`;
              
              await bot.sendMessage(chatId, adminMessageWithCommands);
              console.log(`✅ Уведомление отправлено админу ${chatId}`);
              successCount++;
            } catch (error) {
              console.error(`❌ Ошибка отправки админу ${chatId}:`, error.message);
              errorCount++;
            }
          }
          
          console.log(`📊 Результаты отправки: ✅ ${successCount}, ❌ ${errorCount}`);
          
          // Если ни одно уведомление не отправилось, выводим предупреждение
          if (successCount === 0) {
            console.error('⚠️ ВНИМАНИЕ: Ни одно уведомление администратору не было отправлено!');
            console.error('⚠️ Проверьте настройки TELEGRAM_CHAT_ID в .env файле');
          }
        } else {
          console.error('⚠️ ВНИМАНИЕ: ADMIN_CHAT_IDS не настроен!');
          console.error('⚠️ Установите TELEGRAM_CHAT_ID в .env файле');
        }
        
        // Отправляем финальное сообщение пользователю
        const studentStatus = isStudent ? '👑 студент UNLOCK' : 'обычный пользователь';
        bot.sendMessage(chatId, 
          `✅ Отзыв отправлен на модерацию!\n\n` +
          `📝 Ваш отзыв: "${userState.text}"\n` +
          `⭐ Оценка: ${userState.rating}/5\n` +
          `👑 Статус: ${studentStatus}\n\n` +
          `Спасибо за отзыв! Мы рассмотрим его в ближайшее время.`
        );
        
      } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Произошла ошибка при отправке отзыва. Попробуйте позже.',
          show_alert: true
        });
      }
      
      return;
    }
    
    // Обработка кнопки "Подробнее"
    if (data.startsWith('details_')) {
      const reviewId = data.split('_')[1];
      
      try {
        const { getReviewById } = require('./reviews');
        const review = await getReviewById(reviewId);
        
        if (review) {
          const studentStatus = review.is_student ? '👑 Студент UNLOCK' : '👤 Обычный пользователь';
          const detailedMessage = 
            `👁️ Подробная информация об отзыве #${review.id}\n\n` +
            `👤 Пользователь: ${review.first_name} ${review.last_name || ''}\n` +
            `🆔 ID: ${review.user_id}\n` +
            `📱 Username: @${review.username || 'не указан'}\n` +
            `👑 Статус: ${studentStatus}\n` +
            `🌍 Страна: ${review.country_code || 'не указана'}\n` +
            `🗣️ Язык: ${review.language_code || 'не указан'}\n` +
            `💎 Premium: ${review.is_premium ? 'Да' : 'Нет'}\n` +
            `🤖 Бот: ${review.is_bot ? 'Да' : 'Нет'}\n` +
            `📱 Телефон: ${review.phone_number || 'не указан'}\n` +
            `🏙️ Город: ${review.city || 'не указан'}\n` +
            `🌐 Timezone: ${review.timezone || 'не указан'}\n` +
            `🌐 User Agent: ${review.user_agent || 'не указан'}\n` +
            `🌐 IP: ${review.ip_address || 'не указан'}\n` +
            `🌐 Referrer: ${review.referrer || 'не указан'}\n\n` +
            `📝 Полный текст отзыва:\n"${review.text}"\n\n` +
            `⭐ Оценка: ${review.rating}/5\n` +
            `📅 Создан: ${review.created_at}\n` +
            `📅 Одобрен: ${review.approved_at || 'не одобрен'}\n` +
            `👨‍💼 Админ: ${review.admin_username || 'не указан'}`;
          
          const detailedMessageWithCommands = detailedMessage + 
            `\n\n📝 Команды для модерации:\n` +
            `• Одобрить: /approve_${review.id}\n` +
            `• Отклонить: /reject_${review.id}\n` +
            `• Удалить: /delete_${review.id}`;
          
          bot.sendMessage(chatId, detailedMessageWithCommands);
        } else {
          bot.sendMessage(chatId, '❌ Отзыв не найден');
        }
        
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Подробная информация отправлена',
          show_alert: false
        });
        
      } catch (error) {
        console.error('Ошибка при получении деталей отзыва:', error);
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Ошибка при получении информации об отзыве',
          show_alert: true
        });
      }
      
      return;
    }
    
    // Обработка кнопок админа
    if (data.startsWith('approve_') || data.startsWith('reject_') || data.startsWith('delete_')) {
      console.log('👨‍💼 Обработка админ-действия:', data);
      const reviewId = data.split('_')[1];
      const action = data.startsWith('approve_') ? 'approved' : data.startsWith('reject_') ? 'rejected' : 'deleted';
      
      console.log('👨‍💼 Данные модерации:', {
        reviewId: reviewId,
        action: action,
        adminId: userId,
        adminUsername: callbackQuery.from.username
      });
      
      try {
        let result;
        
        if (action === 'deleted') {
          // Удаляем отзыв
          result = await deleteReview(reviewId);
        } else {
          // Обновляем статус отзыва в базе данных
          result = await updateReviewStatus(reviewId, action, userId, callbackQuery.from.username);
        }
        
        if (result.success || result.deleted) {
          // Отправляем подтверждение админу
          let message;
          if (action === 'approved') {
            message = 'Отзыв одобрен и опубликован!';
          } else if (action === 'rejected') {
            message = 'Отзыв отклонен';
          } else {
            message = 'Отзыв удален';
          }
          
          bot.answerCallbackQuery(callbackQuery.id, {
            text: message,
            show_alert: true
          });
          
          // Обновляем сообщение админа
          let newText;
          if (action === 'approved') {
            newText = `✅ ОДОБРЕНО\n\n` + callbackQuery.message.text;
          } else if (action === 'rejected') {
            newText = `❌ ОТКЛОНЕНО\n\n` + callbackQuery.message.text;
          } else {
            newText = `🗑️ УДАЛЕНО\n\n` + callbackQuery.message.text;
          }
          
          bot.editMessageText(newText, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id
          });
          
          console.log(`📝 Отзыв ${reviewId} ${action === 'approved' ? 'одобрен' : action === 'rejected' ? 'отклонен' : 'удален'} админом ${userId}`);
          
        } else {
          // Проверяем, был ли отзыв найден
          if (result.changes === 0) {
            bot.answerCallbackQuery(callbackQuery.id, {
              text: 'Отзыв не найден или уже обработан',
              show_alert: true
            });
          } else {
            bot.answerCallbackQuery(callbackQuery.id, {
              text: 'Ошибка при обработке отзыва',
              show_alert: true
            });
          }
        }
        
      } catch (error) {
        console.error('Ошибка при обработке админ-действия:', error);
        bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Произошла ошибка при обработке отзыва',
          show_alert: true
        });
      }
      
      return;
    }
  });
}

module.exports = bot;