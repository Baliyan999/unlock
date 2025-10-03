<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8">{{ $t('blog.title') }}</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="post in posts" 
        :key="post.slug"
        class="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img 
          :src="post.cover" 
          :alt="post.title"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">
            <RouterLink :to="`/blog/${post.slug}`" class="hover:text-blue-600">
              {{ post.title }}
            </RouterLink>
          </h2>
          <p class="text-gray-600 text-sm mb-3">{{ post.excerpt }}</p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>{{ formatDate(post.date) }}</span>
            <RouterLink :to="`/blog/${post.slug}`" class="text-blue-600 hover:underline">
              {{ $t('blog.readMore') }}
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BlogPost, parseFrontmatter } from '@/lib/frontmatter';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const posts = ref<BlogPost[]>([]);

async function loadPosts() {
  try {
    // Загружаем список MD файлов
    const blogFiles = [
      'getting-started.md',
      'hsk-preparation.md'
    ];
    
    const loadedPosts: BlogPost[] = [];
    
    for (const file of blogFiles) {
      try {
        const response = await fetch(`/src/content/blog/${file}?raw`);
        const content = await response.text();
        const { frontmatter, content: postContent } = parseFrontmatter(content);
        
        loadedPosts.push({
          ...frontmatter as BlogPost,
          slug: file.replace('.md', ''),
          content: postContent
        });
      } catch (error) {
        console.warn(`Failed to load ${file}:`, error);
      }
    }
    
    // Сортируем по дате
    posts.value = loadedPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

onMounted(() => {
  loadPosts();
});
</script>
