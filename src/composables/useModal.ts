import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export interface ModalOptions {
  title: string;
  message: string;
  type?: 'warning' | 'error' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  closable?: boolean;
  closeOnBackdrop?: boolean;
}

export interface ModalState {
  visible: boolean;
  options: ModalOptions;
  resolve?: (value: boolean) => void;
}

const modalState = ref<ModalState>({
  visible: false,
  options: {
    title: '',
    message: ''
  }
});

export function useModal() {
  const { t } = useI18n();

  function showModal(options: ModalOptions): Promise<boolean> {
    return new Promise((resolve) => {
      modalState.value = {
        visible: true,
        options,
        resolve
      };
    });
  }

  function hideModal() {
    modalState.value.visible = false;
    if (modalState.value.resolve) {
      modalState.value.resolve(false);
    }
  }

  function confirmModal() {
    modalState.value.visible = false;
    if (modalState.value.resolve) {
      modalState.value.resolve(true);
    }
  }

  // Удобные методы для разных типов модальных окон
  function confirm(options: Omit<ModalOptions, 'type'>): Promise<boolean> {
    return showModal({
      ...options,
      type: 'warning',
      confirmText: options.confirmText || t('modal.confirm'),
      cancelText: options.cancelText || t('modal.cancel')
    });
  }

  function alert(options: Omit<ModalOptions, 'type' | 'showCancel'>): Promise<boolean> {
    return showModal({
      ...options,
      type: 'info',
      showCancel: false,
      confirmText: options.confirmText || t('modal.ok')
    });
  }

  function warning(options: Omit<ModalOptions, 'type'>): Promise<boolean> {
    return showModal({
      ...options,
      type: 'warning',
      confirmText: options.confirmText || t('modal.confirm'),
      cancelText: options.cancelText || t('modal.cancel')
    });
  }

  function error(options: Omit<ModalOptions, 'type'>): Promise<boolean> {
    return showModal({
      ...options,
      type: 'error',
      confirmText: options.confirmText || t('modal.ok'),
      cancelText: options.cancelText || t('modal.cancel')
    });
  }

  function success(options: Omit<ModalOptions, 'type'>): Promise<boolean> {
    return showModal({
      ...options,
      type: 'success',
      confirmText: options.confirmText || t('modal.ok'),
      cancelText: options.cancelText || t('modal.cancel')
    });
  }

  // Специальные методы для конкретных случаев
  function confirmLeaveTest(): Promise<boolean> {
    return confirm({
      title: t('modal.confirmLeaveTest.title'),
      message: t('modal.confirmLeaveTest.message')
    });
  }

  function confirmDelete(): Promise<boolean> {
    return showModal({
      title: t('modal.confirmDelete.title'),
      message: t('modal.confirmDelete.message'),
      type: 'error',
      confirmText: t('modal.confirm'),
      cancelText: t('modal.cancel')
    });
  }

  function confirmSave(): Promise<boolean> {
    return confirm({
      title: t('modal.confirmSave.title'),
      message: t('modal.confirmSave.message')
    });
  }

  return {
    modalState,
    showModal,
    hideModal,
    confirmModal,
    confirm,
    alert,
    warning,
    error,
    success,
    confirmLeaveTest,
    confirmDelete,
    confirmSave
  };
}
