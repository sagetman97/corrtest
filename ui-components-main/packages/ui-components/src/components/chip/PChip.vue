<template>
  <div
    class="polly-chip"
    :class="classes"
    :aria-disabled="disabled"
  >
    <slot name="icon">
      <p-icon
        v-if="icon"
        :icon="icon"
        v-bind="iconAttrs"
      />
    </slot>

    <slot>
      {{ label }}
    </slot>
    <button
      v-if="dismissible"
      type="button"
      class="polly-chip__dismiss-button"
      :disabled="disabled"
      @click="handleClick"
    >
      <p-icon
        icon="xmark"
        fa-style="light"
        size="xs"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { ChipProps, ChipSlots } from '@/types/chip'
import { IconProps, isIconProp } from '@/types/icon'

import { splitProps } from '@/utilities'

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'primary',
  dismissible: false,
  size: 'sm',
})

defineSlots<ChipSlots>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => [`polly-chip--${props.variant}`])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
  event.preventDefault()
}

const iconAttrs = ref<Partial<IconProps>>({})
watchEffect(() => {
  iconAttrs.value = splitProps(props, isIconProp)
})
</script>

<style>
.polly-chip {
  display: flex;
  align-items: center;
  padding: var(--spacing-xxs) var(--spacing-xs);
  gap: var(--spacing-xs);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-sm);
  box-sizing: border-box;
  transition: all 100ms ease-in-out;
  max-height: 26px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  user-select: none;
}

.polly-chip__dismiss-button {
  cursor: pointer;
  color: inherit;
  padding: 0;
  position: relative;
}

.polly-chip__dismiss-button::before {
  content: ' ';
  inset: 0;
  position: absolute;
  margin: calc(-1 * var(--spacing-xxs)) calc(-1 * var(--spacing-xs));
}

.polly-chip__dismiss-button:focus {
  outline: none;
}

.polly-chip__dismiss-button:disabled {
  pointer-events: none;
}

.polly-chip:has(:focus-visible) {
  outline: 2px solid var(--colors-old-brand-yellow-500);
}

/* Primary variant */
.polly-chip--primary {
  background-color: var(--colors-background-common-primary);
  color: var(--colors-text-icon-light);
  box-shadow: inset 0 0 0 1px var(--colors-background-common-primary);
}

.polly-chip--primary:has(.polly-chip__dismiss-button:active) {
  background-color: var(--colors-background-button-primary-active);
  box-shadow: inset 0 0 0 1px var(--colors-background-button-primary-active);
}

.polly-chip--primary[aria-disabled='true'] {
  cursor: not-allowed;
  background-color: var(--colors-background-button-primary-unavailable);
  color: var(--colors-text-icon-light);
  box-shadow: inset 0 0 0 1px var(--colors-background-button-primary-unavailable);
}

/* White variant */
.polly-chip--white {
  background-color: var(--colors-background-common-white);
  color: var(--colors-text-icon-dark);
  box-shadow: inset 0 0 0 1px var(--colors-border-common-default);
}

.polly-chip--white:has(.polly-chip__dismiss-button:active) {
  box-shadow: inset 0 0 0 1px var(--colors-border-common-active-dark);
}

.polly-chip--white[aria-disabled='true'] {
  cursor: not-allowed;
  background-color: var(--colors-background-common-white);
  color: var(--colors-text-icon-dark-unavailable);
  box-shadow: inset 0 0 0 1px var(--colors-border-common-default);
}

/* Gray variant */
.polly-chip--gray {
  background-color: var(--colors-background-common-default-grey);
  color: var(--colors-text-icon-dark);
  box-shadow: inset 0 0 0 1px var(--colors-border-common-active);
}

.polly-chip--gray:has(.polly-chip__dismiss-button:active) {
  box-shadow: inset 0 0 0 1px var(--colors-border-common-active-dark);
}

.polly-chip--gray[aria-disabled='true'] {
  cursor: not-allowed;
  background-color: var(--colors-background-common-default-grey-unavailable);
  color: var(--colors-text-icon-dark-unavailable);
  box-shadow: inset 0 0 0 1px var(--colors-border-common-active);
}

/* Accent variant */
.polly-chip--accent {
  background-color: var(--colors-background-common-accent);
  color: var(--colors-text-icon-light);
  box-shadow: inset 0 0 0 1px var(--colors-border-common-accent);
}

.polly-chip--accent:has(.polly-chip__dismiss-button:active) {
  background-color: var(--colors-background-common-accent-dark);
  box-shadow: inset 0 0 0 1px var(--colors-background-common-accent-dark);
}

.polly-chip--accent[aria-disabled='true'] {
  cursor: not-allowed;
  background-color: var(--colors-background-common-accent-unavailable);
  color: var(--colors-text-icon-light);
  box-shadow: inset 0 0 0 1px var(--colors-background-common-accent-unavailable);
}
</style>
