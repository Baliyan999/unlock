<template>
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
    <div class="container flex items-center justify-between h-14">
      <RouterLink to="/" class="font-semibold tracking-tight">
        <img 
          :src="isDark ? '/images/dark_logo.png' : '/images/light_logo.png'" 
          alt="Unlock" 
          class="h-8 w-auto" 
        />
      </RouterLink>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav gap-6 text-sm">
        <button @click="scrollToSection('formats')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.formats') }}</button>
        <button @click="scrollToSection('levels')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.levels') }}</button>
        <button @click="scrollToSection('teachers')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.teachers') }}</button>
        <button @click="scrollToSection('reviews')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.reviews') }}</button>
        <RouterLink to="/blog" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.blog') }}</RouterLink>
        <RouterLink to="/test" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.test') }}</RouterLink>
        <button @click="scrollToSection('lead')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.lead') }}</button>
      </nav>
      
      <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        
        <div class="relative group">
          <button 
            @click="toggleDropdown" 
            class="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <span class="text-lg">{{ getCurrentFlag() }}</span>
            <span class="font-medium">{{ getCurrentLabel() }}</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div 
            v-if="isOpen" 
            class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
            @click.stop
          >
            <div 
              v-for="locale in locales" 
              :key="locale.code"
              @click="selectLocale(locale.code)"
              class="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
              :class="{ 'bg-blue-50 dark:bg-gray-700': loc === locale.code }"
            >
              <span class="text-lg">{{ getFlag(locale.code) }}</span>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ locale.label }}</span>
              <svg v-if="loc === locale.code" class="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click.stop="toggleMobileMenu"
          class="mobile-menu-breakpoint w-12 h-12 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden group"
          :class="isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800' : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:from-blue-50 hover:to-blue-100'"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <!-- Animated hamburger icon -->
          <div class="relative w-6 h-6">
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6 transition-all duration-500 ease-out transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity: 1; transform: rotate(0deg) scale(1);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6 transition-all duration-500 ease-out transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity: 1; transform: rotate(180deg) scale(1);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            
            <!-- Shimmer effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 transform -translate-y-8 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform -translate-y-8 scale-95"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-2xl z-50 backdrop-blur-md"
      >
      <div class="container py-6">
        <nav class="flex flex-col space-y-2 max-w-md mx-auto items-center">
          <button 
            @click="scrollToSection('formats'); closeMobileMenu()" 
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.formats') }}</span>
          </button>
          
          <button 
            @click="scrollToSection('levels'); closeMobileMenu()" 
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.levels') }}</span>
          </button>
          
          <button 
            @click="scrollToSection('teachers'); closeMobileMenu()" 
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.teachers') }}</span>
          </button>
          
          <button 
            @click="scrollToSection('reviews'); closeMobileMenu()" 
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.reviews') }}</span>
          </button>
          
          <RouterLink 
            to="/blog" 
            @click="closeMobileMenu()"
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.blog') }}</span>
          </RouterLink>
          
          <RouterLink 
            to="/test" 
            @click="closeMobileMenu()"
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.test') }}</span>
          </RouterLink>
          
          <button 
            @click="scrollToSection('lead'); closeMobileMenu()" 
            class="flex items-center justify-center gap-3 px-6 py-3 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ $t('nav.lead') }}</span>
          </button>
        </nav>
      </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { locales as availableLocales, setLocale, i18n } from '@/i18n';

const locales = availableLocales;
const loc = ref<string>(i18n.global.locale.value);

// Следим за изменениями локали в i18n
watch(() => i18n.global.locale.value, (newLocale) => {
  loc.value = newLocale;
});
const isOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Theme management
const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  // По умолчанию темная тема для всех новых посетителей
  return true;
};

const isDark = ref<boolean>(getInitialTheme());

