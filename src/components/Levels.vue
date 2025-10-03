<template>
  <section id="levels" class="container py-12 sm:py-16" aria-labelledby="levels-title">
    <h2 id="levels-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('levels.title') }}</h2>
    <p class="mt-2 text-gray-600 text-sm">{{ $t('levels.subtitle') }}</p>

    <div class="mt-6 space-y-6">
      <div v-for="item in timeline" :key="item.level" class="border rounded-lg p-5">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">HSK {{ item.level }}</h3>
          <a href="/program.pdf" class="text-sm text-blue-600 hover:underline">{{ $t('levels.download') }}</a>
        </div>
        <div class="mt-3 grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div class="text-gray-500">{{ $t('levels.labels.goals') }}</div>
            <p class="mt-1 text-gray-800">{{ item.goals }}</p>
          </div>
          <div>
            <div class="text-gray-500">{{ $t('levels.labels.grammar') }}</div>
            <p class="mt-1 text-gray-800">{{ item.grammar }}</p>
          </div>
          <div>
            <div class="text-gray-500">{{ $t('levels.labels.result') }}</div>
            <p class="mt-1 text-gray-800">{{ item.result }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

type TimelineItem = { level: number; goals: string; grammar: string; result: string };
const { tm } = useI18n();
const timeline = tm('levels.timeline') as unknown as TimelineItem[];
</script>


