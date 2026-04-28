<template>
  <div class="polly-meridian-picker">
    <template
      v-for="meridian in meridians"
      :key="meridian"
    >
      <button
        type="button"
        class="polly-meridian-picker__meridian"
        :class="classes(meridian)"
        @click="applyMeridian(meridian)"
      >
        {{ meridian }}
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { addHours, format, startOfDay, toDate } from 'date-fns'

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

const meridians = ['AM', 'PM']

const classes = computed(() => (meridian: string) => ({
  'polly-meridian-picker__meridian--selected': isSameMeridian(meridian, dateValue.value),
}))

function isSameMeridian(aDate: Date | string, bDate: Date | string): boolean {
  if (typeof aDate !== 'string') {
    return isSameMeridian(format(aDate, 'aa'), bDate)
  }

  if (typeof bDate !== 'string') {
    return isSameMeridian(aDate, format(bDate, 'aa'))
  }

  return aDate === bDate
}

function applyMeridian(meridian: string): void {
  const hours = dateValue.value.getHours()

  if (hours <= 12 && meridian === 'AM') {
    return
  }

  if (hours > 12 && meridian === 'PM') {
    return
  }

  const diff = meridian === 'AM' ? -12 : 12

  dateValue.value = addHours(dateValue.value, diff)
}
</script>

<style>
.polly-meridian-picker__meridian {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  width: 100%;
  cursor: pointer;
  color: var(--colors-text-icon-dark);
}

.polly-meridian-picker__meridian:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-meridian-picker__meridian--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-meridian-picker__meridian:hover {
    background-color: var(--colors-background-common-accent-light);
  }
}
</style>
