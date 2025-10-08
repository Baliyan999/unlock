<template>
  <div class="container py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Сообщение об ошибке, если нет вопросов -->
      <div v-if="questions.length === 0" class="text-center py-12">
        <div class="text-red-600 dark:text-red-400 text-xl font-semibold mb-4">
          {{ $t('test.loadingError') }}
        </div>
        <div class="text-gray-600 dark:text-gray-400 mb-6">
          {{ $t('test.loadingErrorDetails', { level: levelId }) }}
        </div>
        <button
          @click="goBack"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t('test.backToLevels') }}
        </button>
      </div>
      
      <!-- Основной контент теста -->
      <div v-else>
      <!-- Заголовок и прогресс -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>{{ $t('test.back') }}</span>
            </button>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ currentLevel.title }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('test.question') }}</div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </div>
          </div>
        </div>

        <!-- Прогресс-бар -->
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Таймер -->
      <div class="mb-8 text-center">
        <div
          :class="[
            'inline-flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300',
            timeLeft <= 60
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          ]"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-xl font-bold">{{ formatTime(timeLeft) }}</span>
          <span class="text-sm">{{ $t('test.timeLeft') }}</span>
        </div>
      </div>

      <!-- Вопрос -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl mb-6">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
            {{ currentQuestion.question }}
          </h2>
        </div>

        <!-- Варианты ответов -->
        <div class="space-y-4">
          <label
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'block cursor-pointer group transition-all duration-300',
              selectedAnswer === index
                ? 'transform scale-105'
                : 'hover:transform hover:scale-102'
            ]"
          >
            <input
              type="radio"
              :name="`question-${currentQuestion.id}`"
              :value="index"
              v-model="selectedAnswer"
              class="sr-only"
            />
            <div
              :class="[
                'p-6 rounded-xl border-2 transition-all duration-300',
                selectedAnswer === index
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-400 dark:border-blue-500 shadow-lg'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-md'
              ]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300',
                      selectedAnswer === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <span
                    :class="[
                      'text-lg font-medium transition-colors duration-300',
                      selectedAnswer === index
                        ? 'text-blue-900 dark:text-blue-100'
                        : 'text-gray-900 dark:text-white'
                    ]"
                  >
                    {{ option }}
                  </span>
                </div>
                <div
                  v-if="selectedAnswer === index"
                  class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Навигация -->
      <div class="flex justify-between items-center">
        <button
          v-if="currentQuestionIndex > 0"
          @click="previousQuestion"
          class="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>{{ $t('test.previous') }}</span>
        </button>
        <div v-else></div>

        <button
          @click="nextQuestion"
          :disabled="selectedAnswer === null"
          :class="[
            'flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300',
            selectedAnswer !== null
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          ]"
        >
          <span>
            {{ currentQuestionIndex === questions.length - 1 ? $t('test.finish') : $t('test.next') }}
          </span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      </div> <!-- Закрываем div для основного контента -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useModal } from '../composables/useModal';
import testData from '@/data/test-questions.json';

const router = useRouter();
const route = useRoute();
const { confirmLeaveTest } = useModal();

// Состояние теста
const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const answers = ref<number[]>([]);
const timeLeft = ref(0);
const timer = ref<NodeJS.Timeout | null>(null);
const questions = ref<any[]>([]);

// Уровень теста
const levelId = computed(() => route.params.level as string);
const currentLevel = computed(() => {
  const levelMap: Record<string, any> = {
    hsk1: { title: 'HSK 1', timeLimit: 10, questionsCount: 15 },
    hsk2: { title: 'HSK 2', timeLimit: 10, questionsCount: 15 },
    hsk3: { title: 'HSK 3', timeLimit: 10, questionsCount: 15 },
    hsk4: { title: 'HSK 4', timeLimit: 10, questionsCount: 15 },
    hsk5: { title: 'HSK 5', timeLimit: 10, questionsCount: 15 },
    hsk6: { title: 'HSK 6', timeLimit: 10, questionsCount: 15 }
  };
  return levelMap[levelId.value] || levelMap.hsk1;
});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

// Рандомизация массива
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Подготовка вопросов для теста
function prepareQuestions() {
  console.log('Подготовка вопросов для уровня:', levelId.value);
  console.log('Всего вопросов в данных:', testData.questions.length);
  
  // Фильтруем вопросы по уровню
  const levelQuestions = testData.questions.filter(q => q.level === levelId.value);
  console.log(`Вопросов для уровня ${levelId.value}:`, levelQuestions.length);
  
  if (levelQuestions.length === 0) {
    console.error(`Нет вопросов для уровня ${levelId.value}`);
    console.log('Доступные уровни:', [...new Set(testData.questions.map(q => q.level))]);
    questions.value = [];
    return;
  }

  // Берем случайные вопросы (максимум questionsCount)
  const shuffled = shuffleArray(levelQuestions);
  const selectedQuestions = shuffled.slice(0, currentLevel.value.questionsCount);
  console.log('Выбрано вопросов для теста:', selectedQuestions.length);
  
  // Рандомизируем варианты ответов для каждого вопроса
  questions.value = selectedQuestions.map(q => {
    const options = [...q.options];
    const correctIndex = q.correct;
    
    // Перемешиваем варианты ответов
    const shuffledOptions = shuffleArray(options);
    
    // Находим новый индекс правильного ответа
    const newCorrectIndex = shuffledOptions.findIndex(option => option === q.options[correctIndex]);
    
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    };
  });
  
  console.log('Итоговые вопросы:', questions.value.length);
}

// Форматирование времени
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Запуск таймера
function startTimer() {
  timeLeft.value = currentLevel.value.timeLimit * 60; // Конвертируем минуты в секунды
  
  timer.value = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      finishTest();
    }
  }, 1000);
}

// Следующий вопрос
function nextQuestion() {
  if (selectedAnswer.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
  }
  
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  } else {
    finishTest();
  }
}

// Предыдущий вопрос
function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
}

// Завершение теста
function finishTest() {
  if (selectedAnswer.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
  }
  
  // Останавливаем таймер
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  
  // Вычисляем результат
  const score = answers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions.value[index].correct ? 1 : 0);
  }, 0);
  
  const percentage = Math.round((score / questions.value.length) * 100);
  
  console.log('Завершение теста:', {
    level: levelId.value,
    score: percentage,
    total: questions.value.length,
    correct: score,
    answers: answers.value
  });
  
  // Переходим к результатам
  router.push({
    name: 'TestResults',
    params: { level: levelId.value },
    query: { score: percentage, total: questions.value.length, correct: score }
  }).catch(err => {
    console.error('Ошибка навигации к результатам:', err);
  });
}

// Возврат назад
async function goBack() {
  const confirmed = await confirmLeaveTest();
  if (confirmed) {
    router.push({ name: 'TestLevels' });
  }
}

// Инициализация
onMounted(() => {
  prepareQuestions();
  if (questions.value.length > 0) {
    startTimer();
  } else {
    router.push({ name: 'TestLevels' });
  }
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Градиентные эффекты */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Анимация появления */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>
