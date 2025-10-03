<template>
  <footer class="bg-gray-50 border-t border-gray-200 mt-12">
    <!-- Основной контент -->
    <div class="container py-12">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Левая колонка: Логотип + описание -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo1.JPG?url" alt="Unlock" class="h-10 w-auto" />
            <span class="text-xl font-bold text-gray-900">Unlock</span>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ $t('footer.description') }}
          </p>
        </div>

        <!-- Средняя колонка: Меню -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">{{ $t('footer.menu.title') }}</h3>
          <nav class="space-y-2">
            <RouterLink to="/" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.home') }}
            </RouterLink>
            <a href="#formats" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.courses') }}
            </a>
            <a href="#teachers" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.teachers') }}
            </a>
            <a href="#pricing" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.pricing') }}
            </a>
            <RouterLink to="/blog" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.blog') }}
            </RouterLink>
            <RouterLink to="/test" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.test') }}
            </RouterLink>
            <a href="#contacts" class="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {{ $t('footer.menu.contacts') }}
            </a>
          </nav>
        </div>

        <!-- Правая колонка: Контакты -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">{{ $t('footer.contacts.title') }}</h3>
          <div class="space-y-3">
            <!-- Телефон -->
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <a :href="`tel:${phone}`" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                {{ phone }}
              </a>
            </div>

            <!-- Email -->
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a :href="`mailto:${email}`" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                {{ email }}
              </a>
            </div>

            <!-- Telegram -->
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <a href="https://t.me/test_my_assistant_123_bot" target="_blank" rel="noopener" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                @test_my_assistant_123_bot
              </a>
            </div>

            <!-- WhatsApp -->
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <a :href="`https://wa.me/${whatsappNumber}`" target="_blank" rel="noopener" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('footer.contacts.whatsapp') }}
              </a>
            </div>

            <!-- Адрес -->
            <div class="flex items-start gap-3">
              <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-sm text-gray-600">{{ $t('footer.contacts.address') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Нижняя плашка -->
    <div class="border-t border-gray-200 bg-white">
      <div class="container py-6">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <!-- Левая часть: Копирайт и ссылки -->
          <div class="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
            <span>© Unlock {{ year }}</span>
            <div class="flex items-center gap-4">
              <RouterLink to="/privacy" class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                {{ $t('footer.links.privacy') }}
              </RouterLink>
              <RouterLink to="/offer" class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                {{ $t('footer.links.offer') }}
              </RouterLink>
              <RouterLink to="/refund" class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                {{ $t('footer.links.refund') }}
              </RouterLink>
            </div>
          </div>

          <!-- Правая часть: Соцсети, платежи, кнопка наверх -->
          <div class="flex items-center gap-4">
            <!-- Соцсети -->
            <div class="flex items-center gap-3">
              <a 
                href="https://t.me/test_my_assistant_123_bot" 
                target="_blank" 
                rel="noopener"
                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :aria-label="$t('footer.social.telegram')"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                :href="instagramUrl" 
                target="_blank" 
                rel="noopener"
                class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                :aria-label="$t('footer.social.instagram')"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-1.151-2.448-2.448s1.151-2.448 2.448-2.448 2.448 1.151 2.448 2.448-1.151 2.448-2.448 2.448zm7.718 0c-1.297 0-2.448-1.151-2.448-2.448s1.151-2.448 2.448-2.448 2.448 1.151 2.448 2.448-1.151 2.448-2.448 2.448z"/>
                </svg>
              </a>
              <a 
                :href="`https://wa.me/${whatsappNumber}`" 
                target="_blank" 
                rel="noopener"
                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                :aria-label="$t('footer.social.whatsapp')"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>

            <!-- Платежные системы -->
            <div class="flex items-center gap-2">
              <a 
                :href="paymeUrl" 
                target="_blank" 
                rel="noopener"
                class="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Payme
              </a>
              <a 
                :href="clickUrl" 
                target="_blank" 
                rel="noopener"
                class="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Click
              </a>
            </div>

            <!-- Кнопка "Наверх" -->
            <button 
              @click="scrollToTop"
              class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              :aria-label="$t('footer.scrollToTop')"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());

// Переменные окружения
const phone = computed(() => import.meta.env.VITE_PHONE || '+998 xx xxx xx xx');
const email = computed(() => import.meta.env.VITE_EMAIL || 'info@unlock.uz');
const whatsappNumber = computed(() => import.meta.env.VITE_WHATSAPP_URL?.replace('https://wa.me/', '') || '998901234567');
const instagramUrl = computed(() => import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com');
const paymeUrl = computed(() => import.meta.env.VITE_PAYME_URL || '#');
const clickUrl = computed(() => import.meta.env.VITE_CLICK_URL || '#');

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>