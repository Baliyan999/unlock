<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Заголовок -->
    <div class="container py-12 sm:py-16">
      <div class="text-center mb-12">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span class="text-white text-2xl">🧮</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center">
            Калькулятор стоимости
          </h1>
        </div>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Рассчитайте стоимость обучения китайскому языку в UNLOCK
        </p>
      </div>

      <!-- Основной контейнер -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 xl:grid-cols-5 gap-8">
          
          <!-- Левая панель - Настройки -->
          <div class="xl:col-span-3">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              
              <!-- Формат обучения -->
              <div class="mb-10">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Формат обучения</h3>
                </div>
                
                <div class="space-y-4">
                  <div
                    v-for="(format, key) in formats"
                    :key="key"
                    @click="selectedFormat = key"
                    :class="[
                      'group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105',
                      selectedFormat === key
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-green-300 dark:hover:border-green-500'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-4 mb-3">
                          <span class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ format.icon }}</span>
                          <div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                              {{ format.name }}
                            </h4>
                            <p class="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                              {{ format.description }}
                            </p>
                          </div>
                        </div>
                        <div class="mt-4">
                          <span class="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-sm font-semibold">
                            {{ format.duration }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="selectedFormat === key" class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Уровень HSK -->
              <div class="mb-10">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Уровень HSK</h3>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    v-for="(level, key) in levels"
                    :key="key"
                    @click="selectedLevel = key"
                    :class="[
                      'group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                      selectedLevel === key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                    ]"
                  >
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                        {{ level.name }}
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {{ level.description }}
                      </div>
                    </div>
                    <div v-if="selectedLevel === key" class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs">✓</span>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Количество уроков (только для групповых) -->
              <div v-if="selectedFormat === 'group'" class="mb-10">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Количество уроков</h3>
                </div>
                
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
                  <!-- Текущее значение -->
                  <div class="text-center mb-8">
                    <div class="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto">
                      {{ lessonsPerMonth }}
                    </div>
                    <p class="text-lg text-gray-800 dark:text-white font-semibold">занятий в месяц</p>
                  </div>
                  
                  <!-- Кнопки выбора -->
                  <div class="grid grid-cols-2 gap-4">
                    <button
                      @click="lessonsPerMonth = 8"
                      :class="[
                        'group py-6 px-4 text-lg font-bold rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                        lessonsPerMonth === 8
                          ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                      ]"
                    >
                      <div class="text-2xl font-bold">8</div>
                      <div class="text-sm opacity-80">занятий</div>
                    </button>
                    <button
                      @click="lessonsPerMonth = 12"
                      :class="[
                        'group py-6 px-4 text-lg font-bold rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                        lessonsPerMonth === 12
                          ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                      ]"
                    >
                      <div class="text-2xl font-bold">12</div>
                      <div class="text-sm opacity-80">занятий</div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Тип преподавателя (только для индивидуальных) -->
              <div v-if="selectedFormat === 'individual'" class="mb-10">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Тип преподавателя</h3>
                </div>
                
                <div class="space-y-4">
                  <div
                    v-for="(teacher, key) in teachers"
                    :key="key"
                    @click="selectedTeacher = key"
                    :class="[
                      'group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105',
                      selectedTeacher === key
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-orange-300 dark:hover:border-orange-500'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-4 mb-3">
                          <span class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ teacher.icon }}</span>
                          <div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                              {{ teacher.name }}
                            </h4>
                            <p class="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                              {{ teacher.description }}
                            </p>
                          </div>
                        </div>
                        <div class="mt-4">
                          <span class="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-xl text-sm font-semibold">
                            {{ teacher.price }} сум за урок
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="selectedTeacher === key" class="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая панель - Результат -->
          <div class="xl:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-8">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-2xl">💰</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Результат расчета</h3>
                <p class="text-gray-600 dark:text-gray-300">Ваша персональная стоимость</p>
              </div>
              
              <div class="space-y-4 mb-8">
                <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-300">Формат:</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatInfo.name }}</span>
                </div>
                
                <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-300">Уровень:</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ levelInfo.name }}</span>
                </div>
                
                <div v-if="selectedFormat === 'group'" class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-300">Уроков в месяц:</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ lessonsPerMonth }}</span>
                </div>
                
                <div v-if="selectedFormat === 'individual'" class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span class="text-gray-600 dark:text-gray-300">Преподаватель:</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ teacherInfo.name }}</span>
                </div>
              </div>
              
              <!-- Промокод -->
              <div class="mb-8">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    <span class="text-white text-lg">🎫</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white">Промокод</h4>
                </div>
                
                <div class="flex gap-3">
                  <input
                    v-model="promoCode"
                    type="text"
                    placeholder="Введите промокод"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    :class="{ 'border-red-500': promoError }"
                  />
                  <button
                    @click="applyPromoCode"
                    :disabled="!promoCode.trim() || isApplyingPromo"
                    class="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    {{ isApplyingPromo ? '...' : 'Применить' }}
                  </button>
                </div>
                
                <!-- Сообщения о промокоде -->
                <div v-if="promoError" class="mt-3 text-red-500 text-sm">
                  {{ promoError }}
                </div>
                <div v-if="promoSuccess" class="mt-3 text-green-500 text-sm">
                  ✅ Промокод применен! Скидка: {{ appliedDiscount }}%
                </div>
              </div>
              
              <!-- Цены -->
              <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 mb-8 border border-yellow-200 dark:border-yellow-700">
                <div class="text-center">
                  <!-- Цена со скидкой -->
                  <div v-if="appliedPromoCode" class="mb-2">
                    <div class="text-lg text-gray-500 dark:text-gray-400 line-through">
                      {{ formatPrice(monthlyPrice) }}
                    </div>
                    <div class="text-3xl font-bold text-green-600 dark:text-green-400">
                      {{ formatPrice(finalPrice) }}
                    </div>
                    <div class="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Экономия: {{ formatPrice(monthlyPrice - finalPrice) }}
                    </div>
                  </div>
                  
                  <!-- Обычная цена -->
                  <div v-else>
                    <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ formatPrice(monthlyPrice) }}
                    </div>
                  </div>
                  
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-4">в месяц</div>
                  
                  <div v-if="selectedFormat === 'group'" class="text-lg text-yellow-600 dark:text-yellow-400">
                    {{ formatPrice(pricePerLesson) }} за урок
                  </div>
                  <div v-if="selectedFormat === 'individual'" class="text-lg text-yellow-600 dark:text-yellow-400">
                    {{ formatPrice(pricePerLesson) }} за урок
                  </div>
                </div>
              </div>
              
              <!-- Кнопка записи -->
              <button 
                @click="scrollToForm" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg text-lg"
              >
                🚀 Записаться на курс
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

