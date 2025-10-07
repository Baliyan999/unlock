<template>
  <section class="container py-12 sm:py-16" aria-labelledby="faq-title">
    <div class="text-center mb-12">
      <h2 id="faq-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('faq.title') }}</h2>
    </div>
    
    <div class="mt-6 space-y-4">
      <div v-for="(item, index) in items" :key="index" class="glass-faq-item group">
        <div class="glass-faq-inner">
          <button 
            @click="toggleItem(index)"
            class="glass-faq-button"
            :class="{ 'glass-faq-button-active': openItems.includes(index) }"
            :aria-expanded="openItems.includes(index)"
          >
            <div class="glass-faq-question">
              <span class="glass-faq-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <span class="glass-faq-text">{{ item.q }}</span>
            </div>
            <div class="glass-faq-arrow" :class="{ 'glass-faq-arrow-rotated': openItems.includes(index) }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          
          <div 
            class="glass-faq-answer"
            :class="{ 'glass-faq-answer-open': openItems.includes(index) }"
          >
            <div class="glass-faq-answer-content">
              <span class="glass-faq-answer-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <p class="glass-faq-answer-text">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
const items = tm('faq.items') as unknown as { q: string; a: string }[];
const openItems = ref<number[]>([]);

function toggleItem(index: number) {
  if (openItems.value.includes(index)) {
    openItems.value = openItems.value.filter(i => i !== index);
  } else {
    openItems.value.push(index);
  }
}
</script>

<style scoped>
/* Liquid Glass Apple Style for FAQ */
.glass-faq-item {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}

.glass-faq-inner {
  @apply relative z-10;
}

.glass-faq-button {
  @apply w-full p-6 flex items-center justify-between text-left transition-all duration-300;
  background: transparent;
  border: none;
  outline: none;
}

.glass-faq-button:hover {
  @apply bg-white/5;
}

.glass-faq-button-active {
  @apply bg-white/10;
}

.glass-faq-question {
  @apply flex items-center space-x-4 flex-1;
}

.glass-faq-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-faq-icon svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-faq-text {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-faq-arrow {
  @apply w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-faq-arrow svg {
  @apply text-gray-600 dark:text-gray-300;
}

.glass-faq-arrow-rotated {
  @apply rotate-180;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border-color: rgba(59, 130, 246, 0.3);
}

.glass-faq-arrow-rotated svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-faq-answer {
  @apply overflow-hidden transition-all duration-300 ease-in-out;
  max-height: 0;
  opacity: 0;
}

.glass-faq-answer-open {
  max-height: 500px;
  opacity: 1;
}

.glass-faq-answer-content {
  @apply p-6 pt-0 flex items-center space-x-4;
}

.glass-faq-answer-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-faq-answer-icon svg {
  @apply text-green-600 dark:text-green-400;
}

.glass-faq-answer-text {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Dark theme adjustments */
.dark .glass-faq-item {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dark .glass-faq-item:hover {
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-faq-button:hover {
  @apply bg-white/5;
}

.dark .glass-faq-button-active {
  background: rgba(255, 255, 255, 0.08);
}

.dark .glass-faq-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-faq-answer-icon {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-faq-button {
    @apply p-4;
  }
  
  .glass-faq-answer-content {
    @apply p-4 pt-0;
  }
  
  .glass-faq-icon {
    @apply w-8 h-8;
  }
  
  .glass-faq-icon svg {
    @apply w-5 h-5;
  }
  
  .glass-faq-arrow {
    @apply w-7 h-7;
  }
  
  .glass-faq-arrow svg {
    @apply w-4 h-4;
  }
}
</style>


