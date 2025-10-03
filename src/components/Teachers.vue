<template>
  <section id="teachers" class="container py-12 sm:py-16" aria-labelledby="teachers-title">
    <h2 id="teachers-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('teachers.title') }}</h2>
    <div class="mt-6 grid md:grid-cols-3 gap-6">
      <div v-for="t in teachers" :key="t.name" class="border rounded-lg p-5">
        <div class="aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
          <img :src="t.photo" alt="" loading="lazy" class="w-full h-full object-cover" />
        </div>
        <div class="font-semibold">{{ t.name }}</div>
        <div class="text-sm text-gray-600">{{ t.specialty }}</div>
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


