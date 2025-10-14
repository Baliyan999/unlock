<template>
  <section class="container pt-10 sm:pt-16" aria-label="Hero">
    <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight overflow-hidden text-gray-900 dark:text-white">
          <span 
            ref="typewriterText"
            class="typewriter-text"
            :class="{ 'typing': isTyping }"
          >
            {{ displayedText }}
          </span>
          <span class="cursor" :class="{ 'blinking': isTyping }">|</span>
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-300">
          {{ $t('hero.sub') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-4">
          <button 
            @click="scrollToForm" 
            class="glass-button glass-button-primary"
          >
            <span class="glass-button-content">
              <svg class="glass-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              {{ $t('hero.trial') }}
            </span>
          </button>
          
          <a 
            href="https://t.me/unlocklng_admin" 
            target="_blank" 
            rel="noopener"
            class="glass-button glass-button-secondary"
          >
            <span class="glass-button-content">
              <svg class="glass-button-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              {{ $t('hero.writeTg') }}
            </span>
          </a>
        </div>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded">{{ $t('hero.b1') }}</span>
          <span class="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2.5 py-1 rounded">{{ $t('hero.b2') }}</span>
          <span class="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded">{{ $t('hero.b3') }}</span>
        </div>
      </div>
            <div class="glass-video-container">
              <div class="glass-video-inner">
                <iframe 
                  class="glass-video-iframe"
                  src="https://www.youtube.com/embed/-TXh2rrNshI?si=WtisEKRDOipbyNU1"
                  title="UNLOCK - Курсы китайского языка"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const displayedText = ref('');
const isTyping = ref(false);
const typewriterText = ref<HTMLElement>();

const fullText = computed(() => t('hero.h1'));

function scrollToForm() {
  const el = document.getElementById('lead');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function typeWriter() {
  const text = fullText.value;
  
  // Принудительно очищаем все таймеры
  const existingTimers = window.setInterval(() => {}, 0);
  for (let i = 0; i < existingTimers; i++) {
    clearInterval(i);
  }
  
  let i = 0;
  
  isTyping.value = true;
  displayedText.value = '';
  
  // Принудительно обновляем DOM
  nextTick(() => {
    const timer = setInterval(() => {
      if (i < text.length) {
        displayedText.value += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        isTyping.value = false;
      }
    }, 80); // Скорость печати - 80ms на символ
  });
}

onMounted(() => {
  // Небольшая задержка перед началом анимации
  setTimeout(() => {
    typeWriter();
  }, 500);
});

// Перезапускаем анимацию при смене языка
watch(fullText, () => {
  // Принудительно очищаем отображение
  displayedText.value = '';
  isTyping.value = false;
  
  // Небольшая задержка для плавного перехода
  setTimeout(() => {
    typeWriter();
  }, 200);
});
</script>

<style scoped>
.cursor {
  color: #000000;
  font-weight: bold;
  animation: blink 1s infinite;
}

.dark .cursor {
  color: #ffffff;
}

.cursor.blinking {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.typewriter-text {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-right: 2px solid transparent;
  min-height: 200px;
  padding-bottom: 20px;
  line-height: 1.4;
}

.typewriter-text.typing {
  border-right: 2px solid #000000;
  animation: typewriter-cursor 0.8s infinite;
}

.dark .typewriter-text.typing {
  border-right: 2px solid #ffffff;
  animation: typewriter-cursor-dark 0.8s infinite;
}

@keyframes typewriter-cursor {
  0%, 50% { border-right-color: #000000; }
  51%, 100% { border-right-color: transparent; }
}

@keyframes typewriter-cursor-dark {
  0%, 50% { border-right-color: #ffffff; }
  51%, 100% { border-right-color: transparent; }
}

/* Liquid Glass Button Styles */
.glass-button {
  @apply relative inline-flex items-center justify-center px-10 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-button:active {
  transform: translateY(0);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-button-primary {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  color: #1e40af;
  border-color: rgba(59, 130, 246, 0.3);
}

.glass-button-primary:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  border-color: rgba(59, 130, 246, 0.4);
  color: #1d4ed8;
}

.glass-button-secondary {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  color: #059669;
  border-color: rgba(34, 197, 94, 0.3);
}

.glass-button-secondary:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));
  border-color: rgba(34, 197, 94, 0.4);
  color: #047857;
}

.glass-button-content {
  @apply flex items-center space-x-5;
}

.glass-button-icon {
  @apply w-5 h-5;
  margin-right: 10px;
}

/* Dark theme styles */
.dark .glass-button {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-button:hover {
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.dark .glass-button-primary {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.4);
}

.dark .glass-button-primary:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4));
  border-color: rgba(59, 130, 246, 0.5);
  color: #93c5fd;
}

.dark .glass-button-secondary {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));
  color: #4ade80;
  border-color: rgba(34, 197, 94, 0.4);
}

.dark .glass-button-secondary:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4));
  border-color: rgba(34, 197, 94, 0.5);
  color: #6ee7b7;
}

/* Liquid Glass Video Styles */
.glass-video-container {
  @apply relative aspect-video rounded-3xl overflow-hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 20px 48px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-video-container:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-video-inner {
  @apply relative w-full h-full rounded-3xl overflow-hidden;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
}

.glass-video-iframe {
  @apply w-full h-full rounded-3xl;
  border: none;
  filter: brightness(1.05) contrast(1.02);
  transition: filter 0.3s ease;
}

.glass-video-iframe:hover {
  filter: brightness(1.1) contrast(1.05);
}

/* Dark theme video styles */
.dark .glass-video-container {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-video-container:hover {
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.dark .glass-video-inner {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
}

.dark .glass-video-iframe {
  filter: brightness(0.95) contrast(1.05);
}

.dark .glass-video-iframe:hover {
  filter: brightness(1.0) contrast(1.1);
}

/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1024px) {
  .typewriter-text {
    min-height: 180px;
    font-size: 1.75rem;
    line-height: 1.3;
  }
  
  .glass-button {
    @apply px-8 py-3 text-base;
  }
  
  .glass-video-container {
    @apply aspect-video;
    max-height: 400px;
  }
  
  .glass-video-iframe {
    @apply rounded-2xl;
  }
}

/* Large tablet styles */
@media (min-width: 1025px) and (max-width: 1200px) {
  .typewriter-text {
    min-height: 160px;
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .glass-button {
    @apply px-10 py-4 text-lg;
  }
  
  .glass-video-container {
    @apply aspect-video;
    max-height: 450px;
  }
}
</style>


