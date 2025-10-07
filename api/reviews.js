const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, 'db', 'reviews.db');

// Создание подключения к БД
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err.message);
  } else {
    console.log('Подключение к БД успешно');
    // Инициализация схемы
    initDatabase();
  }
});

// Инициализация базы данных
function initDatabase() {
  const fs = require('fs');
  const schemaPath = path.join(__dirname, 'db', 'schema.sql');
  
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Ошибка инициализации БД:', err.message);
      } else {
        console.log('База данных инициализирована');
      }
    });
  }
}

// Создание нового отзыва
function createReview(reviewData) {
  return new Promise((resolve, reject) => {
    console.log('💾 createReview вызвана с данными:', {
      user_id: reviewData.user_id,
      text: reviewData.text?.substring(0, 50) + '...',
      rating: reviewData.rating,
      is_student: reviewData.is_student
    });
    
    const { 
      user_id, 
      username, 
      first_name, 
      last_name, 
      language_code,
      is_bot,
      is_premium,
      phone_number,
      country_code,
      city,
      timezone,
      text, 
      rating,
      user_agent,
      ip_address,
      referrer,
      is_student
    } = reviewData;
    
    const sql = `
      INSERT INTO reviews (
        user_id, username, first_name, last_name, language_code, 
        is_bot, is_premium, phone_number, country_code, city, timezone,
        text, rating, status, user_agent, ip_address, referrer, is_student
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)
    `;
    
    const params = [
      user_id, username, first_name, last_name, language_code,
      is_bot, is_premium, phone_number, country_code, city, timezone,
      text, rating, user_agent, ip_address, referrer, is_student
    ];
    
    console.log('💾 Выполняем SQL запрос с параметрами:', params.length);
    console.log('💾 is_student значение:', is_student);
    
    db.run(sql, params, function(err) {
      if (err) {
        console.error('❌ Ошибка при сохранении отзыва:', err);
        reject(err);
      } else {
        console.log('✅ Отзыв успешно сохранен с ID:', this.lastID);
        resolve({ id: this.lastID, ...reviewData });
      }
    });
  });
}

// Получение всех отзывов по статусу
function getReviewsByStatus(status = 'approved') {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, user_id, username, first_name, last_name, text, rating, created_at, is_student, status
      FROM reviews 
      WHERE status = ?
      ORDER BY created_at DESC
    `;
    
    db.all(sql, [status], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Получение отзывов для админа (все статусы)
function getReviewsForAdmin() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        id, user_id, username, first_name, last_name, language_code,
        is_bot, is_premium, phone_number, country_code, city, timezone,
        text, rating, status, created_at, approved_at, admin_id, admin_username,
        user_agent, ip_address, referrer
      FROM reviews 
      ORDER BY created_at DESC
    `;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Обновление статуса отзыва
function updateReviewStatus(reviewId, status, adminId = null, adminUsername = null) {
  return new Promise((resolve, reject) => {
    const approved_at = status === 'approved' ? new Date().toISOString() : null;
    
    const sql = `
      UPDATE reviews 
      SET status = ?, admin_id = ?, admin_username = ?, approved_at = ?
      WHERE id = ?
    `;
    
    db.run(sql, [status, adminId, adminUsername, approved_at, reviewId], function(err) {
      if (err) {
        console.error('❌ Ошибка обновления статуса отзыва:', err);
        reject(err);
      } else {
        const result = { 
          id: reviewId, 
          status, 
          adminId, 
          adminUsername, 
          approved_at,
          success: true,
          changes: this.changes
        };
        console.log('✅ Статус отзыва обновлен:', result);
        resolve(result);
      }
    });
  });
}

// Получение отзыва по ID
function getReviewById(reviewId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM reviews WHERE id = ?
    `;
    
    db.get(sql, [reviewId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Получение статистики отзывов
function getReviewsStats() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        AVG(CASE WHEN status = 'approved' THEN rating END) as avg_rating
      FROM reviews
    `;
    
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Удаление отзыва
function deleteReview(reviewId) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM reviews WHERE id = ?`;
    
    db.run(sql, [reviewId], function(err) {
      if (err) {
        console.error('❌ Ошибка удаления отзыва:', err);
        reject(err);
      } else {
        const result = { 
          id: reviewId, 
          deleted: this.changes > 0,
          success: this.changes > 0,
          changes: this.changes
        };
        console.log('✅ Отзыв удален:', result);
        resolve(result);
      }
    });
  });
}

module.exports = {
  createReview,
  getReviewsByStatus,
  getReviewsForAdmin,
  updateReviewStatus,
  getReviewById,
  getReviewsStats,
  deleteReview
};
