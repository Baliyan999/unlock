<template>
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
    <div class="container flex items-center justify-between h-12">
      <RouterLink to="/" class="font-semibold tracking-tight">
        <img 
          :src="isDark ? darkLogo : lightLogo" 
          alt="Unlock" 
          class="h-8 w-auto sm:h-8 md:h-8 lg:h-8 xl:h-8" 
        />
      </RouterLink>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav gap-6 text-sm">
        <button @click="scrollToSection('teachers')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.teachers') }}</button>
        <button @click="scrollToSection('reviews')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.reviews') }}</button>
        <RouterLink to="/blog" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.blog') }}</RouterLink>
        <RouterLink to="/test" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.test') }}</RouterLink>
        <RouterLink to="/calculator" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.calculator') }}</RouterLink>
        <button @click="scrollToSection('lead')" class="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{{ $t('nav.lead') }}</button>
      </nav>
      
      <div class="flex items-center justify-center gap-3">
        <!-- Auth Buttons -->
        <div v-if="authStore && !authStore.isAuthenticated" class="flex items-center gap-2">
          <RouterLink 
            to="/register" 
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group hover:scale-105 active:scale-95 cursor-pointer relative z-10"
            :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-blue-50'"
:aria-label="$t('auth.register')"
          >
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </RouterLink>
        </div>
        
        <div v-else-if="authStore && authStore.isAuthenticated" class="hidden auth-buttons:flex items-center gap-2">
          <!-- Иконка пользователя/администратора -->
          <div class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer relative z-10"
               :class="authStore.isAdmin ? 'border-purple-300 dark:border-purple-600 bg-purple-100 dark:bg-purple-900' : 'border-blue-300 dark:border-blue-600 bg-blue-100 dark:bg-blue-900'"
               :aria-label="authStore.isAdmin ? 'Администратор' : 'Пользователь'">
            <svg v-if="authStore.isAdmin" class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          
          <!-- Кнопка админ-панели (только для админов) -->
          <RouterLink 
            v-if="authStore && authStore.isAdmin"
            to="/admin" 
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 group hover:scale-105 active:scale-95 bg-purple-600 text-white hover:bg-purple-700 cursor-pointer relative z-10"
            :aria-label="$t('auth.adminPanel')"
          >
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </RouterLink>
          
          <!-- Кнопка выхода -->
          <button 
            @click="handleLogout"
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 group hover:scale-105 active:scale-95 cursor-pointer relative z-10"
            :class="isDark ? 'bg-gray-800 text-white hover:bg-red-900' : 'bg-white text-gray-700 hover:bg-red-50'"
            :aria-label="$t('auth.logout')"
          >
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group hover:scale-105 active:scale-95 cursor-pointer relative z-10"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-blue-50'"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        
        <div class="relative group">
          <button 
            @click="toggleDropdown" 
            class="lang-toggle flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group hover:scale-105 active:scale-95 cursor-pointer relative z-10"
            :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-blue-50'"
            aria-label="Выбрать язык"
          >
            <span class="text-base transition-transform duration-200 group-hover:scale-110">{{ getCurrentFlag() }}</span>
          </button>
          
          <div v-if="isDropdownOpen" class="language-dropdown absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <button 
              v-for="(locale, index) in availableLocales" 
              :key="locale.code"
              :data-lang="locale.code"
              @click="(e) => { console.log('Language button clicked:', locale.code, e.target); setLocale(locale.code as 'ru' | 'en' | 'uz' | 'zh' | 'ko'); isDropdownOpen = false; }"
              class="language-button text-sm transition-colors duration-200 border-0 outline-none cursor-pointer"
              :class="[
                i18n.global.locale.value === locale.code ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300',
                index > 0 ? 'border-t border-gray-200 dark:border-gray-600' : ''
              ]"
            >
              <div class="flex items-center gap-2 w-full">
                <span class="text-lg flex-shrink-0">{{ locale.flag }}</span>
                <span class="flex-1 text-left">{{ locale.name }}</span>
            </div>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="mobile-menu-breakpoint flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group hover:scale-105 active:scale-95 cursor-pointer relative z-10"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-blue-50'"
          aria-label="Открыть меню"
        >
          <div class="flex items-center justify-center w-full h-full">
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-full"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-full"
    >
      <!-- Новое мобильное меню -->
      <MobileMenu 
        :is-open="isMobileMenuOpen" 
        :is-dark="isDark"
        @close="closeMobileMenu" 
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { locales as availableLocales, setLocale, i18n } from '@/i18n';
import { useAuthStore } from '@/stores/auth';
import darkLogo from '../../public/images/dark_logo.png';
import lightLogo from '../../public/images/light_logo.png';
import MobileMenu from './MobileMenu.vue';

