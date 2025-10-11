<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="closeModal"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 animate-modal-in"
        @click.stop
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">
              Оставить отзыв
            </h3>
            <button
              @click="closeModal"
              class="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-6 space-y-6">
          <!-- Success Message -->
          <div
            v-if="isSuccess"
            class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fade-in"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-green-800 dark:text-green-200">
                  Спасибо! Ваш отзыв отправлен на модерацию.
                </p>
                <p class="text-xs text-green-600 dark:text-green-300 mt-1">
                  Перенаправление через {{ countdown }} сек...
                </p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submitReview" class="space-y-6">
            <!-- Author Name -->
            <div class="space-y-2">
              <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ваше имя *
              </label>
              <input
                id="author"
                v-model="form.author"
                type="text"
                required
                maxlength="50"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Введите ваше имя"
                :class="{ 'border-red-500 dark:border-red-400': errors.author }"
              />
              <p v-if="errors.author" class="text-xs text-red-600 dark:text-red-400 animate-shake">
                {{ errors.author }}
              </p>
            </div>

            <!-- Review Text -->
            <div class="space-y-2">
              <label for="text" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ваш отзыв *
              </label>
              <textarea
                id="text"
                v-model="form.text"
                required
                rows="4"
                maxlength="1000"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Поделитесь своим опытом обучения..."
                :class="{ 'border-red-500 dark:border-red-400': errors.text }"
              ></textarea>
              <div class="flex justify-between items-center">
                <p v-if="errors.text" class="text-xs text-red-600 dark:text-red-400 animate-shake">
                  {{ errors.text }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  {{ form.text.length }}/1000
                </p>
              </div>
            </div>

            <!-- Rating -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Оценка *
              </label>
              <StarRating
                v-model="form.rating"
                :disabled="isSubmitting"
                class="justify-center"
              />
              <p v-if="errors.rating" class="text-xs text-red-600 dark:text-red-400 animate-shake text-center">
                {{ errors.rating }}
              </p>
            </div>

            <!-- Image Upload -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Изображение (опционально)
              </label>
              <div class="space-y-3">
                <!-- File Input -->
                <div class="relative">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <div class="flex flex-col items-center space-y-2">
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-sm text-gray-600 dark:text-gray-400">
                        {{ selectedImage ? 'Изменить изображение' : 'Выберите изображение' }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-500">
                        JPG, PNG до 2MB
                      </span>
                    </div>
                  </button>
                </div>
                
                <!-- Image Preview -->
                <div v-if="selectedImage" class="relative">
                  <img
                    :src="selectedImage"
                    alt="Предварительный просмотр"
                    class="w-full h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    @click="removeImage"
                    class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Is Student Toggle -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Статус
              </label>
              <div class="flex items-center space-x-3">
                <button
                  type="button"
                  @click="form.is_student = !form.is_student"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  :class="form.is_student ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                    :class="form.is_student ? 'translate-x-6' : 'translate-x-1'"
                  />
                </button>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    Я ученик Unlock
                  </span>
                  <svg
                    v-if="form.is_student"
                    class="w-4 h-4 text-yellow-500 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Если вы ученик нашей школы, рядом с вашим именем будет отображаться иконка короны
              </p>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-shake"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-sm text-red-700 dark:text-red-300">{{ errorMessage }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting || !isFormValid"
              class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправляем...
              </span>
              <span v-else class="flex items-center justify-center">
                Отправить отзыв
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import StarRating from './StarRating.vue'
import api from '@/lib/api'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const form = ref({
  author: '',
  text: '',
  rating: 0,
  is_student: false,
  image_url: ''
})

const selectedImage = ref('')
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const errors = ref({
  author: '',
  text: '',
  rating: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)
const countdown = ref(5)

const isFormValid = computed(() => {
  return form.value.author.trim().length >= 2 &&
         form.value.text.trim().length >= 10 &&
         form.value.rating > 0
})

const validateForm = () => {
  errors.value = { author: '', text: '', rating: '' }
  
  if (!form.value.author.trim()) {
    errors.value.author = 'Введите ваше имя'
  } else if (form.value.author.trim().length < 2) {
    errors.value.author = 'Имя должно содержать минимум 2 символа'
  } else if (form.value.author.trim().length > 50) {
    errors.value.author = 'Имя не может содержать более 50 символов'
  }
  
  if (!form.value.text.trim()) {
    errors.value.text = 'Введите текст отзыва'
  } else if (form.value.text.trim().length < 10) {
    errors.value.text = 'Отзыв должен содержать минимум 10 символов'
  } else if (form.value.text.trim().length > 1000) {
    errors.value.text = 'Отзыв не может содержать более 1000 символов'
  }
  
  if (form.value.rating === 0) {
    errors.value.rating = 'Выберите оценку'
  }
  
  return Object.values(errors.value).every(error => !error)
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // Проверяем размер файла (2MB)
  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = 'Размер изображения не должен превышать 2MB'
    return
  }
  
  // Проверяем тип файла
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Пожалуйста, выберите изображение'
    return
  }
  
  selectedFile.value = file
  
  // Создаем preview
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  selectedImage.value = ''
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const uploadImage = async (file: File): Promise<string> => {
  // Для демонстрации используем base64, в реальном проекте загружайте на сервер
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
}

const submitReview = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    let imageUrl = ''
    
    // Загружаем изображение если есть
    if (selectedFile.value) {
      imageUrl = await uploadImage(selectedFile.value)
    }
    
    const reviewData: any = {
      author: form.value.author.trim(),
      text: form.value.text.trim(),
      rating: form.value.rating,
      is_student: form.value.is_student
    }
    
    // Добавляем image_url только если есть изображение
    if (imageUrl) {
      reviewData.image_url = imageUrl
    }
    
    await api.post('/reviews/', reviewData)
    
    isSuccess.value = true
    startCountdown()
    
  } catch (error: any) {
    console.error('Error submitting review:', error)
    errorMessage.value = error.response?.data?.detail || 'Ошибка при отправке отзыва'
  } finally {
    isSubmitting.value = false
  }
}

const startCountdown = () => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      closeModal()
      router.push('/')
    }
  }, 1000)
}

const closeModal = () => {
  emit('close')
}

const resetForm = () => {
  form.value = {
    author: '',
    text: '',
    rating: 0,
    is_student: false,
    image_url: ''
  }
  selectedImage.value = ''
  selectedFile.value = null
  errors.value = { author: '', text: '', rating: '' }
  errorMessage.value = ''
  isSuccess.value = false
  countdown.value = 5
}

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm()
  }
})
</script>

<style scoped>
/* Animations */
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Responsive */
@media (max-width: 320px) {
  .max-w-md {
    max-width: 100%;
    margin: 0.5rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-6 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  .space-y-6 > * + * {
    margin-top: 1rem;
  }
}
</style>