const router = useRouter();

const selectedFormat = ref('group');
const selectedLevel = ref('hsk1');
const selectedTeacher = ref('native');
const lessonsPerMonth = ref(8);

// Переменные для промокодов
const promoCode = ref('');
const promoError = ref('');
const promoSuccess = ref(false);
const isApplyingPromo = ref(false);
const appliedPromoCode = ref('');
const appliedDiscount = ref(0);

// Данные для форматов
const formats = {
  group: { 
    name: 'Групповые занятия', 
    description: 'До 12 человек в группе, совместное изучение',
    duration: '8-12 уроков/мес',
    icon: '👥'
  },
  individual: { 
    name: 'Индивидуальные занятия', 
    description: 'Персональные занятия с преподавателем',
    duration: '12 уроков/мес',
    icon: '👤'
  }
};

// Данные для уровней
const levels = {
  hsk1: { name: 'HSK 1', description: 'Начальный' },
  hsk2: { name: 'HSK 2', description: 'Базовый' },
  hsk3: { name: 'HSK 3', description: 'Средний' },
  hsk4: { name: 'HSK 4', description: 'Продвинутый' },
  hsk5: { name: 'HSK 5', description: 'Высокий' },
  hsk6: { name: 'HSK 6', description: 'Экспертный' }
};

// Данные для преподавателей
const teachers = {
  native: {
    name: 'Носитель языка',
    description: 'Опытный преподаватель из Китая',
    price: '320 000',
    icon: '🇨🇳'
  },
  regular: {
    name: 'Обычный преподаватель',
    description: 'Квалифицированный преподаватель',
    price: '185 000',
    icon: '👨‍🏫'
  }
};

