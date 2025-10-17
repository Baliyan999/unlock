// Configuration for UNLOCK Telegram Mini App
module.exports = {
  // Telegram Bot Configuration
  BOT_TOKEN: '8482483021:AAHeXNwoKj_GufU6Wz8bvUhwOaj3nn08Z1c',
  WEB_APP_URL: 'https://your-domain.com/web-app', // Замените на ваш домен
  
  // Server Configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // UNLOCK School Info
  SCHOOL_NAME: 'UNLOCK',
  SCHOOL_DESCRIPTION: 'Курсы китайского языка UNLOCK — твой ключ от китайского с нуля',
  SCHOOL_PHONE: '+998(77)268-68-86',
  SCHOOL_TELEGRAM: '@unlocklng_admin',
  SCHOOL_ADDRESS: 'г. Ташкент, Мирабадский район, ул. Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж',
  
  // Pricing Data (from your website)
  PRICING: {
    levels: {
      hsk1: { name: 'HSK 1', duration: 3, lessons: 24, basePrice: 500000 },
      hsk2: { name: 'HSK 2', duration: 4, lessons: 32, basePrice: 500000 },
      hsk3: { name: 'HSK 3', duration: 5, lessons: 40, basePrice: 500000 },
      hsk4: { name: 'HSK 4', duration: 6, lessons: 48, basePrice: 500000 },
      hsk5: { name: 'HSK 5', duration: 8, lessons: 64, basePrice: 500000 }
    },
    formats: {
      group: { name: 'Групповые', multiplier: 1.0, description: '8-12 уроков в месяц, 80 минут' },
      individual: { name: 'Индивидуальные', multiplier: 4.4, description: '12 уроков в месяц, 60 минут' },
      intensive: { name: 'Интенсив', multiplier: 1.0, description: 'Обсуждается с преподавателем' }
    }
  }
};
