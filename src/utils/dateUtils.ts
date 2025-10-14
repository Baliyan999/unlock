// Утилиты для работы с датами в часовом поясе Ташкента (UTC+5)

/**
 * Конвертирует UTC время в время Ташкента
 */
export function utcToTashkent(utcDate: string | Date | null | undefined): Date {
  // Проверяем на null/undefined
  if (!utcDate) {
    return new Date();
  }
  
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  
  // Проверяем, что дата валидна
  if (isNaN(date.getTime())) {
    return new Date();
  }
  
  // Ташкент UTC+5
  const tashkentOffset = 5 * 60; // 5 часов в минутах
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utcTime + (tashkentOffset * 60000));
}

/**
 * Получает текущее время в часовом поясе Ташкента
 */
export function getTashkentNow(): Date {
  const now = new Date();
  return utcToTashkent(now);
}

/**
 * Форматирует дату для отображения в часовом поясе Ташкента
 */
export function formatDateTashkent(dateString: string | null | undefined, locale: string = 'ru-RU'): string {
  if (!dateString) {
    return 'Дата не указана';
  }
  
  const tashkentDate = utcToTashkent(dateString);
  return tashkentDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tashkent'
  });
}

/**
 * Форматирует дату и время для отображения в часовом поясе Ташкента
 */
export function formatDateTimeTashkent(dateString: string | null | undefined, locale: string = 'ru-RU'): string {
  if (!dateString) {
    return 'Дата не указана';
  }
  
  const tashkentDate = utcToTashkent(dateString);
  return tashkentDate.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tashkent'
  });
}

/**
 * Получает текущую дату в формате YYYY-MM-DD для Ташкента
 */
export function getTashkentDateString(): string {
  const tashkentDate = getTashkentNow();
  return tashkentDate.toISOString().split('T')[0];
}

/**
 * Получает текущую дату и время в ISO формате для Ташкента
 */
export function getTashkentISOString(): string {
  const tashkentDate = getTashkentNow();
  return tashkentDate.toISOString();
}

