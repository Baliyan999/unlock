<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
    <div class="container flex items-center justify-between h-14">
      <RouterLink to="/" class="font-semibold tracking-tight">
        <img src="/logo1.JPG?url" alt="Unlock" class="h-8 w-auto" />
      </RouterLink>
      <nav class="hidden sm:flex gap-6 text-sm">
        <button @click="scrollToSection('formats')" class="hover:text-blue-600">{{ $t('nav.formats') }}</button>
        <button @click="scrollToSection('levels')" class="hover:text-blue-600">{{ $t('nav.levels') }}</button>
        <button @click="scrollToSection('teachers')" class="hover:text-blue-600">{{ $t('nav.teachers') }}</button>
        <button @click="scrollToSection('reviews')" class="hover:text-blue-600">{{ $t('nav.reviews') }}</button>
        <button @click="scrollToSection('pricing')" class="hover:text-blue-600">{{ $t('nav.pricing') }}</button>
        <RouterLink to="/blog" class="hover:text-blue-600">{{ $t('nav.blog') }}</RouterLink>
        <RouterLink to="/test" class="hover:text-blue-600">{{ $t('nav.test') }}</RouterLink>
        <button @click="scrollToSection('lead')" class="hover:text-blue-600">{{ $t('nav.lead') }}</button>
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

function scrollToSection(sectionId: string) {
  // Если мы не на главной странице, сначала переходим на главную
  if (window.location.pathname !== '/') {
    window.location.href = `/#${sectionId}`;
    return;
  }
  
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Обработка якорных ссылок при загрузке страницы
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


