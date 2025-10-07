const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'reviews.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️ Менеджер базы данных отзывов\n');

// Функция для выполнения SQL запросов
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Функция для выполнения SQL команд
function runCommand(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes, lastID: this.lastID });
      }
    });
  });
}

async function showStats() {
  try {
    console.log('📊 Статистика отзывов:');
    
    const total = await runQuery('SELECT COUNT(*) as count FROM reviews');
    const approved = await runQuery('SELECT COUNT(*) as count FROM reviews WHERE status = "approved"');
    const pending = await runQuery('SELECT COUNT(*) as count FROM reviews WHERE status = "pending"');
    const rejected = await runQuery('SELECT COUNT(*) as count FROM reviews WHERE status = "rejected"');
    
    console.log(`   Всего отзывов: ${total[0].count}`);
    console.log(`   ✅ Одобренных: ${approved[0].count}`);
    console.log(`   ⏳ На модерации: ${pending[0].count}`);
    console.log(`   ❌ Отклоненных: ${rejected[0].count}\n`);
  } catch (error) {
    console.error('❌ Ошибка получения статистики:', error);
  }
}

async function showAllReviews() {
  try {
    console.log('📋 Все отзывы:');
    const reviews = await runQuery(`
      SELECT id, status, text, rating, created_at, first_name, username 
      FROM reviews 
      ORDER BY id DESC
    `);
    
    reviews.forEach(review => {
      const status = review.status === 'approved' ? '✅' : 
                    review.status === 'pending' ? '⏳' : '❌';
      const author = review.first_name || review.username || 'Аноним';
      console.log(`   ${status} ID:${review.id} | ${author} | ${review.rating}/5 | ${review.text.substring(0, 50)}...`);
    });
    console.log('');
  } catch (error) {
    console.error('❌ Ошибка получения отзывов:', error);
  }
}

async function deleteReview(id) {
  try {
    const result = await runCommand('DELETE FROM reviews WHERE id = ?', [id]);
    if (result.changes > 0) {
      console.log(`✅ Отзыв ${id} удален`);
    } else {
      console.log(`❌ Отзыв ${id} не найден`);
    }
  } catch (error) {
    console.error('❌ Ошибка удаления:', error);
  }
}

async function deleteAllReviews() {
  try {
    const result = await runCommand('DELETE FROM reviews');
    console.log(`✅ Удалено ${result.changes} отзывов`);
  } catch (error) {
    console.error('❌ Ошибка удаления всех отзывов:', error);
  }
}

async function deleteByStatus(status) {
  try {
    const result = await runCommand('DELETE FROM reviews WHERE status = ?', [status]);
    console.log(`✅ Удалено ${result.changes} отзывов со статусом "${status}"`);
  } catch (error) {
    console.error('❌ Ошибка удаления по статусу:', error);
  }
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  switch (command) {
    case 'stats':
      await showStats();
      break;
      
    case 'list':
      await showAllReviews();
      break;
      
    case 'delete':
      const id = args[1];
      if (id) {
        await deleteReview(id);
      } else {
        console.log('❌ Укажите ID отзыва для удаления');
        console.log('   Пример: node db-manager.js delete 5');
      }
      break;
      
    case 'delete-all':
      console.log('⚠️ Вы уверены, что хотите удалить ВСЕ отзывы? (y/N)');
      // В реальном приложении здесь был бы интерактивный ввод
      console.log('   Для удаления всех отзывов используйте: node db-manager.js delete-all-confirm');
      break;
      
    case 'delete-all-confirm':
      await deleteAllReviews();
      break;
      
    case 'delete-pending':
      await deleteByStatus('pending');
      break;
      
    case 'delete-rejected':
      await deleteByStatus('rejected');
      break;
      
    default:
      console.log('🗄️ Менеджер базы данных отзывов\n');
      console.log('📋 Доступные команды:');
      console.log('   node db-manager.js stats              - показать статистику');
      console.log('   node db-manager.js list               - показать все отзывы');
      console.log('   node db-manager.js delete <id>        - удалить отзыв по ID');
      console.log('   node db-manager.js delete-pending     - удалить все отзывы на модерации');
      console.log('   node db-manager.js delete-rejected    - удалить все отклоненные отзывы');
      console.log('   node db-manager.js delete-all-confirm - удалить ВСЕ отзывы');
      console.log('\n📁 База данных: ' + dbPath);
      break;
  }
  
  db.close();
}

main().catch(console.error);

