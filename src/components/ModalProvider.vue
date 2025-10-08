<template>
  <ConfirmationDialog
    :visible="modalState.visible"
    :title="modalState.options.title"
    :message="modalState.options.message"
    :type="modalState.options.type"
    :confirm-text="modalState.options.confirmText"
    :cancel-text="modalState.options.cancelText"
    :show-cancel="modalState.options.showCancel"
    :closable="modalState.options.closable"
    :close-on-backdrop="modalState.options.closeOnBackdrop"
    @close="hideModal"
    @confirm="confirmModal"
    @cancel="hideModal"
    @update:visible="(value) => !value && hideModal()"
  />
</template>

<script setup lang="ts">
import { useModal } from '../composables/useModal';
import ConfirmationDialog from './ConfirmationDialog.vue';

const { modalState, hideModal, confirmModal } = useModal();
</script>
