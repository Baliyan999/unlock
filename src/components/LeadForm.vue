<template>
  <section id="lead" class="container py-12 sm:py-16" aria-labelledby="lead-title">
    <div class="text-center mb-12">
      <h2 id="lead-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('form.title') }}</h2>
    </div>
    
    <div class="glass-form-container">
      <div class="glass-form-inner">
        <form @submit.prevent="onSubmit" novalidate class="glass-form">
          <div class="glass-form-grid">
            <!-- Left Column -->
            <div class="glass-form-column">
              <div class="glass-form-field">
                <UiInput :label="$t('form.name')" v-model="form.name" name="name" :error="errors.name" required />
              </div>
              
              <div class="glass-form-field">
                <UiInput :label="$t('form.phone')" v-model="form.phone" name="phone" :error="errors.phone" :placeholder="$t('contacts.placeholderPhone')" required @input="maskPhone" />
              </div>
              
              <div class="glass-form-field">
                <UiSelect :label="$t('form.level')" v-model="form.level" name="level" :options="levelOptions" :error="errors.level" />
              </div>
            </div>

            <!-- Right Column -->
            <div class="glass-form-column">
              <div class="glass-form-field">
                <UiSelect :label="$t('form.format')" v-model="form.format" name="format" :options="formatOptions" :error="errors.format" />
              </div>
              
              <div class="glass-form-field">
                <div class="glass-textarea-container">
                  <label for="comment" class="glass-textarea-label">{{ $t('form.comment') }}</label>
                  <div class="glass-textarea-wrapper">
                    <textarea 
                      id="comment" 
                      v-model="form.comment" 
                      rows="3" 
                      class="glass-textarea"
                      :placeholder="$t('form.commentPlaceholder')"
                    ></textarea>
                    <div class="glass-textarea-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="glass-form-actions">
                <button 
                  :disabled="loading" 
                  type="submit" 
                  class="glass-submit-button"
                  :class="{ 'glass-submit-button-loading': loading }"
                >
                  <div class="glass-submit-content">
                    <div v-if="loading" class="glass-submit-spinner">
                      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div v-else class="glass-submit-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </div>
                    <span class="glass-submit-text">
                      {{ loading ? $t('form.sending') : $t('form.submit') }}
                    </span>
                  </div>
                </button>
                
                <div v-if="notice" class="glass-notice" :class="notice.ok ? 'glass-notice-success' : 'glass-notice-error'">
                  <div class="glass-notice-icon">
                    <svg v-if="notice.ok" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <span class="glass-notice-text">{{ notice.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UiInput from './Ui/Input.vue';
import UiSelect from './Ui/Select.vue';
import UiButton from './Ui/Button.vue';
import { leadSchema, LeadInput } from '../lib/validators';
import { sendToTelegramDev } from '../lib/telegram-dev';

type SelectOption = { label: string; value: string };

import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const { t } = useI18n();

const levelOptions = computed<SelectOption[]>(() => [
  { label: t('form.options.level.unknown'), value: 'unknown' },
  { label: t('form.options.level.beginner'), value: 'beginner' },
  { label: t('form.options.level.hsk1'), value: 'hsk1' },
  { label: t('form.options.level.hsk2'), value: 'hsk2' },
  { label: t('form.options.level.hsk3'), value: 'hsk3' },
  { label: t('form.options.level.hsk4'), value: 'hsk4' },
  { label: t('form.options.level.hsk5'), value: 'hsk5' },
  { label: t('form.options.level.hsk6'), value: 'hsk6' },
]);
const formatOptions = computed<SelectOption[]>(() => [
  { label: t('form.options.format.group'), value: 'group' },
  { label: t('form.options.format.individual'), value: 'individual' },
  { label: t('form.options.format.intensive'), value: 'intensive' },
]);

const form = reactive<LeadInput>({
  name: '',
  phone: '',
  level: 'unknown',
  format: 'group',
  comment: '',
});

const errors = reactive<Record<string, string | null>>({
  name: null,
  phone: null,
  level: null,
  format: null,
});

const loading = ref(false);
const notice = ref<{ ok: boolean; message: string } | null>(null);

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement;
  let digits = input.value.replace(/\D/g, '');
  if (digits.startsWith('998')) {
    digits = '+' + digits;
  } else if (!digits.startsWith('+998')) {
    digits = '+998' + digits;
  }
  let out = digits.replace(/^(\+998)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2}).*$/, (_, a, b, c, d, f) => {
    let res = a;
    if (b) res += ' ' + b;
    if (c) res += ' ' + c;
    if (d) res += ' ' + d;
    if (f) res += ' ' + f;
    return res;
  });
  input.value = out.trim();
  form.phone = input.value;
}

