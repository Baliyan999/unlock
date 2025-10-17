<template>
  <section id="lead" class="container py-12 sm:py-16" aria-labelledby="lead-title">
    <div class="text-center mb-12">
      <h2 id="lead-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('form.title') }}</h2>
      
      <!-- Уведомление о предзаполнении из калькулятора -->
      <div v-if="courseData.finalPrice > 0" class="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
        <div class="flex items-center justify-center space-x-2">
          <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-green-800 dark:text-green-200 font-medium">
            {{ $t('form.preFilledFromCalculator') }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="glass-form-container">
      <div class="glass-form-inner">
        <form @submit.prevent="onSubmit" novalidate class="glass-form">
          <div class="glass-form-rows">
            <!-- Первый ряд: Имя, Телефон и Email -->
            <div class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.1s">
                <UiInput :label="$t('form.name') + ' *'" v-model="form.name" name="name" :error="errors.name" required />
              </div>
              
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.2s">
                <UiInput :label="$t('form.phone') + ' *'" v-model="form.phone" name="phone" :error="errors.phone" :placeholder="$t('contacts.placeholderPhone')" required @input="maskPhone" />
              </div>
              
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.3s">
                <UiInput :label="$t('form.email')" v-model="form.email" name="email" type="email" :error="errors.email" :placeholder="$t('form.emailPlaceholder')" />
              </div>
            </div>

            <!-- Второй ряд: Уровень и Формат -->
            <div class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.4s">
                <UiSelect :label="$t('form.level')" v-model="form.level" name="level" :options="levelOptions" :error="errors.level" />
              </div>
              
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.5s">
                <UiSelect :label="$t('form.format')" v-model="form.format" name="format" :options="formatOptions" :error="errors.format" />
              </div>
            </div>

            <!-- Третий ряд: Промокод (на всю ширину) -->
            <div class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.6s">
                <label class="glass-field-label">{{ $t('form.promoCode') }}</label>
                <div class="glass-promo-container">
                  <div class="glass-promo-input-wrapper">
                    <input 
                      v-model="form.promoCode" 
                      name="promoCode" 
                      :placeholder="$t('form.promoCodePlaceholder')"
                      class="glass-promo-input"
                      @keyup.enter="applyPromocode"
                    />
                  </div>
                  <button 
                    type="button"
                    @click="applyPromocode"
                    :disabled="!form.promoCode.trim() || promocodeLoading"
                    class="glass-promo-button"
                  >
                    <svg v-if="promocodeLoading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="glass-promo-button-text">{{ promocodeLoading ? 'Проверка...' : 'Применить' }}</span>
                  </button>
                </div>
                <!-- Сообщение о результате применения промокода -->
                <div v-if="promocodeMessage" class="glass-promo-message" :class="{ 'success': promocodeSuccess, 'error': !promocodeSuccess }">
                  <svg v-if="promocodeSuccess" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ promocodeMessage }}
                </div>
              </div>
            </div>

            <!-- Четвертый ряд: Комментарий (на всю ширину) -->
            <div class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.7s">
                <div class="glass-textarea-container">
                  <label for="comment" class="glass-textarea-label">{{ $t('form.comment') }}</label>
                  <div class="glass-textarea-wrapper">
                    <textarea 
                      id="comment" 
                      v-model="form.comment" 
                      rows="4" 
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
            </div>

            <!-- Пятый ряд: Данные из калькулятора (если есть) -->
            <div v-if="courseData.finalPrice > 0" class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.7s">
                <div class="glass-textarea-container">
                  <label class="glass-textarea-label">
                    {{ $t('form.courseInfo') }}
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('form.readOnly') }}</span>
                  </label>
                  <div class="glass-textarea-wrapper">
                    <textarea 
                      v-model="courseInfoText" 
                      rows="6" 
                      class="glass-textarea bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      readonly
                      disabled
                    ></textarea>
                    <div class="glass-textarea-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Пятый ряд: Данные из калькулятора (если есть) -->
            <div v-if="courseData.finalPrice > 0" class="glass-form-row">
              <div class="glass-form-field animate-fade-in-up" style="animation-delay: 0.8s">
                <div class="glass-textarea-container">
                  <label class="glass-textarea-label">
                    {{ $t('form.courseInfo') }}
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('form.readOnly') }}</span>
                  </label>
                  <div class="glass-textarea-wrapper">
                    <textarea 
                      v-model="courseInfoText" 
                      rows="6" 
                      class="glass-textarea bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      readonly
                      disabled
                    ></textarea>
                    <div class="glass-textarea-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
            <!-- Шестой ряд: Кнопка отправки -->
            <div class="glass-form-row">
              <div class="glass-form-actions animate-fade-in-up" style="animation-delay: 0.9s">
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
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UiInput from './Ui/Input.vue';
import UiSelect from './Ui/Select.vue';
import { leadSchema, LeadInput } from '../lib/validators';
import { useAuthStore } from '@/stores/auth';
import api from '@/lib/api';
import type { LeadCreate } from '@/types/auth';
import { userUnsafe } from '../telegram';

