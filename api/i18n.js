const ru = require('./translations/ru');
const en = require('./translations/en');
const uz = require('./translations/uz');
const zh = require('./translations/zh');
const ko = require('./translations/ko');

const translations = {
  ru,
  en,
  uz,
  zh,
  ko
};

// Хранилище языков пользователей
const userLanguages = new Map();

// Установить язык пользователя
function setUserLanguage(userId, language) {
  userLanguages.set(userId, language);
}

// Получить язык пользователя
function getUserLanguage(userId) {
  return userLanguages.get(userId) || 'ru'; // По умолчанию русский
}

// Получить перевод
function t(userId, key, params = {}) {
  const language = getUserLanguage(userId);
  const translation = translations[language];
  
  if (!translation) {
    console.warn(`Translation not found for language: ${language}`);
    return translations.ru[key] || key;
  }
  
  let text = translation[key];
  
  if (!text) {
    console.warn(`Translation key not found: ${key} for language: ${language}`);
    text = translations.ru[key] || key;
  }
  
  // Замена параметров
  if (typeof text === 'string' && params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
  }
  
  return text;
}

// Получить перевод для конкретного языка
function tLang(language, key, params = {}) {
  const translation = translations[language];
  
  if (!translation) {
    console.warn(`Translation not found for language: ${language}`);
    return translations.ru[key] || key;
  }
  
  let text = translation[key];
  
  if (!text) {
    console.warn(`Translation key not found: ${key} for language: ${language}`);
    text = translations.ru[key] || key;
  }
  
  // Замена параметров
  if (typeof text === 'string' && params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
  }
  
  return text;
}

// Получить все доступные языки
function getAvailableLanguages() {
  return Object.keys(translations);
}

// Получить название языка
function getLanguageName(language) {
  return translations[language]?.languages?.[language] || language;
}

module.exports = {
  setUserLanguage,
  getUserLanguage,
  t,
  tLang,
  getAvailableLanguages,
  getLanguageName,
  translations
};
