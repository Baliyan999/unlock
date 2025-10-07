const db = require('./db');

console.log('🔄 Обновление схемы базы данных...');

// Добавляем поле deleted_at в таблицу promo_codes
db.run('ALTER TABLE promo_codes ADD COLUMN deleted_at DATETIME', (err) => {
  if (err) {
    if (err.message.includes('duplicate column name')) {
      console.log('✅ Поле deleted_at уже существует в таблице promo_codes');
    } else {
      console.error('❌ Ошибка при добавлении поля deleted_at:', err.message);
    }
  } else {
    console.log('✅ Поле deleted_at добавлено в таблицу promo_codes');
  }
  
  // Закрываем соединение
  db.close((err) => {
    if (err) {
      console.error('❌ Ошибка при закрытии базы данных:', err.message);
    } else {
      console.log('✅ Схема базы данных обновлена успешно!');
    }
  });
});
