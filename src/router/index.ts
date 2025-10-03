import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { i18n } from '@/i18n';
import HomePage from '../views/HomePage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { titleKey: 'meta.title', descKey: 'meta.description' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPage,
    meta: { titleKey: 'meta.privacy', descKey: 'meta.privacyDesc' },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.afterEach((to) => {
  const { t } = i18n.global;
  const title = to.meta?.titleKey ? t(to.meta.titleKey as string) : 'Unlock';
  const desc = to.meta?.descKey ? t(to.meta.descKey as string) : 'Unlock Chinese school.';
  document.title = title;
  const m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute('content', desc);
});


