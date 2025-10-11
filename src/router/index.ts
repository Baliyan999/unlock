import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { i18n, setLocale } from '@/i18n';
import HomePage from '../views/HomePage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import OfferPage from '../views/OfferPage.vue';
import BlogPage from '../views/BlogPage.vue';
import BlogPostPage from '../views/BlogPostPage.vue';
import TestPage from '../views/TestPage.vue';
import CalculatorPage from '../views/CalculatorPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import AdminPage from '../views/AdminPage.vue';
import ForbiddenPage from '../views/ForbiddenPage.vue';
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
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { titleKey: 'auth.login', descKey: 'auth.loginDesc' },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { titleKey: 'auth.register', descKey: 'auth.registerDesc' },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { 
      titleKey: 'admin.title', 
      descKey: 'admin.desc', 
      requiresAuth: true, 
      requiresAdmin: true
    },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: ForbiddenPage,
    meta: { titleKey: 'forbidden.title', descKey: 'forbidden.desc' },
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

router.beforeEach(async (to, _from, next) => {
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

  // СТРОГАЯ проверка авторизации для защищенных маршрутов
  if (to.meta.requiresAuth || to.meta.requiresAdmin) {
    console.log('🔒 Проверка доступа к защищенному маршруту:', to.path);
    
    // Проверяем токен в localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.log('❌ Нет токена - редирект на вход');
      if (to.path !== '/login') {
        next('/login');
        return;
      }
    }
    
    // Для админки - проверка через /auth/me
    if (to.meta.requiresAdmin) {
      console.log('🔒 Проверка доступа к админке через /auth/me');
      
      try {
        const { useAuthStore } = await import('@/stores/auth');
        const authStore = useAuthStore();
        
        // Проверяем токен и получаем данные пользователя
        await authStore.fetchUser();
        
        // Проверяем, что пользователь админ
        if (!authStore.isAdmin) {
          console.log('❌ Пользователь не является администратором');
          next('/403');
          return;
        }
        
        console.log('✅ Доступ к админке разрешен');
      } catch (error: any) {
        console.log('❌ Ошибка проверки доступа к админке:', error.message);
        next('/login');
        return;
      }
    }
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


