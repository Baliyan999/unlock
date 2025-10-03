<template>
  <section class="container py-12 sm:py-16" aria-labelledby="contacts-title">
    <h2 id="contacts-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('contacts.title') }}</h2>
    <div class="mt-4 grid md:grid-cols-2 gap-6">
      <div class="space-y-2 text-sm">
        <div><span class="text-gray-500">{{ $t('contacts.phone') }}:</span> +998 xx xxx xx xx</div>
        <div><span class="text-gray-500">{{ $t('contacts.telegram') }}:</span> <a class="text-blue-600 hover:underline" href="https://t.me/unlock_school" target="_blank" rel="noopener">@unlock_school</a></div>
        <div><span class="text-gray-500">{{ $t('contacts.whatsapp') }}:</span> +998 xx xxx xx xx</div>
        <div><span class="text-gray-500">{{ $t('contacts.address') }}:</span> {{ $t('contacts.placeholderAddress') }}</div>
      </div>
      <div class="aspect-[4/3]">
        <iframe
          title="Карта Unlock"
          class="w-full h-full rounded border"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDEuMjk5NSwgNjkuMjQwMQ!5e0!3m2!1sru!2suz!4v0000000000">
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>


