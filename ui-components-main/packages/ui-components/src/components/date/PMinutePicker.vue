<template>
  <div class="polly-minute-picker">
    <template
      v-for="minute in minutes"
      :key="minute"
    >
      <button
        type="button"
        class="polly-minute-picker__minute"
        :data-minute="minute"
        :class="classes(minute)"
        @click="dateValue = setMinutes(dateValue, minute)"
      >
        {{ String(minute).padStart(2, '0') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { getMinutes, setMinutes, startOfDay, toDate } from 'date-fns'

import { DateFormats } from '@/types/calendar'

const modelValue = defineModel<DateFormats | null>()

const dateValue = computed<Date>({
  get() {
    if (modelValue.value === undefined || modelValue.value === null) {
      return startOfDay(new UTCDate())
    }

    return toDate(modelValue.value)
  },
  set(value) {
    modelValue.value = value
  },
})

const minutes = new Array(60).fill(null).map((_, index) => index)

const classes = computed(() => (minute: number) => ({
  'polly-minute-picker__minute--selected': getMinutes(dateValue.value) === minute,
}))
</script>

<style>
.polly-minute-picker__minute {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  width: 100%;
  cursor: pointer;
  color: var(--colors-text-icon-dark);
}

.polly-minute-picker__minute:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-minute-picker__minute--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-minute-picker__minute:hover {
    background-color: var(--colors-background-common-accent-light);
  }
}
</style>
