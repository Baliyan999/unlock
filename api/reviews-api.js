const { 
  createReview, 
  getReviewsByStatus, 
  getReviewsForAdmin, 
  updateReviewStatus, 
  getReviewById,
  getReviewsStats 
} = require('./reviews');

// Получение опубликованных отзывов для сайта
async function getPublishedReviews(req, res) {
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
    
    res.json({
      success: true,
      data: formattedReviews
    });
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения отзывов'
    });
  }
}

// Создание нового отзыва (для Telegram бота)
async function createNewReview(req, res) {
  try {
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
    } = req.body;
    
    // Собираем дополнительную информацию с веб-сайта
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const clientUserAgent = req.headers['user-agent'] || 'Unknown';
    const clientReferrer = req.headers.referer || req.headers.referrer || 'Direct';
    
    // Определяем страну по IP (упрощенная версия)
    const getCountryByIP = (ip) => {
      // В реальном проекте здесь можно использовать GeoIP API
      if (ip && ip.startsWith('192.168.') || ip.startsWith('127.') || ip.startsWith('10.')) {
        return 'LOCAL';
      }
      return 'UNKNOWN';
    };
    
    // Собираем полную информацию
    const fullReviewData = {
      user_id,
      username: username || null,
      first_name: first_name || null,
      last_name: last_name || null,
      language_code: language_code || req.headers['accept-language']?.split(',')[0] || 'en',
      is_bot: is_bot || false,
      is_premium: is_premium || false,
      phone_number: phone_number || null,
      country_code: country_code || getCountryByIP(clientIP),
      city: city || null,
      timezone: timezone || null,
      text,
      rating,
      user_agent: user_agent || clientUserAgent,
      ip_address: ip_address || clientIP,
      referrer: referrer || clientReferrer,
      is_student: is_student || false
    };
    
    console.log('📊 Собранная информация с веб-сайта:', {
      user_id: fullReviewData.user_id,
      ip: fullReviewData.ip_address,
      country: fullReviewData.country_code,
      language: fullReviewData.language_code,
      user_agent: fullReviewData.user_agent.substring(0, 50) + '...',
      referrer: fullReviewData.referrer
    });
    
    // Валидация данных
    if (!user_id || !text || rating === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Недостаточно данных для создания отзыва'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Рейтинг должен быть от 1 до 5'
      });
    }
    
    if (text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Текст отзыва должен содержать минимум 10 символов'
      });
    }
    
    const review = await createReview(fullReviewData);
    
    res.json({
      success: true,
      data: review,
      message: 'Отзыв отправлен на модерацию'
    });
  } catch (error) {
    console.error('Ошибка создания отзыва:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка создания отзыва'
    });
  }
}

// Получение отзывов для админа
async function getAdminReviews(req, res) {
  try {
    const reviews = await getReviewsForAdmin();
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Ошибка получения админских отзывов:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения отзывов'
    });
  }
}

// Обновление статуса отзыва (для админа)
async function updateReview(req, res) {
  try {
    console.log('📝 Update review request:', {
      params: req.params,
      body: req.body,
      query: req.query
    });
    
    const { reviewId, status, adminId, adminUsername } = { 
      ...req.body, 
      reviewId: req.body.reviewId || req.params.id 
    };
    
    console.log('📝 Parsed data:', { reviewId, status, adminId, adminUsername });
    
    if (!reviewId || !status) {
      return res.status(400).json({
        success: false,
        error: 'Недостаточно данных для обновления'
      });
    }
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Недопустимый статус'
      });
    }
    
    const result = await updateReviewStatus(reviewId, status, adminId, adminUsername);
    
    res.json({
      success: true,
      data: result,
      message: `Отзыв ${status === 'approved' ? 'одобрен' : 'отклонен'}`
    });
  } catch (error) {
    console.error('Ошибка обновления отзыва:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка обновления отзыва'
    });
  }
}

// Получение статистики отзывов
async function getStats(req, res) {
  try {
    const stats = await getReviewsStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения статистики'
    });
  }
}

module.exports = {
  getPublishedReviews,
  createNewReview,
  getAdminReviews,
  updateReview,
  getStats
};
