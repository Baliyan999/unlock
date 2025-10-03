<template>
  <section class="container pt-10 sm:pt-16" aria-label="Hero">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {{ $t('hero.h1') }}
        </h1>
        <p class="mt-4 text-gray-600">
          {{ $t('hero.sub') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UiButton @click="scrollToForm" size="lg">{{ $t('hero.trial') }}</UiButton>
          <a class="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50" href="https://t.me/unlock_school" target="_blank" rel="noopener">
            {{ $t('hero.writeTg') }}
          </a>
        </div>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded">{{ $t('hero.b1') }}</span>
          <span class="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded">{{ $t('hero.b2') }}</span>
          <span class="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded">{{ $t('hero.b3') }}</span>
        </div>
      </div>
      <div class="aspect-[4/3] bg-gray-100 rounded-lg"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiButton from './Ui/Button.vue';

function scrollToForm() {
  const el = document.getElementById('lead');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>


