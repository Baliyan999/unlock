<template>
  <section class="container py-12 sm:py-16" aria-labelledby="faq-title">
    <h2 id="faq-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('faq.title') }}</h2>
    <div class="mt-6">
      <UiAccordion :items="items" />
    </div>
  </section>
</template>

<script setup lang="ts">
import UiAccordion from './Ui/Accordion.vue';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
const items = tm('faq.items') as unknown as { q: string; a: string }[];
</script>


