<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />
    <main class="flex-1">
      <router-view v-if="$router" />
      <div v-else>UNLOCK</div>
    </main>
    <Footer />
    <CookieBanner />
    <NotificationContainer />
    <ModalProvider />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue';
import NotificationContainer from './components/NotificationContainer.vue';
import ModalProvider from './components/ModalProvider.vue';
import { tg } from './telegram'
const w = tg()
if (w) {
  w.MainButton.setText('Оставить заявку')
  w.MainButton.onClick(() => {
    window.dispatchEvent(new CustomEvent('open-lead-form'))
  })
  w.MainButton.show()
}
</script>

<style>
/* чтобы нижняя кнопка Mini App не перекрывала контент */
html, body, #app { height: 100%; }
#app { padding-bottom: 72px; box-sizing: border-box; }
</style>
