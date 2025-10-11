<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div class="max-w-md w-full text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in">
      <!-- Иконка запрета -->
      <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      </div>

      <!-- Заголовок -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 animate-slide-down">
        403
      </h1>
      
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 animate-slide-up" style="animation-delay: 0.1s;">
        Доступ запрещен
      </h2>
      
      <p class="text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style="animation-delay: 0.2s;">
        У вас нет прав для доступа к этой странице. 
        <br class="hidden sm:block">
        Обратитесь к администратору для получения доступа.
      </p>

      <!-- Кнопки действий -->
      <div class="space-y-4 animate-slide-up" style="animation-delay: 0.3s;">
        <!-- Вернуться на главную -->
        <router-link 
          to="/" 
          class="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
        >
          <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Вернуться на главную
        </router-link>

        <!-- Войти в систему -->
        <router-link 
          to="/login" 
          class="inline-flex items-center justify-center w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 group"
        >
          <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
          Войти в систему
        </router-link>
      </div>

      <!-- Дополнительная информация -->
      <div class="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl animate-slide-up" style="animation-delay: 0.4s;">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm text-yellow-700 dark:text-yellow-300">
            Если вы считаете, что это ошибка, обратитесь к администратору
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Логируем попытку доступа для безопасности
  console.log('🚫 Попытка доступа к запрещенной странице:', {
    user: authStore.user?.email || 'неизвестен',
    role: authStore.user?.role || 'неизвестна',
    timestamp: new Date().toISOString()
  })
})
</script>

<style scoped>
/* Custom animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
.animate-slide-down { animation: slide-down 0.6s ease-out forwards; }
.animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
.animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }

/* Responsive adjustments for very small screens */
@media (max-width: 320px) {
  .max-w-md {
    max-width: 100%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 1rem;
  }
  .text-4xl { font-size: 2.5rem; }
  .text-5xl { font-size: 3rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .w-20.h-20 { width: 4rem; height: 4rem; }
  .w-10.h-10 { width: 2rem; height: 2rem; }
  .py-3 { padding-top: 0.6rem; padding-bottom: 0.6rem; }
  .px-6 { padding-left: 1rem; padding-right: 1rem; }
}
</style>
