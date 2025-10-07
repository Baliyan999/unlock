const { 
  getPublishedReviews, 
  createNewReview, 
  getAdminReviews, 
  updateReview, 
  getStats 
} = require('./reviews-api');

// Обработчик для получения опубликованных отзывов
export default async function handler(req, res) {
  // Устанавливаем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.action === 'admin') {
          // Админский запрос - все отзывы
          await getAdminReviews(req, res);
        } else if (req.query.action === 'stats') {
          // Статистика
          await getStats(req, res);
        } else {
          // Публичные отзывы
          await getPublishedReviews(req, res);
        }
        break;
        
      case 'POST':
        if (req.query.action === 'create') {
          // Создание нового отзыва
          await createNewReview(req, res);
        } else if (req.query.action === 'update') {
          // Обновление статуса отзыва
          await updateReview(req, res);
        } else {
          res.status(400).json({
            success: false,
            error: 'Неверный action параметр'
          });
        }
        break;
        
      default:
        res.status(405).json({
          success: false,
          error: 'Метод не поддерживается'
        });
    }
  } catch (error) {
    console.error('Ошибка API:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
}
