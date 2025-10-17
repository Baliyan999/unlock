import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import App from './App.vue';
import { boot, initData } from './telegram';
import { router } from './router';
import { i18n } from './i18n';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './index.css';

// Инициализация темы по умолчанию
const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  // По умолчанию темная тема для всех новых посетителей
  return true;
};

// Применяем тему сразу при загрузке
if (getInitialTheme()) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Устанавливаем атрибут lang для HTML
document.documentElement.lang = localStorage.getItem('locale') || 'ru';

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head);
app.use(router);
app.use(pinia);
app.use(i18n);

// Инициализация авторизации
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.checkAuth();

app.mount('#app');

// Telegram Mini App bootstrap (не ломает работу в браузере)
const w = boot();
if (w && initData()) {
  console.debug('[MiniApp] ready');
}

