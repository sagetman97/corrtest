<template>
  <div
    class="polly-toast"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div class="polly-toast__icon">
      <slot name="icon">
        <p-icon
          v-if="iconAttrs.icon"
          :icon="iconAttrs.icon"
          v-bind="iconAttrs"
        />
      </slot>
    </div>

    <div class="polly-toast__body">
      <slot>
        <p class="polly-toast__title">{{ title }}</p>
        <p class="polly-toast__message">{{ message }}</p>
      </slot>
    </div>
    <slot
      name="close"
      :close="close"
    >
      <p-button
        v-if="dismissible"
        class="polly-toast__dismiss-button"
        icon="close"
        variant="primary"
        outline
        round
        @click="close"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { IconProps, isIconProp, ToastProps, ToastSlots } from '@/types'

import { useToast } from '@/composables'
import { splitProps } from '@/utilities'

const { dismiss, stopTimer, startTimer } = useToast()

const props = withDefaults(defineProps<ToastProps>(), {
  size: '2x',
  dismissible: true,
})

defineSlots<ToastSlots>()

const iconAttrs = ref<Partial<IconProps>>({})

watchEffect(() => {
  iconAttrs.value = splitProps(props, isIconProp)
})

function onMouseenter() {
  stopTimer(props.id)
}

function onMouseleave() {
  startTimer(props.id)
}

function close(): void {
  return dismiss(props.id)
}
</script>

<style>
.polly-toast {
  min-width: 324px;
  max-width: 550px;
  background-color: var(--colors-background-common-white);
  display: flex;
  gap: var(--spacing-base);
  padding: var(--spacing-base) var(--spacing-base);
  align-items: center;
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-base);
  margin: var(--spacing-xs) 0;
}

.polly-toast__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.polly-toast__body {
  flex-grow: 1;
}

.polly-toast__icon {
  flex-shrink: 0;
}
</style>
