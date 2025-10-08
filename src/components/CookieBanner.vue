<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 transform translate-y-full"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-full"
  >
    <div
      v-if="!consent"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="max-w-7xl mx-auto">
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm">
          <!-- Основной контент -->
          <div class="p-4 sm:p-6 lg:p-8">
            <!-- Заголовок и иконка -->
            <div class="flex items-start gap-4 mb-4">
              <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ $t('cookies.title') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ $t('cookies.description') }}
                </p>
              </div>
            </div>

            <!-- Детальная информация (скрыта по умолчанию) -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="showDetails" class="mb-6 overflow-hidden">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ $t('cookies.necessary') }}
                    </span>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('cookies.alwaysActive') }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ $t('cookies.analytics') }}
                    </span>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('cookies.optional') }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ $t('cookies.marketing') }}
                    </span>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('cookies.optional') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Кнопки действий -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <!-- Кнопка "Подробнее" -->
              <button
                @click="toggleDetails"
                class="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {{ showDetails ? $t('cookies.showLess') : $t('cookies.showMore') }}
              </button>

              <!-- Кнопка "Отклонить" -->
              <button
                @click="decline"
                class="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {{ $t('cookies.decline') }}
              </button>

              <!-- Кнопка "Принять все" -->
              <button
                @click="acceptAll"
                class="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {{ $t('cookies.acceptAll') }}
              </button>
            </div>

            <!-- Ссылка на политику конфиденциальности -->
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
                {{ $t('cookies.privacyText') }}
                <RouterLink
                  to="/privacy"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors duration-200"
                >
                  {{ $t('cookies.privacyLink') }}
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotifications } from '../composables/useNotifications';

const { t: _t } = useI18n();
const { cookieConsentSet } = useNotifications();

const STORAGE_KEY = 'cookie-consent';
const consent = ref<boolean>(false);
const showDetails = ref<boolean>(false);

onMounted(() => {
  // Проверяем, есть ли уже согласие
  const savedConsent = localStorage.getItem(STORAGE_KEY);
  if (savedConsent === null) {
    // Если согласия нет, показываем баннер
    consent.value = false;
  } else {
    // Если согласие есть, скрываем баннер
    consent.value = true;
  }
});

function toggleDetails() {
  showDetails.value = !showDetails.value;
}

function acceptAll() {
  localStorage.setItem(STORAGE_KEY, '1');
  localStorage.setItem('cookie-preferences', JSON.stringify({
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString()
  }));
  consent.value = true;
  
  // Показываем уведомление
  cookieConsentSet();
  
  // Здесь можно добавить инициализацию аналитики
  initializeAnalytics();
}

function decline() {
  localStorage.setItem(STORAGE_KEY, '0');
  localStorage.setItem('cookie-preferences', JSON.stringify({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString()
  }));
  consent.value = true;
  
  // Показываем уведомление
  cookieConsentSet();
}

function initializeAnalytics() {
  // Инициализация Google Analytics или других аналитических сервисов
  // Это будет выполнено только после согласия пользователя
  console.log('Analytics initialized with user consent');
}
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Улучшенные тени */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Анимация для кнопок */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

button:hover::before {
  left: 100%;
}

/* Стили для темной темы */
.dark .shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .fixed {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Улучшенная анимация для деталей */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}
</style>