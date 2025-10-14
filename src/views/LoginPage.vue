<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-2 sm:py-8 sm:px-4 lg:px-8">
    <div class="w-full max-w-md space-y-8 animate-fade-in">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-in">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white animate-slide-up">
          {{ $t('auth.loginTitle') }}
        </h2>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 animate-slide-up" style="animation-delay: 0.1s;">
          {{ $t('auth.loginSubtitle') }}
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
            {{ $t('auth.createAccount') }}
          </router-link>
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-up" style="animation-delay: 0.2s;">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('auth.emailAddress') }}
            </label>
            <div class="relative group">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                @keydown.enter.prevent="handleLogin"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                :placeholder="$t('auth.emailPlaceholder')"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('auth.password') }}
            </label>
            <div class="relative group">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                @keydown.enter.prevent="handleLogin"
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                :placeholder="$t('auth.passwordPlaceholder')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 dark:group-hover/eye:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 dark:group-hover/eye:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-shake">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm text-red-700 dark:text-red-300">{{ authStore.error }}</span>
            </div>
          </div>

          <!-- Lockout Message -->
          <div v-if="authStore.isLockedOut" class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <div class="text-sm text-orange-700 dark:text-orange-300">
                <div class="font-medium">{{ $t('auth.accountLocked') }}</div>
                <div class="text-xs mt-1">{{ $t('auth.tryAgainIn') }} {{ formatTimeRemaining(authStore.remainingLockoutTime) }}</div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="handleLogin"
            :disabled="authStore.isLoading || authStore.isLockedOut"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group"
          >
            <span v-if="authStore.isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Вход...
            </span>
            <span v-else-if="authStore.isLockedOut" class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Заблокировано
            </span>
            <span v-else class="flex items-center justify-center">
              {{ $t('auth.loginButton') }}
              <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
        </form>
      </div>

      <!-- Back Link -->
      <div class="text-center animate-slide-up" style="animation-delay: 0.3s;">
        <router-link to="/" class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group">
          <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {{ $t('auth.backToHome') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginCredentials } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<LoginCredentials>({
  email: '',
  password: ''
})

const showPassword = ref(false)
let lockoutTimer: NodeJS.Timeout | null = null

const formatTimeRemaining = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / (60 * 1000))
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const handleLogin = async (event?: Event) => {
  // Предотвращаем стандартное поведение формы
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  try {
    await authStore.login(form.value)
    // Успешный вход - перенаправляем на главную
    router.push('/')
  } catch (error) {
    // Ошибка уже обработана в store
    // НЕ перенаправляем при ошибке - остаемся на странице входа
    console.log('Login failed:', error)
    
    // Если произошла блокировка, запускаем таймер
    if (authStore.isLockedOut && !lockoutTimer) {
      startLockoutTimer()
    }
  }
  
  // Дополнительная защита от перезагрузки
  return false
}

onMounted(() => {
  // Clear any previous errors
  authStore.clearError()
  
  // Загружаем состояние блокировки из localStorage
  authStore.loadLockoutState()
  
  // Запускаем таймер для обновления времени блокировки
  if (authStore.isLockedOut) {
    startLockoutTimer()
  }
})

onUnmounted(() => {
  // Очищаем таймер при размонтировании компонента
  if (lockoutTimer) {
    clearInterval(lockoutTimer)
  }
})

const startLockoutTimer = () => {
  if (lockoutTimer) {
    clearInterval(lockoutTimer)
  }
  
  lockoutTimer = setInterval(() => {
    // Принудительно обновляем состояние блокировки
    authStore.loadLockoutState()
    
    if (!authStore.isLockedOut) {
      // Блокировка закончилась
      clearInterval(lockoutTimer!)
      lockoutTimer = null
      authStore.clearError()
    }
  }, 1000) // Обновляем каждую секунду
}
</script>

<style scoped>
/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-20px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(0);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Responsive adjustments for very small screens */
@media (max-width: 320px) {
  .min-h-screen {
    padding: 0.5rem;
  }
  
  .w-full.max-w-md {
    max-width: 100%;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .w-16.h-16 {
    width: 3rem;
    height: 3rem;
  }
  
  .w-8.h-8 {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Enhanced focus states for accessibility */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>