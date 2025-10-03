<template>
  <section class="container py-12 sm:py-16" aria-labelledby="calculator-title">
    <h2 id="calculator-title" class="text-2xl sm:text-3xl font-semibold mb-8">{{ $t('calculator.title') }}</h2>
    
    <div class="bg-white border rounded-lg p-6 shadow-sm">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Настройки -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-3">{{ $t('calculator.level') }}</label>
            <select 
              v-model="selectedLevel" 
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="hsk1">HSK 1</option>
              <option value="hsk2">HSK 2</option>
              <option value="hsk3">HSK 3</option>
              <option value="hsk4">HSK 4</option>
              <option value="hsk5">HSK 5</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-3">{{ $t('calculator.format') }}</label>
            <select 
              v-model="selectedFormat" 
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="group">{{ $t('calculator.formats.group') }}</option>
              <option value="individual">{{ $t('calculator.formats.individual') }}</option>
              <option value="intensive">{{ $t('calculator.formats.intensive') }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-3">{{ $t('calculator.lessons') }}</label>
            <input 
              v-model.number="lessonsPerMonth"
              type="number" 
              min="4" 
              max="20"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p class="text-sm text-gray-600 mt-1">{{ $t('calculator.lessonsHint') }}</p>
          </div>
        </div>
        
        <!-- Результат -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4">{{ $t('calculator.result') }}</h3>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span>{{ $t('calculator.level') }}:</span>
              <span class="font-medium">{{ levelInfo.name }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>{{ $t('calculator.format') }}:</span>
              <span class="font-medium">{{ formatInfo.name }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>{{ $t('calculator.lessonsPerMonth') }}:</span>
              <span class="font-medium">{{ lessonsPerMonth }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>{{ $t('calculator.duration') }}:</span>
              <span class="font-medium">{{ levelInfo.duration }} {{ $t('calculator.months') }}</span>
            </div>
            
            <hr class="my-4">
            
            <div class="flex justify-between text-lg font-semibold">
              <span>{{ $t('calculator.totalPerMonth') }}:</span>
              <span class="text-blue-600">{{ formatPrice(monthlyPrice) }}</span>
            </div>
            
            <div class="flex justify-between text-sm text-gray-600">
              <span>{{ $t('calculator.totalCourse') }}:</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>
          
          <UiButton 
            @click="scrollToForm" 
            class="w-full mt-6"
            size="lg"
          >
            {{ $t('calculator.apply') }}
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import UiButton from './Ui/Button.vue';
import pricingData from '@/data/pricing.json';

const { t } = useI18n();

const selectedLevel = ref('hsk1');
const selectedFormat = ref('group');
const lessonsPerMonth = ref(8);

const levelInfo = computed(() => pricingData.levels[selectedLevel.value as keyof typeof pricingData.levels]);
const formatInfo = computed(() => pricingData.formats[selectedFormat.value as keyof typeof pricingData.formats]);

const monthlyPrice = computed(() => {
  const basePrice = levelInfo.value.basePrice;
  const formatMultiplier = formatInfo.value.multiplier;
  const lessonsMultiplier = lessonsPerMonth.value / 8; // Базовая ставка за 8 занятий
  
  return Math.round(basePrice * formatMultiplier * lessonsMultiplier);
});

const totalPrice = computed(() => {
  return monthlyPrice.value * levelInfo.value.duration;
});

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price);
}

function scrollToForm() {
  const formElement = document.getElementById('lead');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
