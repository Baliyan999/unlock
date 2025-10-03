<template>
  <footer class="border-t border-gray-100 py-8 mt-12">
    <div class="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <div>© Unlock, {{ year }}</div>
      <div class="flex items-center gap-4">
        <RouterLink to="/privacy" class="hover:text-blue-600">{{ $t('footer.policy') }}</RouterLink>
        <a href="https://t.me/unlock_school" target="_blank" rel="noopener" class="hover:text-blue-600">Telegram</a>
        <a href="https://instagram.com" target="_blank" rel="noopener" class="hover:text-blue-600">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const year = computed(() => new Date().getFullYear());
</script>


