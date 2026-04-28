<template>
  <div class="polly-hour-picker">
    <template
      v-for="hour in hours"
      :key="hour"
    >
      <button
        type="button"
        class="polly-hour-picker__hour"
        :data-hour="hour"
        :class="classes(hour)"
        @click="applyHours(hour)"
      >
        {{ hour }}
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { getHours, setHours, startOfDay, toDate } from 'date-fns'

import { DateFormats } from '@/types/calendar'

const modelValue = defineModel<DateFormats | null>()

const dateValue = computed<Date>({
  get() {
    if (modelValue.value === undefined || modelValue.value === null) {
      return setHours(startOfDay(new UTCDate()), 1)
    }

    return toDate(modelValue.value)
  },
  set(value) {
    modelValue.value = value
  },
})

const hours = new Array(12).fill(null).map((_, index) => index + 1)

const classes = computed(() => (hour: number) => ({
  'polly-hour-picker__hour--selected': getHours(dateValue.value) % 12 === hour % 12,
}))

function applyHours(hours: number): void {
  const isPM = getHours(dateValue.value) > 12

  dateValue.value = setHours(dateValue.value, isPM ? hours + 12 : hours)
}
</script>

<style>
.polly-hour-picker__hour {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  width: 100%;
  cursor: pointer;
  color: var(--colors-text-icon-dark);
}

.polly-hour-picker__hour:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-hour-picker__hour--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-hour-picker__hour:hover {
    background-color: var(--colors-background-common-accent-light);
  }
}
</style>
