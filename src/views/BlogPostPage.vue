<template>
  <div class="container py-8">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-300">{{ $t('blog.loading') }}</p>
    </div>
    
    <article v-else-if="post" class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4 dark:text-white">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
          <time>{{ formatDate(post.date) }}</time>
          <span>•</span>
          <span>{{ $t('blog.readTime') }}</span>
        </div>
        <!-- Картинки убраны -->
      </header>
      
      <div class="prose max-w-none dark:prose-invert" v-html="renderedContent"></div>
      
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <RouterLink 
          to="/blog" 
          class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          {{ $t('blog.backToBlog') }}
        </RouterLink>
      </div>
    </article>
    
    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">{{ $t('blog.notFound') }}</h2>
      <RouterLink to="/blog" class="text-blue-600 dark:text-blue-400 hover:underline">
        {{ $t('blog.backToBlog') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { BlogPost, getBlogPost, incrementViews } from '@/data/blog-posts';
import { useI18n } from 'vue-i18n';
import { formatDateTashkent } from '@/utils/dateUtils';

const route = useRoute();
const { t, locale } = useI18n();
// Используем t для предотвращения предупреждения
console.log(t('blog.title'));

const post = ref<BlogPost | null>(null);
const loading = ref(true);

// Реактивное получение языка
const currentLangCode = computed(() => {
  const currentLocale = locale.value || 'ru-RU';
  return currentLocale.split('-')[0]; // ru, en, ko, uz, zh
});

const renderedContent = computed(() => {
  if (!post.value) return '';
  
  // Простой markdown рендеринг
  return post.value.content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\d+\.\s(.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
    .replace(/<\/p><p class="mb-4">/g, '</p><p class="mb-4">');
});

function loadPost() {
  const slug = route.params.slug as string;
  
  try {
    // Загружаем статью из локального файла
    const foundPost = getBlogPost(currentLangCode.value, slug);
    if (foundPost) {
      post.value = foundPost;
      // Увеличиваем просмотры
      incrementViews(slug);
      console.log('✅ Статья загружена из локального файла:', foundPost.title);
    } else {
      post.value = null;
      console.log('❌ Статья не найдена');
    }
  } catch (error) {
    console.error('Failed to load blog post:', error);
    post.value = null;
  } finally {
    loading.value = false;
  }
}


function formatDate(dateString: string): string {
  const currentLocale = locale.value || 'ru-RU';
  return formatDateTashkent(dateString, currentLocale);
}

// Обработчики изображений убраны

onMounted(() => {
  loadPost();
});

// Перезагружаем статью при смене языка
watch(currentLangCode, () => {
  loadPost();
});
</script>

<style scoped>
/* Стили для markdown контента в темной теме */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply dark:text-white;
}

.prose p {
  @apply dark:text-gray-300;
}

.prose strong {
  @apply dark:text-white;
}

.prose em {
  @apply dark:text-gray-300;
}

.prose li {
  @apply dark:text-gray-300;
}

.prose a {
  @apply dark:text-blue-400 dark:hover:text-blue-300;
}

.prose blockquote {
  @apply dark:border-gray-600 dark:text-gray-300;
}

.prose code {
  @apply dark:bg-gray-800 dark:text-gray-300;
}

.prose pre {
  @apply dark:bg-gray-800;
}

.prose pre code {
  @apply dark:bg-transparent;
}
</style>
