<template>
  <section id="teachers" class="container py-12 sm:py-16" aria-labelledby="teachers-title">
    <h2 id="teachers-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('teachers.title') }}</h2>
    <div class="mt-6 grid md:grid-cols-3 gap-6">
      <div v-for="t in teachers" :key="t.name" class="border rounded-lg p-6 text-center">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl font-bold text-white">{{ t.name.charAt(0) }}</span>
        </div>
        <div class="font-semibold text-lg">{{ t.name }}</div>
        <div class="text-sm text-gray-600 mt-2">{{ t.specialty }}</div>
        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">HSK 1-6</span>
          <span class="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">Разговорная практика</span>
          <span class="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Индивидуальные занятия</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

type Teacher = { name: string; specialty: string; photo: string };
const { tm } = useI18n();
const teachers = tm('teachers.list') as unknown as Teacher[];
</script>


