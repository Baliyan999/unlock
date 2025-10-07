<template>
  <section id="formats" class="container py-12 sm:py-16" aria-labelledby="formats-title">
    <h2 id="formats-title" class="text-2xl sm:text-3xl font-semibold dark:text-white text-center mb-12">{{ $t('formats.title') }}</h2>
    
    <div class="mt-6 grid md:grid-cols-3 gap-8">
      <!-- Group Format -->
      <article class="glass-card group">
        <div class="glass-card-inner">
          <div class="glass-card-header">
            <div class="glass-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="glass-title">{{ $t('formats.group.title') }}</h3>
          </div>
          <ul class="glass-list">
            <li v-for="(it, i) in list('formats.group.items')" :key="'g-'+i" class="glass-list-item">
              <div class="glass-list-dot"></div>
              <span>{{ it }}</span>
            </li>
          </ul>
        </div>
      </article>

      <!-- Individual Format -->
      <article class="glass-card group">
        <div class="glass-card-inner">
          <div class="glass-card-header">
            <div class="glass-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="glass-title">{{ $t('formats.individual.title') }}</h3>
          </div>
          <ul class="glass-list">
            <li v-for="(it, i) in list('formats.individual.items')" :key="'i-'+i" class="glass-list-item">
              <div class="glass-list-dot"></div>
              <span>{{ it }}</span>
            </li>
          </ul>
        </div>
      </article>

      <!-- Intensive Format -->
      <article class="glass-card group">
        <div class="glass-card-inner">
          <div class="glass-card-header">
            <div class="glass-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="glass-title">{{ $t('formats.intensive.title') }}</h3>
          </div>
          <ul class="glass-list">
            <li v-for="(it, i) in list('formats.intensive.items')" :key="'in-'+i" class="glass-list-item">
              <div class="glass-list-dot"></div>
              <span>{{ it }}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
function list(key: string): string[] {
  const val = tm(key);
  return Array.isArray(val) ? (val as string[]) : [];
}
</script>

<style scoped>
/* Liquid Glass Apple Style */
.glass-card {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.glass-card-inner {
  @apply p-8 relative z-10;
}

.glass-card-header {
  @apply flex items-center space-x-4 mb-6;
}

.glass-icon {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-icon svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-title {
  @apply text-xl font-bold text-gray-900 dark:text-white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-list {
  @apply space-y-4;
}

.glass-list-item {
  @apply flex items-start space-x-3 text-gray-700 dark:text-gray-300;
}

.glass-list-dot {
  @apply w-2 h-2 rounded-full mt-2 flex-shrink-0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

/* Dark theme adjustments */
.dark .glass-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-card:hover {
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Gradient backgrounds for each card */
.glass-card:nth-child(1) {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
}

.glass-card:nth-child(2) {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
}

.glass-card:nth-child(3) {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(251, 191, 36, 0.1));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-card-inner {
    @apply p-6;
  }
  
  .glass-card-header {
    @apply flex-col space-x-0 space-y-4 text-center;
  }
  
  .glass-icon {
    @apply w-12 h-12 mx-auto;
  }
}
</style>


