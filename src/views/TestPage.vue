<template>
  <div>
    <!-- Роутер для тестовой системы -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
// Эта страница теперь служит контейнером для роутинга тестовой системы
// Основная логика перенесена в отдельные компоненты:
// - TestLevels.vue - выбор уровня
// - TestQuestion.vue - прохождение теста
// - TestResults.vue - результаты
</script>