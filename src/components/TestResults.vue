<template>
  <div class="container py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Результат -->
      <div class="text-center mb-8">
        <div
          :class="[
            'inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 transition-all duration-500',
            resultIcon.class
          ]"
        >
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="resultIcon.path"/>
          </svg>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ resultTitle }}
        </h1>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ resultDescription }}
        </p>
      </div>

      <!-- Статистика -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {{ $t('test.results.statistics') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Общий балл -->
          <div class="text-center">
            <div
              :class="[
                'text-4xl font-bold mb-2',
                score >= 80 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
              ]"
            >
              {{ score }}%
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t('test.results.totalScore') }}
            </div>
          </div>
          
          <!-- Правильные ответы -->
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ correctAnswers }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t('test.results.correctAnswers') }}
            </div>
          </div>
          
          <!-- Всего вопросов -->
          <div class="text-center">
            <div class="text-4xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              {{ totalQuestions }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t('test.results.totalQuestions') }}
            </div>
          </div>
        </div>

        <!-- Прогресс-бар -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('test.results.progress') }}
            </span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ score }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              :class="[
                'h-3 rounded-full transition-all duration-1000',
                score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'
              ]"
              :style="{ width: `${score}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Детали результатов -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t('test.results.details') }}
        </h3>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('test.results.level') }}</span>
            <span class="font-semibold text-gray-900 dark:text-white">{{ currentLevel.title }}</span>
          </div>
          
          <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('test.results.passingScore') }}</span>
            <span class="font-semibold text-gray-900 dark:text-white">80%</span>
          </div>
          
          <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('test.results.status') }}</span>
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                score >= 80
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
              ]"
            >
              {{ score >= 80 ? $t('test.results.passed') : $t('test.results.failed') }}
            </span>
          </div>
          
          <div class="flex justify-between items-center py-3">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('test.results.nextLevel') }}</span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ score >= 80 ? $t('test.results.unlocked') : $t('test.results.locked') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Действия -->
      <div class="space-y-4">
        <!-- Основная кнопка -->
        <button
          @click="handleMainAction"
          :class="[
            'w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
            score >= 80
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
          ]"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mainActionIcon"/>
          </svg>
          <span>{{ mainActionText }}</span>
        </button>

        <!-- Дополнительные действия -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="retakeTest"
            class="flex items-center justify-center space-x-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>{{ $t('test.results.retake') }}</span>
          </button>
          
          <button
            @click="goToLevels"
            class="flex items-center justify-center space-x-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <span>{{ $t('test.results.allLevels') }}</span>
          </button>
        </div>
      </div>

      <!-- Мотивационное сообщение -->
      <div
        v-if="score < 80"
        class="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl"
      >
        <div class="flex items-start space-x-4">
          <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
              {{ $t('test.results.encouragement.title') }}
            </h4>
            <p class="text-orange-800 dark:text-orange-200">
              {{ $t('test.results.encouragement.message') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getTashkentISOString } from '@/utils/dateUtils';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

// Параметры результата
const score = ref(0);
const correctAnswers = ref(0);
const totalQuestions = ref(0);
const levelId = ref('');

// Уровень теста
const currentLevel = computed(() => {
  const levelMap: Record<string, any> = {
    hsk1: { title: 'HSK 1', number: 1 },
    hsk2: { title: 'HSK 2', number: 2 },
    hsk3: { title: 'HSK 3', number: 3 },
    hsk4: { title: 'HSK 4', number: 4 },
    hsk5: { title: 'HSK 5', number: 5 },
    hsk6: { title: 'HSK 6', number: 6 }
  };
  return levelMap[levelId.value] || levelMap.hsk1;
});

// Результат теста
const resultIcon = computed(() => {
  if (score.value >= 80) {
    return {
      class: 'bg-green-500 text-white',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    };
  } else {
    return {
      class: 'bg-orange-500 text-white',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
    };
  }
});

const resultTitle = computed(() => {
  if (score.value >= 80) {
    return t('test.results.congratulations');
  } else {
    return t('test.results.tryAgain');
  }
});

const resultDescription = computed(() => {
  if (score.value >= 80) {
    return t('test.results.successDescription', { level: currentLevel.value.title });
  } else {
    return t('test.results.failDescription', { level: currentLevel.value.title });
  }
});

const mainActionText = computed(() => {
  if (score.value >= 80) {
    return t('test.results.nextLevelAction');
  } else {
    return t('test.results.enrollAction');
  }
});

const mainActionIcon = computed(() => {
  if (score.value >= 80) {
    return 'M13 7l5 5m0 0l-5 5m5-5H6';
  } else {
    return 'M13 7l5 5m0 0l-5 5m5-5H6';
  }
});

// Основное действие
function handleMainAction() {
  if (score.value >= 80) {
    // Переходим к следующему уровню
    const nextLevelNumber = currentLevel.value.number + 1;
    if (nextLevelNumber <= 6) {
      router.push({
        name: 'TestQuestion',
        params: { level: `hsk${nextLevelNumber}` }
      });
    } else {
      // Это был последний уровень
      goToLevels();
    }
  } else {
    // Переходим к форме записи
    scrollToForm();
  }
}

// Повторное прохождение теста
function retakeTest() {
  router.push({
    name: 'TestQuestion',
    params: { level: levelId.value }
  });
}

// Переход к списку уровней
function goToLevels() {
  router.push({ name: 'TestLevels' });
}

// Переход к форме записи
function scrollToForm() {
  try {
    // Пытаемся найти форму на текущей странице
    const formElement = document.getElementById('lead');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Если формы нет на странице тестов, перенаправляем на главную страницу к форме
      router.push('/#lead');
    }
  } catch (error) {
    console.error('Ошибка при переходе к форме:', error);
    // Fallback - просто переходим на главную страницу
    router.push('/');
  }
}

