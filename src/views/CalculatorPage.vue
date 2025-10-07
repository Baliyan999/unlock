<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Calculator Section -->
    <section class="container py-12">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-6">
            <RouterLink to="/" class="glass-calculator-back-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>{{ $t('calculator.backToHome') }}</span>
            </RouterLink>
          </div>
          <div class="glass-calculator-header">
            <div class="glass-calculator-icon">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h1 class="glass-calculator-title">
              {{ $t('calculator.title') }}
            </h1>
            <p class="glass-calculator-subtitle">
              {{ $t('calculator.subtitle') }}
            </p>
          </div>
        </div>

        <div class="glass-calculator-container">
          <div class="glass-calculator-inner">
            <!-- Calculator Form -->
            <div class="glass-calculator-form">
              <div class="glass-calculator-form-header">
                <div class="glass-calculator-form-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <h2 class="glass-calculator-form-title">{{ $t('calculator.selectOptions') }}</h2>
              </div>
            
              <div class="glass-calculator-options">
                <!-- HSK Level -->
                <div class="glass-calculator-option-group">
                  <div class="glass-calculator-option-label">
                    <div class="glass-calculator-option-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span>{{ $t('calculator.level') }}</span>
                  </div>
                  <div class="glass-calculator-level-grid">
                    <button
                      v-for="level in levels"
                      :key="level"
                      @click="selectedLevel = level"
                      class="glass-calculator-level-button"
                      :class="{ 'glass-calculator-level-button-selected': selectedLevel === level }"
                    >
                      <div class="glass-calculator-level-content">
                        <div class="glass-calculator-level-number">HSK {{ level }}</div>
                        <div class="glass-calculator-level-name">{{ $t(`calculator.levelNames.${level}`) }}</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Format -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">
                  {{ $t('calculator.format') }}
                </label>
                <div class="grid grid-cols-1 gap-3">
                  <button
                    v-for="format in formats"
                    :key="format"
                    @click="selectedFormat = format"
                    :class="[
                      'px-4 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-500',
                      selectedFormat === format 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg' 
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:shadow-md'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="text-left">
                        <div class="font-semibold">{{ $t(`calculator.formats.${format}`) }}</div>
                        <div class="text-sm opacity-75">{{ $t(`calculator.formatDescriptions.${format}`) }}</div>
                      </div>
                      <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                           :class="selectedFormat === format ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
                        <div v-if="selectedFormat === format" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Lessons per month -->
              <div v-if="selectedFormat !== 'intensive'" class="space-y-6">
                <label class="block text-lg font-semibold text-gray-800">
                  {{ $t('calculator.lessonsPerMonth') }}
                </label>
                
                <!-- Modern lesson selector -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <!-- Current selection display -->
                  <div class="text-center mb-6">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full shadow-lg">
                      <span class="text-2xl font-bold text-white">{{ selectedLessons || 8 }}</span>
                    </div>
                    <p class="mt-3 text-sm text-gray-600">{{ $t('calculator.lessons') }} {{ $t('calculator.perMonth') }}</p>
                  </div>
                  
                  <!-- Lesson options grid -->
                  <div class="grid grid-cols-5 gap-3">
                    <button
                      v-for="lessons in lessonsOptions"
                      :key="lessons"
                      @click="selectedLessons = lessons.toString()"
                      :class="[
                        'relative group flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500',
                        selectedLessons === lessons.toString()
                          ? 'border-blue-500 bg-blue-500 text-white shadow-xl scale-105' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      ]"
                    >
                      <!-- Number -->
                      <div class="text-xl font-bold mb-1">{{ lessons }}</div>
                      
                      <!-- Label -->
                      <div class="text-xs opacity-75">{{ $t('calculator.lessons') }}</div>
                      
                      <!-- Selection indicator -->
                      <div v-if="selectedLessons === lessons.toString()" 
                           class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                  
                  <!-- Range indicator -->
                  <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>8 {{ $t('calculator.lessons') }}</span>
                    <div class="flex-1 mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500"
                           :style="{ width: `${((parseInt(selectedLessons || '8') - 8) / 4) * 100}%` }"></div>
                    </div>
                    <span>12 {{ $t('calculator.lessons') }}</span>
                  </div>
                </div>
              </div>

              <!-- Intensive format notice -->
              <div v-if="selectedFormat === 'intensive'" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-sm text-blue-700">{{ $t('calculator.intensiveNotice') }}</p>
                </div>
              </div>

              <!-- Promo Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('calculator.promoCode') }}
                </label>
                <div class="flex gap-2">
                  <input 
                    v-model="promoCode" 
                    type="text" 
                    :placeholder="$t('calculator.promoCodePlaceholder')"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button 
                    @click="applyPromoCode"
                    :disabled="!promoCode.trim()"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {{ $t('calculator.apply') }}
                  </button>
                </div>
                <div v-if="promoError" class="mt-2 text-sm text-red-600">
                  {{ promoError }}
                </div>
                <div v-if="promoSuccess" class="mt-2 text-sm text-green-600">
                  {{ promoSuccess }}
                </div>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-6">{{ $t('calculator.calculation') }}</h2>
            
            <div v-if="!isCalculationComplete" class="text-center py-8">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="text-gray-500">{{ $t('calculator.selectAllOptions') }}</p>
            </div>

            <div v-else class="space-y-4">
              <!-- Base Cost -->
              <div v-if="appliedPromo" class="bg-gray-50 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 font-medium">{{ $t('calculator.baseCost') }}</span>
                  <span class="text-lg text-gray-600 line-through">{{ formatPrice(baseCost) }}</span>
                </div>
              </div>

              <!-- Discount -->
              <div v-if="appliedPromo" class="bg-red-50 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <span class="text-red-700 font-medium">{{ $t('calculator.discount') }}</span>
                  <span class="text-lg font-bold text-red-900">-{{ formatPrice(discountAmount) }}</span>
                </div>
              </div>

              <!-- Final Cost -->
              <div class="bg-green-50 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <span class="text-green-700 font-medium">{{ $t('calculator.finalCost') }}</span>
                  <span class="text-2xl font-bold text-green-900">{{ formatPrice(totalCost) }}</span>
                </div>
              </div>

              <!-- Breakdown -->
              <div class="border-t pt-4">
                <h3 class="font-medium text-gray-900 mb-3">{{ $t('calculator.breakdown') }}</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>{{ $t('calculator.basePrice') }} (HSK {{ selectedLevel }})</span>
                    <span>{{ formatPrice(basePrice) }}</span>
                  </div>
                  <div v-if="selectedFormat !== 'intensive'" class="flex justify-between">
                    <span>{{ $t('calculator.lessonsPerMonth') }}: {{ selectedLessons }}</span>
                    <span>{{ formatPrice(lessonsPrice) }}</span>
                  </div>
                  <div v-if="selectedFormat === 'intensive'" class="flex justify-between">
                    <span>{{ $t('calculator.intensiveFormat') }}</span>
                    <span>{{ $t('calculator.teacherRegulated') }}</span>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="pt-4">
                <button 
                  @click="scrollToForm"
                  class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {{ $t('calculator.bookTrial') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import pricingData from '@/data/pricing.json';

const { t } = useI18n();

// Используем t для предотвращения предупреждения
console.log(t('calculator.title'));

// Form data
const selectedLevel = ref('');
const selectedFormat = ref('');
const selectedLessons = ref('');
const promoCode = ref('');
const appliedPromo = ref<any>(null);
const promoError = ref('');
const promoSuccess = ref('');

// Options
const levels = ['1', '2', '3', '4', '5', '6'];
const formats = ['group', 'individual', 'intensive'];
const lessonsOptions = [8, 9, 10, 11, 12];

// Promo codes database
const promoCodes = {
  'WELCOME10': { discount: 10, type: 'percentage', description: 'Скидка 10% для новых студентов' },
  'STUDENT20': { discount: 20, type: 'percentage', description: 'Скидка 20% для студентов' },
  'FAMILY15': { discount: 15, type: 'percentage', description: 'Скидка 15% для семейного обучения' },
  'SUMMER25': { discount: 25, type: 'percentage', description: 'Летняя скидка 25%' },
  'FIRST50000': { discount: 50000, type: 'fixed', description: 'Скидка 50,000 сум' },
  'UNLOCK100': { discount: 100000, type: 'fixed', description: 'Скидка 100,000 сум' }
};

// Computed values
const isCalculationComplete = computed(() => {
  if (selectedFormat.value === 'intensive') {
    return selectedLevel.value && selectedFormat.value;
  }
  return selectedLevel.value && selectedFormat.value && selectedLessons.value;
});

const basePrice = computed(() => {
  if (!selectedLevel.value) return 0;
  const level = pricingData.levels[`hsk${selectedLevel.value}` as keyof typeof pricingData.levels];
  return level ? level.basePrice : 0;
});

// Format multiplier removed from calculation

const lessonsPrice = computed(() => {
  if (!selectedLessons.value || selectedFormat.value === 'intensive') return 0;
  return parseInt(selectedLessons.value) * 25000; // 25,000 UZS per lesson
});

const baseCost = computed(() => {
  if (!isCalculationComplete.value) return 0;
  return Math.round((basePrice.value + lessonsPrice.value) * 1.1); // 10% markup
});

const discountAmount = computed(() => {
  if (!appliedPromo.value) return 0;
  
  if (appliedPromo.value.type === 'percentage') {
    return Math.round(baseCost.value * (appliedPromo.value.discount / 100));
  } else {
    return Math.min(appliedPromo.value.discount, baseCost.value);
  }
});

const monthlyCost = computed(() => {
  return Math.max(0, baseCost.value - discountAmount.value);
});

const totalCost = computed(() => {
  return monthlyCost.value;
});

// Methods
function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase();
  
  // Clear previous messages
  promoError.value = '';
  promoSuccess.value = '';
  
  if (!code) {
    promoError.value = 'Введите промокод';
    return;
  }
  
  if (promoCodes[code as keyof typeof promoCodes]) {
    appliedPromo.value = promoCodes[code as keyof typeof promoCodes];
    promoSuccess.value = `Промокод применен! ${appliedPromo.value.description}`;
    promoCode.value = '';
  } else {
    promoError.value = 'Неверный промокод';
  }
}

function scrollToForm() {
  const el = document.getElementById('lead');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // If form is not on this page, redirect to home
    window.location.href = '/#lead';
  }
}
</script>

