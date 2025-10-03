import { createI18n } from 'vue-i18n';
import ru from './ru';
import en from './en';
import uz from './uz';
import zh from './zh';
import ko from './ko';

const STORAGE_KEY = 'locale';

function detectLocale(): string {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (saved) return saved;
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'ru';
  if (nav.startsWith('ru')) return 'ru';
  if (nav.startsWith('uz')) return 'uz';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('ko')) return 'ko';
  return 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { ru, en, uz, zh, ko },
});

export function setLocale(locale: string) {
  i18n.global.locale.value = locale;
  try { localStorage.setItem(STORAGE_KEY, locale); } catch {}
}

export const locales = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'uz', label: "O'zbekcha" },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
];


