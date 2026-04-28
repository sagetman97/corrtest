<template>
  <p-label
    class="polly-input"
    :class="classes"
    :style="styles"
    v-bind="{
      label,
      labelPosition,
      disabled,
      required,
      message,
      state,
    }"
  >
    <component
      :is="getInputBaseComponent"
      :aria-required="required"
      :invalid="isInvalid"
      v-bind="{ ...attrs, disabled, prefix, suffix, highlighted }"
      :title="modelValue"
    >
      <template
        v-if="slots.prefix"
        #prefix
      >
        <slot name="prefix" />
      </template>
      <template
        v-if="slots.suffix"
        #suffix
      >
        <slot name="suffix" />
      </template>

      <template #default="{ classes: baseClasses, attrs: baseAttrs }">
        <input
          v-model="modelValue"
          class="polly-input__control"
          :class="baseClasses"
          :disabled="disabled"
          :aria-disabled="disabled"
          :placeholder="placeholder"
          v-bind="baseAttrs"
          @input="handleInput"
          @focus="selectAllText"
        />
      </template>
    </component>

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
import { computed, inject, nextTick, ref } from 'vue'

import type { Ref } from 'vue'
import { InputProps, InputSlots, LabelSlots } from '@/types'

import { PInputBase, PSimpleInputBase } from '@/components/inputBase'
import { PLabel } from '@/components/label'
import { useClassesStylesAndAttrs, useValidationState } from '@/composables'
import { asArray } from '@/utilities'

const { labelPosition = 'top', placeholder: placeholderProp, label, variant, state } = defineProps<InputProps>()

const placeholder = computed(() => placeholderProp ?? label)

const modelValue = defineModel<string | null | undefined>()

const slots = defineSlots<LabelSlots & InputSlots>()

const aiHighlighted = inject<Ref<boolean>>('aiHighlighted', ref(false))
const clearAiHighlight = inject<() => void>('clearAiHighlight', () => {})

function handleInput() {
  if (aiHighlighted.value) {
    clearAiHighlight()
  }
}

function selectAllText(event: FocusEvent) {
  if (event.target instanceof HTMLInputElement) {
    const target = event.target

    nextTick(() => {
      target.select()
    })
  }
}

defineOptions({ inheritAttrs: false })

const { isInvalid } = useValidationState(() => state, modelValue)
const { attrs, classes: inheritedClasses, styles } = useClassesStylesAndAttrs()

const classes = computed(() => [
  {
    'polly-input--simple-label': variant === 'simple',
  },
  ...asArray(inheritedClasses.value),
])

const getInputBaseComponent = computed(() => {
  switch (variant) {
    case 'simple':
      return PSimpleInputBase
    default:
      return PInputBase
  }
})
</script>

<style>
.polly-input__control:not([aria-disabled='true']) {
  cursor: text;
}

.polly-input__control[aria-disabled='true'] {
  cursor: not-allowed;
}

.polly-input--simple-label.polly-label--errored .polly-label__label-text {
  color: var(--colors-text-icon-status-error-AA);
}

.polly-input--simple-label .polly-label__label-text {
  padding: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.polly-input--simple-label .polly-label__message {
  padding-inline: 0;
}

.polly-input--simple-label .polly-simple-input-base__control {
  padding: 0;
}
</style>
