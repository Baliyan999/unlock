<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-full"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-full"
  >
    <div v-if="isOpen" class="mobile-menu-overlay">
      <!-- Мобильное меню -->
      <div class="mobile-menu-container">
        <!-- Заголовок меню -->
        <div class="mobile-menu-header">
          <div class="mobile-menu-logo">
            <img 
              :src="props.isDark ? darkLogo : lightLogo" 
              alt="Unlock" 
              class="h-8 w-auto" 
            />
          </div>
          <button 
            @click="$emit('close')"
            class="mobile-menu-close-btn"
            aria-label="Закрыть меню"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Контент меню -->
        <div class="mobile-menu-content">
          <!-- Пользовательская секция -->
          <div v-if="authStore && authStore.isAuthenticated" class="mobile-menu-user-section">
            <div class="mobile-menu-user-info">
              <div class="mobile-menu-user-avatar">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="mobile-menu-user-details">
                <h3 class="mobile-menu-user-name">{{ authStore.user?.display_name }}</h3>
                <p class="mobile-menu-user-role">{{ authStore.user?.role === 'admin' ? 'Администратор' : 'Пользователь' }}</p>
              </div>
            </div>
            
            <!-- Админ панель -->
            <RouterLink 
              v-if="authStore.user?.role === 'admin'"
              to="/admin" 
              @click="$emit('close')"
              class="mobile-menu-admin-btn"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>{{ $t('auth.adminPanel') }}</span>
            </RouterLink>
          </div>

          <!-- Неавторизованные пользователи -->
          <div v-else class="mobile-menu-auth-section">
            <RouterLink 
              to="/login" 
              @click="$emit('close')"
              class="mobile-menu-auth-btn mobile-menu-auth-btn--login"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              <span>{{ $t('auth.login') }}</span>
            </RouterLink>
            
            <RouterLink 
              to="/register" 
              @click="$emit('close')"
              class="mobile-menu-auth-btn mobile-menu-auth-btn--register"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              <span>{{ $t('auth.register') }}</span>
            </RouterLink>
          </div>

          <!-- Основные пункты меню -->
          <nav class="mobile-menu-nav">
            <button 
              @click="navigateToSection('teachers'); $emit('close')" 
              class="mobile-menu-item"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.teachers') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            
            <button 
              @click="navigateToSection('reviews'); $emit('close')" 
              class="mobile-menu-item"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.reviews') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            
            <RouterLink 
              to="/blog" 
              @click="$emit('close')"
              class="mobile-menu-item"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.blog') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </RouterLink>
            
            <RouterLink 
              to="/test" 
              @click="$emit('close')"
              class="mobile-menu-item"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.test') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </RouterLink>
            
            <RouterLink 
              to="/calculator" 
              @click="$emit('close')"
              class="mobile-menu-item"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.calculator') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </RouterLink>
            
            <button 
              @click="navigateToSection('lead'); $emit('close')" 
              class="mobile-menu-item mobile-menu-item--lead"
            >
              <div class="mobile-menu-item-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <span class="mobile-menu-item-text">{{ $t('nav.lead') }}</span>
              <div class="mobile-menu-item-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </nav>

          <!-- Выход (только для авторизованных) -->
          <div v-if="authStore && authStore.isAuthenticated" class="mobile-menu-logout-section">
            <button 
              @click="handleLogout(); $emit('close')" 
              class="mobile-menu-logout-btn"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>{{ $t('auth.logout') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
const lightLogo = '/images/light_logo.png';
const darkLogo = '/images/dark_logo.png';

interface Props {
  isOpen: boolean
  isDark: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const authStore = useAuthStore()
const { t: $t } = useI18n()

// Navigate to section (works from any page)
const navigateToSection = (sectionId: string) => {
  // If we're on the home page, just scroll
  if (window.location.pathname === '/') {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    // If we're on another page, navigate to home with hash
    window.location.href = `/#${sectionId}`
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
/* Основной оверлей */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 3rem;
}

/* Контейнер меню */
.mobile-menu-container {
  width: 100%;
  max-width: 400px;
  margin: 0 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
}

.dark .mobile-menu-container {
  background: #1f2937;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Заголовок меню */
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.dark .mobile-menu-header {
  background: #374151;
  border-color: #4b5563;
}

.mobile-menu-logo img {
  height: 2rem;
  width: auto;
}

.mobile-menu-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: #e5e7eb;
  color: #6b7280;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.mobile-menu-close-btn:hover {
  background: #d1d5db;
  color: #374151;
}

.dark .mobile-menu-close-btn {
  background: #4b5563;
  color: #9ca3af;
}

.dark .mobile-menu-close-btn:hover {
  background: #6b7280;
  color: #d1d5db;
}

/* Контент меню */
.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;
}

/* Пользовательская секция */
.mobile-menu-user-section {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.dark .mobile-menu-user-section {
  border-color: #4b5563;
}

.mobile-menu-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mobile-menu-user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
}

.dark .mobile-menu-user-avatar {
  background: #4b5563;
  color: #9ca3af;
}

.mobile-menu-user-details {
  flex: 1;
}

.mobile-menu-user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.dark .mobile-menu-user-name {
  color: #f9fafb;
}

.mobile-menu-user-role {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.dark .mobile-menu-user-role {
  color: #9ca3af;
}

.mobile-menu-admin-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #7c3aed;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.mobile-menu-admin-btn:hover {
  background: #6d28d9;
  transform: translateY(-1px);
}

/* Секция авторизации */
.mobile-menu-auth-section {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dark .mobile-menu-auth-section {
  border-color: #4b5563;
}

.mobile-menu-auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.mobile-menu-auth-btn--login {
  background: #3b82f6;
  color: white;
}

.mobile-menu-auth-btn--login:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.mobile-menu-auth-btn--register {
  background: #10b981;
  color: white;
}

.mobile-menu-auth-btn--register:hover {
  background: #059669;
  transform: translateY(-1px);
}

/* Навигация */
.mobile-menu-nav {
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #374151;
  transition: all 0.2s;
  cursor: pointer;
  text-align: left;
}

.dark .mobile-menu-item {
  color: #d1d5db;
}

.mobile-menu-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.dark .mobile-menu-item:hover {
  background: #374151;
}

.mobile-menu-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: #e5e7eb;
  color: #6b7280;
  flex-shrink: 0;
}

.dark .mobile-menu-item-icon {
  background: #4b5563;
  color: #9ca3af;
}

.mobile-menu-item-text {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
}

.mobile-menu-item-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: #9ca3af;
  flex-shrink: 0;
}

.dark .mobile-menu-item-arrow {
  color: #6b7280;
}

.mobile-menu-item--lead {
  margin-bottom: 2rem;
}

/* Секция выхода */
.mobile-menu-logout-section {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
}

.dark .mobile-menu-logout-section {
  border-color: #4b5563;
}

.mobile-menu-logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.mobile-menu-logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Адаптивность */
@media (max-width: 640px) {
  .mobile-menu-overlay {
    padding-top: 2rem;
  }
  
  .mobile-menu-container {
    margin: 0 0.5rem;
    max-height: calc(100vh - 2rem);
  }
  
  .mobile-menu-header {
    padding: 0.75rem 1rem;
  }
  
  .mobile-menu-user-section,
  .mobile-menu-auth-section,
  .mobile-menu-nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .mobile-menu-logout-section {
    padding: 1rem;
  }
}

@media (max-width: 375px) {
  .mobile-menu-container {
    margin: 0 0.25rem;
  }
  
  .mobile-menu-header {
    padding: 0.5rem 0.75rem;
  }
  
  .mobile-menu-user-section,
  .mobile-menu-auth-section,
  .mobile-menu-nav {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .mobile-menu-logout-section {
    padding: 0.75rem;
  }
}

/* Сенсорные устройства */
@media (hover: none) and (pointer: coarse) {
  .mobile-menu-item {
    min-height: 3.5rem;
  }
  
  .mobile-menu-auth-btn,
  .mobile-menu-logout-btn {
    min-height: 3rem;
  }
}
</style>
