<template>
  <section id="pricing" class="container py-12 sm:py-16" aria-labelledby="pricing-title">
    <h2 id="pricing-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('pricing.title') }}</h2>
    <div class="mt-6 overflow-x-auto">
      <table class="w-full text-left border">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 border-r">{{ $t('pricing.format') }}</th>
            <th class="p-3 border-r">{{ $t('pricing.tariff') }}</th>
            <th class="p-3">{{ $t('pricing.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border-t border-r">{{ $t('pricing.group') }}</td>
            <td class="p-3 border-t border-r">{{ $t('pricing.priceFrom') }}</td>
            <td class="p-3 border-t"><UiButton @click="scrollToForm">{{ $t('pricing.apply') }}</UiButton></td>
          </tr>
          <tr class="bg-gray-50/50">
            <td class="p-3 border-t border-r">{{ $t('pricing.individual') }}</td>
            <td class="p-3 border-t border-r">{{ $t('pricing.priceFrom') }}</td>
            <td class="p-3 border-t"><UiButton @click="scrollToForm">{{ $t('pricing.apply') }}</UiButton></td>
          </tr>
          <tr>
            <td class="p-3 border-t border-r">{{ $t('pricing.intensive') }}</td>
            <td class="p-3 border-t border-r">{{ $t('pricing.priceFrom') }}</td>
            <td class="p-3 border-t"><UiButton @click="scrollToForm">{{ $t('pricing.apply') }}</UiButton></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiButton from './Ui/Button.vue';

function scrollToForm() {
  const el = document.getElementById('lead');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>


