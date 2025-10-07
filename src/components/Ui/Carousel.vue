<template>
  <div
    class="relative"
    role="region"
    :aria-roledescription="'carousel'"
    :aria-label="ariaLabel"
    @mouseenter="pause = true"
    @mouseleave="pause = false"
  >
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out" :style="transformStyle">
        <div v-for="(item, i) in items" :key="i" class="w-full flex-shrink-0 px-2">
          <div class="min-h-[140px]">
            <slot :item="item" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation with arrows and dots -->
    <div class="flex justify-center items-center gap-3 mt-3">
      <!-- Previous arrow -->
      <button
        @click="previous"
        class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
        :aria-label="'Предыдущий слайд'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <!-- Dots indicator -->
      <div class="flex gap-2">
        <button
          v-for="(item, i) in items"
          :key="'dot-' + i"
          class="h-2 w-2 rounded-full transition-all duration-200"
          :class="i === index ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'"
          @click="goto(i)"
          :aria-label="'Слайд ' + (i + 1)"
        />
      </div>
      
      <!-- Next arrow -->
      <button
        @click="next"
        class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
        :aria-label="'Следующий слайд'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{ items: unknown[]; intervalMs?: number; ariaLabel?: string }>();
const index = ref(0);
const pause = ref(false);
const intervalMs = computed(() => props.intervalMs ?? 5000);

let timer: number | null = null;

onMounted(() => {
  start();
});

onUnmounted(() => {
  stop();
});

watch(pause, (p) => {
  if (p) stop();
  else start();
});

function start() {
  stop();
  timer = window.setInterval(() => {
    if (pause.value) return;
    index.value = (index.value + 1) % props.items.length;
  }, intervalMs.value);
}

function stop() {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}

function goto(i: number) {
  index.value = i;
}

function next() {
  index.value = (index.value + 1) % props.items.length;
}

function previous() {
  index.value = index.value === 0 ? props.items.length - 1 : index.value - 1;
}

const transformStyle = computed(() => {
  const translateX = -index.value * 100;
  return { transform: `translateX(${translateX}%)` };
});
</script>


