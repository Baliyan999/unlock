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
    <div class="flex justify-center gap-2 mt-3">
      <button
        v-for="(item, i) in items"
        :key="'dot-' + i"
        class="h-2 w-2 rounded-full"
        :class="i === index ? 'bg-blue-600' : 'bg-gray-300'"
        @click="goto(i)"
        :aria-label="'Слайд ' + (i + 1)"
      />
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

const transformStyle = computed(() => {
  const translateX = -index.value * 100;
  return { transform: `translateX(${translateX}%)` };
});
</script>


