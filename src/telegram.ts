// src/telegram.ts
import type { TelegramWebApp, TelegramUser } from './types/telegram';

export function tg(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp ?? null;
}

export function boot(): TelegramWebApp | null {
  const w = tg();
  if (!w) return null;
  
  try {
    w.expand();
    w.ready();
    return w;
  } catch (error) {
    console.warn('[Telegram WebApp] Boot failed:', error);
    return null;
  }
}

export const initData = (): string => {
  const w = tg();
  return w?.initData || "";
};

export const userUnsafe = (): TelegramUser | null => {
  const w = tg();
  return w?.initDataUnsafe?.user || null;
};

export const startParam = (): string | null => {
  const w = tg();
  return w?.initDataUnsafe?.start_param || null;
};

export const isInTelegram = (): boolean => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
};

export const getTheme = (): 'light' | 'dark' => {
  const w = tg();
  return w?.colorScheme || 'light';
};
