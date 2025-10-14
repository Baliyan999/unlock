// Утилита для сбора аналитических данных пользователя

export interface UserAnalytics {
  ip_address?: string;
  country?: string;
  city?: string;
  browser_language?: string;
  device_type?: string;
  operating_system?: string;
  browser_name?: string;
  browser_version?: string;
  screen_resolution?: string;
}

// Определение типа устройства
function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/tablet|ipad/.test(userAgent)) {
    return 'tablet';
  } else if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}

// Определение операционной системы
function getOperatingSystem(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Windows')) {
    if (userAgent.includes('Windows NT 10.0')) return 'Windows 10/11';
    if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
    if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
    return 'Windows';
  } else if (userAgent.includes('Mac OS X')) {
    const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
    if (match) {
      const version = match[1].replace('_', '.');
      return `macOS ${version}`;
    }
    return 'macOS';
  } else if (userAgent.includes('Linux')) {
    return 'Linux';
  } else if (userAgent.includes('Android')) {
    const match = userAgent.match(/Android (\d+\.\d+)/);
    if (match) {
      return `Android ${match[1]}`;
    }
    return 'Android';
  } else if (userAgent.includes('iOS')) {
    const match = userAgent.match(/OS (\d+[._]\d+)/);
    if (match) {
      const version = match[1].replace('_', '.');
      return `iOS ${version}`;
    }
    return 'iOS';
  }
  
  return 'Unknown';
}

// Определение браузера и версии
function getBrowserInfo(): { name: string; version: string } {
  const userAgent = navigator.userAgent;
  
  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    return {
      name: 'Chrome',
      version: match ? match[1] : 'Unknown'
    };
  }
  
  // Firefox
  if (userAgent.includes('Firefox')) {
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    return {
      name: 'Firefox',
      version: match ? match[1] : 'Unknown'
    };
  }
  
  // Safari
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    return {
      name: 'Safari',
      version: match ? match[1] : 'Unknown'
    };
  }
  
  // Edge
  if (userAgent.includes('Edg')) {
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    return {
      name: 'Edge',
      version: match ? match[1] : 'Unknown'
    };
  }
  
  // Opera
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    const match = userAgent.match(/(?:Opera|OPR)\/(\d+\.\d+)/);
    return {
      name: 'Opera',
      version: match ? match[1] : 'Unknown'
    };
  }
  
  return {
    name: 'Unknown',
    version: 'Unknown'
  };
}

// Получение разрешения экрана
function getScreenResolution(): string {
  return `${screen.width}x${screen.height}`;
}

// Получение языка браузера
function getBrowserLanguage(): string {
  return navigator.language || navigator.languages?.[0] || 'Unknown';
}

// Основная функция для сбора аналитических данных
export async function collectUserAnalytics(): Promise<UserAnalytics> {
  const browserInfo = getBrowserInfo();
  
  const analytics: UserAnalytics = {
    browser_language: getBrowserLanguage(),
    device_type: getDeviceType(),
    operating_system: getOperatingSystem(),
    browser_name: browserInfo.name,
    browser_version: browserInfo.version,
    screen_resolution: getScreenResolution()
  };

  // Попытка получить IP и геолокацию (опционально)
  try {
    // Используем внешний сервис для получения IP и геолокации
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      analytics.ip_address = data.ip;
      analytics.country = data.country_name;
      analytics.city = data.city;
    }
  } catch (error) {
    console.warn('Не удалось получить IP и геолокацию:', error);
  }

  return analytics;
}

// Функция для получения IP без геолокации (более быстрая)
export async function getIPAddress(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    }
  } catch (error) {
    console.warn('Не удалось получить IP:', error);
  }
  return null;
}
