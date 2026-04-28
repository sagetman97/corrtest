<template>
  <PInputNumber
    v-bind="props"
    v-model="modelValue"
    prefix="$"
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
  </PInputNumber>
</template>

<script setup lang="ts">
import { InputNumberProps, InputSlots, LabelSlots } from '@/types'

import { PInputNumber } from '@/components/inputNumber'

const props = withDefaults(defineProps<InputNumberProps>(), {
  labelPosition: 'top',
})

const modelValue = defineModel<string | null | undefined>()

const slots = defineSlots<LabelSlots & InputSlots>()
</script>
