<template>
  <div class="container py-8">
    <!-- Начальный экран -->
    <div v-if="!testStarted && !testCompleted" class="max-w-2xl mx-auto text-center">
      <div class="glass-test-intro">
        <div class="glass-test-header">
          <div class="glass-test-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1 class="glass-test-title">{{ $t('test.title') }}</h1>
          <p class="glass-test-description">{{ $t('test.description') }}</p>
        </div>
        
        <div class="glass-test-info">
          <div class="glass-test-info-header">
            <div class="glass-test-info-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="glass-test-info-title">{{ $t('test.info.title') }}</h3>
          </div>
          <div class="glass-test-info-list">
            <div class="glass-test-info-item">
              <div class="glass-test-info-dot"></div>
              <span>{{ $t('test.info.questions') }}</span>
            </div>
            <div class="glass-test-info-item">
              <div class="glass-test-info-dot"></div>
              <span>{{ $t('test.info.time') }}</span>
            </div>
            <div class="glass-test-info-item">
              <div class="glass-test-info-dot"></div>
              <span>{{ $t('test.info.result') }}</span>
            </div>
          </div>
        </div>
        
        <button @click="startTest" class="glass-test-start-button">
          <span>{{ $t('test.start') }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Тест -->
    <div v-if="testStarted && !testCompleted" class="max-w-4xl mx-auto">
      <div class="glass-test-container">
        <!-- Таймер и прогресс -->
        <div class="glass-test-progress">
          <div class="glass-test-progress-header">
            <div class="glass-test-progress-info">
              <span class="glass-test-progress-text">
                {{ $t('test.question') }} {{ currentQuestionIndex + 1 }} {{ $t('test.of') }} {{ questions.length }}
              </span>
            </div>
            <div class="glass-test-timer">
              <div class="glass-test-timer-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="glass-test-timer-content">
                <div class="glass-test-timer-value" :class="timeLeft <= 2 ? 'glass-test-timer-critical' : 'glass-test-timer-normal'">
                  {{ formatTime(timeLeft) }}
                </div>
                <div class="glass-test-timer-label">{{ $t('test.timeLeft') }}</div>
              </div>
            </div>
          </div>
          <div class="glass-test-progress-bar">
            <div class="glass-test-progress-fill" :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"></div>
          </div>
        </div>
        
        <div class="glass-test-question">
          <div class="glass-test-question-header">
            <div class="glass-test-question-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="glass-test-question-title">{{ currentQuestion.question }}</h2>
          </div>
          
          <div class="glass-test-options">
            <label 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              class="glass-test-option"
              :class="{ 'glass-test-option-selected': selectedAnswer === index }"
            >
              <input 
                type="radio" 
                :name="`question-${currentQuestion.id}`"
                :value="index"
                v-model="selectedAnswer"
                class="glass-test-option-input"
              />
              <div class="glass-test-option-content">
                <div class="glass-test-option-text">{{ option }}</div>
                <div class="glass-test-option-check">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </label>
          </div>
          
          <div class="glass-test-navigation">
            <button 
              v-if="currentQuestionIndex > 0"
              @click="previousQuestion"
              class="glass-test-nav-button glass-test-nav-button-secondary"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>{{ $t('test.previous') }}</span>
            </button>
            <div v-else></div>
            
            <button 
              @click="nextQuestion"
              :disabled="selectedAnswer === null"
              class="glass-test-nav-button glass-test-nav-button-primary"
              :class="{ 'glass-test-nav-button-disabled': selectedAnswer === null }"
            >
              <span>{{ currentQuestionIndex === questions.length - 1 ? $t('test.finish') : $t('test.next') }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Результат -->
    <div v-if="testCompleted" class="max-w-2xl mx-auto text-center">
      <div class="glass-test-result">
        <div class="glass-test-result-header">
          <div class="glass-test-result-icon">
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="glass-test-result-title">{{ $t('test.result.title') }}</h2>
        </div>
        
        <div class="glass-test-result-content">
          <div class="glass-test-result-level">{{ result.title }}</div>
          <p class="glass-test-result-description">{{ result.description }}</p>
          <div class="glass-test-result-score">
            <div class="glass-test-result-score-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span>{{ $t('test.result.score') }}: {{ score }}/{{ questions.length }}</span>
          </div>
        </div>
        
        <div class="glass-test-result-actions">
          <button @click="scrollToForm" class="glass-test-result-button glass-test-result-button-primary">
            <span>{{ $t('test.result.apply') }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          
          <button @click="restartTest" class="glass-test-result-button glass-test-result-button-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>{{ $t('test.result.restart') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useI18n } from 'vue-i18n'; // Используется в template
import UiButton from '@/components/Ui/Button.vue';
import testData from '@/data/test-questions.json';

// const { t } = useI18n(); // Используется в template
const router = useRouter();

const testStarted = ref(false);
const testCompleted = ref(false);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const answers = ref<number[]>([]);
const timeLeft = ref(600); // 10 минут в секундах
const timer = ref<NodeJS.Timeout | null>(null);
const questions = ref<any[]>([]);

// Рандомизация вопросов и вариантов ответов
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function randomizeQuestions() {
  // Берем 10 случайных вопросов из 100
  const allQuestions = testData.questions;
  const shuffled = shuffleArray(allQuestions);
  const selectedQuestions = shuffled.slice(0, 10);
  
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
}

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const score = computed(() => {
  return answers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions.value[index].correct ? 1 : 0);
  }, 0);
});

