import { ref, readonly } from 'vue';
import { useI18n } from 'vue-i18n';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  autoClose?: boolean;
}

const notifications = ref<Notification[]>([]);
let nextId = 1;

function useNotifications() {
  const { t } = useI18n();

  function addNotification(notification: Omit<Notification, 'id'>) {
    const id = `notification-${nextId++}`;
    const newNotification: Notification = {
      id,
      duration: 5000,
      autoClose: true,
      ...notification
    };
    
    notifications.value.push(newNotification);
    
    // Автоматически удаляем уведомление после указанного времени
    if (newNotification.autoClose && newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex((n: Notification) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }

  function clearAll() {
    notifications.value = [];
  }

  // Удобные методы для разных типов уведомлений
  function success(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'success',
      title,
      message,
      duration
    });
  }

  function error(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'error',
      title,
      message,
      duration
    });
  }

  function warning(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  function info(title: string, message: string, duration?: number) {
    return addNotification({
      type: 'info',
      title,
      message,
      duration
    });
  }

  // Специальные методы для cookie banner
  function cookieConsentCleared() {
    return success(
      t('notifications.cookieConsentCleared.title'),
      t('notifications.cookieConsentCleared.message')
    );
  }

  function cookieConsentSet() {
    return success(
      t('notifications.cookieConsentSet.title'),
      t('notifications.cookieConsentSet.message')
    );
  }

  function promoCodeNotFound() {
    return error(
      t('notifications.promoCodeNotFound.title'),
      t('notifications.promoCodeNotFound.message')
    );
  }

  function promoCodeApplied(code: string) {
    return success(
      t('notifications.promoCodeApplied.title'),
      t('notifications.promoCodeApplied.message', { code })
    );
  }

  function promoCodeInvalid() {
    return warning(
      t('notifications.promoCodeInvalid.title'),
      t('notifications.promoCodeInvalid.message')
    );
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    cookieConsentCleared,
    cookieConsentSet,
    promoCodeNotFound,
    promoCodeApplied,
    promoCodeInvalid
  };
}

// Экспортируем функцию
export { useNotifications };
