<template>
  <div
    class="polly-label"
    :class="classes.container"
    :aria-disabled="disabled"
    :title="label"
  >
    <label
      class="polly-label__label"
      :class="classes.label"
    >
      <template v-if="label || slots.label">
        <slot name="label">
          <div class="polly-label__label-text">
            <div
              class="polly-label__label-text-value"
              :class="classes.value"
            >
              {{ label }}
            </div>

            <template v-if="required">
              <span class="polly-label__required-asterisk">*</span>
            </template>
          </div>
        </slot>
      </template>
      <span class="polly-label__control">
        <slot />
      </span>

      <span
        v-if="message || slots.message"
        class="polly-label__message"
        :class="classes.message"
      >
        <slot name="message">
          {{ message }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import type { Ref } from 'vue'
import { LabelProps, LabelSlots } from '@/types'

const { state = 'normal', labelPosition = 'top', message, required } = defineProps<LabelProps>()

const slots = defineSlots<LabelSlots>()

const aiHighlighted = inject<Ref<boolean>>('aiHighlighted', ref(false))

const classes = computed(() => ({
  container: [`polly-label--${state}`, { 'polly-label--ai-highlighted': aiHighlighted.value }],
  label: {
    'polly-label__label--top': labelPosition === 'top',
    'polly-label__label--left': labelPosition === 'left',
    'polly-label__label--right': labelPosition === 'right',
    'polly-label__label--has-message': !!message || !!slots.message,
  },
  value: {
    'polly-label__label-text-value--required': required,
  },
  message: [`polly-label__message--${state}`],
}))
</script>

<style>
.polly-label {
  --polly-label-cursor: pointer;
  position: relative;
  max-width: 100%;
}

.polly-label__label {
  display: grid;
  grid-template-areas:
    'label'
    'content';
  column-gap: var(--spacing-sm);
  grid-template-rows: repeat(3, min-content);
  align-items: center;
  cursor: inherit;
  width: 100%;
}

.polly-label__label--has-message {
  grid-template-areas:
    'label'
    'content'
    'message';
}

.polly-label__label-text {
  grid-area: label;
  display: flex;
  gap: var(--spacing-xxxs);
  cursor: var(--polly-label-cursor);
  max-width: 100%;
  color: var(--colors-text-icon-dark);
}

.polly-label__label-text-value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.polly-label__required-asterisk {
  color: var(--colors-text-icon-status-mandatory-star);
  vertical-align: super;
}

.polly-label__content {
  grid-area: content;
}

.polly-label__message {
  grid-area: message;
  cursor: var(--polly-label-cursor);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--colors-text-icon-medium);
  padding-top: 2px;
}

.polly-label__message--errored {
  color: var(--colors-text-icon-status-error-decorative);
  font-weight: var(--font-weight-medium);
}

.polly-label__label--left .polly-label__message {
  padding-left: 4px;
}

.polly-label__label--left {
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'label content'
    '. message';
}

.polly-label__label--right {
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'content label'
    '. message';
}

.polly-label__label--top {
  grid-template-areas:
    'label'
    'content'
    'message';
}

.polly-label__label--top .polly-label__label-text {
  padding: 0 var(--spacing-xxs);
}

.polly-label[aria-disabled='true'] {
  --polly-label-cursor: not-allowed;
}

.polly-label--ai-highlighted .polly-label__label-text {
  color: var(--colors-AI-mid);
}
</style>
