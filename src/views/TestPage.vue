<template>
  <div class="container py-8">
    <!-- Начальный экран -->
    <div v-if="!testStarted && !testCompleted" class="max-w-2xl mx-auto text-center">
      <h1 class="text-3xl font-bold mb-6">{{ $t('test.title') }}</h1>
      <p class="text-gray-600 mb-8">{{ $t('test.description') }}</p>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold mb-2">{{ $t('test.info.title') }}</h3>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>• {{ $t('test.info.questions') }}</li>
          <li>• {{ $t('test.info.time') }}</li>
          <li>• {{ $t('test.info.result') }}</li>
        </ul>
      </div>
      
      <UiButton @click="startTest" size="lg">
        {{ $t('test.start') }}
      </UiButton>
    </div>
    
    <!-- Тест -->
    <div v-if="testStarted && !testCompleted" class="max-w-4xl mx-auto">
      <!-- Таймер и прогресс -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm text-gray-600">
            {{ $t('test.question') }} {{ currentQuestionIndex + 1 }} {{ $t('test.of') }} {{ questions.length }}
          </span>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-2xl font-bold" :class="timeLeft <= 2 ? 'text-red-600' : 'text-blue-600'">
                {{ formatTime(timeLeft) }}
              </div>
              <div class="text-xs text-gray-500">{{ $t('test.timeLeft') }}</div>
            </div>
          </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>
      
      <div class="bg-white border rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-6">{{ currentQuestion.question }}</h2>
        
        <div class="space-y-3">
          <label 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            :class="{ 'border-blue-500 bg-blue-50': selectedAnswer === index }"
          >
            <input 
              type="radio" 
              :name="`question-${currentQuestion.id}`"
              :value="index"
              v-model="selectedAnswer"
              class="mr-3"
            />
            <span>{{ option }}</span>
          </label>
        </div>
        
        <div class="flex justify-between mt-8">
          <UiButton 
            v-if="currentQuestionIndex > 0"
            @click="previousQuestion"
            variant="outline"
          >
            {{ $t('test.previous') }}
          </UiButton>
          <div v-else></div>
          
          <UiButton 
            @click="nextQuestion"
            :disabled="selectedAnswer === null"
          >
            {{ currentQuestionIndex === questions.length - 1 ? $t('test.finish') : $t('test.next') }}
          </UiButton>
        </div>
      </div>
    </div>
    
    <!-- Результат -->
    <div v-if="testCompleted" class="max-w-2xl mx-auto text-center">
      <div class="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
        <h2 class="text-2xl font-bold mb-4">{{ $t('test.result.title') }}</h2>
        <div class="text-4xl font-bold text-green-600 mb-2">{{ result.title }}</div>
        <p class="text-gray-700 mb-4">{{ result.description }}</p>
        <div class="text-sm text-gray-600">
          {{ $t('test.result.score') }}: {{ score }}/{{ questions.length }}
        </div>
      </div>
      
      <div class="space-y-4">
        <UiButton @click="scrollToForm" size="lg" class="w-full">
          {{ $t('test.result.apply') }}
        </UiButton>
        
        <UiButton @click="restartTest" variant="outline" class="w-full">
          {{ $t('test.result.restart') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
// import { useI18n } from 'vue-i18n'; // Используется в template
import UiButton from '@/components/Ui/Button.vue';
import testData from '@/data/test-questions.json';

// const { t } = useI18n(); // Используется в template

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
  const formElement = document.getElementById('lead');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
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