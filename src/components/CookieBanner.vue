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
      class="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="cookie-banner-content">
        <div class="cookie-banner-card">
          <!-- Основной контент -->
          <div class="cookie-banner-body">
            <!-- Заголовок и иконка -->
            <div class="cookie-banner-header">
              <div class="cookie-banner-icon">
                <svg class="cookie-banner-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="cookie-banner-text">
                <h3 class="cookie-banner-title">
                  {{ $t('cookies.title') }}
                </h3>
                <p class="cookie-banner-description">
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
              <div v-if="showDetails" class="cookie-banner-details">
                <div class="cookie-banner-details-content">
                  <div class="cookie-banner-detail-item">
                    <span class="cookie-banner-detail-label">
                      {{ $t('cookies.necessary') }}
                    </span>
                    <div class="cookie-banner-detail-status">
                      <div class="cookie-banner-detail-dot bg-green-500"></div>
                      <span class="cookie-banner-detail-text">{{ $t('cookies.alwaysActive') }}</span>
                    </div>
                  </div>
                  <div class="cookie-banner-detail-item">
                    <span class="cookie-banner-detail-label">
                      {{ $t('cookies.analytics') }}
                    </span>
                    <div class="cookie-banner-detail-status">
                      <div class="cookie-banner-detail-dot bg-blue-500"></div>
                      <span class="cookie-banner-detail-text">{{ $t('cookies.optional') }}</span>
                    </div>
                  </div>
                  <div class="cookie-banner-detail-item">
                    <span class="cookie-banner-detail-label">
                      {{ $t('cookies.marketing') }}
                    </span>
                    <div class="cookie-banner-detail-status">
                      <div class="cookie-banner-detail-dot bg-purple-500"></div>
                      <span class="cookie-banner-detail-text">{{ $t('cookies.optional') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Кнопки действий -->
            <div class="cookie-banner-actions">
              <!-- Кнопка "Подробнее" -->
              <button
                @click="toggleDetails"
                class="cookie-banner-btn cookie-banner-btn-secondary"
              >
                {{ showDetails ? $t('cookies.showLess') : $t('cookies.showMore') }}
              </button>

              <!-- Кнопка "Отклонить" -->
              <button
                @click="decline"
                class="cookie-banner-btn cookie-banner-btn-decline"
              >
                {{ $t('cookies.decline') }}
              </button>

              <!-- Кнопка "Принять все" -->
              <button
                @click="acceptAll"
                class="cookie-banner-btn cookie-banner-btn-primary"
              >
                {{ $t('cookies.acceptAll') }}
              </button>
            </div>

            <!-- Ссылка на политику конфиденциальности -->
            <div class="cookie-banner-footer">
              <p class="cookie-banner-footer-text">
                {{ $t('cookies.privacyText') }}
                <RouterLink
                  to="/privacy"
                  class="cookie-banner-footer-link"
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
import { getTashkentISOString } from '@/utils/dateUtils';

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
    timestamp: getTashkentISOString()
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
    timestamp: getTashkentISOString()
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
/* Основной контейнер баннера */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0.5rem;
}

.cookie-banner-content {
  max-width: 48rem; /* max-w-3xl */
  margin: 0 auto;
}

.cookie-banner-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

.dark .cookie-banner-card {
  background: #1f2937;
  border-color: #374151;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Тело баннера */
.cookie-banner-body {
  padding: 1rem;
}

/* Заголовок */
.cookie-banner-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.cookie-banner-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background: #dbeafe;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .cookie-banner-icon {
  background: rgba(59, 130, 246, 0.2);
}

.cookie-banner-icon-svg {
  width: 1rem;
  height: 1rem;
  color: #2563eb;
}

.dark .cookie-banner-icon-svg {
  color: #60a5fa;
}

.cookie-banner-text {
  flex: 1;
  min-width: 0;
}

.cookie-banner-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.dark .cookie-banner-title {
  color: white;
}

.cookie-banner-description {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

.dark .cookie-banner-description {
  color: #d1d5db;
}

/* Детали */
.cookie-banner-details {
  margin-bottom: 1rem;
  overflow: hidden;
}

.cookie-banner-details-content {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dark .cookie-banner-details-content {
  background: rgba(55, 65, 81, 0.5);
}

.cookie-banner-detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cookie-banner-detail-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.dark .cookie-banner-detail-label {
  color: #d1d5db;
}

.cookie-banner-detail-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.cookie-banner-detail-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

.cookie-banner-detail-text {
  font-size: 0.625rem;
  color: #6b7280;
}

.dark .cookie-banner-detail-text {
  color: #9ca3af;
}

/* Кнопки */
.cookie-banner-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.cookie-banner-btn {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cookie-banner-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.3s ease;
}

.cookie-banner-btn:hover::before {
  left: 100%;
}

.cookie-banner-btn-secondary {
  color: #6b7280;
  background: transparent;
  border: 1px solid #d1d5db;
}

.cookie-banner-btn-secondary:hover {
  color: #374151;
  background: #f9fafb;
}

.dark .cookie-banner-btn-secondary {
  color: #9ca3af;
  border-color: #4b5563;
}

.dark .cookie-banner-btn-secondary:hover {
  color: #d1d5db;
  background: #374151;
}

.cookie-banner-btn-decline {
  color: #374151;
  background: #f3f4f6;
}

.cookie-banner-btn-decline:hover {
  background: #e5e7eb;
}

.dark .cookie-banner-btn-decline {
  color: #d1d5db;
  background: #374151;
}

.dark .cookie-banner-btn-decline:hover {
  background: #4b5563;
}

.cookie-banner-btn-primary {
  color: white;
  background: #2563eb;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cookie-banner-btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Футер */
.cookie-banner-footer {
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.dark .cookie-banner-footer {
  border-color: #374151;
}

.cookie-banner-footer-text {
  font-size: 0.625rem;
  color: #6b7280;
  text-align: center;
  line-height: 1.4;
}

.dark .cookie-banner-footer-text {
  color: #9ca3af;
}

.cookie-banner-footer-link {
  color: #2563eb;
  text-decoration: underline;
  transition: color 0.2s;
}

.cookie-banner-footer-link:hover {
  color: #1d4ed8;
}

.dark .cookie-banner-footer-link {
  color: #60a5fa;
}

.dark .cookie-banner-footer-link:hover {
  color: #93c5fd;
}

/* Адаптивность для планшетов */
@media (min-width: 640px) {
  .cookie-banner {
    padding: 1rem;
  }
  
  .cookie-banner-body {
    padding: 1.5rem;
  }
  
  .cookie-banner-header {
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .cookie-banner-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .cookie-banner-icon-svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .cookie-banner-title {
    font-size: 1rem;
  }
  
  .cookie-banner-description {
    font-size: 0.875rem;
  }
  
  .cookie-banner-actions {
    flex-direction: row;
    gap: 0.75rem;
  }
  
  .cookie-banner-btn {
    flex: 1;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }
  
  .cookie-banner-btn-secondary {
    flex: none;
  }
}

/* Адаптивность для десктопа */
@media (min-width: 1024px) {
  .cookie-banner-content {
    max-width: 56rem; /* max-w-4xl */
  }
  
  .cookie-banner-body {
    padding: 2rem;
  }
  
  .cookie-banner-header {
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .cookie-banner-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .cookie-banner-icon-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .cookie-banner-title {
    font-size: 1.125rem;
  }
  
  .cookie-banner-description {
    font-size: 1rem;
  }
  
  .cookie-banner-actions {
    gap: 1rem;
  }
  
  .cookie-banner-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

/* Адаптивность для очень маленьких экранов */
@media (max-width: 375px) {
  .cookie-banner {
    padding: 0.25rem;
  }
  
  .cookie-banner-body {
    padding: 0.75rem;
  }
  
  .cookie-banner-header {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .cookie-banner-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .cookie-banner-icon-svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .cookie-banner-title {
    font-size: 0.75rem;
  }
  
  .cookie-banner-description {
    font-size: 0.625rem;
  }
  
  .cookie-banner-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.625rem;
  }
  
  .cookie-banner-footer-text {
    font-size: 0.5rem;
  }
}

/* Ландшафтная ориентация на мобильных */
@media (max-height: 500px) and (orientation: landscape) {
  .cookie-banner {
    bottom: 0.25rem;
    padding: 0.25rem;
  }
  
  .cookie-banner-body {
    padding: 0.75rem;
  }
  
  .cookie-banner-header {
    margin-bottom: 0.75rem;
  }
  
  .cookie-banner-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .cookie-banner-icon-svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .cookie-banner-title {
    font-size: 0.75rem;
  }
  
  .cookie-banner-description {
    font-size: 0.625rem;
  }
  
  .cookie-banner-actions {
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .cookie-banner-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.625rem;
  }
  
  .cookie-banner-footer {
    padding-top: 0.5rem;
  }
  
  .cookie-banner-footer-text {
    font-size: 0.5rem;
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