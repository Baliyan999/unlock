const express = require('express');
const { validatePromoCode, usePromoCode, getAllPromoCodes, getPromoCodesStats } = require('./promo-codes');

const router = express.Router();

// Валидация промокода
router.post('/validate', async (req, res) => {
  try {
    const { code, price } = req.body;
    
    if (!code) {
      return res.status(400).json({ success: false, reason: 'Промокод не указан' });
    }
    
    if (!price || price <= 0) {
      return res.status(400).json({ success: false, reason: 'Неверная цена' });
    }
    
    const validation = await validatePromoCode(code);
    
    if (validation.valid) {
      res.json({
        success: true,
        discountPercent: validation.promoCode.discount_percent,
        maxUses: validation.promoCode.max_uses,
        usedCount: validation.promoCode.used_count,
        description: validation.promoCode.description
      });
    } else {
      res.json({
        success: false,
        reason: validation.reason
      });
    }
  } catch (error) {
    console.error('Ошибка валидации промокода:', error);
    res.status(500).json({ success: false, reason: 'Внутренняя ошибка сервера' });
  }
});

// Применение промокода
router.post('/use', async (req, res) => {
  try {
    const { code, userId, userUsername, originalPrice } = req.body;
    
    if (!code || !userId || !originalPrice) {
      return res.status(400).json({ success: false, reason: 'Недостаточно данных' });
    }
    
    const result = await usePromoCode(code, userId, userUsername, originalPrice);
    
    if (result.success) {
      res.json({
        success: true,
        discountPercent: result.discountPercent,
        discountAmount: result.discountAmount,
        finalPrice: result.finalPrice,
        usageId: result.usageId
      });
    } else {
      res.json({
        success: false,
        reason: result.reason
      });
    }
  } catch (error) {
    console.error('Ошибка применения промокода:', error);
    res.status(500).json({ success: false, reason: 'Внутренняя ошибка сервера' });
  }
});

// Получение всех промокодов (для админа)
router.get('/admin/all', async (req, res) => {
  try {
    const promoCodes = await getAllPromoCodes();
    res.json({ success: true, promoCodes });
  } catch (error) {
    console.error('Ошибка получения промокодов:', error);
    res.status(500).json({ success: false, reason: 'Внутренняя ошибка сервера' });
  }
});

// Статистика промокодов (для админа)
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await getPromoCodesStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Ошибка получения статистики промокодов:', error);
    res.status(500).json({ success: false, reason: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