const result = computed(() => {
  const scoreValue = score.value;
  const results = testData.results;
  
  for (const [, result] of Object.entries(results)) {
    if (scoreValue >= result.min && scoreValue <= result.max) {
      return result;
    }
  }
  
  return results.hsk1; // Fallback
});

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTest() {
  randomizeQuestions();
  testStarted.value = true;
  testCompleted.value = false;
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  answers.value = [];
  timeLeft.value = 600; // 10 минут
  
  startTimer();
}

function startTimer() {
  timer.value = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      finishTest();
    }
  }, 1000); // 1 секунда
}

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

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
}

function finishTest() {
  if (selectedAnswer.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
  }
  
  testCompleted.value = true;
  testStarted.value = false;
  
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

function restartTest() {
  testStarted.value = false;
  testCompleted.value = false;
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  answers.value = [];
  timeLeft.value = 600;
}

function scrollToForm() {
  try {
    // Пытаемся найти форму на текущей странице
    const formElement = document.getElementById('lead');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      console.log('Форма найдена на текущей странице');
    } else {
      // Если формы нет на странице тестов, перенаправляем на главную страницу к форме
      console.log('Форма не найдена, перенаправляем на главную страницу');
      router.push('/#lead');
    }
  } catch (error) {
    console.error('Ошибка при переходе к форме:', error);
    // Fallback - просто переходим на главную страницу
    router.push('/');
  }
}

