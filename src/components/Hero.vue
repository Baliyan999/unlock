<template>
  <section class="container pt-10 sm:pt-16" aria-label="Hero">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight overflow-hidden">
          <span 
            ref="typewriterText"
            class="typewriter-text"
            :class="{ 'typing': isTyping }"
          >
            {{ displayedText }}
          </span>
          <span class="cursor" :class="{ 'blinking': isTyping }">|</span>
        </h1>
        <p class="mt-4 text-gray-600">
          {{ $t('hero.sub') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UiButton @click="scrollToForm" size="lg">{{ $t('hero.trial') }}</UiButton>
          <a class="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50" href="https://t.me/test_my_assistant_123_bot" target="_blank" rel="noopener">
            {{ $t('hero.writeTg') }}
          </a>
        </div>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded">{{ $t('hero.b1') }}</span>
          <span class="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded">{{ $t('hero.b2') }}</span>
          <span class="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded">{{ $t('hero.b3') }}</span>
        </div>
      </div>
            <div class="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe 
                class="w-full h-full"
                src="https://www.youtube.com/embed/-TXh2rrNshI?si=WtisEKRDOipbyNU1"
                title="UNLOCK - Курсы китайского языка"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import UiButton from './Ui/Button.vue';

const { t } = useI18n();

const displayedText = ref('');
const isTyping = ref(false);
const typewriterText = ref<HTMLElement>();

const fullText = computed(() => t('hero.h1'));

function scrollToForm() {
  const el = document.getElementById('lead');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function typeWriter() {
  const text = fullText.value;
  let i = 0;
  
  isTyping.value = true;
  displayedText.value = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      displayedText.value += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      isTyping.value = false;
    }
  }, 80); // Скорость печати - 80ms на символ
}

onMounted(() => {
  // Небольшая задержка перед началом анимации
  setTimeout(() => {
    typeWriter();
  }, 500);
});
</script>

<style scoped>
.cursor {
  color: #000000;
  font-weight: bold;
  animation: blink 1s infinite;
}

.cursor.blinking {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.typewriter-text {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-right: 2px solid transparent;
  min-height: 200px;
  padding-bottom: 20px;
  line-height: 1.4;
}

.typewriter-text.typing {
  border-right: 2px solid #000000;
  animation: typewriter-cursor 0.8s infinite;
}

@keyframes typewriter-cursor {
  0%, 50% { border-right-color: #000000; }
  51%, 100% { border-right-color: transparent; }
}
</style>


