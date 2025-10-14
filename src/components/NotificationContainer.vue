<template>
  <div class="notification-container">
    <TransitionGroup
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform translate-x-full scale-95"
      enter-to-class="opacity-100 transform translate-x-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-x-0 scale-100"
      leave-to-class="opacity-0 transform translate-x-full scale-95"
      move-class="transition-all duration-300 ease-out"
    >
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :duration="notification.duration"
        :auto-close="notification.autoClose"
        @close="removeNotification(notification.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../composables/useNotifications';
import Notification from './Notification.vue';

const { notifications, removeNotification } = useNotifications();
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 2rem; /* спустили вниз с 0.5rem до 2rem */
  left: 50%; /* центрирование по горизонтали */
  transform: translateX(-50%); /* точное центрирование */
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 66.67%; /* 2/3 от ширины экрана */
  width: 100%;
  pointer-events: none; /* Позволяет кликать через контейнер */
}

.notification-container > * {
  pointer-events: auto; /* Восстанавливаем клики для уведомлений */
}

/* Адаптивность для планшетов */
@media (max-width: 768px) {
  .notification-container {
    top: 1.5rem; /* спустили вниз */
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 75%; /* 3/4 от ширины экрана на планшетах */
    gap: 0.125rem;
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .notification-container {
    top: 1rem; /* спустили вниз */
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 85%; /* 17/20 от ширины экрана на мобильных */
    gap: 0.125rem;
  }
}

/* Адаптивность для очень маленьких экранов */
@media (max-width: 375px) {
  .notification-container {
    top: 0.75rem; /* спустили вниз */
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 90%; /* 9/10 от ширины экрана на очень маленьких экранах */
    gap: 0.0625rem;
  }
}

/* Портретная ориентация на мобильных */
@media (max-width: 480px) and (orientation: portrait) {
  .notification-container {
    top: 0.75rem; /* спустили вниз */
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 80%; /* 4/5 от ширины экрана в портретной ориентации */
    gap: 0.125rem;
  }
}

/* Ландшафтная ориентация на мобильных */
@media (max-height: 500px) and (orientation: landscape) {
  .notification-container {
    top: 0.5rem; /* спустили вниз */
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 50%; /* 1/2 от ширины экрана в ландшафтной ориентации */
    gap: 0.0625rem;
  }
}
</style>
