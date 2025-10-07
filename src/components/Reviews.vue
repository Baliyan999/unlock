<template>
  <section id="reviews" class="container py-12 sm:py-16" aria-labelledby="reviews-title">
    <div class="text-center mb-12">
      <h2 id="reviews-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('reviews.title') }}</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('reviews.subtitle') }}</p>
      
      <!-- Кнопка "Оставить отзыв" -->
      <a 
        :href="telegramBotUrl" 
        target="_blank" 
        rel="noopener"
        class="glass-review-button group"
      >
        <span class="glass-review-button-content">
          <svg class="glass-review-button-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {{ $t('reviews.leaveReview') }}
        </span>
      </a>
    </div>

    <div class="mt-6">
      <UiCarousel :items="items" :interval-ms="4000" aria-label="Слайдер отзывов">
        <template #default="{ item }">
          <article class="glass-review-card group">
            <div class="glass-review-inner">
              <!-- Quote icon -->
              <div class="glass-quote-icon">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9.983z"/>
                </svg>
              </div>
              
              <!-- Review content -->
              <div class="glass-review-content">
                <div class="glass-review-text">
                  "{{ (item as Review).text }}"
                </div>
                
                <!-- Author info -->
                <div class="glass-review-author">
                  <div class="glass-author-avatar">
                    {{ (item as Review).author.charAt(0) }}
                  </div>
                  <div class="glass-author-info">
                    <div class="glass-author-name">
                      {{ (item as Review).author }}
                      <span v-if="(item as Review).is_student" class="glass-student-crown">👑</span>
                    </div>
                    <div class="glass-author-role">
                      {{ (item as Review).is_student ? 'Студент UNLOCK' : 'Пользователь' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Stars -->
              <div class="glass-stars">
                <svg v-for="i in 5" :key="i" class="glass-star" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </article>
        </template>
      </UiCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiCarousel from './Ui/Carousel.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';

type Review = { 
  id: number;
  text: string; 
  author: string;
  rating: number;
  date: string;
  stars: number;
};

const { tm, t } = useI18n();

// Статические отзывы из i18n
const staticItems = tm('reviews.list') as unknown as Review[];

// Динамические отзывы из API
const apiItems = ref<Review[]>([]);
const items = computed(() => [...apiItems.value, ...staticItems]);

// URL Telegram бота
const telegramBotUrl = computed(() => {
  const botUrl = import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/test_my_assistant_123_bot';
  return `${botUrl}?start=review`;
});

// Загрузка отзывов из API
async function loadReviews() {
  try {
    // Пробуем разные URL для API
    const apiUrls = [
      'http://localhost:3001/api/reviews',
      '/api/reviews'
    ];
    
    let response = null;
    for (const url of apiUrls) {
      try {
        response = await fetch(url);
        if (response.ok) break;
      } catch (e) {
        console.log(`Не удалось подключиться к ${url}`);
      }
    }
    
    if (response && response.ok) {
      const data = await response.json();
      
      if (data.success && data.data) {
        apiItems.value = data.data;
        console.log('✅ Отзывы загружены из API:', data.data.length);
      }
    } else {
      console.log('⚠️ API недоступен, используем статические отзывы');
    }
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error);
    console.log('⚠️ Используем статические отзывы');
  }
}

onMounted(() => {
  loadReviews();
});
</script>

<style scoped>
/* Liquid Glass Apple Style for Reviews */
.glass-review-card {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-review-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.glass-review-inner {
  @apply p-8 relative z-10;
}

.glass-quote-icon {
  @apply absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-quote-icon svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-review-content {
  @apply mb-6;
}

.glass-review-text {
  @apply text-gray-700 dark:text-gray-200 text-lg leading-relaxed italic mb-6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-review-author {
  @apply flex items-center space-x-4;
}

.glass-author-avatar {
  @apply w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.glass-author-info {
  @apply flex-1;
}

.glass-author-name {
  @apply font-semibold text-gray-900 dark:text-white text-lg;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-author-role {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.glass-student-crown {
  @apply ml-2 text-lg;
  animation: crown-glow 2s ease-in-out infinite;
}

@keyframes crown-glow {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.1);
  }
}

.glass-stars {
  @apply absolute bottom-6 right-6 flex space-x-1;
}

.glass-star {
  @apply w-5 h-5;
  color: #fbbf24;
  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
  animation: twinkle 2s ease-in-out infinite;
}

.glass-star:nth-child(1) { animation-delay: 0s; }
.glass-star:nth-child(2) { animation-delay: 0.2s; }
.glass-star:nth-child(3) { animation-delay: 0.4s; }
.glass-star:nth-child(4) { animation-delay: 0.6s; }
.glass-star:nth-child(5) { animation-delay: 0.8s; }

@keyframes twinkle {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.1);
  }
}

/* Dark theme adjustments */
.dark .glass-review-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-review-card:hover {
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-quote-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-review-inner {
    @apply p-6;
  }
  
  .glass-quote-icon {
    @apply top-4 right-4 w-10 h-10;
  }
  
  .glass-quote-icon svg {
    @apply w-6 h-6;
  }
  
  .glass-stars {
    @apply bottom-4 right-4;
  }
  
  .glass-star {
    @apply w-4 h-4;
  }
}

/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1024px) {
  .glass-review-inner {
    @apply p-7;
  }
  
  .glass-quote-icon {
    @apply top-5 right-5 w-12 h-12;
  }
  
  .glass-quote-icon svg {
    @apply w-7 h-7;
  }
  
  .glass-stars {
    @apply bottom-5 right-5;
  }
  
  .glass-star {
    @apply w-5 h-5;
  }
  
  .glass-review-text {
    @apply text-sm leading-relaxed;
  }
  
  .glass-review-author {
    @apply text-sm;
  }
  
  .glass-review-rating {
    @apply text-sm;
  }
}

/* Large tablet styles */
@media (min-width: 1025px) and (max-width: 1200px) {
  .glass-review-inner {
    @apply p-8;
  }
  
  .glass-quote-icon {
    @apply top-6 right-6 w-14 h-14;
  }
  
  .glass-quote-icon svg {
    @apply w-8 h-8;
  }
  
  .glass-stars {
    @apply bottom-6 right-6;
  }
  
  .glass-star {
    @apply w-6 h-6;
  }
  
  .glass-review-text {
    @apply text-base leading-relaxed;
  }
  
  .glass-review-author {
    @apply text-base;
  }
  
  .glass-review-rating {
    @apply text-base;
  }
}

/* Кнопка "Оставить отзыв" */
.glass-review-button {
  @apply relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #059669;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-review-button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));
  border-color: rgba(34, 197, 94, 0.4);
  color: #047857;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-review-button:active {
  transform: translateY(0);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-review-button-content {
  @apply flex items-center space-x-3;
}

.glass-review-button-icon {
  @apply w-5 h-5;
}

/* Dark theme для кнопки */
.dark .glass-review-button {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));
  border-color: rgba(34, 197, 94, 0.4);
  color: #4ade80;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-review-button:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4));
  border-color: rgba(34, 197, 94, 0.5);
  color: #6ee7b7;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
</style>


