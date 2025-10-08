<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
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
/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .fixed {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>
