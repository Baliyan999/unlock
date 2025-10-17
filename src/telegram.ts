// src/telegram.ts
export function tg() {
  return (window as any)?.Telegram?.WebApp ?? null;
}
export function boot() {
  const w = tg(); if (!w) return null;
  try { w.expand(); w.ready(); return w; } catch { return null; }
}
export const initData = () => tg()?.initData || "";
export const userUnsafe = () => tg()?.initDataUnsafe?.user || null;
export const startParam = () => tg()?.initDataUnsafe?.start_param || null;
