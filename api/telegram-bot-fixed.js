require('dotenv').config({ path: '../.env' });
const TelegramBot = require('node-telegram-bot-api');
const { createReview, updateReviewStatus, getReviewsForAdmin, getReviewsByStatus, deleteReview } = require('./reviews');
const { 
  initPromoCodesDatabase, 
  createPromoCode, 
  getAllPromoCodes, 
  deactivatePromoCode, 
  activatePromoCode,
  deletePromoCode, 
  restorePromoCode,
  permanentDeletePromoCode,
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
  console.error('❌ Токен бота не найден! Проверьте переменные окружения.');
}

// Состояния пользователей
const userStates = new Map();

// Клавиатуры
const adminKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📝 Оставить отзыв' }, { text: 'ℹ️ Получить информацию о программах' }],
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
      [{ text: '✅ Активные' }, { text: '❌ Деактивированные' }],
      [{ text: '🗑️ Корзина' }, { text: '📊 Статистика' }],
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
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      bot.sendMessage(chatId, 
        `👋 Привет, ${msg.from.first_name}!\n\n` +
        `Добро пожаловать в бот UNLOCK! 🎓\n\n` +
        `Вы вошли как администратор! 👨‍💼\n\n` +
        `Доступные функции:\n` +
        `📝 Оставить отзыв о курсах\n` +
        `ℹ️ Получить информацию о программах\n` +
        `👨‍💼 Панель админа (управление отзывами и промокодами)\n\n` +
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
        adminKeyboard
      );
    }
  });

  // Обработка сообщений
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;
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
    } else if (text === '🎫 Промокоды') {
      if (isAdmin) {
        bot.sendMessage(chatId, 
          `🎫 Управление промокодами\n\n` +
          `Здесь вы можете:\n\n` +
          `➕ Создать промокод - создать новый промокод со скидкой\n` +
          `📋 Все промокоды - просмотреть все созданные промокоды\n` +
          `✅ Активные - только активные промокоды\n` +
          `❌ Деактивированные - неактивные промокоды\n` +
          `🗑️ Корзина - удаленные промокоды\n` +
          `📊 Статистика - общая статистика по промокодам\n\n` +
          `Выберите действие:`,
          promoCodesKeyboard
        );
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
          `👨‍💼 Панель админа (управление отзывами и промокодами)\n\n` +
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
          adminKeyboard
        );
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
    } else if (text === '✅ Активные') {
      if (isAdmin) {
        getAllPromoCodes('active').then(promoCodes => {
          if (promoCodes.length === 0) {
            bot.sendMessage(chatId, '✅ Активных промокодов нет.');
            return;
          }
          
          let message = '✅ Активные промокоды:\n\n';
          promoCodes.forEach(promo => {
            const expires = promo.expires_at ? `\n⏰ Истекает: ${new Date(promo.expires_at).toLocaleDateString('ru-RU')}` : '';
            const description = promo.description ? `\n📝 ${promo.description}` : '';
            
            message += `🎫 **${promo.code}**\n` +
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
          console.error('Ошибка получения активных промокодов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении активных промокодов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '❌ Деактивированные') {
      if (isAdmin) {
        getAllPromoCodes('inactive').then(promoCodes => {
          if (promoCodes.length === 0) {
            bot.sendMessage(chatId, '❌ Деактивированных промокодов нет.');
            return;
          }
          
          let message = '❌ Деактивированные промокоды:\n\n';
          promoCodes.forEach(promo => {
            const expires = promo.expires_at ? `\n⏰ Истекает: ${new Date(promo.expires_at).toLocaleDateString('ru-RU')}` : '';
            const description = promo.description ? `\n📝 ${promo.description}` : '';
            
            message += `🎫 **${promo.code}**\n` +
                      `💰 Скидка: ${promo.discount_percent}%\n` +
                      `📊 Использовано: ${promo.used_count}/${promo.max_uses}\n` +
                      `👤 Создан: ${promo.created_by_username}\n` +
                      `📅 Дата: ${new Date(promo.created_at).toLocaleDateString('ru-RU')}${expires}${description}\n\n`;
          });
          
          message += `\n💡 Команды для управления:\n` +
                    `• Активировать: /activate_КОД\n` +
                    `• Удалить: /delete_КОД`;
          
          bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }).catch(error => {
          console.error('Ошибка получения деактивированных промокодов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении деактивированных промокодов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '🗑️ Корзина') {
      if (isAdmin) {
        getAllPromoCodes('deleted').then(promoCodes => {
          if (promoCodes.length === 0) {
            bot.sendMessage(chatId, '🗑️ Корзина пуста.');
            return;
          }
          
          let message = '🗑️ Удаленные промокоды:\n\n';
          promoCodes.forEach(promo => {
            const description = promo.description ? `\n📝 ${promo.description}` : '';
            
            message += `🎫 **${promo.code}**\n` +
                      `💰 Скидка: ${promo.discount_percent}%\n` +
                      `📊 Использовано: ${promo.used_count}/${promo.max_uses}\n` +
                      `👤 Создан: ${promo.created_by_username}\n` +
                      `📅 Создан: ${new Date(promo.created_at).toLocaleDateString('ru-RU')}\n` +
                      `🗑️ Удален: ${new Date(promo.deleted_at).toLocaleDateString('ru-RU')}${description}\n\n`;
          });
          
          message += `\n💡 Команды для управления:\n` +
                    `• Восстановить: /restore_КОД\n` +
                    `• Окончательно удалить: /permanent_delete_КОД`;
          
          bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }).catch(error => {
          console.error('Ошибка получения удаленных промокодов:', error);
          bot.sendMessage(chatId, '❌ Ошибка при получении удаленных промокодов.');
        });
      } else {
        bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
      }
    } else if (text === '📊 Статистика') {
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
    } else {
      // Обработка состояний пользователей
      const userState = userStates.get(userId);
      
      if (userState && userState.state === 'creating_promo_code') {
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
            createPromoCode(
              code, 
              discountPercent, 
              maxUses, 
              userId, 
              msg.from.username || msg.from.first_name,
              description
            ).then(result => {
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
            }).catch(error => {
              console.error('Ошибка создания промокода:', error);
              if (error.message.includes('UNIQUE constraint failed')) {
                bot.sendMessage(chatId, '❌ Промокод с таким кодом уже существует. Попробуйте другой код.');
              } else {
                bot.sendMessage(chatId, '❌ Ошибка при создании промокода. Попробуйте позже.');
              }
            });
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
            const code = generatePromoCode();
            
            // Создаем промокод
            createPromoCode(
              code, 
              discountPercent, 
              maxUses, 
              userId, 
              msg.from.username || msg.from.first_name,
              description
            ).then(result => {
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
            }).catch(error => {
              console.error('Ошибка создания промокода:', error);
              bot.sendMessage(chatId, '❌ Ошибка при создании промокода. Попробуйте позже.');
            });
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
    }
  });

  // Обработка команд управления промокодами
  bot.onText(/\/deactivate_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const code = match[1];
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      deactivatePromoCode(code).then(result => {
        if (result.success) {
          bot.sendMessage(chatId, `✅ Промокод ${code} деактивирован успешно!`);
        } else {
          bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
        }
      }).catch(error => {
        console.error('Ошибка при деактивации промокода:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка при деактивации промокода');
      });
    } else {
      bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
    }
  });

  bot.onText(/\/delete_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const code = match[1];
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      deletePromoCode(code).then(result => {
        if (result.success) {
          bot.sendMessage(chatId, `✅ Промокод ${code} перемещен в корзину!`);
        } else {
          bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
        }
      }).catch(error => {
        console.error('Ошибка при удалении промокода:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка при удалении промокода');
      });
    } else {
      bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
    }
  });

  bot.onText(/\/activate_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const code = match[1];
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      activatePromoCode(code).then(result => {
        if (result.success) {
          bot.sendMessage(chatId, `✅ Промокод ${code} активирован успешно!`);
        } else {
          bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
        }
      }).catch(error => {
        console.error('Ошибка при активации промокода:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка при активации промокода');
      });
    } else {
      bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
    }
  });

  bot.onText(/\/restore_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const code = match[1];
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      restorePromoCode(code).then(result => {
        if (result.success) {
          bot.sendMessage(chatId, `✅ Промокод ${code} восстановлен из корзины!`);
        } else {
          bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
        }
      }).catch(error => {
        console.error('Ошибка при восстановлении промокода:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка при восстановлении промокода');
      });
    } else {
      bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
    }
  });

  bot.onText(/\/permanent_delete_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const code = match[1];
    const isAdmin = ADMIN_CHAT_IDS ? ADMIN_CHAT_IDS.split(',').map(id => id.trim()).includes(chatId.toString()) : false;

    if (isAdmin) {
      permanentDeletePromoCode(code).then(result => {
        if (result.success) {
          bot.sendMessage(chatId, `✅ Промокод ${code} окончательно удален!`);
        } else {
          bot.sendMessage(chatId, '❌ Промокод не найден или произошла ошибка');
        }
      }).catch(error => {
        console.error('Ошибка при окончательном удалении промокода:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка при окончательном удалении промокода');
      });
    } else {
      bot.sendMessage(chatId, '❌ У вас нет прав администратора.');
    }
  });

  console.log('✅ Бот готов к работе!');
} else {
  console.error('❌ Бот не инициализирован!');
}
