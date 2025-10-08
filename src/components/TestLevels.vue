<template>
  <!-- Updated translations for test cards -->
  <div class="container py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('test.levels.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ $t('test.levels.description') }}
        </p>
      </div>

      <!-- Сетка уровней -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <div
          v-for="level in levelsWithProgress"
          :key="level.id"
          @click="selectLevel(level)"
          class="relative group cursor-pointer h-full"
        >
          <div
            :class="[
              'relative p-8 rounded-2xl border-2 transition-all duration-300 transform h-full flex flex-col',
              level.unlocked
                ? 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-105 hover:shadow-xl'
                : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed'
            ]"
          >
            <!-- Иконка уровня -->
            <div
              :class="[
                'w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300',
                level.unlocked
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400'
              ]"
            >
              <span class="text-2xl font-bold">{{ level.number }}</span>
            </div>

            <!-- Заголовок уровня -->
            <h3
              :class="[
                'text-2xl font-bold mb-3',
                level.unlocked
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              ]"
            >
              {{ level.title }}
            </h3>

            <!-- Описание -->
            <p
              :class="[
                'text-gray-600 dark:text-gray-300 mb-4',
                level.unlocked ? '' : 'text-gray-400 dark:text-gray-500'
              ]"
            >
              {{ level.description }}
            </p>

            <!-- Статистика -->
            <div class="space-y-2 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('test.questionsCount') }}:</span>
                <span
                  :class="[
                    'text-sm font-medium',
                    level.unlocked
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  ]"
                >
                  {{ level.questionsCount }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('test.timeLimit') }}:</span>
                <span
                  :class="[
                    'text-sm font-medium',
                    level.unlocked
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  ]"
                >
                  {{ level.timeLimit }} {{ $t('test.minutes') }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('test.passingScore') }}:</span>
                <span
                  :class="[
                    'text-sm font-medium',
                    level.unlocked
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  ]"
                >
                  {{ level.passingScore }}%
                </span>
              </div>
            </div>

            <!-- Кнопка -->
            <div class="flex items-center justify-between mt-auto">
              <div v-if="level.bestScore !== null" class="text-sm">
                <span class="text-gray-500 dark:text-gray-400">{{ $t('test.bestResult') }}:</span>
                <span
                  :class="[
                    'ml-2 font-semibold',
                    level.bestScore >= level.passingScore
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-600 dark:text-orange-400'
                  ]"
                >
                  {{ level.bestScore }}%
                </span>
              </div>
              <div v-else class="text-sm text-gray-500 dark:text-gray-400">
                {{ $t('test.notPassed') }}
              </div>

              <button
                v-if="level.unlocked"
                :class="[
                  'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                  'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
                ]"
              >
                {{ $t('test.levels.start') }}
              </button>
            </div>

            <!-- Индикатор блокировки -->
            <div
              v-if="!level.unlocked"
              class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            >
              <div class="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center mb-2">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-white text-sm font-medium">{{ $t('test.levels.locked') }}</div>
              </div>
            </div>

            <!-- Индикатор завершения -->
            <div
              v-if="level.completed"
              class="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>

            <!-- Оверлей для заблокированных карточек -->
            <div
              v-if="!level.unlocked"
              class="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/70 rounded-2xl flex items-center justify-center z-5"
            >
              <div class="text-center">
                <div class="text-gray-300 text-sm">{{ $t('test.levels.passPrevious') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Информация о системе -->
      <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
        <div class="flex items-start space-x-4">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {{ $t('test.levels.info.title') }}
            </h3>
            <ul class="space-y-2 text-blue-800 dark:text-blue-200">
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{{ $t('test.levels.info.unlock') }}</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{{ $t('test.levels.info.randomize') }}</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{{ $t('test.levels.info.progress') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();


// Интерфейс для уровня
interface TestLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  questionsCount: number;
  timeLimit: number;
  passingScore: number;
  unlocked: boolean;
  completed: boolean;
  bestScore: number | null;
}

// Уровни тестов - используем computed для реактивности переводов
const levels = computed<TestLevel[]>(() => [
  {
    id: 'hsk1',
    number: 1,
    title: t('test.levels.titles.hsk1'),
    description: t('test.levels.descriptions.hsk1'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: true, // HSK 1 всегда разблокирован
    completed: false,
    bestScore: null
  },
  {
    id: 'hsk2',
    number: 2,
    title: t('test.levels.titles.hsk2'),
    description: t('test.levels.descriptions.hsk2'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: false,
    completed: false,
    bestScore: null
  },
  {
    id: 'hsk3',
    number: 3,
    title: t('test.levels.titles.hsk3'),
    description: t('test.levels.descriptions.hsk3'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: false,
    completed: false,
    bestScore: null
  },
  {
    id: 'hsk4',
    number: 4,
    title: t('test.levels.titles.hsk4'),
    description: t('test.levels.descriptions.hsk4'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: false,
    completed: false,
    bestScore: null
  },
  {
    id: 'hsk5',
    number: 5,
    title: t('test.levels.titles.hsk5'),
    description: t('test.levels.descriptions.hsk5'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: false,
    completed: false,
    bestScore: null
  },
  {
    id: 'hsk6',
    number: 6,
    title: t('test.levels.titles.hsk6'),
    description: t('test.levels.descriptions.hsk6'),
    questionsCount: 15,
    timeLimit: 10,
    passingScore: 80,
    unlocked: false,
    completed: false,
    bestScore: null
  }
]);

// Состояние прогресса пользователя
const userProgress = ref<Record<string, { completed: boolean; bestScore: number | null }>>({});

// Обновленные уровни с учетом прогресса
const levelsWithProgress = computed<TestLevel[]>(() => {
  return levels.value.map(level => {
    const progress = userProgress.value[level.id];
    const isCompleted = progress?.completed || false;
    const bestScore = progress?.bestScore || null;
    
    // Определяем, разблокирован ли уровень
    let isUnlocked = level.unlocked; // HSK 1 всегда разблокирован
    
    if (level.number > 1) {
      // Проверяем, пройден ли предыдущий уровень с 80%+
      const prevLevel = levels.value.find(l => l.number === level.number - 1);
      if (prevLevel) {
        const prevProgress = userProgress.value[prevLevel.id];
        isUnlocked = Boolean(prevProgress?.completed && prevProgress?.bestScore && prevProgress.bestScore >= 80);
      }
    }
    
    return {
      ...level,
      completed: isCompleted,
      bestScore: bestScore,
      unlocked: isUnlocked
    };
  });
});

// Загрузка прогресса пользователя
function loadUserProgress() {
  const savedProgress = localStorage.getItem('testProgress');
  if (savedProgress) {
    try {
      userProgress.value = JSON.parse(savedProgress);
    } catch (error) {
      console.error('Ошибка загрузки прогресса:', error);
    }
  }
}


// Выбор уровня
function selectLevel(level: TestLevel) {
  if (!level.unlocked) return;
  
  // Переходим к тесту
  router.push({
    name: 'TestQuestion',
    params: { level: level.id }
  });
}

// Сохранение прогресса
function saveProgress() {
  const progress: Record<string, any> = {};
  levels.value.forEach(level => {
    progress[level.id] = {
      completed: level.completed,
      bestScore: level.bestScore,
      unlocked: level.unlocked
    };
  });
  localStorage.setItem('testProgress', JSON.stringify(progress));
}

// Обновление прогресса после завершения теста
function updateLevelProgress(levelId: string, score: number) {
  const level = levels.value.find(l => l.id === levelId);
  if (level) {
    level.completed = true;
    if (level.bestScore === null || score > level.bestScore) {
      level.bestScore = score;
    }
    
    // Разблокируем следующий уровень если набрали проходной балл
    if (score >= level.passingScore) {
      const currentIndex = levels.value.findIndex(l => l.id === levelId);
      if (currentIndex < levels.value.length - 1) {
        levels.value[currentIndex + 1].unlocked = true;
      }
    }
    
    saveProgress();
  }
}

// Экспорт функции для использования в других компонентах
defineExpose({
  updateLevelProgress
});

onMounted(() => {
  loadUserProgress();
});
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Градиентные эффекты */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Анимация появления */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>
