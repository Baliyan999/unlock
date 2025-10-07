// Тест структуры админ-панели
console.log('🎯 Тестирование структуры админ-панели...\n');

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

console.log('✅ Главная админ-панель:');
console.log(JSON.stringify(adminPanelKeyboard, null, 2));

console.log('\n✅ Клавиатура отзывов:');
console.log(JSON.stringify(reviewsKeyboard, null, 2));

console.log('\n✅ Клавиатура промокодов:');
console.log(JSON.stringify(promoCodesKeyboard, null, 2));

console.log('\n🎉 Структура админ-панели готова!');
console.log('\n📋 Навигация:');
console.log('1. 👨‍💼 Панель админа → Главная админ-панель');
console.log('2. 📋 Все об отзывах → Клавиатура отзывов');
console.log('3. 🎫 Промокоды → Клавиатура промокодов');
console.log('4. 🔙 Назад в админ-панель → Возврат к главной панели');
