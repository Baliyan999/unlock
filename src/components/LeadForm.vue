<template>
  <section id="lead" class="container py-12 sm:py-16" aria-labelledby="lead-title">
    <h2 id="lead-title" class="text-2xl sm:text-3xl font-semibold">{{ $t('form.title') }}</h2>
    <form class="mt-6 grid md:grid-cols-2 gap-6" @submit.prevent="onSubmit" novalidate>
      <div class="space-y-4">
        <UiInput :label="$t('form.name')" v-model="form.name" name="name" :error="errors.name" required />
        <UiInput :label="$t('form.phone')" v-model="form.phone" name="phone" :error="errors.phone" :placeholder="$t('contacts.placeholderPhone')" required @input="maskPhone" />
        <UiSelect :label="$t('form.level')" v-model="form.level" name="level" :options="levelOptions" :error="errors.level" />
      </div>
      <div class="space-y-4">
        <UiSelect :label="$t('form.format')" v-model="form.format" name="format" :options="formatOptions" :error="errors.format" />
        <div>
          <label for="comment" class="block text-sm font-medium">{{ $t('form.comment') }}</label>
          <textarea id="comment" v-model="form.comment" rows="3" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        </div>
        <div class="flex items-center gap-3">
          <UiButton :disabled="loading" type="submit">
            <span v-if="loading" class="inline-flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              {{ $t('form.sending') }}
            </span>
            <span v-else>{{ $t('form.submit') }}</span>
          </UiButton>
          <span v-if="notice" :class="notice.ok ? 'text-emerald-700' : 'text-red-600'" class="text-sm">{{ notice.message }}</span>
        </div>
      </div>
    </form>
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
const { t, locale } = useI18n();

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
  errors.name = errors.phone = errors.messenger = errors.level = errors.format = null;

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
        `💬 Мессенджер: ${parsed.data.messenger}`,
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
        const message = telegramResult.sent > 1 
          ? `Заявка отправлена в ${telegramResult.sent} чатов!`
          : t('form.success');
        notice.value = { ok: true, message };
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


