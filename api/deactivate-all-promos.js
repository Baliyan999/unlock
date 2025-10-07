const db = require('./db');

console.log('🔄 Деактивация всех промокодов...\n');

// Деактивируем все активные промокоды
db.run('UPDATE promo_codes SET is_active = 0 WHERE is_active = 1 AND deleted_at IS NULL', (err) => {
  if (err) {
    console.error('❌ Ошибка при деактивации промокодов:', err.message);
  } else {
    console.log('✅ Все активные промокоды деактивированы!');
  }
  
  // Проверяем результат
  db.all('SELECT code, is_active, deleted_at FROM promo_codes ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('❌ Ошибка при получении списка промокодов:', err.message);
    } else {
      console.log('\n📋 Текущее состояние промокодов:');
      console.log('=====================================');
      
      if (rows.length === 0) {
        console.log('📭 Промокодов нет');
      } else {
        rows.forEach(promo => {
          let status = '';
          if (promo.deleted_at) {
            status = '🗑️ Удален';
          } else if (promo.is_active) {
            status = '✅ Активен';
          } else {
            status = '❌ Деактивирован';
          }
          
          console.log(`🎫 ${promo.code} - ${status}`);
        });
      }
    }
    
    // Закрываем соединение
    db.close((err) => {
      if (err) {
        console.error('❌ Ошибка при закрытии базы данных:', err.message);
      } else {
        console.log('\n✅ Операция завершена!');
      }
    });
  });
});
