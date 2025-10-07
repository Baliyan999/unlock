const { createPromoCode } = require('./promo-codes');

// Примеры создания промокодов
const promoCodes = [
  { code: 'STUDENT20', discount: 20, maxUses: 1, description: 'Скидка для студентов 20%' },
  { code: 'SUMMER15', discount: 15, maxUses: 50, description: 'Летняя акция 15%' },
  { code: 'NEWYEAR25', discount: 25, maxUses: 200, description: 'Новогодняя скидка 25%' }
];

async function createPromoCodes() {
  console.log('🎫 Создание промокодов...\n');
  
  for (const promo of promoCodes) {
    try {
      const result = await createPromoCode(
        promo.code,
        promo.discount,
        promo.maxUses,
        123456789, // admin user ID
        'admin',
        promo.description
      );
      
      console.log(`✅ Промокод создан: ${result.code} - ${result.discountPercent}% скидка`);
    } catch (error) {
      console.error(`❌ Ошибка создания промокода ${promo.code}:`, error.message);
    }
  }
  
  console.log('\n🎉 Все промокоды созданы!');
  process.exit(0);
}

createPromoCodes();