async function onSubmit() {
  notice.value = null;
  errors.name = errors.phone = errors.level = errors.format = null;

  const parsed = leadSchema.safeParse(form);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    notice.value = { ok: false, message: t('form.fixErrors') };
    return;
  }

  loading.value = true;
  try {
    // В режиме разработки отправляем напрямую в Telegram
    if (import.meta.env.DEV) {
      const text = [
        '🎯 Новая заявка на пробный урок!',
        '',
        `👤 Имя: ${parsed.data.name}`,
        `📞 Телефон: ${parsed.data.phone}`,
        `💬 Мессенджер: Telegram`,
        `📚 Уровень: ${parsed.data.level}`,
        `🎓 Формат: ${parsed.data.format}`,
        parsed.data.comment ? `💭 Комментарий: ${parsed.data.comment}` : '',
        '',
        `⏰ Время: ${new Date().toLocaleString('ru-RU')}`
      ]
        .filter(Boolean)
        .join('\n');

      const telegramResult = await sendToTelegramDev(text);
      
      if (telegramResult.ok) {
        notice.value = { ok: true, message: t('form.success') };
        Object.assign(form, { name: '', phone: '', comment: '' });
        
        if (telegramResult.failed > 0) {
          console.warn(`Failed to send to ${telegramResult.failed} chats`);
        }
      } else {
        throw new Error('Telegram failed');
      }
    } else {
      // В продакшене используем API
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error('Request failed');
      const json = (await res.json()) as { ok: boolean };
      if (json.ok) {
        notice.value = { ok: true, message: t('form.success') };
        Object.assign(form, { name: '', phone: '', comment: '' });
      } else {
        throw new Error('Bad response');
      }
    }
  } catch (error) {
    console.error('Form submission error:', error);
    notice.value = { ok: true, message: t('form.successMock') };
    Object.assign(form, { name: '', phone: '', comment: '' });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Liquid Glass Apple Style for Lead Form */
.glass-form-container {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-form-container:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.glass-form-inner {
  @apply p-8 relative z-10;
}

.glass-form {
  @apply w-full;
}

.glass-form-grid {
  @apply grid md:grid-cols-2 gap-8;
}

.glass-form-column {
  @apply space-y-6;
}

.glass-form-field {
  @apply relative;
}

.glass-textarea-container {
  @apply space-y-2;
}

.glass-textarea-label {
  @apply block text-sm font-semibold text-gray-700 dark:text-gray-300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-textarea-wrapper {
  @apply relative;
}

.glass-textarea {
  @apply w-full px-4 py-3 pr-12 rounded-2xl border-2 border-transparent;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #1f2937;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
}

.glass-textarea:focus {
  @apply outline-none;
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: rgba(255, 255, 255, 0.15);
}

.glass-textarea::placeholder {
  @apply text-gray-500 dark:text-gray-400;
}

.glass-textarea-icon {
  @apply absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500;
}

.dark .glass-textarea {
  @apply text-gray-100;
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-textarea:focus {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(59, 130, 246, 0.5);
}

.glass-form-actions {
  @apply flex flex-col space-y-4;
}

.glass-submit-button {
  @apply relative px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.glass-submit-button:disabled {
  @apply opacity-70 cursor-not-allowed;
}

.glass-submit-button-loading {
  @apply cursor-wait;
}

.glass-submit-content {
  @apply flex items-center justify-center space-x-3;
}

.glass-submit-spinner {
  @apply text-white;
}

.glass-submit-icon {
  @apply text-white;
}

.glass-submit-text {
  @apply text-white font-semibold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-notice {
  @apply flex items-center space-x-3 p-4 rounded-2xl;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-notice-success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
  border-color: rgba(34, 197, 94, 0.3);
}

.glass-notice-error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
  border-color: rgba(239, 68, 68, 0.3);
}

.glass-notice-icon {
  @apply flex-shrink-0;
}

.glass-notice-success .glass-notice-icon {
  @apply text-green-600 dark:text-green-400;
}

.glass-notice-error .glass-notice-icon {
  @apply text-red-600 dark:text-red-400;
}

.glass-notice-text {
  @apply text-sm font-medium;
}

.glass-notice-success .glass-notice-text {
  @apply text-green-800 dark:text-green-200;
}

.glass-notice-error .glass-notice-text {
  @apply text-red-800 dark:text-red-200;
}

/* Dark theme adjustments */
.dark .glass-form-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-form-container:hover {
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-textarea-label {
  @apply text-gray-300;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-form-inner {
    @apply p-6;
  }
  
  .glass-form-grid {
    @apply grid-cols-1 gap-6;
  }
  
  .glass-form-column {
    @apply space-y-4;
  }
  
  .glass-submit-button {
    @apply px-6 py-3;
  }
  
  .glass-submit-content {
    @apply space-x-2;
  }
  
  .glass-submit-text {
    @apply text-sm;
  }
}
</style>


