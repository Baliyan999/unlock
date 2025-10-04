<template>
  <section class="container py-12 sm:py-16" aria-labelledby="contacts-title">
    <h2 id="contacts-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('contacts.title') }}</h2>
    <div class="mt-4 grid md:grid-cols-2 gap-6">
      <div class="space-y-2 text-sm">
        <div><span class="text-gray-500">{{ $t('contacts.phone') }}:</span> +998 xx xxx xx xx</div>
        <div><span class="text-gray-500">{{ $t('contacts.telegram') }}:</span> <a class="text-blue-600 hover:underline" href="https://t.me/test_my_assistant_123_bot" target="_blank" rel="noopener">@test_my_assistant_123_bot</a></div>
        <div><span class="text-gray-500">{{ $t('contacts.whatsapp') }}:</span> +998 xx xxx xx xx</div>
        <div><span class="text-gray-500">{{ $t('contacts.address') }}:</span> {{ $t('contacts.placeholderAddress') }}</div>
      </div>
      <div class="aspect-[4/3]">
        <iframe
          title="Карта Unlock"
          class="w-full h-full rounded border"
          loading="lazy"
          src="https://yandex.ru/map-widget/v1/?ll=69.267618%2C41.304608&amp;z=16&amp;l=map&amp;pt=69.267618%2C41.304608%2Cpm2rdm&amp;scroll=false&amp;zoom=16&amp;zoomControl=true&amp;zoomControlSize=small&amp;zoomControlPosition=right&amp;zoomControlOptions=5">
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>


