import { createI18n } from 'vue-i18n';
import ru from './ru';
import en from './en';
import uz from './uz';
import zh from './zh';
import ko from './ko';

const STORAGE_KEY = 'locale';

function detectLocale(): string {
  if (typeof window === 'undefined') return 'ru';
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && ['ru', 'en', 'uz', 'zh', 'ko'].includes(saved)) {
    return saved;
  }
  
  const nav = navigator.language;
  if (nav.startsWith('ru')) return 'ru';
  if (nav.startsWith('uz')) return 'uz';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('en')) return 'en';
  
  return 'ru'; // По умолчанию русский
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { ru, en, uz, zh, ko },
});

export function setLocale(locale: 'ru' | 'en' | 'uz' | 'zh' | 'ko') {
  if (typeof window === 'undefined') return;
  
  // Проверяем, что локаль валидна
  if (!['ru', 'en', 'uz', 'zh', 'ko'].includes(locale)) {
    console.warn(`Invalid locale: ${locale}`);
    return;
  }
  
  // Устанавливаем локаль в i18n
  i18n.global.locale.value = locale;
  
  // Сохраняем в localStorage
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch (error) {
    console.warn('Failed to save locale to localStorage:', error);
  }
  
  // Обновляем атрибут lang в HTML
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
  
  // Принудительно обновляем все компоненты
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      // Отправляем событие для обновления всех компонентов
      window.dispatchEvent(new CustomEvent('locale-changed', { 
        detail: { locale } 
      }));
    }
  }, 50);
}

export const locales = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺', name: 'Русский' },
  { code: 'en', label: 'English', flag: '🇺🇸', name: 'English' },
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿', name: "O'zbekcha" },
  { code: 'zh', label: '中文', flag: '🇨🇳', name: '中文' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', name: '한국어' },
];