type SelectOption = { label: string; value: string };

import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

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
]);

const form = reactive<LeadInput>({
  name: '',
  phone: '',
  email: '',
  level: 'unknown',
  format: 'group',
  comment: '',
  promoCode: '',
});

// Дополнительные поля для данных из калькулятора
const courseData = reactive({
  teacher: '',
  lessonsPerMonth: 0,
  monthlyPrice: 0,
  finalPrice: 0,
  promoCode: '',
  discount: 0,
  pricePerLesson: 0
});

const errors = reactive<Record<string, string | null>>({
  name: null,
  phone: null,
  email: null,
  level: null,
  format: null,
});

// Состояние для промокода
const promocodeLoading = ref(false);
const promocodeMessage = ref('');
const promocodeSuccess = ref(false);

// Функция для обработки URL параметров
function parseUrlParams() {
  const query = route.query;
  
  // Заполняем форму данными из URL
  if (query.format && typeof query.format === 'string') {
    if (query.format === 'group' || query.format === 'individual' || query.format === 'intensive') {
      form.format = query.format;
    }
  }
  if (query.level && typeof query.level === 'string') {
    if (['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'unknown', 'beginner'].includes(query.level)) {
      form.level = query.level as any;
    }
  }
  // Сохраняем информацию о преподавателе
  if (query.teacher && typeof query.teacher === 'string') {
    courseData.teacher = query.teacher;
  }
  
  // Сохраняем данные о курсе
  if (query.lessons && typeof query.lessons === 'string') {
    courseData.lessonsPerMonth = parseInt(query.lessons);
  }
  if (query.price && typeof query.price === 'string') {
    courseData.finalPrice = parseInt(query.price);
  }
  if (query.originalPrice && typeof query.originalPrice === 'string') {
    courseData.monthlyPrice = parseInt(query.originalPrice);
  }
  if (query.pricePerLesson && typeof query.pricePerLesson === 'string') {
    courseData.pricePerLesson = parseInt(query.pricePerLesson);
  }
  if (query.promo && typeof query.promo === 'string') {
    courseData.promoCode = query.promo;
  }
  if (query.discount && typeof query.discount === 'string') {
    courseData.discount = parseInt(query.discount);
  }
  
  // Информация о курсе будет отображаться в отдельном поле
}

// Функция для применения промокода
const applyPromocode = async () => {
  if (!form.promoCode.trim()) return;
  
  promocodeLoading.value = true;
  promocodeMessage.value = '';
  promocodeSuccess.value = false;
  
  try {
    // Проверяем промокод через API
    const response = await api.get(`/promocodes/validate/${form.promoCode.trim()}`);
    
    if (response.data.valid) {
      const promocode = response.data.promocode;
      promocodeSuccess.value = true;
      promocodeMessage.value = `Промокод "${promocode.code}" применен! Скидка: ${promocode.discount_value}${promocode.discount_type === 'percent' ? '%' : ' сум'}`;
      
      // Сохраняем информацию о промокоде
      courseData.promoCode = promocode.code;
      courseData.discount = promocode.discount_type === 'percent' ? promocode.discount_value : 0;
      
      // Если есть информация о цене, пересчитываем
      if (courseData.monthlyPrice > 0) {
        if (promocode.discount_type === 'percent') {
          courseData.finalPrice = Math.round(courseData.monthlyPrice * (1 - promocode.discount_value / 100));
        } else {
          courseData.finalPrice = Math.max(0, courseData.monthlyPrice - promocode.discount_value);
        }
      }
    } else {
      promocodeSuccess.value = false;
      promocodeMessage.value = 'Промокод недействителен или истек';
    }
  } catch (error: any) {
    console.error('Promocode validation error:', error);
    promocodeSuccess.value = false;
    
    if (error.response?.status === 404) {
      promocodeMessage.value = 'Промокод не найден';
    } else if (error.response?.status === 400) {
      promocodeMessage.value = error.response.data.detail || 'Промокод недействителен';
    } else {
      promocodeMessage.value = 'Ошибка при проверке промокода';
    }
  } finally {
    promocodeLoading.value = false;
  }
};

// Вызываем функцию при монтировании компонента
onMounted(() => {
  parseUrlParams();
  
  // Предзаполнение формы данными пользователя из Telegram
  const telegramUser = userUnsafe();
  if (telegramUser && !form.name) {
    const fullName = [telegramUser.first_name, telegramUser.last_name]
      .filter(Boolean)
      .join(' ');
    if (fullName) {
      form.name = fullName;
    }
  }
  
  // Если есть параметры из калькулятора, скроллим к форме
  const query = route.query;
  if (query.format || query.level || query.price) {
    // Небольшая задержка для загрузки страницы
    setTimeout(() => {
      const formElement = document.getElementById('lead');
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500);
  }
});

const loading = ref(false);
const notice = ref<{ ok: boolean; message: string } | null>(null);

// Computed свойство для отображения информации о курсе
const courseInfoText = computed(() => {
  if (courseData.finalPrice <= 0) return '';
  
  const formatText = form.format === 'group' ? t('form.options.format.group') : 
                    form.format === 'individual' ? t('form.options.format.individual') : t('form.options.format.intensive');
  const levelText = form.level === 'hsk1' ? 'HSK 1' :
                   form.level === 'hsk2' ? 'HSK 2' :
                   form.level === 'hsk3' ? 'HSK 3' :
                   form.level === 'hsk4' ? 'HSK 4' :
                   form.level === 'hsk5' ? 'HSK 5' :
                   form.level === 'hsk6' ? 'HSK 6' : t('form.notSpecified');
  
  let info = `${t('form.courseInfoTitle')}\n\n`;
  info += `📚 ${t('form.formatLabel')}: ${formatText}\n`;
  info += `🎯 ${t('form.levelLabel')}: ${levelText}\n`;
  
  // Добавляем информацию о преподавателе для индивидуальных занятий
  if (form.format === 'individual' && courseData.teacher) {
    const teacherText = courseData.teacher === 'native' ? t('form.nativeTeacher') : t('form.regularTeacher');
    info += `👨‍🏫 ${t('form.teacherLabel')}: ${teacherText}\n`;
  }
  
  if (form.format === 'group') {
    info += `📅 ${t('form.lessonsPerMonthLabel')}: ${courseData.lessonsPerMonth}\n`;
    info += `💰 ${t('form.pricePerLessonLabel')}: ${courseData.pricePerLesson.toLocaleString('ru-RU')} сум\n`;
  }
  
  info += `💵 ${t('form.monthlyPriceLabel')}: ${courseData.finalPrice.toLocaleString('ru-RU')} сум\n`;
  
  if (courseData.promoCode) {
    info += `\n${t('form.promoCodeTitle')}\n`;
    info += `${t('form.promoCodeLabel')}: ${courseData.promoCode}\n`;
    info += `${t('form.discountLabel')}: ${courseData.discount}%\n`;
    info += `${t('form.originalPriceLabel')}: ${courseData.monthlyPrice.toLocaleString('ru-RU')} сум\n`;
    info += `${t('form.savingsLabel')}: ${(courseData.monthlyPrice - courseData.finalPrice).toLocaleString('ru-RU')} сум\n`;
  }
  
  return info;
});

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
  errors.name = errors.phone = errors.email = errors.level = errors.format = null;

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
    // Отправляем через новый API (без обязательной авторизации)
    const leadData: LeadCreate = {
      name: parsed.data.name,
      email: parsed.data.email || authStore.user?.email || 'no-email@example.com', // Email из формы или пользователя
      phone: parsed.data.phone,
      message: parsed.data.comment,
      language_level: parsed.data.level,
      preferred_time: parsed.data.format,
      format: parsed.data.format,
      promocode: parsed.data.promoCode || courseData.promoCode || undefined,
      final_price: courseData.finalPrice > 0 ? courseData.finalPrice.toString() : undefined,
      source: 'lead'
    };

    await api.post('/leads/', leadData);
    notice.value = { ok: true, message: t('form.success') };
    
    // Очищаем форму
    Object.assign(form, { name: '', phone: '', email: '', comment: '', promoCode: '' });
    Object.assign(courseData, { 
      teacher: '', 
      lessonsPerMonth: 0, 
      monthlyPrice: 0, 
      finalPrice: 0, 
      promoCode: '', 
      discount: 0, 
      pricePerLesson: 0 
    });
    
    // Редирект на главную страницу через 3 секунды
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
    
  } catch (error: any) {
    console.error('Form submission error:', error);
    
    // Обрабатываем ошибки валидации промокода
    if (error.response?.status === 400 && error.response?.data?.detail) {
      const errorMessage = error.response.data.detail;
      if (errorMessage.includes('Промокод') && errorMessage.includes('не найден')) {
        notice.value = { ok: false, message: 'Промокод не найден. Проверьте правильность ввода.' };
      } else if (errorMessage.includes('Промокод') && errorMessage.includes('неактивен')) {
        notice.value = { ok: false, message: 'Промокод неактивен. Обратитесь к администратору.' };
      } else if (errorMessage.includes('Промокод') && errorMessage.includes('истек')) {
        notice.value = { ok: false, message: 'Промокод истек. Используйте другой промокод.' };
      } else if (errorMessage.includes('Промокод') && errorMessage.includes('исчерпан')) {
        notice.value = { ok: false, message: 'Промокод исчерпан. Используйте другой промокод.' };
      } else {
        notice.value = { ok: false, message: errorMessage };
      }
    } else {
      notice.value = { ok: false, message: 'Ошибка при отправке заявки. Попробуйте еще раз.' };
    }
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

.glass-form-rows {
  @apply space-y-6;
}

.glass-form-row {
  @apply grid md:grid-cols-2 gap-6;
}

.glass-form-row:has(.glass-form-field:only-child) {
  @apply grid-cols-1;
}

.glass-form-row:has(.glass-form-field:nth-child(3)) {
  @apply grid-cols-1 md:grid-cols-3;
}

.glass-form-field {
  @apply relative;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  @apply flex flex-col space-y-4 w-full;
}

.glass-form-row:has(.glass-form-actions) {
  @apply grid-cols-1;
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
    padding: 1.5rem;
  }
  
  .glass-form-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
  }
  
  .glass-form-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .glass-submit-button {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .glass-submit-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .glass-submit-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

/* Анимации для полей формы */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Hover эффекты для полей */
.glass-form-field:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* Плавные переходы для всех элементов */
.glass-form-field * {
  transition: all 0.3s ease;
}

/* Улучшенные тени для полей */
.glass-form-field {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.glass-form-field:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

/* Стили для промокода */
.glass-field-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3;
}

.glass-promo-container {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
  width: 100%;
}

.glass-promo-input-wrapper {
  flex: 1;
  position: relative;
}

.glass-promo-input {
  @apply w-full px-4 py-3 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-600/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm;
  font-size: 0.95rem;
  height: 48px;
}

.glass-promo-input:focus {
  @apply bg-white/20 dark:bg-gray-800/30 shadow-lg;
  transform: translateY(-1px);
}

.glass-promo-button {
  @apply flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg;
  min-width: 140px;
  height: 48px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.glass-promo-button:not(:disabled):hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(147, 51, 234, 0.3);
}

.glass-promo-button:not(:disabled):active {
  transform: translateY(0) scale(0.98);
}

.glass-promo-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.glass-promo-button:hover::before {
  left: 100%;
}

.glass-promo-button-text {
  @apply font-semibold;
  font-size: 0.9rem;
}

.glass-promo-message {
  @apply mt-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2;
  backdrop-filter: blur(10px);
  border: 1px solid;
}

.glass-promo-message.success {
  @apply bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.1);
}

.glass-promo-message.error {
  @apply bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1);
}

/* Адаптивность для промокода */
@media (max-width: 768px) {
  .glass-promo-container {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .glass-promo-button {
    width: 100%;
    min-width: auto;
    height: 52px;
    font-size: 1rem;
  }
  
  .glass-promo-input {
    height: 52px;
    font-size: 1rem;
  }
  
  .glass-promo-button-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .glass-promo-container {
    gap: 0.5rem;
  }
  
  .glass-promo-button {
    height: 48px;
    padding: 0.75rem 1rem;
  }
  
  .glass-promo-input {
    height: 48px;
    padding: 0.75rem 1rem;
  }
  
  .glass-promo-message {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>


