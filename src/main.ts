import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { i18n } from './i18n';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './index.css';

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head);
app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');


