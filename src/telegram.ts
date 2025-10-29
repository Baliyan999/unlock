// Telegram WebApp integration
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
          };
          auth_date: number;
          hash: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        isVerticalSwipesEnabled: boolean;
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id?: string;
            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text?: string;
          }>;
        }, callback?: (buttonId: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        showScanQrPopup: (params: {
          text?: string;
        }, callback?: (text: string) => void) => void;
        closeScanQrPopup: () => void;
        readTextFromClipboard: (callback?: (text: string) => void) => void;
        requestWriteAccess: (callback?: (granted: boolean) => void) => void;
        requestContact: (callback?: (granted: boolean) => void) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        openInvoice: (url: string, callback?: (status: string) => void) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        mainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        backButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        hapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        cloudStorage: {
          setItem: (key: string, value: string, callback?: (error: string | null, result?: boolean) => void) => void;
          getItem: (key: string, callback: (error: string | null, result?: string) => void) => void;
          getItems: (keys: string[], callback: (error: string | null, result?: Record<string, string>) => void) => void;
          removeItem: (key: string, callback?: (error: string | null, result?: boolean) => void) => void;
          removeItems: (keys: string[], callback?: (error: string | null, result?: boolean) => void) => void;
          getKeys: (callback: (error: string | null, result?: string[]) => void) => void;
        };
        biometricManager: {
          isBiometricAvailable: boolean;
          biometricType: 'finger' | 'face' | 'unknown';
          isAccessRequested: boolean;
          isAccessGranted: boolean;
          isBiometricTokenSaved: boolean;
          isBiometricTokenChanged: boolean;
          isBiometricTokenInvalid: boolean;
          requestAccess: (params: {
            reason?: string;
          }, callback?: (granted: boolean) => void) => void;
          authenticate: (params: {
            reason?: string;
          }, callback?: (success: boolean) => void) => void;
          updateBiometricToken: (token: string, callback?: (updated: boolean) => void) => void;
          openSettings: () => void;
        };
      };
    };
  }
}

// Telegram WebApp instance
export const tg = window.Telegram?.WebApp;

// Initialize Telegram WebApp
export function boot() {
  if (tg) {
    tg.ready();
    tg.expand();
  }
}

// Get init data
export function initData() {
  return tg?.initData || '';
}

// Get user data
export function userUnsafe() {
  return tg?.initDataUnsafe?.user || null;
}

// Check if running in Telegram
export function isInTelegram() {
  return !!tg;
}

// Get start parameter
export function startParam() {
  // This would typically come from URL parameters or Telegram's start parameter
  return new URLSearchParams(window.location.search).get('start_param') || '';
}

// Get theme
export function getTheme() {
  return tg?.colorScheme || 'light';
}

// Set main button
export function setMainButton(text: string, onClick: () => void) {
  if (tg?.mainButton) {
    tg.mainButton.setText(text);
    tg.mainButton.onClick(onClick);
    tg.mainButton.show();
  }
}

// Hide main button
export function hideMainButton() {
  if (tg?.mainButton) {
    tg.mainButton.hide();
  }
}

// Show alert
export function showAlert(message: string) {
  if (tg) {
    tg.showAlert(message);
  } else {
    alert(message);
  }
}

// Show confirm
export function showConfirm(message: string, callback?: (confirmed: boolean) => void) {
  if (tg) {
    tg.showConfirm(message, callback);
  } else {
    const confirmed = confirm(message);
    callback?.(confirmed);
  }
}

// Haptic feedback
export function hapticImpact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') {
  tg?.hapticFeedback?.impactOccurred(style);
}

// Close app
export function closeApp() {
  if (tg) {
    tg.close();
  }
}
