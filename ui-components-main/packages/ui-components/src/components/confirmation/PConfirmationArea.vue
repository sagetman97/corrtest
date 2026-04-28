<template>
  <div
    aria-live="assertive"
    class="polly-confirmation-area"
  >
    <template
      v-for="confirmation in confirmations.values()"
      :key="confirmation.id"
    >
      <p-modal
        :is-open="confirmation.isOpen"
        :title="confirmation.title"
        :size="confirmation.modalSize"
        @update:is-open="outsideClick(confirmation)"
      >
        <div class="polly-confirmation-area__content">
          {{ confirmation.message }}
        </div>
        <template #close>
          <p-button
            v-if="confirmation.showClose"
            icon="xmark"
            outline
            round
            @click="confirmation.resolve(false)"
          />
        </template>
        <template
          v-if="confirmation"
          #footer
        >
          <p-button
            :variant="confirmation.cancelVariant ?? 'primary'"
            outline
            @click="confirmation.resolve(false)"
          >
            {{ confirmation.cancelText ?? 'Cancel' }}
          </p-button>
          <p-button
            :variant="confirmation.confirmVariant"
            @click="confirmation.resolve(true)"
          >
            {{ confirmation.confirmText ?? 'Confirm' }}
          </p-button>
        </template>
      </p-modal>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Confirmation } from '@/types'

import { confirmations, useConfirmation } from '@/composables'

const { close } = useConfirmation()

function outsideClick(confirmation: Confirmation): void {
  close(confirmation.id)
  confirmation.resolve(false)
}
</script>

<style>
.polly-confirmation-area .polly-modal-content__footer {
  justify-content: center;
}
.polly-confirmation-area__content {
  white-space: break-spaces;
}
</style>
