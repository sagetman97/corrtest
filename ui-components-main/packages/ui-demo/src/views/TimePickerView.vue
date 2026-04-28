<template>
  <component-demo-layout name="Time Picker">
    <section-header
      title="Basic Usage"
      description="A time picker component that supports both Date objects and tuple format."
    />
    <component-example :code="basicTimePickerExample">
      <p-form>
        <p-toggle
          v-model="useTuple"
          label="Use Tuple"
        />
      </p-form>
      <p-time-picker v-model="modelValue" />
      <p-label :message="JSON.stringify(modelValue)" />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { TupleFormat } from '@/types/calendar'

import { convertDateToTuple, convertTupleToDate } from '@/utilities'

const useTuple = computed({
  get() {
    return Array.isArray(modelValue.value)
  },
  set(useTuple) {
    if (useTuple) {
      modelValue.value = modelValue.value && !Array.isArray(modelValue.value) ? convertDateToTuple(modelValue.value) : undefined
    } else {
      modelValue.value = modelValue.value && Array.isArray(modelValue.value) ? convertTupleToDate(modelValue.value) : undefined
    }
  },
})

const modelValue = ref<Date | TupleFormat | null | undefined>()

const basicTimePickerExample = {
  code: `<p-time-picker v-model="modelValue" />`,
  language: 'vue-html',
}
</script>
