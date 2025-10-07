<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('offer.title') }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            {{ $t('offer.subtitle') }}
          </p>
        </div>

        <!-- Content -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <div v-html="$t('offer.content')"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-gray-900 dark:text-white;
}

.prose strong {
  @apply text-gray-900 dark:text-white;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300;
}

.prose ul {
  @apply list-disc pl-6;
}

.prose ol {
  @apply list-decimal pl-6;
}

.prose li {
  @apply mb-2;
}
</style>
