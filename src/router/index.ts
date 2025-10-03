import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { i18n } from '@/i18n';
import HomePage from '../views/HomePage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import BlogPage from '../views/BlogPage.vue';
import BlogPostPage from '../views/BlogPostPage.vue';
import TestPage from '../views/TestPage.vue';

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


