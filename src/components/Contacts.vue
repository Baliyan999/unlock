<template>
  <section class="container py-12 sm:py-16" aria-labelledby="contacts-title">
    <div class="text-center mb-12">
      <h2 id="contacts-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('contacts.title') }}</h2>
    </div>
    
    <div class="glass-contacts-container">
      <div class="glass-contacts-inner">
        <!-- Contacts Info -->
        <div class="glass-contacts-info">
          <div class="glass-contacts-header">
            <div class="glass-contacts-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="glass-contacts-title">Как нас найти</h3>
          </div>
          
          <div class="glass-contacts-grid">
            <!-- Phone -->
            <div class="glass-contact-item">
              <div class="glass-contact-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div class="glass-contact-content">
                <div class="glass-contact-label">{{ $t('contacts.phone') }}</div>
                <div class="glass-contact-value">+998772686886</div>
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="glass-contact-item">
              <div class="glass-contact-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div class="glass-contact-content">
                <div class="glass-contact-label">{{ $t('contacts.whatsapp') }}</div>
                <div class="glass-contact-value">+998337170228</div>
              </div>
            </div>

            <!-- Telegram -->
            <div class="glass-contact-item glass-contact-item-full">
              <div class="glass-contact-icon">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div class="glass-contact-content">
                <div class="glass-contact-label">{{ $t('contacts.telegram') }}</div>
                <a href="https://t.me/test_my_assistant_123_bot" target="_blank" rel="noopener" class="glass-contact-link">@test_my_assistant_123_bot</a>
              </div>
            </div>

            <!-- Address -->
            <div class="glass-contact-item glass-contact-item-full">
              <div class="glass-contact-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="glass-contact-content">
                <div class="glass-contact-label">{{ $t('contacts.address') }}</div>
                <div class="glass-contact-value">{{ $t('contacts.placeholderAddress') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="glass-map-container">
          <div class="glass-map-header">
            <div class="glass-map-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
            </div>
            <h3 class="glass-map-title">Мы на карте</h3>
          </div>
          
          <div class="glass-map-wrapper">
            <iframe
              title="Карта UNLOCK"
              class="glass-map-iframe"
              loading="lazy"
              :src="getMapUrl()">
            </iframe>
            <div class="glass-map-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
  // Проверяем текущую тему
  isDark.value = document.documentElement.classList.contains('dark');
  
  // Следим за изменениями темы
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark');
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

function getMapUrl(): string {
  const baseUrl = 'https://yandex.ru/map-widget/v1/?ll=69.267618%2C41.304608&z=16&l=map&pt=69.267618%2C41.304608%2Cpm2rdm&scroll=false&zoom=16&zoomControl=true&zoomControlSize=small&zoomControlPosition=right&zoomControlOptions=5';
  
  // В темной теме используем более темные параметры
  if (isDark.value) {
    return baseUrl + '&theme=dark';
  }
  
  return baseUrl;
}
</script>

<style scoped>
/* Glass Contacts Container */
.glass-contacts-container {
  @apply relative overflow-hidden;
}

.glass-contacts-inner {
  @apply grid lg:grid-cols-2 gap-8 lg:gap-12;
}

/* Contacts Info Section */
.glass-contacts-info {
  @apply relative p-8 rounded-3xl;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-contacts-info:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-contacts-header {
  @apply flex items-center space-x-4 mb-8;
}

.glass-contacts-icon {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-contacts-title {
  @apply text-xl font-semibold text-gray-800 dark:text-white;
}

.glass-contacts-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-4;
}

.glass-contact-item {
  @apply flex items-start space-x-4 p-4 rounded-2xl;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.glass-contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.glass-contact-item-full {
  @apply sm:col-span-2;
}

.glass-contact-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-contact-content {
  @apply flex-1 min-w-0;
}

.glass-contact-label {
  @apply text-sm font-medium text-gray-600 dark:text-gray-400 mb-1;
}

.glass-contact-value {
  @apply text-base font-semibold text-gray-800 dark:text-white;
}

.glass-contact-link {
  @apply text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors;
}

/* Map Section */
.glass-map-container {
  @apply relative p-8 rounded-3xl;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-map-container:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-map-header {
  @apply flex items-center space-x-4 mb-6;
}

.glass-map-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-map-title {
  @apply text-lg font-semibold text-gray-800 dark:text-white;
}

.glass-map-wrapper {
  @apply relative rounded-2xl overflow-hidden;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-map-iframe {
  @apply w-full h-80 rounded-2xl;
  border: none;
  filter: brightness(1.1) contrast(1.05);
  transition: all 0.3s ease;
}

.glass-map-iframe:hover {
  filter: brightness(1.2) contrast(1.1);
}

.glass-map-overlay {
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
  border-radius: 1rem;
}

/* Dark theme adjustments */
.dark .glass-contacts-info {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-contacts-info:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark .glass-contact-item {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-contact-item:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark .glass-map-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-map-container:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark .glass-map-iframe {
  filter: brightness(0.8) contrast(1.2);
}

.dark .glass-map-iframe:hover {
  filter: brightness(0.9) contrast(1.3);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .glass-contacts-inner {
    @apply grid-cols-1 gap-6;
  }
  
  .glass-contacts-info,
  .glass-map-container {
    @apply p-6;
  }
}

@media (max-width: 640px) {
  .glass-contacts-info,
  .glass-map-container {
    @apply p-4;
  }
  
  .glass-contacts-grid {
    @apply grid-cols-1;
  }
  
  .glass-contact-item-full {
    @apply col-span-1;
  }
}
</style>

