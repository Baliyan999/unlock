<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 overflow-y-auto"
    @keydown.esc="handleCancel"
    @keydown.enter="handleConfirm"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      :class="{ 'opacity-0': !visible, 'opacity-100': visible }"
      @click="closeOnBackdrop ? handleCancel() : null"
    ></div>

    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-2 sm:p-4">
      <div
        class="relative w-full max-w-sm sm:max-w-md transform overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300"
        :class="{
          'scale-95 opacity-0 translate-y-4': !visible,
          'scale-100 opacity-100 translate-y-0': visible
        }"
      >
        <!-- Header -->
        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <button
              v-if="closable"
              @click="handleCancel"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-4 sm:px-6 py-4 sm:py-6">
          <div class="flex items-start gap-3 sm:gap-4">
            <!-- Icon -->
            <div
              class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
              :class="iconClass"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                :class="iconColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="type === 'delete'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
                <path
                  v-else-if="type === 'approve'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else-if="type === 'reject'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else-if="type === 'restore'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
                <path
                  v-else-if="type === 'warning'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <!-- Message -->
            <div class="flex-1 min-w-0">
              <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {{ message }}
              </p>
              <p v-if="details" class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {{ details }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <button
              v-if="showCancel"
              @click="handleCancel"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {{ cancelText }}
            </button>
            
            <button
              @click="handleConfirm"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
              :class="confirmButtonClass"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

interface Props {
  visible: boolean
  title: string
  message: string
  details?: string
  type?: 'delete' | 'approve' | 'reject' | 'restore' | 'warning'
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  closable?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  showCancel: true,
  closable: true,
  closeOnBackdrop: true
})

const emit = defineEmits<{
  close: []
  confirm: []
  cancel: []
  'update:visible': [value: boolean]
}>()

const iconClass = computed(() => {
  switch (props.type) {
    case 'delete':
      return 'bg-red-100 dark:bg-red-900/30'
    case 'approve':
      return 'bg-green-100 dark:bg-green-900/30'
    case 'reject':
      return 'bg-yellow-100 dark:bg-yellow-900/30'
    case 'restore':
      return 'bg-blue-100 dark:bg-blue-900/30'
    case 'warning':
    default:
      return 'bg-orange-100 dark:bg-orange-900/30'
  }
})

const iconColor = computed(() => {
  switch (props.type) {
    case 'delete':
      return 'text-red-600 dark:text-red-400'
    case 'approve':
      return 'text-green-600 dark:text-green-400'
    case 'reject':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'restore':
      return 'text-blue-600 dark:text-blue-400'
    case 'warning':
    default:
      return 'text-orange-600 dark:text-orange-400'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'delete':
      return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    case 'approve':
      return 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
    case 'reject':
      return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    case 'restore':
      return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    case 'warning':
    default:
      return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
  }
})

function handleClose() {
  emit('close')
  emit('update:visible', false)
}

function handleConfirm() {
  emit('confirm')
  emit('update:visible', false)
}

function handleCancel() {
  emit('cancel')
  emit('update:visible', false)
}

// Keyboard navigation
onMounted(() => {
  if (props.visible) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Watch for visibility changes
import { watch } from 'vue'
watch(() => props.visible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
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
  transition: left 0.3s ease;
}

button:hover::before {
  left: 100%;
}

/* Плавные анимации */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Фокус для доступности */
button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>
