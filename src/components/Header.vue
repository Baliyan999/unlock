<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
    <div class="container flex items-center justify-between h-14">
      <RouterLink to="/" class="font-semibold tracking-tight">
        <img src="/logo1.JPG?url" alt="Unlock" class="h-8 w-auto" />
      </RouterLink>
      <nav class="hidden sm:flex gap-6 text-sm">
        <a href="#formats" class="hover:text-blue-600">{{ $t('nav.formats') }}</a>
        <a href="#levels" class="hover:text-blue-600">{{ $t('nav.levels') }}</a>
        <a href="#teachers" class="hover:text-blue-600">{{ $t('nav.teachers') }}</a>
        <a href="#reviews" class="hover:text-blue-600">{{ $t('nav.reviews') }}</a>
        <a href="#pricing" class="hover:text-blue-600">{{ $t('nav.pricing') }}</a>
        <RouterLink to="/blog" class="hover:text-blue-600">{{ $t('nav.blog') }}</RouterLink>
        <RouterLink to="/test" class="hover:text-blue-600">{{ $t('nav.test') }}</RouterLink>
        <a href="#lead" class="hover:text-blue-600">{{ $t('nav.lead') }}</a>
      </nav>
      <div class="flex items-center gap-3">
        <div class="relative group">
          <button 
            @click="toggleDropdown" 
            class="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span class="text-lg">{{ getCurrentFlag() }}</span>
            <span class="font-medium">{{ getCurrentLabel() }}</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div 
            v-if="isOpen" 
            class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
            @click.stop
          >
            <div 
              v-for="locale in locales" 
              :key="locale.code"
              @click="selectLocale(locale.code)"
              class="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              :class="{ 'bg-blue-50': loc === locale.code }"
            >
              <span class="text-lg">{{ getFlag(locale.code) }}</span>
              <span class="font-medium text-gray-700">{{ locale.label }}</span>
              <svg v-if="loc === locale.code" class="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <a href="https://t.me/test_my_assistant_123_bot" target="_blank" rel="noopener" class="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-200 group">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span class="sr-only">{{ $t('nav.telegram') }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { locales as availableLocales, setLocale } from '@/i18n';

const locales = availableLocales;
const loc = ref<string>((localStorage.getItem('locale') as string) || 'ru');
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectLocale(code: string) {
  loc.value = code;
  setLocale(code);
  isOpen.value = false;
}

function getCurrentFlag() {
  return getFlag(loc.value);
}

function getCurrentLabel() {
  const current = locales.find(l => l.code === loc.value);
  return current?.label || 'Русский';
}

function getFlag(code: string) {
  const flags: Record<string, string> = {
    ru: '🇷🇺',
    en: '🇺🇸',
    uz: '🇺🇿',
    zh: '🇨🇳',
    ko: '🇰🇷'
  };
  return flags[code] || '🇷🇺';
}

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.group')) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