onMounted(() => {
  // Инициализация
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
/* Glass Test Intro */
.glass-test-intro {
  @apply relative p-8 rounded-3xl;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-test-header {
  @apply text-center mb-8;
}

.glass-test-icon {
  @apply w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #22c55e;
}

.glass-test-title {
  @apply text-3xl font-bold text-gray-800 dark:text-white mb-4;
}

.glass-test-description {
  @apply text-lg text-gray-600 dark:text-gray-300;
}

.glass-test-info {
  @apply p-6 rounded-2xl mb-8;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.glass-test-info-header {
  @apply flex items-center space-x-3 mb-4;
}

.glass-test-info-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3b82f6;
}

.glass-test-info-title {
  @apply text-lg font-semibold text-gray-800 dark:text-white;
}

.glass-test-info-list {
  @apply space-y-3;
}

.glass-test-info-item {
  @apply flex items-center space-x-3;
}

.glass-test-info-dot {
  @apply w-2 h-2 rounded-full;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
}

.glass-test-start-button {
  @apply inline-flex items-center space-x-3 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.glass-test-start-button:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
}

/* Glass Test Container */
.glass-test-container {
  @apply relative p-8 rounded-3xl;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Progress */
.glass-test-progress {
  @apply mb-8;
}

.glass-test-progress-header {
  @apply flex justify-between items-center mb-4;
}

.glass-test-progress-text {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.glass-test-timer {
  @apply flex items-center space-x-3;
}

.glass-test-timer-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.glass-test-timer-content {
  @apply text-right;
}

.glass-test-timer-value {
  @apply text-2xl font-bold;
}

.glass-test-timer-normal {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-test-timer-critical {
  @apply text-red-600 dark:text-red-400;
}

.glass-test-timer-label {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.glass-test-progress-bar {
  @apply w-full h-2 rounded-full;
  background: rgba(0, 0, 0, 0.1);
}

.glass-test-progress-fill {
  @apply h-2 rounded-full transition-all duration-300;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
}

/* Question */
.glass-test-question {
  @apply space-y-6;
}

.glass-test-question-header {
  @apply flex items-start space-x-4;
}

.glass-test-question-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.glass-test-question-title {
  @apply text-xl font-semibold text-gray-800 dark:text-white;
}

.glass-test-options {
  @apply space-y-3;
}

.glass-test-option {
  @apply relative cursor-pointer;
}

.glass-test-option-input {
  @apply sr-only;
}

.glass-test-option-content {
  @apply flex items-center justify-between p-4 rounded-2xl transition-all duration-300;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-test-option:hover .glass-test-option-content {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.glass-test-option-selected .glass-test-option-content {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  transform: translateX(4px);
}

.glass-test-option-text {
  @apply text-gray-800 dark:text-white font-medium;
}

.glass-test-option-check {
  @apply w-6 h-6 rounded-full flex items-center justify-center opacity-0 transition-all duration-300;
  background: linear-gradient(135deg, #22c55e, #3b82f6);
  color: white;
}

.glass-test-option-selected .glass-test-option-check {
  opacity: 1;
}

/* Navigation */
.glass-test-navigation {
  @apply flex justify-between items-center;
}

.glass-test-nav-button {
  @apply inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300;
}

.glass-test-nav-button-primary {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.glass-test-nav-button-primary:hover:not(.glass-test-nav-button-disabled) {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.glass-test-nav-button-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #6b7280;
}

.glass-test-nav-button-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-4px);
}

.glass-test-nav-button-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Result */
.glass-test-result {
  @apply relative p-8 rounded-3xl;
  background: rgba(34, 197, 94, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-test-result-header {
  @apply text-center mb-8;
}

.glass-test-result-icon {
  @apply w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.glass-test-result-title {
  @apply text-2xl font-bold text-gray-800 dark:text-white;
}

.glass-test-result-content {
  @apply mb-8;
}

.glass-test-result-level {
  @apply text-4xl font-bold text-green-600 dark:text-green-400 mb-4;
}

.glass-test-result-description {
  @apply text-gray-700 dark:text-gray-300 mb-6;
}

.glass-test-result-score {
  @apply inline-flex items-center space-x-2 px-4 py-2 rounded-xl;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #16a34a;
  font-size: 0.875rem;
}

.glass-test-result-score-icon {
  @apply w-5 h-5;
}

.glass-test-result-actions {
  @apply space-y-4;
}

.glass-test-result-button {
  @apply w-full inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
}

.glass-test-result-button-primary {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.glass-test-result-button-primary:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
}

.glass-test-result-button-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #6b7280;
}

.glass-test-result-button-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Dark theme adjustments */
.dark .glass-test-intro,
.dark .glass-test-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-test-option-content {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-test-option:hover .glass-test-option-content {
  background: rgba(0, 0, 0, 0.2);
}

.dark .glass-test-option-selected .glass-test-option-content {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.dark .glass-test-result {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-test-intro,
  .glass-test-container,
  .glass-test-result {
    @apply p-6;
  }
  
  .glass-test-progress-header {
    @apply flex-col space-y-4;
  }
  
  .glass-test-navigation {
    @apply flex-col space-y-4;
  }
  
  .glass-test-nav-button {
    @apply w-full justify-center;
  }
}
</style>