<style scoped>
/* Custom slider styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  transform: translateX(-50%);
}

.slider::-webkit-slider-thumb:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.slider::-moz-range-thumb:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Hover scale animation */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.10);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Pulse animation for selected items */
@keyframes pulse-selected {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1); }
}

.border-blue-500 {
  animation: pulse-selected 2s infinite;
}

/* Glass Calculator Styles */
.glass-calculator-back-link {
  @apply inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #6b7280;
}

.glass-calculator-back-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-4px);
  color: #3b82f6;
}

.glass-calculator-header {
  @apply relative p-8 rounded-3xl mb-8;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-calculator-icon {
  @apply w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3b82f6;
}

.glass-calculator-title {
  @apply text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4;
}

.glass-calculator-subtitle {
  @apply text-lg text-gray-600 dark:text-gray-300;
}

.glass-calculator-container {
  @apply relative;
}

.glass-calculator-inner {
  @apply grid lg:grid-cols-2 gap-8;
}

.glass-calculator-form {
  @apply relative p-8 rounded-3xl;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-calculator-form:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-calculator-form-header {
  @apply flex items-center space-x-4 mb-8;
}

.glass-calculator-form-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.glass-calculator-form-title {
  @apply text-xl font-semibold text-gray-800 dark:text-white;
}

.glass-calculator-options {
  @apply space-y-8;
}

.glass-calculator-option-group {
  @apply space-y-4;
}

.glass-calculator-option-label {
  @apply flex items-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300;
}

.glass-calculator-option-icon {
  @apply w-6 h-6 rounded-lg flex items-center justify-center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15));
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.glass-calculator-level-grid {
  @apply grid grid-cols-3 gap-3;
}

.glass-calculator-level-button {
  @apply relative p-4 rounded-2xl transition-all duration-300;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-calculator-level-button:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.glass-calculator-level-button-selected {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.glass-calculator-level-content {
  @apply text-center;
}

.glass-calculator-level-number {
  @apply text-lg font-bold text-gray-800 dark:text-white mb-1;
}

.glass-calculator-level-name {
  @apply text-xs text-gray-600 dark:text-gray-400;
}

/* Dark theme adjustments */
.dark .glass-calculator-header,
.dark .glass-calculator-form {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-calculator-back-link {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-calculator-back-link:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark .glass-calculator-level-button {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-calculator-level-button:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark .glass-calculator-level-button-selected {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-calculator-header,
  .glass-calculator-form {
    @apply p-6;
  }
  
  .glass-calculator-inner {
    @apply grid-cols-1 gap-6;
  }
  
  .glass-calculator-level-grid {
    @apply grid-cols-2 gap-2;
  }
}
</style>
