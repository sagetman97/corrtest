<template>
  <div class="polly-pickers-grid">
    <template
      v-for="picker in pickers"
      :key="picker.name"
    >
      <component
        :is="picker"
        v-model="modelValue"
        class="polly-pickers-grid__column"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { DateFormats } from '@/types/calendar'

import { PHourPicker, PMeridianPicker, PMinutePicker, PMonthPicker, PYearPicker } from '@/components/date'

const modelValue = defineModel<DateFormats | null>()

const props = defineProps<{
  pickers: ('PHourPicker' | 'PMinutePicker' | 'PMeridianPicker' | 'PMonthPicker' | 'PYearPicker')[]
}>()

const pickers = computed(() => {
  return props.pickers.map((picker) => {
    switch (picker) {
      case 'PHourPicker':
        return PHourPicker
      case 'PMinutePicker':
        return PMinutePicker
      case 'PMeridianPicker':
        return PMeridianPicker
      case 'PMonthPicker':
        return PMonthPicker
      case 'PYearPicker':
        return PYearPicker
    }
  })
})
</script>

<style>
.polly-pickers-grid {
  --polly-pickers-columns: v-bind(pickers.length);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--polly-pickers-columns), minmax(0, 1fr));
  border-bottom: 1px solid var(--colors-border-common-default);
}

.polly-pickers-grid__column {
  max-height: 300px;
  overflow-y: auto;
  padding: var(--spacing-xxs);
}
</style>
