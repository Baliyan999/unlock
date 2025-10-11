<template>
  <div class="image-upload-container">
    <!-- Превью изображения -->
    <div v-if="previewUrl" class="image-preview">
      <img :src="previewUrl" alt="Preview" class="preview-image" />
      <button 
        @click="removeImage" 
        class="remove-image-btn"
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Кнопка загрузки -->
    <div v-if="!previewUrl" class="upload-area" :class="{ 'drag-over': isDragOver }">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        @drop.prevent="handleDrop"
        class="hidden"
      />
      <div 
        @click="$refs.fileInput.click()"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        @drop.prevent="handleDrop"
        class="upload-content"
      >
        <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Нажмите или перетащите изображение
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Рекомендуемый размер: 800x400px
        </p>
      </div>
    </div>

    <!-- Прогресс загрузки -->
    <div v-if="uploading" class="upload-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {{ uploadProgress }}% - {{ uploadStatus }}
      </p>
    </div>

    <!-- Ошибка -->
    <div v-if="error" class="error-message">
      <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { api } from '@/lib/api'

interface Props {
  modelValue?: string
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'upload', file: File): void
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 800,
  maxHeight: 400,
  quality: 0.8
})

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const previewUrl = ref<string>('')
const isDragOver = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref('')
const error = ref('')

// Инициализируем превью из modelValue
if (props.modelValue) {
  previewUrl.value = props.modelValue
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processImage(file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    processImage(file)
  }
}

const processImage = async (file: File) => {
  console.log('Starting upload for file:', file.name, file.size)
  error.value = ''
  uploading.value = true
  uploadProgress.value = 0
  uploadStatus.value = 'Обработка изображения...'

  try {
    // Создаем URL для превью
    const originalUrl = URL.createObjectURL(file)
    previewUrl.value = originalUrl

    uploadProgress.value = 25
    uploadStatus.value = 'Загрузка на сервер...'

    // Загружаем файл на сервер
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/upload/blog-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const result = response.data
    console.log('Upload result:', result)
    
    uploadProgress.value = 100
    uploadStatus.value = 'Готово!'

    // Обновляем превью на загруженное изображение с полным URL бэкенда
    const fullImageUrl = `http://localhost:8000${result.url}`
    previewUrl.value = fullImageUrl
    console.log('Preview URL set to:', fullImageUrl)
    
    // Эмитим событие с обработанным файлом
    emit('upload', file)
    emit('update:modelValue', fullImageUrl)

    // Очищаем статус через секунду
    setTimeout(() => {
      uploading.value = false
      uploadProgress.value = 0
      uploadStatus.value = ''
    }, 1000)

  } catch (err) {
    error.value = 'Ошибка при загрузке изображения'
    uploading.value = false
    console.error('Image upload error:', err)
  }
}


const removeImage = () => {
  previewUrl.value = ''
  error.value = ''
  uploading.value = false
  uploadProgress.value = 0
  uploadStatus.value = ''
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  emit('update:modelValue', '')
}
</script>

<style scoped>
.image-upload-container {
  @apply w-full;
}

.image-preview {
  @apply relative inline-block;
}

.preview-image {
  @apply w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600;
}

.remove-image-btn {
  @apply absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors;
}

.upload-area {
  @apply border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-500;
}

.upload-area.drag-over {
  @apply border-blue-500 bg-blue-50 dark:bg-blue-900/20;
}

.upload-content {
  @apply flex flex-col items-center justify-center;
}

.upload-progress {
  @apply mt-4;
}

.progress-bar {
  @apply w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2;
}

.progress-fill {
  @apply bg-blue-500 h-2 rounded-full transition-all duration-300;
}

.error-message {
  @apply mt-2;
}
</style>
