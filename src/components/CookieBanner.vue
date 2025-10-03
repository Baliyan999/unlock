<template>
  <div
    v-if="!consent"
    class="fixed bottom-4 inset-x-0 mx-auto max-w-screen-sm bg-white border rounded-lg shadow p-4 z-50"
    role="dialog"
    aria-live="polite"
    aria-label="Cookie consent"
  >
    <div class="text-sm text-gray-700">
      Мы используем файлы cookies для улучшения работы сайта и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с политикой.
    </div>
    <div class="mt-3 flex justify-end gap-2">
      <button @click="decline" class="text-sm px-3 py-1.5 rounded border hover:bg-gray-50">Отклонить</button>
      <button @click="accept" class="text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700">Согласен</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const STORAGE_KEY = 'cookie-consent';
const consent = ref<boolean>(true);

onMounted(() => {
  consent.value = localStorage.getItem(STORAGE_KEY) === '1';
});

function accept() {
  localStorage.setItem(STORAGE_KEY, '1');
  consent.value = true;
}

function decline() {
  localStorage.setItem(STORAGE_KEY, '0');
  consent.value = true;
}
</script>


