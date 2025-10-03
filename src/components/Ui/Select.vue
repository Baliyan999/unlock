<template>
  <div>
    <label :for="id" class="block text-sm font-medium">{{ label }}</label>
    <select
      :id="id"
      v-model="model"
      class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 aria-[invalid=true]:border-red-500"
      :aria-invalid="Boolean(error) || undefined"
      :aria-describedby="error ? id + '-error' : undefined"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <p v-if="error" :id="id + '-error'" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Option = { label: string; value: string };
type Props = {
  label: string;
  name?: string;
  options: Option[];
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


