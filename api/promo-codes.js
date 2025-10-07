const db = require('./db');

// Инициализация таблиц промокодов
function initPromoCodesDatabase() {
  const fs = require('fs');
  const path = require('path');
  const schemaPath = path.join(__dirname, 'db', 'schema.sql');
  
  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    statements.forEach(statement => {
      if (statement.trim()) {
        db.exec(statement);
      }
    });
    
    console.log('✅ Таблицы промокодов инициализированы');
  } catch (error) {
    console.error('❌ Ошибка инициализации таблиц промокодов:', error);
  }
}

// Создание промокода
function createPromoCode(code, discountPercent, maxUses, createdBy, createdByUsername, description = null, expiresAt = null) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO promo_codes (code, discount_percent, max_uses, created_by, created_by_username, description, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [code, discountPercent, maxUses, createdBy, createdByUsername, description, expiresAt], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, code, discountPercent, maxUses });
      }
    });
  });
}

// Получение промокода по коду
function getPromoCodeByCode(code) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM promo_codes 
      WHERE code = ? AND is_active = 1
    `;
    
    db.get(sql, [code], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Проверка валидности промокода
function validatePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM promo_codes 
      WHERE code = ? AND is_active = 1
    `;
    
    db.get(sql, [code], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve({ valid: false, reason: 'Промокод не найден' });
      } else if (row.expires_at && new Date(row.expires_at) < new Date()) {
        resolve({ valid: false, reason: 'Промокод истек' });
      } else if (row.used_count >= row.max_uses) {
        resolve({ valid: false, reason: 'Промокод исчерпан' });
      } else {
        resolve({ valid: true, promoCode: row });
      }
    });
  });
}

// Применение промокода
function usePromoCode(code, userId, userUsername, originalPrice) {
  return new Promise(async (resolve, reject) => {
    try {
      // Проверяем валидность промокода
      const validation = await validatePromoCode(code);
      if (!validation.valid) {
        resolve({ success: false, reason: validation.reason });
        return;
      }
      
      const promoCode = validation.promoCode;
      const discountAmount = Math.round(originalPrice * promoCode.discount_percent / 100);
      const finalPrice = originalPrice - discountAmount;
      
      // Начинаем транзакцию
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        // Обновляем счетчик использования
        db.run(
          'UPDATE promo_codes SET used_count = used_count + 1 WHERE id = ?',
          [promoCode.id],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              reject(err);
              return;
            }
            
            // Записываем использование
            db.run(
              `INSERT INTO promo_usage (promo_code_id, user_id, user_username, original_price, discount_amount, final_price)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [promoCode.id, userId, userUsername, originalPrice, discountAmount, finalPrice],
              function(err) {
                if (err) {
                  db.run('ROLLBACK');
                  reject(err);
                } else {
                  db.run('COMMIT');
                  resolve({
                    success: true,
                    discountPercent: promoCode.discount_percent,
                    discountAmount,
                    finalPrice,
                    usageId: this.lastID
                  });
                }
              }
            );
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Получение всех промокодов для админа
function getAllPromoCodes(filter = 'all') {
  return new Promise((resolve, reject) => {
    let whereClause = '';
    switch(filter) {
      case 'active':
        whereClause = 'WHERE pc.is_active = 1 AND pc.deleted_at IS NULL';
        break;
      case 'inactive':
        whereClause = 'WHERE pc.is_active = 0 AND pc.deleted_at IS NULL';
        break;
      case 'deleted':
        whereClause = 'WHERE pc.deleted_at IS NOT NULL';
        break;
      default:
        whereClause = 'WHERE pc.deleted_at IS NULL';
    }
    
    const sql = `
      SELECT 
        pc.*,
        COUNT(pu.id) as actual_uses
      FROM promo_codes pc
      LEFT JOIN promo_usage pu ON pc.id = pu.promo_code_id
      ${whereClause}
      GROUP BY pc.id
      ORDER BY pc.created_at DESC
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

// Деактивация промокода
function deactivatePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE promo_codes SET is_active = 0 WHERE code = ? AND deleted_at IS NULL';
    
    db.run(sql, [code], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: this.changes > 0, changes: this.changes });
      }
    });
  });
}

// Активация промокода
function activatePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE promo_codes SET is_active = 1 WHERE code = ? AND deleted_at IS NULL';
    
    db.run(sql, [code], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: this.changes > 0, changes: this.changes });
      }
    });
  });
}

// Восстановление промокода из корзины
function restorePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE promo_codes SET deleted_at = NULL WHERE code = ?';
    
    db.run(sql, [code], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: this.changes > 0, changes: this.changes });
      }
    });
  });
}

// Окончательное удаление промокода
function permanentDeletePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM promo_codes WHERE code = ?';
    
    db.run(sql, [code], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: this.changes > 0, changes: this.changes });
      }
    });
  });
}

// Удаление промокода
function deletePromoCode(code) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE promo_codes SET deleted_at = CURRENT_TIMESTAMP WHERE code = ? AND deleted_at IS NULL';
    
    db.run(sql, [code], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: this.changes > 0, changes: this.changes });
      }
    });
  });
}

// Получение статистики промокодов
function getPromoCodesStats() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive,
        SUM(used_count) as total_uses,
        SUM(CASE WHEN expires_at IS NOT NULL AND expires_at < datetime('now') THEN 1 ELSE 0 END) as expired
      FROM promo_codes
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

// Генерация случайного промокода
function generatePromoCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = {
  initPromoCodesDatabase,
  createPromoCode,
  getPromoCodeByCode,
  validatePromoCode,
  usePromoCode,
  getAllPromoCodes,
  deactivatePromoCode,
  activatePromoCode,
  deletePromoCode,
  restorePromoCode,
  permanentDeletePromoCode,
  getPromoCodesStats,
  generatePromoCode
};