// Цены для групповых занятий
const groupPrices = {
  hsk1: { pricePerLesson: 62500, minLessons: 8, maxLessons: 12 },
  hsk2: { pricePerLesson: 62500, minLessons: 8, maxLessons: 12 },
  hsk3: { pricePerLesson: 71250, minLessons: 8, maxLessons: 12 },
  hsk4: { pricePerLesson: 92500, minLessons: 8, maxLessons: 12 },
  hsk5: { pricePerLesson: 110000, minLessons: 8, maxLessons: 12 },
  hsk6: { pricePerLesson: 135000, minLessons: 8, maxLessons: 12 }
};

// Цены для индивидуальных занятий (месячная оплата)
const individualPrices = {
  native: 3840000, // 320000 * 12
  regular: 2220000 // 185000 * 12
};

// Цены за урок для индивидуальных занятий
const individualPricesPerLesson = {
  native: 320000,
  regular: 185000
};

const formatInfo = computed(() => formats[selectedFormat.value as keyof typeof formats]);
const levelInfo = computed(() => levels[selectedLevel.value as keyof typeof levels]);
const teacherInfo = computed(() => teachers[selectedTeacher.value as keyof typeof teachers]);

const pricePerLesson = computed(() => {
  if (selectedFormat.value === 'group') {
    return groupPrices[selectedLevel.value as keyof typeof groupPrices].pricePerLesson;
  }
  return individualPricesPerLesson[selectedTeacher.value as keyof typeof individualPricesPerLesson];
});

const monthlyPrice = computed(() => {
  if (selectedFormat.value === 'group') {
    return pricePerLesson.value * lessonsPerMonth.value;
  }
  // Для индивидуальных занятий возвращаем фиксированную сумму за месяц
  return individualPrices[selectedTeacher.value as keyof typeof individualPrices];
});

// Финальная цена с учетом скидки
const finalPrice = computed(() => {
  if (appliedPromoCode.value && appliedDiscount.value > 0) {
    return Math.round(monthlyPrice.value * (1 - appliedDiscount.value / 100));
  }
  return monthlyPrice.value;
});

// Функция для применения промокода
async function applyPromoCode() {
  if (!promoCode.value.trim()) {
    promoError.value = 'Введите промокод';
    return;
  }

  isApplyingPromo.value = true;
  promoError.value = '';
  promoSuccess.value = false;

  try {
    const response = await fetch('http://localhost:3001/api/promo/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: promoCode.value.trim().toUpperCase(),
        price: monthlyPrice.value
      })
    });

    const result = await response.json();

    if (result.success) {
      appliedPromoCode.value = promoCode.value.trim().toUpperCase();
      appliedDiscount.value = result.discountPercent;
      promoSuccess.value = true;
      promoError.value = '';
    } else {
      promoError.value = result.reason || 'Промокод недействителен';
      promoSuccess.value = false;
    }
  } catch (error) {
    console.error('Ошибка при проверке промокода:', error);
    promoError.value = 'Ошибка при проверке промокода. Попробуйте позже.';
  } finally {
    isApplyingPromo.value = false;
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price);
}

function scrollToForm() {
  // Собираем данные о выбранном курсе
  const courseData = {
    format: selectedFormat.value,
    level: selectedLevel.value,
    teacher: selectedTeacher.value,
    lessonsPerMonth: lessonsPerMonth.value,
    monthlyPrice: monthlyPrice.value,
    finalPrice: finalPrice.value,
    promoCode: appliedPromoCode.value,
    discount: appliedDiscount.value,
    pricePerLesson: pricePerLesson.value
  };
  
  // Создаем query параметры
  const query: Record<string, string> = {
    format: courseData.format,
    level: courseData.level,
    teacher: courseData.teacher,
    lessons: courseData.lessonsPerMonth.toString(),
    price: courseData.finalPrice.toString(),
    originalPrice: courseData.monthlyPrice.toString(),
    pricePerLesson: courseData.pricePerLesson.toString()
  };
  
  if (courseData.promoCode) {
    query.promo = courseData.promoCode;
    query.discount = courseData.discount.toString();
  }
  
  // Переходим на главную страницу с параметрами через Vue Router
  router.push({
    path: '/',
    query: query
  });
}
</script>

<style scoped>
/* Простые стили без сложных анимаций */
</style>