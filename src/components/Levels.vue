<template>
  <section id="levels" class="container py-12 sm:py-16" aria-labelledby="levels-title">
    <div class="text-center mb-12">
      <h2 id="levels-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('levels.title') }}</h2>
      <p class="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">{{ $t('levels.subtitle') }}</p>
    </div>

    <div class="mt-6 space-y-8">
      <div v-for="(item, index) in timeline" :key="item.level" class="glass-level-card group">
        <div class="glass-level-inner">
          <!-- Level Header -->
          <div class="glass-level-header">
            <div class="glass-level-badge" :class="`level-${item.level}`">
              <span class="glass-level-number">{{ item.level }}</span>
              <span class="glass-level-text">HSK</span>
            </div>
            <div class="glass-level-title">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">HSK {{ item.level }}</h3>
              <div class="glass-level-progress">
                <div class="glass-progress-bar" :style="{ width: `${(item.level / 6) * 100}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Level Content -->
          <div class="glass-level-content">
            <div class="grid sm:grid-cols-3 gap-6">
              <!-- Goals -->
              <div class="glass-info-card">
                <div class="glass-info-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="glass-info-content">
                  <h4 class="glass-info-label">{{ $t('levels.labels.goals') }}</h4>
                  <p class="glass-info-text">{{ item.goals }}</p>
                </div>
              </div>

              <!-- Grammar -->
              <div class="glass-info-card">
                <div class="glass-info-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div class="glass-info-content">
                  <h4 class="glass-info-label">{{ $t('levels.labels.grammar') }}</h4>
                  <p class="glass-info-text">{{ item.grammar }}</p>
                </div>
              </div>

              <!-- Result -->
              <div class="glass-info-card">
                <div class="glass-info-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div class="glass-info-content">
                  <h4 class="glass-info-label">{{ $t('levels.labels.result') }}</h4>
                  <p class="glass-info-text">{{ item.result }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type TimelineItem = { level: number; goals: string; grammar: string; result: string };
const { tm } = useI18n();
const timeline = computed(() => tm('levels.timeline') as unknown as TimelineItem[]);
</script>

<style scoped>
/* Liquid Glass Apple Style for Levels */
.glass-level-card {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-level-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}

.glass-level-inner {
  @apply p-8 relative z-10;
}

.glass-level-header {
  @apply flex items-center space-x-6 mb-8;
}

.glass-level-badge {
  @apply w-20 h-20 rounded-2xl flex flex-col items-center justify-center relative;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.glass-level-number {
  @apply text-2xl font-bold text-blue-600 dark:text-blue-400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-level-text {
  @apply text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider;
}

.glass-level-title {
  @apply flex-1;
}

.glass-level-progress {
  @apply w-full h-2 rounded-full mt-3 overflow-hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.glass-progress-bar {
  @apply h-full rounded-full transition-all duration-1000 ease-out;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}

.glass-level-content {
  @apply space-y-6;
}

.glass-info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-info-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.glass-info-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-info-icon svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-info-content {
  flex: 1;
  text-align: center;
}

.glass-info-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  text-align: center;
}

.glass-info-text {
  color: #1f2937;
  line-height: 1.625;
  text-align: center;
}

.dark .glass-info-label {
  color: #9ca3af;
}

.dark .glass-info-text {
  color: #e5e7eb;
}

/* Level-specific colors */
.level-1 .glass-level-badge {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.2);
}

.level-2 .glass-level-badge {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.level-3 .glass-level-badge {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2));
  box-shadow: 0 4px 16px rgba(147, 51, 234, 0.2);
}

.level-4 .glass-level-badge {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(251, 191, 36, 0.2));
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.2);
}

.level-5 .glass-level-badge {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 101, 101, 0.2));
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.2);
}

.level-6 .glass-level-badge {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.2), rgba(139, 92, 246, 0.2));
  box-shadow: 0 4px 16px rgba(245, 101, 101, 0.2);
}

/* Dark theme adjustments */
.dark .glass-level-card {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dark .glass-level-card:hover {
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-info-card {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-info-card:hover {
  background: rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-level-inner {
    padding: 1.5rem;
  }
  
  .glass-level-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .glass-level-badge {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
  }
  
  .glass-level-number {
    font-size: 1.25rem;
  }
  
  .glass-info-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
    align-items: center;
  }
  
  .glass-info-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 auto;
  }
  
  .glass-info-content {
    text-align: center;
  }
  
  .glass-info-label {
    text-align: center;
  }
  
  .glass-info-text {
    text-align: center;
  }
}

/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1024px) {
  .glass-level-inner {
    padding: 1.75rem;
  }
  
  .glass-level-header {
    gap: 0.75rem;
  }
  
  .glass-level-badge {
    width: 4rem;
    height: 4rem;
  }
  
  .glass-level-number {
    font-size: 1.5rem;
  }
  
  .glass-level-title {
    font-size: 1.125rem;
  }
  
  .glass-info-card {
    gap: 0.75rem;
    text-align: center;
  }
  
  .glass-info-icon {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
  }
  
  .glass-info-content {
    text-align: center;
  }
  
  .glass-info-label {
    text-align: center;
  }
  
  .glass-info-text {
    font-size: 0.875rem;
    text-align: center;
  }
}

/* Large tablet styles */
@media (min-width: 1025px) and (max-width: 1200px) {
  .glass-level-inner {
    padding: 2rem;
  }
  
  .glass-level-header {
    gap: 1rem;
  }
  
  .glass-level-badge {
    width: 5rem;
    height: 5rem;
  }
  
  .glass-level-number {
    font-size: 1.875rem;
  }
  
  .glass-level-title {
    font-size: 1.25rem;
  }
  
  .glass-info-card {
    gap: 1rem;
    text-align: center;
  }
  
  .glass-info-icon {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 auto;
  }
  
  .glass-info-content {
    text-align: center;
  }
  
  .glass-info-label {
    text-align: center;
  }
  
  .glass-info-text {
    text-align: center;
  }
}
</style>