// Сохранение результата
function saveResult() {
  const result = {
    level: levelId.value,
    score: score.value,
    correctAnswers: correctAnswers.value,
    totalQuestions: totalQuestions.value,
    passed: score.value >= 80,
    timestamp: getTashkentISOString()
  };

  // Сохраняем в localStorage
  const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
  savedResults.push(result);
  localStorage.setItem('testResults', JSON.stringify(savedResults));

  // Обновляем прогресс уровней
  updateLevelProgress();
}

// Обновление прогресса уровней
function updateLevelProgress() {
  const progress: Record<string, any> = JSON.parse(localStorage.getItem('testProgress') || '{}');
  
  if (!progress[levelId.value]) {
    progress[levelId.value] = {};
  }
  
  progress[levelId.value].completed = true;
  progress[levelId.value].bestScore = Math.max(
    progress[levelId.value].bestScore || 0,
    score.value
  );
  
  // Разблокируем следующий уровень если набрали проходной балл
  if (score.value >= 80) {
    const nextLevelNumber = currentLevel.value.number + 1;
    if (nextLevelNumber <= 6) {
      const nextLevelId = `hsk${nextLevelNumber}`;
      if (!progress[nextLevelId]) {
        progress[nextLevelId] = {};
      }
      progress[nextLevelId].unlocked = true;
    }
  }
  
  localStorage.setItem('testProgress', JSON.stringify(progress));
}

// Инициализация
onMounted(() => {
  // Получаем параметры из URL
  levelId.value = route.params.level as string;
  score.value = parseInt(route.query.score as string) || 0;
  correctAnswers.value = parseInt(route.query.correct as string) || 0;
  totalQuestions.value = parseInt(route.query.total as string) || 0;
  
  console.log('TestResults инициализация:', {
    levelId: levelId.value,
    score: score.value,
    correctAnswers: correctAnswers.value,
    totalQuestions: totalQuestions.value,
    routeParams: route.params,
    routeQuery: route.query
  });
  
  // Сохраняем результат
  saveResult();
});
</script>

<style scoped>
/* Градиентные эффекты */
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

/* Анимация прогресс-бара */
@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
}

.progress-animate {
  animation: progressFill 1s ease-out;
}
</style>
