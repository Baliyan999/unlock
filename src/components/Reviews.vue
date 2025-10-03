<template>
  <section id="reviews" class="container py-12 sm:py-16" aria-labelledby="reviews-title">
    <h2 id="reviews-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('reviews.title') }}</h2>

    <div class="mt-6">
      <UiCarousel :items="items" :interval-ms="5000" aria-label="Слайдер отзывов">
        <template #default="{ item }">
          <article class="border rounded-lg p-5 h-full flex flex-col">
            <div class="text-sm text-gray-700 flex-1">“{{ item.text }}”</div>
            <div class="mt-3 text-sm font-semibold">{{ item.author }}</div>
          </article>
        </template>
      </UiCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiCarousel from './Ui/Carousel.vue';
import { useI18n } from 'vue-i18n';

type Review = { text: string; author: string };
const { tm } = useI18n();
const items = tm('reviews.list') as unknown as Review[];
</script>


