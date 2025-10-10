<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- 404 Иконка -->
      <div class="mb-8">
        <div class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          404
        </div>
        <div class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 mx-auto mb-6">
          <!-- Замените 404-image.png на название вашей картинки -->
          <img 
            src="/images/404-image.png" 
            alt="404 - Страница не найдена"
            class="w-full h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Заголовок -->
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('notFound.title') }}
      </h1>

      <!-- Описание -->
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {{ $t('notFound.description') }}
      </p>

      <!-- Кнопки действий -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="goHome"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {{ $t('notFound.goHome') }}
        </button>
        
        <button
          @click="goBack"
          class="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
        >
          {{ $t('notFound.goBack') }}
        </button>
      </div>

      <!-- Дополнительные ссылки -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {{ $t('notFound.orVisit') }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/calculator"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {{ $t('notFound.calculator') }}
          </router-link>
          <span class="text-gray-300 dark:text-gray-600">•</span>
          <router-link
            to="/test"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {{ $t('notFound.test') }}
          </router-link>
          <span class="text-gray-300 dark:text-gray-600">•</span>
          <router-link
            to="/blog"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {{ $t('notFound.blog') }}
          </router-link>
        </div>
      </div>

      <!-- Китайская мудрость -->
      <div class="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <p class="text-lg text-gray-700 dark:text-gray-300 italic mb-2">
          "{{ $t('notFound.wisdom') }}"
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          — {{ $t('notFound.wisdomAuthor') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
}

function handleImageError(event: Event) {
  // Если картинка не загрузилась, скрываем её
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
}
</script>

<style scoped>
/* Дополнительные стили для анимации */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.text-9xl {
  animation: float 3s ease-in-out infinite;
}

/* Градиентный текст */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
