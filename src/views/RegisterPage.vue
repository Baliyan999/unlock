<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-2 sm:py-8 sm:px-4 lg:px-8">
    <div class="w-full max-w-md space-y-8 animate-fade-in">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-in">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white animate-slide-up">
          {{ $t('auth.registerTitle') }}
        </h2>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 animate-slide-up" style="animation-delay: 0.1s;">
          {{ $t('auth.registerSubtitle') }}
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
            {{ $t('auth.signIn') }}
          </router-link>
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-up" style="animation-delay: 0.2s;">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Display Name Field -->
          <div class="space-y-2">
            <label for="display_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('auth.name') }}
            </label>
            <div class="relative group">
              <input
                id="display_name"
                v-model="form.display_name"
                name="display_name"
                type="text"
                autocomplete="name"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-400"
                :placeholder="$t('auth.namePlaceholder')"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('auth.nameHint') }}
            </p>
            <p v-if="errors.display_name" class="text-xs text-red-600 dark:text-red-400 animate-shake">
              {{ errors.display_name }}
            </p>
          </div>

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
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-400"
                :placeholder="$t('auth.emailPlaceholder')"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('auth.emailHint') }}
            </p>
            <p v-if="errors.email" class="text-xs text-red-600 dark:text-red-400 animate-shake">
              {{ errors.email }}
            </p>
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
                autocomplete="new-password"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-400"
                :placeholder="$t('auth.passwordHint')"
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
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Минимум 8 символов, должен содержать буквы и цифры
            </p>
            <p v-if="errors.password" class="text-xs text-red-600 dark:text-red-400 animate-shake">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('auth.confirmPassword') }}
            </label>
            <div class="relative group">
              <input
                id="confirm_password"
                v-model="confirmPassword"
                name="confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-400"
                :placeholder="$t('auth.confirmPasswordPlaceholder')"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
              >
                <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 dark:group-hover/eye:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 dark:group-hover/eye:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            <p v-if="errors.confirm_password" class="text-xs text-red-600 dark:text-red-400 animate-shake">
              {{ errors.confirm_password }}
            </p>
          </div>

          <!-- Password Mismatch Warning -->
          <div v-if="passwordMismatch" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 animate-shake">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <span class="text-sm text-yellow-700 dark:text-yellow-300">Пароли не совпадают</span>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="handleRegister"
            :disabled="authStore.isLoading || passwordMismatch"
            @mouseenter="console.log('🔍 Button hover - Loading:', authStore.isLoading, 'Mismatch:', passwordMismatch)"
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group"
          >
            <span v-if="authStore.isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Регистрация...
            </span>
            <span v-else class="flex items-center justify-center">
              {{ $t('auth.registerButton') }}
              <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
        </form>
      </div>

      <!-- Back Link -->
      <div class="text-center animate-slide-up" style="animation-delay: 0.3s;">
        <router-link to="/" class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import type { RegisterData } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const form = ref<RegisterData>({
  display_name: '',
  email: '',
  password: ''
})

const confirmPassword = ref('')
const errors = ref<Record<string, string>>({})
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordMismatch = computed(() => {
  return confirmPassword.value && form.value.password !== confirmPassword.value
})

// Валидация на frontend
const validateForm = () => {
  errors.value = {}
  
  // Валидация имени
  if (!form.value.display_name.trim()) {
    errors.value.display_name = t('auth.nameRequired')
  } else if (form.value.display_name.trim().length < 2) {
    errors.value.display_name = t('auth.nameTooShort')
  } else if (form.value.display_name.trim().length > 20) {
    errors.value.display_name = t('auth.nameTooLong')
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/.test(form.value.display_name.trim())) {
    errors.value.display_name = t('auth.nameInvalid')
  }
  
  // Валидация email
  if (!form.value.email.trim()) {
    errors.value.email = t('auth.emailRequired')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())) {
    errors.value.email = t('auth.emailInvalid')
  }
  
  // Валидация пароля
  if (!form.value.password) {
    errors.value.password = t('auth.passwordRequired')
  } else if (form.value.password.length < 8) {
    errors.value.password = t('auth.passwordTooShort')
  } else if (form.value.password.length > 100) {
    errors.value.password = t('auth.passwordTooLong')
  } else if (!/[a-zA-Z]/.test(form.value.password)) {
    errors.value.password = t('auth.passwordNoLetter')
  } else if (!/\d/.test(form.value.password)) {
    errors.value.password = t('auth.passwordNoNumber')
  }
  
  // Валидация подтверждения пароля
  if (!confirmPassword.value) {
    errors.value.confirm_password = t('auth.confirmPasswordRequired')
  } else if (form.value.password !== confirmPassword.value) {
    errors.value.confirm_password = t('auth.passwordsNotMatch')
  }
  
  return Object.keys(errors.value).length === 0
}

const handleRegister = async (event?: Event) => {
  console.log('🔍 handleRegister called')
  console.log('📝 Form data:', form.value)
  console.log('🔒 Password mismatch:', passwordMismatch.value)
  console.log('⏳ Loading:', authStore.isLoading)
  
  // Предотвращаем стандартное поведение формы
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  const isValid = validateForm()
  console.log('✅ Form validation:', isValid)
  console.log('❌ Errors:', errors.value)
  
  if (!isValid) {
    console.log('❌ Form validation failed')
    return false
  }
  
  try {
    console.log('🚀 Starting registration...')
    await authStore.register(form.value)
    console.log('✅ Registration successful')
    router.push('/')
  } catch (error) {
    // Ошибка уже обработана в store
    console.log('❌ Registration failed:', error)
  }
  
  // Дополнительная защита от перезагрузки
  return false
}

onMounted(() => {
  // Clear any previous errors
  authStore.clearError()
})
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
  
  .space-y-6 > * + * {
    margin-top: 1rem;
  }
  
  .space-y-2 > * + * {
    margin-top: 0.25rem;
  }
}

/* Enhanced focus states for accessibility */
input:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>