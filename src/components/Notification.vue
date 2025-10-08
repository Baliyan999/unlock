<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform translate-y-2 scale-95"
    enter-to-class="opacity-100 transform translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0 scale-100"
    leave-to-class="opacity-0 transform translate-y-2 scale-95"
  >
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-50 max-w-sm w-full"
      role="alert"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
    >
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden"
        :class="{
          'border-red-200 dark:border-red-800': type === 'error',
          'border-green-200 dark:border-green-800': type === 'success',
          'border-blue-200 dark:border-blue-800': type === 'info',
          'border-yellow-200 dark:border-yellow-800': type === 'warning'
        }"
      >
        <!-- Иконка и заголовок -->
        <div class="flex items-start gap-3 p-4">
          <div
            class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            :class="{
              'bg-red-100 dark:bg-red-900/30': type === 'error',
              'bg-green-100 dark:bg-green-900/30': type === 'success',
              'bg-blue-100 dark:bg-blue-900/30': type === 'info',
              'bg-yellow-100 dark:bg-yellow-900/30': type === 'warning'
            }"
          >
            <!-- Иконка ошибки -->
            <svg
              v-if="type === 'error'"
              class="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            
            <!-- Иконка успеха -->
            <svg
              v-else-if="type === 'success'"
              class="w-5 h-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            
            <!-- Иконка информации -->
            <svg
              v-else-if="type === 'info'"
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            
            <!-- Иконка предупреждения -->
            <svg
              v-else-if="type === 'warning'"
              class="w-5 h-5 text-yellow-600 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <div class="flex-1 min-w-0">
            <h4
              class="text-sm font-semibold"
              :class="{
                'text-red-900 dark:text-red-100': type === 'error',
                'text-green-900 dark:text-green-100': type === 'success',
                'text-blue-900 dark:text-blue-100': type === 'info',
                'text-yellow-900 dark:text-yellow-100': type === 'warning'
              }"
            >
              {{ title }}
            </h4>
            <p
              class="text-sm mt-1"
              :class="{
                'text-red-700 dark:text-red-300': type === 'error',
                'text-green-700 dark:text-green-300': type === 'success',
                'text-blue-700 dark:text-blue-300': type === 'info',
                'text-yellow-700 dark:text-yellow-300': type === 'warning'
              }"
            >
              {{ message }}
            </p>
          </div>
          
          <!-- Кнопка закрытия -->
          <button
            @click="close"
            class="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{
              'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200': type === 'error',
              'text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200': type === 'success',
              'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200': type === 'info',
              'text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200': type === 'warning'
            }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Прогресс-бар для автозакрытия -->
        <div
          v-if="autoClose && duration > 0"
          class="h-1 bg-gray-200 dark:bg-gray-700"
        >
          <div
            class="h-full transition-all ease-linear"
            :class="{
              'bg-red-500': type === 'error',
              'bg-green-500': type === 'success',
              'bg-blue-500': type === 'info',
              'bg-yellow-500': type === 'warning'
            }"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // в миллисекундах, 0 = не закрывать автоматически
  autoClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
  autoClose: true
});

const emit = defineEmits<{
  close: [];
}>();

const visible = ref(true);
const progress = ref(100);

let progressInterval: number | null = null;
let closeTimeout: number | null = null;

onMounted(() => {
  if (props.autoClose && props.duration > 0) {
    // Запускаем прогресс-бар
    const startTime = Date.now();
    progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, props.duration - elapsed);
      progress.value = (remaining / props.duration) * 100;
      
      if (remaining <= 0) {
        close();
      }
    }, 50);
    
    // Устанавливаем таймер закрытия
    closeTimeout = window.setTimeout(() => {
      close();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout);
  }
});

function close() {
  visible.value = false;
  emit('close');
}
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Улучшенные тени */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Анимация для кнопки закрытия */
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
  transition: left 0.3s ease;
}

button:hover::before {
  left: 100%;
}

/* Стили для темной темы */
.dark .shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .fixed {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>