// Инициализируем тему при загрузке
onMounted(() => {
  updateTheme();
  handleResize();
  window.addEventListener('resize', handleResize);
  
  // Принудительно обновляем отображение при загрузке
  nextTick(() => {
    handleResize();
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  const width = window.innerWidth;
  console.log('🖥️ Window width:', width);
  
  // Определяем тип устройства
  let deviceType = '';
  if (width <= 480) {
    deviceType = '📱 Mobile phone';
  } else if (width <= 768) {
    deviceType = '📱 Large mobile / Small tablet';
  } else if (width <= 1024) {
    deviceType = '📱 Tablet';
  } else if (width <= 1200) {
    deviceType = '🖥️ Small desktop';
  } else {
    deviceType = '🖥️ Large desktop';
  }
  
  console.log(deviceType);
  
  if (width <= 1024) {
    console.log('📱 Mobile/Tablet mode - showing burger menu');
    // Принудительно показываем мобильное меню
    const mobileButton = document.querySelector('.mobile-menu-breakpoint') as HTMLElement;
    const desktopNav = document.querySelector('.desktop-nav') as HTMLElement;
    
    if (mobileButton) {
      mobileButton.style.display = 'flex';
      mobileButton.style.visibility = 'visible';
      mobileButton.style.opacity = '1';
    }
    if (desktopNav) {
      desktopNav.style.display = 'none';
      desktopNav.style.visibility = 'hidden';
      desktopNav.style.opacity = '0';
    }
  } else {
    console.log('🖥️ Desktop mode - showing navigation');
    // Закрываем мобильное меню при переходе в desktop режим
    isMobileMenuOpen.value = false;
    
    // Принудительно показываем desktop навигацию
    const mobileButton = document.querySelector('.mobile-menu-breakpoint') as HTMLElement;
    const desktopNav = document.querySelector('.desktop-nav') as HTMLElement;
    
    if (mobileButton) {
      mobileButton.style.display = 'none';
      mobileButton.style.visibility = 'hidden';
      mobileButton.style.opacity = '0';
    }
    if (desktopNav) {
      desktopNav.style.display = 'flex';
      desktopNav.style.visibility = 'visible';
      desktopNav.style.opacity = '1';
    }
  }
}

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  updateTheme();
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function selectLocale(code: string) {
  console.log('Header: Selecting locale:', code);
  loc.value = code;
  setLocale(code as 'ru' | 'en' | 'uz' | 'zh' | 'ko');
  isOpen.value = false;
  console.log('Header: Locale set, current loc.value:', loc.value);
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
  
  // Close language dropdown if clicked outside
  if (!target.closest('.group')) {
    isOpen.value = false;
  }
  
  // Close mobile menu if clicked outside mobile menu and mobile menu button
  const isInsideMobileMenu = target.closest('.mobile-menu');
  const isInsideMobileButton = target.closest('.mobile-menu-breakpoint');
  
  if (!isInsideMobileMenu && !isInsideMobileButton) {
    isMobileMenuOpen.value = false;
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
  updateTheme();
  
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

</script>

<style scoped>
/* Ensure proper initial state - hide everything by default */
.desktop-nav {
  display: none !important;
}

.mobile-menu-breakpoint {
  display: none !important;
}

/* Mobile phones: <= 480px */
@media (max-width: 480px) {
  .mobile-menu-breakpoint {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  .desktop-nav {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* Large mobile / Small tablets: 481px - 768px */
@media (min-width: 481px) and (max-width: 768px) {
  .mobile-menu-breakpoint {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  .desktop-nav {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* Tablets: 769px - 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  .mobile-menu-breakpoint {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  .desktop-nav {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* Small desktop: 1025px - 1200px */
@media (min-width: 1025px) and (max-width: 1200px) {
  .mobile-menu-breakpoint {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .desktop-nav {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}

/* Large desktop: > 1200px */
@media (min-width: 1201px) {
  .mobile-menu-breakpoint {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .desktop-nav {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}

/* Ensure mobile menu is visible when open */
.mobile-menu-open {
  display: block !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Mobile menu animation */
.mobile-menu {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button press animation */
.mobile-menu-breakpoint:active {
  transform: scale(0.95);
  transition: transform 0.1s ease-in-out;
}

/* Force square button and perfect centering */
.mobile-menu-breakpoint {
  width: 3rem !important;
  height: 3rem !important;
  min-width: 3rem !important;
  min-height: 3rem !important;
  max-width: 3rem !important;
  max-height: 3rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.mobile-menu-breakpoint svg {
  display: block !important;
  margin: auto !important;
}

/* Hover effects for menu items */
.mobile-menu button {
  transition: all 0.2s ease-in-out;
}

.mobile-menu button:hover {
  transform: translateX(4px);
  background-color: rgba(59, 130, 246, 0.1);
}

.mobile-menu button:active {
  transform: scale(0.98);
}

/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 0.6s ease-in-out;
}

/* Enhanced button effects */
.mobile-menu-breakpoint::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.mobile-menu-breakpoint:hover::before {
  opacity: 1;
}

/* Menu item animations */
.mobile-menu button,
.mobile-menu a {
  position: relative;
  overflow: hidden;
}

.mobile-menu button::before,
.mobile-menu a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.mobile-menu button:hover::before,
.mobile-menu a:hover::before {
  left: 100%;
}

/* Icon animations */
.mobile-menu button svg,
.mobile-menu a svg {
  transition: all 0.3s ease;
}

.mobile-menu button:hover svg,
.mobile-menu a:hover svg {
  transform: scale(1.1) rotate(5deg);
  color: #3b82f6;
}

/* Text animations */
.mobile-menu button span,
.mobile-menu a span {
  transition: all 0.3s ease;
}

.mobile-menu button:hover span,
.mobile-menu a:hover span {
  transform: translateX(4px);
  font-weight: 600;
  color: #3b82f6;
}

/* Enhanced mobile menu styling */
.mobile-menu {
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.mobile-menu nav {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mobile-menu nav::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 0.25rem;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  border-radius: 0.125rem;
  opacity: 0.6;
}

/* Perfect centering for menu items */
.mobile-menu button,
.mobile-menu a {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  width: 100% !important;
  max-width: 280px;
}
</style>


