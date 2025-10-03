<template>
  <section id="formats" class="container py-12 sm:py-16" aria-labelledby="formats-title">
    <h2 id="formats-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('formats.title') }}</h2>
    <div class="mt-6 grid md:grid-cols-3 gap-6">
      <article class="border rounded-lg p-5">
        <h3 class="font-semibold">{{ $t('formats.group.title') }}</h3>
        <ul class="mt-2 text-sm text-gray-700 space-y-1">
          <li v-for="(it, i) in list('formats.group.items')" :key="'g-'+i">{{ it }}</li>
        </ul>
      </article>
      <article class="border rounded-lg p-5">
        <h3 class="font-semibold">{{ $t('formats.individual.title') }}</h3>
        <ul class="mt-2 text-sm text-gray-700 space-y-1">
          <li v-for="(it, i) in list('formats.individual.items')" :key="'i-'+i">{{ it }}</li>
        </ul>
      </article>
      <article class="border rounded-lg p-5">
        <h3 class="font-semibold">{{ $t('formats.intensive.title') }}</h3>
        <ul class="mt-2 text-sm text-gray-700 space-y-1">
          <li v-for="(it, i) in list('formats.intensive.items')" :key="'in-'+i">{{ it }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
function list(key: string): string[] {
  const val = tm(key);
  return Array.isArray(val) ? (val as string[]) : [];
}
</script>


