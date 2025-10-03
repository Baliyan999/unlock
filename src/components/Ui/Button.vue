<template>
  <button
    class="inline-flex items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    :class="sizeClass"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = { size?: 'sm' | 'md' | 'lg' };
const props = defineProps<Props>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs';
    case 'lg':
      return 'px-5 py-2.5';
    default:
      return '';
  }
});
</script>


