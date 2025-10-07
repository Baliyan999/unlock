require('dotenv').config({ path: '../.env' });
const { createReview, getReviewsByStatus, updateReviewStatus, deleteReview, getReviewsForAdmin } = require('./reviews');

console.log('🧪 Тестирование полной системы отзывов...\n');

async function testCompleteSystem() {
  try {
    console.log('1️⃣ Тестирование создания отзыва...');
    
    // Создаем тестовый отзыв
    const testReview = {
      user_id: 123456789,
      username: 'test_user',
      first_name: 'Тест',
      last_name: 'Пользователь',
      language_code: 'ru',
      is_bot: false,
      is_premium: false,
      phone_number: null,
      country_code: 'RU',
      city: null,
      timezone: null,
      text: 'Отличный курс китайского языка! Очень рекомендую всем, кто хочет изучать китайский.',
      rating: 5,
      user_agent: 'Test Agent',
      ip_address: '127.0.0.1',
      referrer: 'Test',
      is_student: true
    };
    
    const createdReview = await createReview(testReview);
    console.log('✅ Отзыв создан с ID:', createdReview.id);
    
    console.log('\n2️⃣ Тестирование получения отзывов на модерации...');
    const pendingReviews = await getReviewsByStatus('pending');
    console.log('✅ Найдено отзывов на модерации:', pendingReviews.length);
    
    console.log('\n3️⃣ Тестирование одобрения отзыва...');
    const approvalResult = await updateReviewStatus(createdReview.id, 'approved', 999999999, 'admin_user');
    console.log('✅ Отзыв одобрен:', approvalResult);
    
    console.log('\n4️⃣ Тестирование получения одобренных отзывов...');
    const approvedReviews = await getReviewsByStatus('approved');
    console.log('✅ Найдено одобренных отзывов:', approvedReviews.length);
    
    console.log('\n5️⃣ Тестирование отклонения отзыва...');
    // Создаем еще один отзыв для отклонения
    const testReview2 = {
      ...testReview,
      user_id: 987654321,
      text: 'Плохой курс, не рекомендую.',
      rating: 1,
      is_student: false
    };
    
    const createdReview2 = await createReview(testReview2);
    console.log('✅ Второй отзыв создан с ID:', createdReview2.id);
    
    const rejectionResult = await updateReviewStatus(createdReview2.id, 'rejected', 999999999, 'admin_user');
    console.log('✅ Отзыв отклонен:', rejectionResult);
    
    console.log('\n6️⃣ Тестирование получения отклоненных отзывов...');
    const rejectedReviews = await getReviewsByStatus('rejected');
    console.log('✅ Найдено отклоненных отзывов:', rejectedReviews.length);
    
    console.log('\n7️⃣ Тестирование удаления отзыва...');
    // Создаем отзыв для удаления
    const testReview3 = {
      ...testReview,
      user_id: 555666777,
      text: 'Спам отзыв для удаления.',
      rating: 3
    };
    
    const createdReview3 = await createReview(testReview3);
    console.log('✅ Третий отзыв создан с ID:', createdReview3.id);
    
    const deleteResult = await deleteReview(createdReview3.id);
    console.log('✅ Отзыв удален:', deleteResult);
    
    console.log('\n8️⃣ Тестирование получения всех отзывов для админа...');
    const allReviews = await getReviewsForAdmin();
    console.log('✅ Всего отзывов в системе:', allReviews.length);
    
    console.log('\n9️⃣ Проверка статистики...');
    console.log('📊 Статистика отзывов:');
    console.log('   - Всего:', allReviews.length);
    console.log('   - На модерации:', pendingReviews.length);
    console.log('   - Одобрено:', approvedReviews.length);
    console.log('   - Отклонено:', rejectedReviews.length);
    
    console.log('\n✅ Все тесты пройдены успешно!');
    console.log('\n📝 Рекомендации:');
    console.log('1. Убедитесь, что в .env файле установлены правильные TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID');
    console.log('2. Запустите бота командой: node telegram-bot.js');
    console.log('3. Проверьте, что уведомления приходят администратору при создании новых отзывов');
    console.log('4. Проверьте функционал модерации через админ-панель бота');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error);
  }
}

testCompleteSystem();
