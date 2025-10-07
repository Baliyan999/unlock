const http = require('http');
const url = require('url');
const { getReviewsByStatus } = require('./reviews');
const { validatePromoCode, usePromoCode, getAllPromoCodes, getPromoCodesStats } = require('./promo-codes');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// Получение одобренных отзывов для сайта
async function getPublishedReviews() {
  try {
    const reviews = await getReviewsByStatus('approved');
    
    // Форматируем данные для фронтенда
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      author: review.first_name || review.username || 'Аноним',
      text: review.text,
      rating: review.rating,
      date: review.created_at,
      stars: Math.floor(review.rating),
      is_student: review.is_student || false
    }));
    
    return {
      success: true,
      data: formattedReviews
    };
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    return {
      success: false,
      error: 'Ошибка получения отзывов'
    };
  }
}

const server = http.createServer(async (req, res) => {
  // Устанавливаем CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Обработка OPTIONS запросов
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`📡 API запрос: ${req.method} ${pathname}`);

  try {
    if (pathname === '/api/reviews' && req.method === 'GET') {
      console.log('🔍 Получаем одобренные отзывы...');
      const result = await getPublishedReviews();
      
      res.writeHead(200);
      res.end(JSON.stringify(result));
      console.log(`✅ Отправлено ${result.data?.length || 0} отзывов`);
      
    } else if (pathname === '/api/stats' && req.method === 'GET') {
      const stats = {
        success: true,
        data: {
          total: 0,
          approved: 0,
          pending: 0
        }
      };
      
      res.writeHead(200);
      res.end(JSON.stringify(stats));
      
    } else if (pathname === '/api/promo/validate' && req.method === 'POST') {
      // Валидация промокода
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const { code, price } = JSON.parse(body);
          
          if (!code) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, reason: 'Промокод не указан' }));
            return;
          }
          
          if (!price || price <= 0) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, reason: 'Неверная цена' }));
            return;
          }
          
          const validation = await validatePromoCode(code);
          
          if (validation.valid) {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              discountPercent: validation.promoCode.discount_percent,
              maxUses: validation.promoCode.max_uses,
              usedCount: validation.promoCode.used_count,
              description: validation.promoCode.description
            }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: false,
              reason: validation.reason
            }));
          }
        } catch (error) {
          console.error('Ошибка валидации промокода:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, reason: 'Внутренняя ошибка сервера' }));
        }
      });
      
    } else if (pathname === '/api/promo/use' && req.method === 'POST') {
      // Применение промокода
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const { code, userId, userUsername, originalPrice } = JSON.parse(body);
          
          if (!code || !userId || !originalPrice) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, reason: 'Недостаточно данных' }));
            return;
          }
          
          const result = await usePromoCode(code, userId, userUsername, originalPrice);
          
          if (result.success) {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              discountPercent: result.discountPercent,
              discountAmount: result.discountAmount,
              finalPrice: result.finalPrice,
              usageId: result.usageId
            }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: false,
              reason: result.reason
            }));
          }
        } catch (error) {
          console.error('Ошибка применения промокода:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, reason: 'Внутренняя ошибка сервера' }));
        }
      });
      
    } else if (pathname === '/api/lead' && req.method === 'POST') {
      // Обработка заявок с данными о курсе
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          console.log('📝 Получена заявка:', data);
          
          // Формируем сообщение для Telegram
          const formatText = data.format === 'group' ? 'Групповые' : 
                            data.format === 'individual' ? 'Индивидуальные' : 'Интенсивные';
          const levelText = data.level === 'hsk1' ? 'HSK 1' :
                           data.level === 'hsk2' ? 'HSK 2' :
                           data.level === 'hsk3' ? 'HSK 3' :
                           data.level === 'hsk4' ? 'HSK 4' :
                           data.level === 'hsk5' ? 'HSK 5' :
                           data.level === 'hsk6' ? 'HSK 6' : 'Не указан';
          
          const text = [
            '🎯 Новая заявка на пробный урок!',
            '',
            '👤 КОНТАКТНАЯ ИНФОРМАЦИЯ:',
            `Имя: ${data.name}`,
            `Телефон: ${data.phone}`,
            `Мессенджер: Telegram`,
            ''
          ];
          
          // Если есть данные из калькулятора, показываем полную информацию
          if (data.courseInfo) {
            text.push('📊 ИНФОРМАЦИЯ О КУРСЕ:');
            text.push(data.courseInfo);
          } else {
            // Если нет данных из калькулятора, показываем базовую информацию
            text.push('📚 ИНФОРМАЦИЯ О КУРСЕ:');
            text.push(`Формат: ${formatText}`);
            text.push(`Уровень: ${levelText}`);
            text.push('');
            text.push('💰 Стоимость: будет рассчитана после консультации');
          }
          
          // Добавляем комментарий и время
          text.push('');
          if (data.comment) {
            text.push(`💭 Комментарий: ${data.comment}`);
          }
          
          text.push('');
          text.push(`⏰ Время: ${new Date().toLocaleString('ru-RU')}`);
          
          const finalText = text.filter(Boolean).join('\n');
          
          // Отправляем в Telegram (используем функцию из telegram-dev.js)
          const { sendToTelegramDev } = require('./telegram-dev');
          const telegramResult = await sendToTelegramDev(finalText);
          
          console.log('📤 Заявка отправлена в Telegram:', telegramResult);
          
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          
        } catch (error) {
          console.error('Ошибка обработки заявки:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: 'Внутренняя ошибка сервера' }));
        }
      });
      
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: 'Not Found' }));
    }
  } catch (error) {
    console.error('❌ Ошибка сервера:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ success: false, error: 'Internal Server Error' }));
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 API сервер запущен на порту ${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET http://localhost:${PORT}/api/reviews - получить отзывы`);
  console.log(`   GET http://localhost:${PORT}/api/stats - статистика`);
  console.log(`   POST http://localhost:${PORT}/api/promo/validate - валидация промокода`);
  console.log(`   POST http://localhost:${PORT}/api/promo/use - применение промокода`);
  console.log(`   POST http://localhost:${PORT}/api/lead - отправка заявки`);
});

// Обработка ошибок
server.on('error', (error) => {
  console.error('❌ Ошибка сервера:', error);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Остановка API сервера...');
  server.close(() => {
    console.log('✅ API сервер остановлен');
    process.exit(0);
  });
});

