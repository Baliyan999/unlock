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
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden flex items-center justify-center">
              <div class="text-center p-8">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Изучайте китайский с Unlock</h3>
                <p class="text-gray-600 mb-4">Профессиональные курсы китайского языка</p>
                <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Записаться на пробный урок
                </button>
              </div>
            </div>
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