const authStore = useAuthStore();

// Проверяем, что authStore инициализирован
if (!authStore) {
  console.error('AuthStore не инициализирован');
}

// Theme
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

// Language dropdown
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const getCurrentFlag = () => {
  const currentLocale = availableLocales.find(locale => locale.code === i18n.global.locale.value);
  return currentLocale?.flag || '🇺🇸';
};

// Mobile menu
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Logout
const handleLogout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative.group')) {
    isDropdownOpen.value = false;
  }
};

// Initialize theme
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark.value);
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark.value = prefersDark;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
  
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
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
  
  /* Уменьшаем логотип для маленьких экранов */
  .container img {
    height: 1.5rem !important;
    max-height: 1.5rem !important;
  }
  
  /* Уменьшаем высоту header */
  .container {
    height: 2.5rem !important;
  }
  
  /* Уменьшаем размеры кнопок */
  .container button {
    width: 2rem !important;
    height: 2rem !important;
    min-width: 2rem !important;
    min-height: 2rem !important;
  }
  
  /* Уменьшаем размеры иконок */
  .container button svg {
    width: 1rem !important;
    height: 1rem !important;
  }
  
  /* Уменьшаем размер флага */
  .container .text-lg {
    font-size: 1rem !important;
  }
  
  /* Делаем кнопку языков квадратной на мобильных */
  .container .lang-toggle {
    width: 2rem !important;
    height: 2rem !important;
    min-width: 2rem !important;
    min-height: 2rem !important;
  }
  
  /* Размеры кнопки меню для маленьких мобильных */
  .mobile-menu-breakpoint {
    width: 2rem !important;
    height: 2rem !important;
    min-width: 2rem !important;
    min-height: 2rem !important;
    align-self: center !important;
  }
  
  /* Размеры иконки в кнопке меню для маленьких мобильных */
  .mobile-menu-breakpoint svg {
    width: 1rem !important;
    height: 1rem !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
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
  
  /* Уменьшаем логотип для средних мобильных */
  .container img {
    height: 1.75rem !important;
    max-height: 1.75rem !important;
  }
  
  /* Уменьшаем высоту header */
  .container {
    height: 2.75rem !important;
  }
  
  /* Уменьшаем размеры кнопок */
  .container button {
    width: 2.25rem !important;
    height: 2.25rem !important;
    min-width: 2.25rem !important;
    min-height: 2.25rem !important;
  }
  
  /* Уменьшаем размеры иконок */
  .container button svg {
    width: 1.125rem !important;
    height: 1.125rem !important;
  }
  
  /* Уменьшаем размер флага */
  .container .text-lg {
    font-size: 1.125rem !important;
  }
  
  /* Делаем кнопку языков квадратной на средних мобильных */
  .container .lang-toggle {
    width: 2.25rem !important;
    height: 2.25rem !important;
    min-width: 2.25rem !important;
    min-height: 2.25rem !important;
  }
  
  /* Размеры кнопки меню для средних мобильных */
  .mobile-menu-breakpoint {
    width: 2.25rem !important;
    height: 2.25rem !important;
    min-width: 2.25rem !important;
    min-height: 2.25rem !important;
    align-self: center !important;
  }
  
  /* Размеры иконки в кнопке меню для средних мобильных */
  .mobile-menu-breakpoint svg {
    width: 1.125rem !important;
    height: 1.125rem !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
}

/* Tablets: 769px - 1130px */
@media (min-width: 769px) and (max-width: 1130px) {
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
  
  /* Уменьшаем логотип для планшетов */
  .container img {
    height: 2rem !important;
    max-height: 2rem !important;
  }
  
  /* Уменьшаем высоту header */
  .container {
    height: 3rem !important;
  }
  
  /* Уменьшаем размеры кнопок */
  .container button {
    width: 2.5rem !important;
    height: 2.5rem !important;
    min-width: 2.5rem !important;
    min-height: 2.5rem !important;
  }
  
  /* Уменьшаем размеры иконок */
  .container button svg {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
  
  /* Уменьшаем размер флага */
  .container .text-lg {
    font-size: 1.25rem !important;
  }
  
  /* Делаем кнопку языков квадратной на планшетах */
  .container .lang-toggle {
    width: 2.5rem !important;
    height: 2.5rem !important;
    min-width: 2.5rem !important;
    min-height: 2.5rem !important;
  }
  
  /* Размеры кнопки меню для планшетов */
  .mobile-menu-breakpoint {
    width: 2.5rem !important;
    height: 2.5rem !important;
    min-width: 2.5rem !important;
    min-height: 2.5rem !important;
    align-self: center !important;
  }
  
  /* Размеры иконки в кнопке меню для планшетов */
  .mobile-menu-breakpoint svg {
    width: 1.25rem !important;
    height: 1.25rem !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
}

/* Small desktop: 1131px - 1200px */
@media (min-width: 1131px) and (max-width: 1200px) {
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

/* Button press animation */
.mobile-menu-breakpoint:active {
  transform: scale(0.95);
  transition: transform 0.1s ease-in-out;
}

/* Force square button and perfect centering */
.mobile-menu-breakpoint {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  align-self: center !important;
  border-radius: 0.5rem !important;
}

.mobile-menu-breakpoint svg {
  display: block !important;
  margin: auto !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.mobile-menu-breakpoint div {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
}

/* Специальные стили для языкового меню */
.language-dropdown button,
.language-button {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 8px 12px !important;
  cursor: pointer !important;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
  transition: background-color 0.2s ease !important;
  min-height: auto !important;
  min-width: auto !important;
  height: auto !important;
}

/* Дополнительная специфичность для переопределения Tailwind */
div.language-dropdown button.language-button {
    display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 8px 12px !important;
  cursor: pointer !important;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
  transition: background-color 0.2s ease !important;
  min-height: auto !important;
  min-width: auto !important;
  height: auto !important;
}

/* Стили для текста в языковых кнопках */
.language-dropdown button,
.language-button {
  white-space: nowrap;
  overflow: visible;
  text-overflow: unset;
  line-height: 1.4;
  font-size: 0.875rem;
}

/* Специальные стили для CJK языков */
.language-dropdown button[data-lang="zh"],
.language-dropdown button[data-lang="ko"],
.language-button[data-lang="zh"],
.language-button[data-lang="ko"] {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans CJK SC", "Noto Sans CJK KR", sans-serif;
  font-weight: 500;
  letter-spacing: 0.025em;
  writing-mode: horizontal-tb !important; /* Принудительно горизонтальное написание */
  text-orientation: mixed !important; /* Смешанная ориентация текста */
  unicode-bidi: normal !important; /* Нормальное направление текста */
  direction: ltr !important; /* Слева направо */
}

/* Hover эффект для всей кнопки */
.language-dropdown button:hover,
.language-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
}

.dark .language-dropdown button:hover,
.dark .language-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
}

/* Активное состояние кнопки */
.language-dropdown button:active,
.language-button:active {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  transform: scale(0.98);
}

.dark .language-dropdown button:active,
.dark .language-button:active {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  transform: scale(0.98);
}

/* Стили для внутреннего контейнера */
.language-dropdown button > div,
.language-button > div {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

/* Стили для разделителей между кнопками */
.language-dropdown button + button,
.language-button + .language-button {
  margin-top: 0;
}
</style>
