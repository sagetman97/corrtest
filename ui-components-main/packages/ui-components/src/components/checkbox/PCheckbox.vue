<template>
  <p-label
    class="polly-checkbox"
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
      :aria-disabled="disabled"
      :aria-required="required"
      :aria-invalid="isInvalid"
      type="checkbox"
      class="polly-checkbox__input-hidden"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :tabindex="tabindex"
      @input="handleInput"
    />
    <div class="polly-checkbox__checkmark">
      <p-icon
        class="polly-checkbox__check-icon"
        :icon="checkedIcon"
        size="md"
        fa-style="solid"
      />
    </div>
  </p-label>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRef } from 'vue'

import type { Ref } from 'vue'
import { CheckboxProps, LabelSlots } from '@/types'

import { PIcon } from '@/components/icon'
import { PLabel } from '@/components/label'
import { useValidationState } from '@/composables/useValidationState'

const { labelPosition = 'right', tabindex = 0, modelValue: modelValueProp, state, indeterminate, label, disabled } = defineProps<CheckboxProps>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean | null]
}>()
const slots = defineSlots<LabelSlots>()

const aiHighlighted = inject<Ref<boolean>>('aiHighlighted', ref(false))
const clearAiHighlight = inject<() => void>('clearAiHighlight', () => {})

function handleInput() {
  if (aiHighlighted.value) {
    clearAiHighlight()
  }
}

const modelValue = computed({
  get() {
    return modelValueProp ?? null
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const stateRef = toRef(() => state)
const { isInvalid } = useValidationState(stateRef, modelValue)

const checked = computed(() => !!modelValue.value)

const checkedIcon = computed(() => {
  if (indeterminate) {
    return 'minus'
  }

  return 'check'
})

const classes = computed(() => ({
  label: {
    'polly-checkbox--without-label': !label,
    'polly-checkbox--disabled': disabled,
    'polly-checkbox--checked': checked.value,
    'polly-checkbox--unchecked': !checked.value,
    'polly-checkbox--indeterminate': indeterminate,
    'polly-checkbox--errored': isInvalid.value,
    'polly-checkbox--ai-highlighted': aiHighlighted.value,
  },
}))
</script>

<style>
.polly-checkbox {
  --polly-checkbox-border-color: var(--colors-border-common-active-dark);
  --polly-checkbox-foreground-color: transparent;
  --polly-checkbox-background-color: var(--colors-background-common-white);
  --polly-checkbox-cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .polly-checkbox:hover {
    --polly-checkbox-foreground-color: var(--colors-text-icon-primary-medium);
  }
}

.polly-checkbox--checked,
.polly-checkbox--indeterminate {
  --polly-checkbox-foreground-color: var(--colors-text-icon-light);
  --polly-checkbox-background-color: var(--colors-background-common-primary);
}

.polly-checkbox--checked.polly-checkbox--errored {
  --polly-checkbox-background-color: var(--colors-text-icon-status-error-decorative);
}

@media (hover: hover) and (pointer: fine) {
  .polly-checkbox--checked:hover,
  .polly-checkbox--indeterminate:hover {
    --polly-checkbox-foreground-color: var(--colors-text-icon-light);
    --polly-checkbox-background-color: var(--colors-background-common-primary-medium);
  }
}

.polly-checkbox--checked.polly-checkbox--disabled,
.polly-checkbox--indeterminate.polly-checkbox--disabled {
  --polly-checkbox-background-color: var(--colors-background-button-primary-unavailable);
}

.polly-checkbox--errored {
  --polly-checkbox-border-color: var(--colors-text-icon-status-error-decorative);
}

@media (hover: hover) and (pointer: fine) {
  .polly-checkbox--errored:hover {
    --polly-checkbox-foreground-color: var(--colors-text-icon-light);
    --polly-checkbox-background-color: var(--colors-text-icon-status-error-decorative);
  }
}

.polly-checkbox--errored.polly-checkbox--disabled {
  --polly-checkbox-background-color: var(--colors-text-icon-status-error-unavailable);
}

.polly-checkbox--disabled {
  --polly-checkbox-border-color: var(--colors-border-common-default);
  --polly-checkbox-background-color: var(--colors-background-common-default-grey-unavailable);
  --polly-checkbox-cursor: not-allowed;
}

@media (hover: hover) and (pointer: fine) {
  .polly-checkbox--disabled:hover {
    --polly-checkbox-foreground-color: transparent;
  }
}

.polly-checkbox__checkmark {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: var(--polly-checkbox-cursor);
  border-radius: var(--border-radius-xxs);
  background-color: var(--polly-checkbox-background-color);
  border: 1px solid var(--polly-checkbox-border-color);
  height: 1.25rem;
  width: 1.25rem;
  color: var(--polly-checkbox-foreground-color);
}

.polly-checkbox__input-hidden {
  position: absolute;
  opacity: 0;
  cursor: var(--polly-checkbox-cursor);
  height: 0;
  width: 0;
}

.polly-checkbox .polly-label__label--left {
  grid-template-areas:
    'label content'
    'message message';
}

.polly-checkbox .polly-label__label--left .polly-label__message {
  padding-left: 0px;
}

.polly-checkbox__input-hidden:focus-visible ~ .polly-checkbox__checkmark {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-checkbox--without-label .polly-label__label {
  min-width: 0;
}

.polly-checkbox .polly-label__label--top .polly-label__label-text {
  padding: 0;
}
</style>
