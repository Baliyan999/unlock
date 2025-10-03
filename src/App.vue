<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
    <ChatButtons />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ChatButtons from './components/ChatButtons.vue';
import CookieBanner from './components/CookieBanner.vue';
</script>


