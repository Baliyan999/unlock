<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800" role="region" :aria-label="ariaLabel">
    <div v-for="(it, idx) in items" :key="idx" class="p-4">
      <button
        class="w-full text-left font-medium flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-white"
        :aria-expanded="openIndex === idx"
        :aria-controls="'acc-' + idx"
        @click="toggle(idx)"
      >
        <span>{{ it.q }}</span>
        <span class="ml-3 text-gray-500 dark:text-gray-400" aria-hidden="true">{{ openIndex === idx ? '−' : '+' }}</span>
      </button>
      <div
        :id="'acc-' + idx"
        class="mt-2 text-sm text-gray-700 dark:text-gray-300"
        v-show="openIndex === idx"
      >
        {{ it.a }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Item = { q: string; a: string };
defineProps<{ items: Item[]; ariaLabel?: string }>();

const openIndex = ref<number | null>(0);
function toggle(idx: number) {
  openIndex.value = openIndex.value === idx ? null : idx;
}
</script>


