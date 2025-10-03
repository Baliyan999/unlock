<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieBanner from './components/CookieBanner.vue';
</script>


