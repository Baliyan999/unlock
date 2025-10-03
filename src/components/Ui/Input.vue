<template>
  <div>
    <label :for="id" class="block text-sm font-medium">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 aria-[invalid=true]:border-red-500"
      :aria-invalid="Boolean(error) || undefined"
      :aria-describedby="error ? id + '-error' : undefined"
    />
    <p v-if="error" :id="id + '-error'" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  label: string;
  name?: string;
  error?: string | null;
  modelValue?: string;
};
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const id = computed(() => props.name || props.label.replace(/\s+/g, '-').toLowerCase());
const model = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
});
</script>


