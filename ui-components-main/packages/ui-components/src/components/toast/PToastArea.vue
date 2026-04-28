<template>
  <div
    aria-live="assertive"
    class="polly-toast-area"
  >
    <transition-group name="toast">
      <span
        v-for="toast in toasts"
        :key="toast.id"
      >
        <template v-if="isCustomToast(toast)">
          <component
            :is="toast.message"
            :id="toast.id"
          />
        </template>

        <template v-else>
          <p-toast v-bind="toast" />
        </template>
      </span>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { isCustomToast } from '@/types'

import { PToast } from '@/components/toast'
import { useToast } from '@/composables'

const { toasts } = useToast()
</script>

<style>
.polly-toast-area {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  margin: var(--spacing-base);
  flex-direction: column;
  align-items: flex-end;
  z-index: var(--layout-tooltip);
}

.toast-enter-active {
  animation: slide-in 600ms ease-in-out;
}

.toast-leave-active {
  animation: slide-out 600ms ease-out;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    max-height: 0;
  }
  50% {
    max-height: 500px;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-out {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    max-height: 500px;
  }
  100% {
    opacity: 0;
    max-height: 0;
    z-index: -1;
  }
}
</style>
