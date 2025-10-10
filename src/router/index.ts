import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { i18n, setLocale } from '@/i18n';
import HomePage from '../views/HomePage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import OfferPage from '../views/OfferPage.vue';
import BlogPage from '../views/BlogPage.vue';
import BlogPostPage from '../views/BlogPostPage.vue';
import TestPage from '../views/TestPage.vue';
import CalculatorPage from '../views/CalculatorPage.vue';
import TestLevels from '../components/TestLevels.vue';
import TestQuestion from '../components/TestQuestion.vue';
import TestResults from '../components/TestResults.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { titleKey: 'meta.title', descKey: 'meta.description' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogPage,
    meta: { titleKey: 'meta.blog', descKey: 'meta.blogDesc' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostPage,
    meta: { titleKey: 'meta.blogPost', descKey: 'meta.blogPostDesc' },
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage,
    meta: { titleKey: 'meta.test', descKey: 'meta.testDesc' },
    children: [
      {
        path: '',
        name: 'TestLevels',
        component: TestLevels,
      },
      {
        path: ':level',
        name: 'TestQuestion',
        component: TestQuestion,
        props: true,
      },
      {
        path: ':level/results',
        name: 'TestResults',
        component: TestResults,
        props: true,
      },
    ],
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorPage,
    meta: { titleKey: 'meta.calculator', descKey: 'meta.calculatorDesc' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPage,
    meta: { titleKey: 'meta.privacy', descKey: 'meta.privacyDesc' },
  },
  {
    path: '/offer',
    name: 'offer',
    component: OfferPage,
    meta: { titleKey: 'meta.offer', descKey: 'meta.offerDesc' },
  },
  // 404 страница - должна быть последней
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: { titleKey: 'notFound.title', descKey: 'notFound.description' },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, _from, next) => {
  // Обработка параметра lang из URL
  const langParam = to.query.lang as string;
  if (langParam && ['ru', 'en', 'uz', 'zh', 'ko'].includes(langParam)) {
    console.log('Router: Setting locale from URL parameter:', langParam);
    setLocale(langParam as 'ru' | 'en' | 'uz' | 'zh' | 'ko');
    
    // Принудительно обновляем i18n
    setTimeout(() => {
      console.log('Router: Forcing i18n update, current locale:', i18n.global.locale.value);
      i18n.global.locale.value = langParam as 'ru' | 'en' | 'uz' | 'zh' | 'ko';
    }, 100);
  }
  next();
});

router.afterEach((to) => {
  const { t } = i18n.global;
  const title = to.meta?.titleKey ? t(to.meta.titleKey as string) : 'Unlock';
  const desc = to.meta?.descKey ? t(to.meta.descKey as string) : 'Unlock Chinese school.';
  document.title = title;
  const m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute('content', desc);
});


