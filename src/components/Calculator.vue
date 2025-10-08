<template>
  <div class="container py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('calculator.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ $t('calculator.subtitle') }}
        </p>
      </div>

      <!-- Основной контент -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Настройки -->
        <div class="lg:col-span-2 space-y-6 order-1 lg:order-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {{ $t('calculator.selectOptions') }}
            </h2>

            <!-- Выбор уровня HSK -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ $t('calculator.level') }}
              </label>
              <select
                v-model="selectedLevel"
                class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{{ $t('calculator.selectLevel') }}</option>
                <option v-for="(level, key) in pricingData.levels" :key="key" :value="key">
                  {{ level.name }} - {{ $t(`calculator.levelNames.${level.name.split(' ')[1]}`) }}
                </option>
              </select>
            </div>

            <!-- Выбор формата -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ $t('calculator.format') }}
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  v-for="(_, key) in pricingData.formats"
                  :key="key"
                  @click="selectedFormat = key"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                    selectedFormat === key
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  ]"
                >
                  <div class="font-semibold text-gray-900 dark:text-white mb-2">
                    {{ $t(`calculator.formats.${key}`) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">
                    {{ $t(`calculator.formatDescriptions.${key}`) }}
                  </div>
                </button>
              </div>
            </div>

            <!-- Количество занятий в месяц -->
            <div v-if="selectedFormat === 'group'" class="mb-8">
              <label class="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ $t('calculator.lessonsPerMonth') }}
              </label>
              <div class="flex items-center space-x-4">
                <input
                  v-model.number="lessonsPerMonth"
                  type="range"
                  min="8"
                  max="12"
                  step="1"
                  class="slider flex-1"
                />
                <div class="text-lg font-semibold text-gray-900 dark:text-white min-w-[100px]">
                  {{ lessonsPerMonth }} {{ $t('calculator.lessons') }}
                </div>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ $t('calculator.lessonsHint') }}
              </p>
            </div>

            <!-- Информация для индивидуальных занятий -->
            <div v-if="selectedFormat === 'individual'" class="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p class="text-sm text-blue-700 dark:text-blue-300">
                {{ $t('calculator.individualInfo') }}
              </p>
            </div>

            <!-- Информация для интенсивного курса -->
            <div v-if="selectedFormat === 'intensive'" class="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <p class="text-sm text-orange-700 dark:text-orange-300">
                {{ $t('calculator.intensiveInfo') }}
              </p>
              <p class="text-xs text-orange-600 dark:text-orange-400 mt-2">
                {{ $t('calculator.intensiveNotice') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Результат -->
        <div class="lg:col-span-1 order-2 lg:order-2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sticky top-8">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {{ $t('calculator.result') }}
            </h3>

            <!-- Промокод -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ $t('calculator.promoCode') }}
              </label>
              <div class="flex space-x-2">
                <input
                  v-model="promoCode"
                  type="text"
                  :placeholder="$t('calculator.promoCodePlaceholder')"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <button
                  @click="applyPromoCode"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  {{ $t('calculator.applyPromo') }}
                </button>
              </div>
            </div>

            <!-- Детализация -->
            <div v-if="selectedLevel && selectedFormat" class="space-y-4 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ $t('calculator.baseCost') }}:</span>
                <span class="font-medium">{{ formatPrice(monthlyPrice) }}</span>
              </div>
              
              <div v-if="appliedDiscount > 0" class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ $t('calculator.discount') }}:</span>
                <span class="font-medium text-green-600">-{{ appliedDiscount }}%</span>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-600 pt-2">
                <div class="flex justify-between">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ $t('calculator.finalCost') }}:</span>
                  <span class="font-bold text-lg text-blue-600 dark:text-blue-400">
                    {{ formatPrice(finalPrice) }}
                  </span>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t('calculator.perMonth') }}
                </div>
              </div>
            </div>

            <!-- Сообщение о выборе параметров -->
            <div v-else class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">
                {{ $t('calculator.selectAllOptions') }}
              </p>
            </div>

            <!-- Кнопки действий -->
            <div v-if="selectedLevel && selectedFormat" class="space-y-3">
              <button
                @click="bookTrialLesson"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {{ $t('calculator.bookTrial') }}
              </button>
              <button
                @click="goToHome"
                class="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {{ $t('calculator.backToHome') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotifications } from '../composables/useNotifications';
import pricingData from '@/data/pricing.json';

const router = useRouter();
const { t: _t } = useI18n();
const { promoCodeNotFound, promoCodeApplied } = useNotifications();

// Состояние
const selectedLevel = ref('');
const selectedFormat = ref('');
const lessonsPerMonth = ref(8);
const promoCode = ref('');
const appliedDiscount = ref(0);

// Информация о выбранном уровне
const levelInfo = computed(() => {
  if (!selectedLevel.value) return null;
  return pricingData.levels[selectedLevel.value as keyof typeof pricingData.levels];
});

// Стоимость в месяц
const monthlyPrice = computed(() => {
  if (!levelInfo.value || !selectedFormat.value) return 0;
  
  const basePrice = levelInfo.value.basePrice;
  
  // Для групповых занятий учитываем количество уроков
  if (selectedFormat.value === 'group') {
    const lessonsMultiplier = lessonsPerMonth.value / 8; // Базовая ставка за 8 занятий
    return Math.round(basePrice * lessonsMultiplier);
  }
  
  // Для индивидуальных занятий фиксированная цена
  if (selectedFormat.value === 'individual') {
    return 2200000; // 2 200 000 сум
  }
  
  // Для интенсивных занятий базовая цена (обсуждается с преподавателем)
  return basePrice;
});

// Общая стоимость курса (не используется в текущем интерфейсе)
// const totalCoursePrice = computed(() => {
//   if (!levelInfo.value) return 0;
//   return monthlyPrice.value * levelInfo.value.duration;
// });

// Финальная цена с учетом скидки
const finalPrice = computed(() => {
  if (appliedDiscount.value > 0) {
    return Math.round(monthlyPrice.value * (1 - appliedDiscount.value / 100));
  }
  return monthlyPrice.value;
});

// Функция форматирования цены
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price);
}

// Функция применения промокода
function applyPromoCode() {
  // Простая логика промокодов
  const promo = promoCode.value.trim().toUpperCase();
  
  if (promo === 'WELCOME10') {
    appliedDiscount.value = 10;
    promoCodeApplied('WELCOME10');
  } else if (promo === 'STUDENT15') {
    appliedDiscount.value = 15;
    promoCodeApplied('STUDENT15');
  } else if (promo === 'VIP20') {
    appliedDiscount.value = 20;
    promoCodeApplied('VIP20');
  } else {
    appliedDiscount.value = 0;
    promoCodeNotFound();
  }
}

// Функция записи на пробный урок
function bookTrialLesson() {
  // Переходим на главную страницу (где есть форма)
  router.push('/');
}

// Функция возврата на главную
function goToHome() {
  router.push('/');
}
</script>

<style scoped>
/* Стили для слайдера */
.slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #d1d5db;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dark .slider {
  background: #4b5563;
}

.dark .slider::-webkit-slider-thumb {
  background: #60a5fa;
}

.dark .slider::-moz-range-thumb {
  background: #60a5fa;
}

.dark .slider::-webkit-slider-track {
  background: #4b5563;
}

.dark .slider::-moz-range-track {
  background: #4b5563;
}
</style>