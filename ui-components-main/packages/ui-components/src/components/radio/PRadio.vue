<template>
  <p-label
    class="polly-radio"
    :class="classes.label"
    v-bind="{ required, label, labelPosition, message, state, disabled }"
  >
    <template
      v-if="slots.label"
      #label
    >
      <slot name="label" />
    </template>
    <template
      v-if="slots.message"
      #message
    >
      <slot name="message" />
    </template>
    <input
      v-model="modelValue"
      :checked="isChecked"
      class="polly-radio__input-hidden"
      :aria-disabled="disabled"
      :aria-required="required"
      :aria-invalid="isInvalid"
      type="radio"
      :disabled="disabled"
      :name="name"
      :value="radioValue"
      :tabindex="tabindex"
    />
    <div
      class="polly-radio__radio"
      :class="classes.radio"
    />
  </p-label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { LabelSlots, RadioProps } from '@/types'

import { useValidationState } from '@/composables'

const { labelPosition = 'right', name = 'radio', tabindex = 0, value, label, checked, disabled, state } = defineProps<RadioProps>()

const modelValue = defineModel<string | null | undefined>()

const slots = defineSlots<LabelSlots>()

const radioValue = computed(() => value ?? label)

const { isInvalid } = useValidationState(() => state, modelValue)

const isChecked = computed(() => checked || modelValue.value === radioValue.value)

const classes = computed(() => ({
  label: {
    'polly-radio--disabled': disabled,
    'polly-radio--errored': isInvalid.value,
  },
  radio: {
    'polly-radio__radio--checked': isChecked.value,
  },
}))
</script>

<style>
.polly-radio {
  position: relative;
}

.polly-radio__input-hidden {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.polly-radio__radio {
  --polly-radio-border-color: var(--colors-background-common-primary);
  --polly-radio-background-color: var(--colors-background-common-white);
  --polly-radio-cursor: pointer;
  --polly-radio-size: var(--spacing-md);

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid var(--polly-radio-border-color);
  height: var(--polly-radio-size);
  width: var(--polly-radio-size);
  cursor: var(--polly-radio-cursor);
  box-sizing: border-box;
  background-color: var(--polly-radio-background-color);
  transition:
    background-color 0.1s ease-in-out,
    border 0.1s ease-in-out;
}

.polly-radio__radio--checked {
  border-width: 5px;
}

.polly-radio__radio::before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100%;
  box-sizing: border-box;
  height: 6px;
  width: 6px;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
}

.polly-radio .polly-label__label--top .polly-label__label-text {
  padding-left: 0;
}

.polly-radio .polly-label__label--left {
  grid-template-areas:
    'label content'
    'message message';
}

.polly-radio .polly-label__label--left .polly-label__message {
  padding-left: 0px;
}

.polly-radio:not(.polly-radio--disabled):hover .polly-radio__radio:not(.polly-radio__radio--checked)::before {
  background-color: var(--colors-background-common-primary-medium);
}

.polly-radio:not(.polly-radio--disabled):hover .polly-radio__radio {
  --polly-radio-border-color: var(--colors-background-common-primary-medium);
}

.polly-radio--errored:hover .polly-radio__radio {
  --polly-radio-border-color: var(--colors-text-icon-status-error-AA);
}
.polly-radio--errored .polly-radio__radio {
  --polly-radio-border-color: var(--colors-text-icon-status-error-decorative);
}

.polly-radio--errored.polly-radio--disabled .polly-radio__radio {
  --polly-radio-border-color: var(--colors-text-icon-status-error-unavailable);
}

.polly-radio--disabled .polly-radio__radio {
  --polly-radio-border-color: var(--colors-border-common-default);
  --polly-radio-background-color: var(--colors-background-common-default-grey-unavailable);
  --polly-radio-cursor: not-allowed;
}

.polly-radio--disabled .polly-radio__radio--checked {
  --polly-radio-border-color: var(--colors-background-common-primary-unavailable);
  --polly-radio-background-color: var(--colors-background-common-white);
}

.polly-radio__input-hidden:focus-visible ~ .polly-radio__radio {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}
</style>
