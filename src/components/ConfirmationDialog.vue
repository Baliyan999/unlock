<template>
  <Modal
    :visible="visible"
    :title="title"
    :closable="closable"
    :close-on-backdrop="closeOnBackdrop"
    @close="handleClose"
    @update:visible="$emit('update:visible', $event)"
  >
    <!-- Иконка и сообщение -->
    <div class="flex items-start gap-4">
      <div
        class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        :class="iconClass"
      >
        <svg
          class="w-6 h-6"
          :class="iconColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="type === 'warning'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
          <path
            v-else-if="type === 'error'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else-if="type === 'info'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else-if="type === 'success'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-sm leading-relaxed">
          {{ message }}
        </p>
      </div>
    </div>

    <!-- Footer с кнопками -->
    <template #footer>
      <div class="flex gap-3 justify-end">
        <button
          v-if="showCancel"
          @click="handleCancel"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {{ cancelText }}
        </button>
        
        <button
          @click="handleConfirm"
          class="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
          :class="confirmButtonClass"
        >
          {{ confirmText }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Modal from './Modal.vue';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  type?: 'warning' | 'error' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  closable?: boolean;
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  confirmText: 'OK',
  cancelText: 'Отмена',
  showCancel: true,
  closable: true,
  closeOnBackdrop: true
});

const emit = defineEmits<{
  close: [];
  confirm: [];
  cancel: [];
  'update:visible': [value: boolean];
}>();

const iconClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-100 dark:bg-red-900/30';
    case 'success':
      return 'bg-green-100 dark:bg-green-900/30';
    case 'info':
      return 'bg-blue-100 dark:bg-blue-900/30';
    case 'warning':
    default:
      return 'bg-yellow-100 dark:bg-yellow-900/30';
  }
});

const iconColor = computed(() => {
  switch (props.type) {
    case 'error':
      return 'text-red-600 dark:text-red-400';
    case 'success':
      return 'text-green-600 dark:text-green-400';
    case 'info':
      return 'text-blue-600 dark:text-blue-400';
    case 'warning':
    default:
      return 'text-yellow-600 dark:text-yellow-400';
  }
});

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    case 'success':
      return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
    case 'info':
      return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    case 'warning':
    default:
      return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
  }
});

function handleClose() {
  emit('close');
}

function handleConfirm() {
  emit('confirm');
  emit('update:visible', false);
}

function handleCancel() {
  emit('cancel');
  emit('update:visible', false);
}
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
</style>
