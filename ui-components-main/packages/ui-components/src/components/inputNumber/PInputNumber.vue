<template>
  <p-input
    v-bind="props"
    :model-value="displayValue"
    class="polly-input-number"
    type="text"
    inputmode="decimal"
    :placeholder="placeholder"
    @update:model-value="handleInput"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @blur="handleBlur"
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
  </p-input>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { InputNumberEmits, InputNumberProps, InputSlots, keys, LabelSlots } from '@/types'

import { PInput } from '@/components/input'
import { useBoolean } from '@/composables'
import { formatLocaleString, isInteger, isNumber } from '@/utilities/number'
import { hasValue } from '@/utilities/string'

const props = withDefaults(defineProps<InputNumberProps>(), {
  labelPosition: 'top',
})

const placeholder = computed(() => props.placeholder ?? '0')

const emit = defineEmits<InputNumberEmits>()

const slots = defineSlots<LabelSlots & InputSlots>()

const { state: hasFocus, setFalse: handleBlur, setTrue: handleFocus } = useBoolean()

const modelValue = computed({
  get() {
    return props.modelValue ?? null
  },
  set(value) {
    if (!hasValue(value)) {
      return emit('update:modelValue', null)
    }

    emit('update:modelValue', value)
  },
})

const displayValue = computed(() => (hasFocus.value ? modelValue.value : formattedValue.value))

const formattedValue = computed(() => {
  if (parsedValue.value === null) {
    return modelValue.value
  }

  if (typeof props.format === 'function') {
    return props.format(parsedValue.value)
  }

  return formatLocaleString(parsedValue.value, props.format)
})

const parsedValue = computed({
  get() {
    if (typeof modelValue.value !== 'string') {
      return null
    }

    const valueWithoutGrouping = modelValue.value.replace(/,/g, '')
    if (!isNumber(valueWithoutGrouping)) {
      return null
    }

    return parseFloat(modelValue.value)
  },
  set(value) {
    if (typeof value !== 'number') {
      return null
    }

    modelValue.value = value.toString()
  },
})

function incrementModelValue(): void {
  if (parsedValue.value === null || !isInteger(modelValue.value)) {
    return
  }

  parsedValue.value++
}

function decrementModelValue(): void {
  if (parsedValue.value === null || !isInteger(modelValue.value)) {
    return
  }

  parsedValue.value--
}

function handleInput(value: string | null | undefined): void {
  modelValue.value = value ?? null
}

function handleKeyDown(event: KeyboardEvent): void {
  switch (event.key) {
    case keys.upArrow:
      incrementModelValue()
      break
    case keys.downArrow:
      decrementModelValue()
      break
  }
}
</script>
