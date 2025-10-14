<template>
  <section id="reviews" class="container py-12 sm:py-16" aria-labelledby="reviews-title">
    <div class="text-center mb-12">
      <h2 id="reviews-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('reviews.title') }}</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('reviews.subtitle') }}</p>
      
      <!-- Кнопка "Оставить отзыв" - только для авторизованных пользователей -->
      <button 
        v-if="authStore && authStore.isAuthenticated"
        @click="showReviewModal = true"
        class="glass-review-button group"
      >
        <span class="glass-review-button-content">
          <svg class="glass-review-button-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {{ $t('reviews.leaveReview') }}
        </span>
      </button>
      
      <!-- Сообщение для неавторизованных пользователей -->
      <div v-else class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-md mx-auto">
        <div class="flex items-center justify-center space-x-2 text-blue-700 dark:text-blue-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span class="text-sm font-medium">{{ $t('reviews.loginRequired') }}</span>
        </div>
        <p class="text-xs text-blue-600 dark:text-blue-400 text-center mt-2">
          {{ $t('reviews.loginToReview') }}
        </p>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Отзывы -->
    <div v-else-if="reviews.length > 0" class="mt-6">
      <UiCarousel :items="reviews" :interval-ms="10000" aria-label="Слайдер отзывов">
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
                <!-- Image if present -->
                <div v-if="item.image_url" class="glass-review-image mb-4">
                  <img
                    :src="item.image_url"
                    :alt="`Изображение от ${item.author}`"
                    class="w-full h-48 object-cover rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                  />
                </div>
                
                <div class="glass-review-text">
                  "{{ item.text }}"
                </div>
                
                <!-- Author info -->
                <div class="glass-review-author">
                  <div class="glass-author-avatar">
                    {{ item.author.charAt(0).toUpperCase() }}
                  </div>
                  <div class="glass-author-info">
                    <div class="glass-author-name">
                      {{ item.author }}
                      <span v-if="item.is_student" class="glass-student-crown">👑</span>
                    </div>
                    <div class="glass-author-role">
                      {{ item.is_student ? $t('reviews.studentLabel') : $t('reviews.userLabel') }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Stars -->
              <div class="glass-stars">
                <svg 
                  v-for="i in 5" 
                  :key="i" 
                  class="glass-star" 
                  :class="{ 'glass-star-filled': i <= item.rating }"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </article>
        </template>
      </UiCarousel>
    </div>

    <!-- Нет отзывов -->
    <div v-else class="text-center py-12">
      <div class="glass-review-card max-w-md mx-auto">
        <div class="glass-review-inner text-center">
          <div class="glass-quote-icon mx-auto mb-4">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ $t('reviews.noReviews') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ $t('reviews.beFirst') }}
          </p>
          <button 
            @click="showReviewModal = true"
            class="glass-review-button group"
          >
            <span class="glass-review-button-content">
              <svg class="glass-review-button-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {{ $t('reviews.leaveReview') }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно для отзыва -->
    <ReviewModal 
      :is-open="showReviewModal" 
      @close="showReviewModal = false"
      @success="handleReviewSuccess"
    />
  </section>
</template>

<script setup lang="ts">
import UiCarousel from './Ui/Carousel.vue';
import ReviewModal from './ReviewModal.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import api from '@/lib/api';
import type { Review } from '@/types/auth';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n();
const authStore = useAuthStore();

// Состояние
const showReviewModal = ref(false);
const reviews = ref<Review[]>([]);
const isLoading = ref(true);

// Загрузка отзывов из API
async function loadReviews() {
  try {
    isLoading.value = true;
    const response = await api.get('/reviews/public');
    reviews.value = response.data;
    console.log('✅ Отзывы загружены:', reviews.value.length);
    console.log('📊 Reviews data:', reviews.value);
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error);
    reviews.value = [];
  } finally {
    isLoading.value = false;
  }
}

// Обработка успешной отправки отзыва
function handleReviewSuccess() {
  // Перезагружаем отзывы после успешной отправки
  loadReviews();
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

.glass-review-image {
  @apply relative overflow-hidden rounded-xl;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.glass-review-image img {
  transition: transform 0.3s ease;
}

.glass-review-image:hover img {
  transform: scale(1.02);
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
  color: #d1d5db;
  transition: all 0.2s ease;
}

.glass-star-filled {
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-review-inner {
    padding: 1.5rem;
  }
  
  .glass-quote-icon {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .glass-quote-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .glass-stars {
    bottom: 1rem;
    right: 1rem;
  }
  
  .glass-star {
    width: 1rem;
    height: 1rem;
  }
}

@media (max-width: 320px) {
  .glass-review-inner {
    padding: 1rem;
  }
  
  .glass-quote-icon {
    top: 0.75rem;
    right: 0.75rem;
    width: 2rem;
    height: 2rem;
  }
  
  .glass-quote-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .glass-stars {
    bottom: 0.75rem;
    right: 0.75rem;
  }
  
  .glass-star {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .glass-review-text {
    font-size: 0.875rem;
  }
  
  .glass-author-name {
    font-size: 1rem;
  }
}
</style>