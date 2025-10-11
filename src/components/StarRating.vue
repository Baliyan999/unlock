<template>
  <div class="star-rating">
    <div class="stars-container">
      <button
        v-for="star in 5"
        :key="star"
        type="button"
        class="star-button"
        :class="{
          'star-filled': star <= rating,
          'star-empty': star > rating,
          'star-hover': star <= hoverRating
        }"
        @click="setRating(star)"
        @mouseenter="hoverRating = star"
        @mouseleave="hoverRating = 0"
        :disabled="disabled"
      >
        <svg
          class="star-icon"
          :class="{ 'animate-bounce-in': star <= rating }"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </button>
    </div>
    <div v-if="showText" class="rating-text">
      <span v-if="rating === 0" class="text-gray-500">Выберите оценку</span>
      <span v-else-if="rating === 1" class="text-red-500">Ужасно</span>
      <span v-else-if="rating === 2" class="text-orange-500">Плохо</span>
      <span v-else-if="rating === 3" class="text-yellow-500">Нормально</span>
      <span v-else-if="rating === 4" class="text-blue-500">Хорошо</span>
      <span v-else-if="rating === 5" class="text-green-500">Отлично!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: number
  disabled?: boolean
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showText: true,
  size: 'md'
})

const emit = defineEmits<Emits>()

const rating = ref(props.modelValue)
const hoverRating = ref(0)

const setRating = (value: number) => {
  if (props.disabled) return
  
  rating.value = value
  emit('update:modelValue', value)
}

watch(() => props.modelValue, (newValue) => {
  rating.value = newValue
})
</script>

<style scoped>
.star-rating {
  @apply flex flex-col items-center space-y-2;
}

.stars-container {
  @apply flex space-x-1;
}

.star-button {
  @apply relative p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded;
}

.star-button:disabled {
  @apply cursor-not-allowed opacity-50;
}

.star-button:not(:disabled) {
  @apply cursor-pointer hover:scale-110;
}

.star-icon {
  @apply transition-all duration-200;
}

.star-filled .star-icon {
  @apply text-yellow-400;
  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.5));
}

.star-empty .star-icon {
  @apply text-gray-300;
}

.star-hover .star-icon {
  @apply text-yellow-300;
  filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3));
}

/* Размеры звезд */
.star-icon {
  @apply w-6 h-6;
}

/* Анимации */
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.3s ease-out;
}

/* Размеры */
.star-rating.size-sm .star-icon {
  @apply w-4 h-4;
}

.star-rating.size-md .star-icon {
  @apply w-6 h-6;
}

.star-rating.size-lg .star-icon {
  @apply w-8 h-8;
}

.rating-text {
  @apply text-sm font-medium transition-colors duration-200;
}

/* Responsive */
@media (max-width: 320px) {
  .star-icon {
    @apply w-5 h-5;
  }
  
  .stars-container {
    @apply space-x-0.5;
  }
  
  .rating-text {
    @apply text-xs;
  }
}
</style>
