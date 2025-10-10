<template>
  <div class="container py-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold dark:text-white mb-4">{{ $t('blog.title') }}</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">{{ $t('blog.description') }}</p>
    </div>
    
    <div class="glass-blog-container">
      <div class="glass-blog-grid">
        <article 
          v-for="post in posts" 
          :key="post.slug"
          class="glass-blog-card group"
        >
          <div class="glass-blog-inner">
            <div class="glass-blog-image-container">
              <img 
                :src="post.cover" 
                :alt="post.title"
                class="glass-blog-image"
                loading="lazy"
              />
              <div class="glass-blog-overlay">
                <div class="glass-blog-read-more">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="glass-blog-content">
              <div class="glass-blog-header">
                <div class="glass-blog-date">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>{{ formatDate(post.date) }}</span>
                </div>
                <div class="glass-blog-category">
                  <span>{{ $t('blog.article') }}</span>
                </div>
              </div>
              
              <h2 class="glass-blog-title">
                <RouterLink :to="`/blog/${post.slug}`" class="glass-blog-link">
                  {{ post.title }}
                </RouterLink>
              </h2>
              
              <p class="glass-blog-excerpt">{{ post.excerpt }}</p>
              
              <div class="glass-blog-footer">
                <RouterLink :to="`/blog/${post.slug}`" class="glass-blog-button">
                  <span>{{ $t('blog.readMore') }}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </RouterLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { BlogPost } from '@/data/blog-posts';
import { getBlogPosts } from '@/data/blog-posts';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
// Используем t для предотвращения предупреждения
console.log(t('blog.title'));
const posts = ref<BlogPost[]>([]);

// Реактивное получение языка
const currentLangCode = computed(() => {
  const currentLocale = locale.value || 'ru-RU';
  return currentLocale.split('-')[0]; // ru, en, ko, uz, zh
});

function loadPosts() {
  try {
    // Загружаем статьи из локального файла
    const localPosts = getBlogPosts(currentLangCode.value);
    posts.value = localPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log('✅ Статьи загружены из локального файла:', localPosts.length);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    posts.value = [];
  }
}


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const currentLocale = locale.value || 'ru-RU';
  return date.toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

onMounted(() => {
  loadPosts();
});

// Перезагружаем статьи при смене языка
watch(currentLangCode, () => {
  loadPosts();
});
</script>

<style scoped>
/* Glass Blog Container */
.glass-blog-container {
  @apply relative overflow-hidden;
}

.glass-blog-grid {
  @apply grid md:grid-cols-2 lg:grid-cols-3 gap-8;
}

/* Glass Blog Card */
.glass-blog-card {
  @apply relative h-full;
}

.glass-blog-inner {
  @apply relative rounded-3xl overflow-hidden h-full flex flex-col;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

.glass-blog-card:hover .glass-blog-inner {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Image Container */
.glass-blog-image-container {
  @apply relative overflow-hidden flex-shrink-0;
  height: 200px;
}

.glass-blog-image {
  @apply w-full h-full object-cover transition-transform duration-500;
}

.glass-blog-card:hover .glass-blog-image {
  transform: scale(1.05);
}

.glass-blog-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300;
}

.glass-blog-card:hover .glass-blog-overlay {
  opacity: 1;
}

.glass-blog-read-more {
  @apply absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #1f2937;
  transition: all 0.3s ease;
}

.glass-blog-card:hover .glass-blog-read-more {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
}

/* Content */
.glass-blog-content {
  @apply p-6 flex flex-col flex-grow;
}

.glass-blog-header {
  @apply flex items-center justify-between mb-4;
}

.glass-blog-date {
  @apply flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400;
}

.glass-blog-category {
  @apply px-3 py-1 rounded-full text-xs font-medium;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.glass-blog-title {
  @apply text-xl font-semibold mb-3 flex-shrink-0;
}

.glass-blog-link {
  @apply text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors;
}

.glass-blog-excerpt {
  @apply text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed flex-grow;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.glass-blog-footer {
  @apply flex justify-end flex-shrink-0;
}

.glass-blog-button {
  @apply inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.glass-blog-button:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Dark theme adjustments */
.dark .glass-blog-inner {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-blog-card:hover .glass-blog-inner {
  background: rgba(0, 0, 0, 0.3);
}

.dark .glass-blog-category {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

.dark .glass-blog-button {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

.dark .glass-blog-button:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25));
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-blog-grid {
    @apply grid-cols-1 gap-6;
  }
  
  .glass-blog-content {
    @apply p-4;
  }
  
  .glass-blog-image-container {
    height: 180px;
  }
}
</style>
