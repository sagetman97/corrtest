<template>
  <p-label
    class="polly-toggle"
    v-bind="{ required, label, labelPosition, message, state }"
  >
    <div
      class="polly-toggle__input-container"
      :class="classes.container"
    >
      <input
        v-model="modelValue"
        :disabled="disabled"
        :aria-disabled="disabled"
        :aria-required="required"
        :aria-invalid="isInvalid"
        class="polly-toggle__hidden-input"
        type="checkbox"
      />
      <div
        class="polly-toggle__slider"
        :class="classes.slider"
      >
        <slot
          name="icon"
          :selected="checked"
        >
          <p-icon
            class="polly-toggle__icon"
            :icon="icon"
            fa-style="solid"
            size="sm"
          />
        </slot>
      </div>
    </div>

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
  </p-label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CheckboxProps, ToggleSlots } from '@/types'

import { PLabel } from '@/components/label'
import { useValidationState } from '@/composables/useValidationState'

const { labelPosition = 'right', state, disabled } = defineProps<CheckboxProps>()
const slots = defineSlots<ToggleSlots>()
const modelValue = defineModel<boolean>()

const { isInvalid } = useValidationState(() => state, modelValue)

const checked = computed(() => !!modelValue.value)
const classes = computed(() => ({
  container: {
    'polly-toggle__input-container--disabled': disabled,
    'polly-toggle__input-container--checked': checked.value,
    'polly-toggle__input-container--errored': isInvalid.value,
  },
  slider: {
    'polly-toggle__slider--checked': checked.value,
    'polly-toggle__slider--errored': isInvalid.value,
  },
}))

const icon = computed(() => {
  if (checked.value) {
    return 'check'
  }

  return undefined
})
</script>

<style>
.polly-toggle__input-container {
  --polly-toggle-width: 48px;
  --polly-toggle-slider-size: 18px;
  --polly-toggle-slider-margin: 3px;
  --polly-toggle-background-color: var(--colors-background-common-dark);

  border-radius: var(--spacing-xl);
  transition: background-color 0.25s;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: var(--spacing-lg);
  width: var(--polly-toggle-width);
  background-color: var(--polly-toggle-background-color);
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .polly-toggle__input-container:hover {
    --polly-toggle-background-color: var(--colors-background-uncommon-online-dark);
  }
}

.polly-toggle__input-container--checked {
  --polly-toggle-background-color: var(--colors-background-uncommon-online);
}

.polly-toggle__input-container:has(.polly-toggle__hidden-input:focus-visible) {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-toggle__input-container--disabled {
  --polly-toggle-background-color: var(--colors-background-common-dark-unavailable);
  cursor: not-allowed;
}

.polly-toggle__input-container--disabled.polly-toggle__input-container--checked {
  --polly-toggle-background-color: var(--colors-background-uncommon-online-unavailable);
}

.polly-toggle__input-container--disabled.polly-toggle__input-container--errored {
  --polly-toggle-background-color: var(--colors-text-icon-status-error-unavailable);
}

.polly-toggle__input-container--errored {
  --polly-toggle-background-color: var(--colors-text-icon-status-error-decorative);
}

.polly-toggle__input-container--errored:hover {
  --polly-toggle-background-color: var(--colors-text-icon-status-error-AA);
}

.polly-toggle__slider {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--polly-toggle-slider-size);
  width: var(--polly-toggle-slider-size);
  border-radius: var(--border-radius-round);
  background-color: var(--colors-text-icon-light);
  margin: var(--polly-toggle-slider-margin);
  color: var(--colors-background-uncommon-online-dark);
  transition: transform 0.25s;
}

.polly-toggle__slider--checked {
  transform: translateX(calc(var(--polly-toggle-width) - var(--polly-toggle-slider-size) - var(--polly-toggle-slider-margin) * 2));
}

.polly-toggle__slider--errored {
  color: var(--colors-text-icon-status-error-AA);
}

.polly-toggle__hidden-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
</style>
