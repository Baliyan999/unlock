const db = require('./db');

// Получаем команду из аргументов
const command = process.argv[2];
const code = process.argv[3];

console.log('🎫 Менеджер промокодов\n');

if (!command) {
  console.log('📋 Доступные команды:');
  console.log('  node promo-manager.js list                    - показать все промокоды');
  console.log('  node promo-manager.js active                  - показать активные промокоды');
  console.log('  node promo-manager.js inactive                - показать деактивированные промокоды');
  console.log('  node promo-manager.js deleted                 - показать удаленные промокоды');
  console.log('  node promo-manager.js activate КОД            - активировать промокод');
  console.log('  node promo-manager.js deactivate КОД          - деактивировать промокод');
  console.log('  node promo-manager.js delete КОД              - удалить промокод (в корзину)');
  console.log('  node promo-manager.js restore КОД             - восстановить из корзины');
  console.log('  node promo-manager.js permanent-delete КОД    - окончательно удалить');
  console.log('  node promo-manager.js deactivate-all          - деактивировать все');
  console.log('  node promo-manager.js delete-all              - удалить все (в корзину)');
  process.exit(0);
}

function showPromoCodes(filter = 'all') {
  let whereClause = '';
  switch(filter) {
    case 'active':
      whereClause = 'WHERE is_active = 1 AND deleted_at IS NULL';
      break;
    case 'inactive':
      whereClause = 'WHERE is_active = 0 AND deleted_at IS NULL';
      break;
    case 'deleted':
      whereClause = 'WHERE deleted_at IS NOT NULL';
      break;
    default:
      whereClause = 'WHERE deleted_at IS NULL';
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
      console.error('❌ Ошибка:', err.message);
    } else {
      if (rows.length === 0) {
        console.log('📭 Промокодов нет');
      } else {
        console.log(`📋 Найдено промокодов: ${rows.length}\n`);
        rows.forEach(promo => {
          let status = '';
          if (promo.deleted_at) {
            status = '🗑️ Удален';
          } else if (promo.is_active) {
            status = '✅ Активен';
          } else {
            status = '❌ Деактивирован';
          }
          
          const expires = promo.expires_at ? `\n⏰ Истекает: ${new Date(promo.expires_at).toLocaleDateString('ru-RU')}` : '';
          const description = promo.description ? `\n📝 ${promo.description}` : '';
          
          console.log(`🎫 ${promo.code}`);
          console.log(`   💰 Скидка: ${promo.discount_percent}%`);
          console.log(`   📊 Использовано: ${promo.used_count}/${promo.max_uses}`);
          console.log(`   👤 Создан: ${promo.created_by_username}`);
          console.log(`   📅 Дата: ${new Date(promo.created_at).toLocaleDateString('ru-RU')}`);
          console.log(`   🔄 Статус: ${status}${expires}${description}`);
          console.log('');
        });
      }
    }
    db.close();
  });
}

function executeCommand(sql, successMessage, errorMessage) {
  db.run(sql, [code], function(err) {
    if (err) {
      console.error(`❌ ${errorMessage}:`, err.message);
    } else {
      if (this.changes > 0) {
        console.log(`✅ ${successMessage}`);
      } else {
        console.log('❌ Промокод не найден');
      }
    }
    db.close();
  });
}

switch (command) {
  case 'list':
    showPromoCodes('all');
    break;
    
  case 'active':
    showPromoCodes('active');
    break;
    
  case 'inactive':
    showPromoCodes('inactive');
    break;
    
  case 'deleted':
    showPromoCodes('deleted');
    break;
    
  case 'activate':
    if (!code) {
      console.log('❌ Укажите код промокода');
      process.exit(1);
    }
    executeCommand(
      'UPDATE promo_codes SET is_active = 1 WHERE code = ? AND deleted_at IS NULL',
      `Промокод ${code} активирован`,
      'Ошибка при активации промокода'
    );
    break;
    
  case 'deactivate':
    if (!code) {
      console.log('❌ Укажите код промокода');
      process.exit(1);
    }
    executeCommand(
      'UPDATE promo_codes SET is_active = 0 WHERE code = ? AND deleted_at IS NULL',
      `Промокод ${code} деактивирован`,
      'Ошибка при деактивации промокода'
    );
    break;
    
  case 'delete':
    if (!code) {
      console.log('❌ Укажите код промокода');
      process.exit(1);
    }
    executeCommand(
      'UPDATE promo_codes SET deleted_at = CURRENT_TIMESTAMP WHERE code = ? AND deleted_at IS NULL',
      `Промокод ${code} перемещен в корзину`,
      'Ошибка при удалении промокода'
    );
    break;
    
  case 'restore':
    if (!code) {
      console.log('❌ Укажите код промокода');
      process.exit(1);
    }
    executeCommand(
      'UPDATE promo_codes SET deleted_at = NULL WHERE code = ?',
      `Промокод ${code} восстановлен из корзины`,
      'Ошибка при восстановлении промокода'
    );
    break;
    
  case 'permanent-delete':
    if (!code) {
      console.log('❌ Укажите код промокода');
      process.exit(1);
    }
    executeCommand(
      'DELETE FROM promo_codes WHERE code = ?',
      `Промокод ${code} окончательно удален`,
      'Ошибка при окончательном удалении промокода'
    );
    break;
    
  case 'deactivate-all':
    db.run('UPDATE promo_codes SET is_active = 0 WHERE is_active = 1 AND deleted_at IS NULL', (err) => {
      if (err) {
        console.error('❌ Ошибка при деактивации всех промокодов:', err.message);
      } else {
        console.log('✅ Все активные промокоды деактивированы!');
      }
      db.close();
    });
    break;
    
  case 'delete-all':
    db.run('UPDATE promo_codes SET deleted_at = CURRENT_TIMESTAMP WHERE deleted_at IS NULL', (err) => {
      if (err) {
        console.error('❌ Ошибка при удалении всех промокодов:', err.message);
      } else {
        console.log('✅ Все промокоды перемещены в корзину!');
      }
      db.close();
    });
    break;
    
  default:
    console.log('❌ Неизвестная команда. Используйте без параметров для справки.');
    db.close();
}
