<template>
  <div
    ref="containerElement"
    class="polly-month-picker"
  >
    <template
      v-for="item in viewingMonths"
      :key="getItemKey(item)"
    >
      <button
        ref="itemElements"
        type="button"
        class="polly-month-picker__month"
        :data-month="format(item, 'MMMM')"
        :class="classes(item)"
        @click="dateValue = setMonth(dateValue, getMonth(item))"
      >
        {{ format(item, 'MMMM') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { eachMonthOfInterval, endOfYear, format, max as getMaxDate, min as getMinDate, getMonth, isSameMonth, setMonth, startOfYear, toDate } from 'date-fns'

import { DateFormats } from '@/types/calendar'
import { ItemKeyMethod } from '@/types/virtualization'

const modelValue = defineModel<DateFormats | null>()

const dateValue = computed<Date>({
  get() {
    if (modelValue.value === undefined || modelValue.value === null) {
      return new UTCDate()
    }

    return toDate(modelValue.value)
  },
  set(value) {
    modelValue.value = value
  },
})

const props = defineProps<{
  min?: DateFormats
  max?: DateFormats
}>()

const containerElement = useTemplateRef<HTMLDivElement>('containerElement')
const itemElements = useTemplateRef<HTMLButtonElement[]>('itemElements')

const minDate = computed(() => (props.min ? toDate(props.min) : null))
const maxDate = computed(() => (props.max ? toDate(props.max) : null))

const viewingDate = ref<Date>(dateValue.value ?? new UTCDate())

watch(dateValue, (value, previous) => {
  if (!isSameMonth(value, previous)) {
    viewingDate.value = value
    scrollIntoView(value)
  }
})

const viewingMonths = computed(() => {
  const rangeStart = startOfYear(viewingDate.value)
  const rangeEnd = endOfYear(viewingDate.value)
  const start = minDate.value ? getMaxDate([rangeStart, minDate.value]) : rangeStart
  const end = maxDate.value ? getMinDate([rangeEnd, maxDate.value]) : rangeEnd

  return eachMonthOfInterval({ start, end }).map((date) => {
    return setMonth(new UTCDate(viewingDate.value), getMonth(date))
  })
})

const classes = computed(() => (date: Date) => ({
  'polly-month-picker__month--selected': isSameMonth(date, dateValue.value),
}))

const getItemKey: ItemKeyMethod<Date> = (item) => {
  return item.toISOString()
}

function scrollIntoView(target: Date): void {
  const targetElement = itemElements.value?.find((element) => {
    return element.dataset.month && isSameMonth(element.dataset.month, target)
  })

  targetElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}
</script>

<style>
.polly-month-picker__month {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  width: 100%;
  cursor: pointer;
  color: var(--colors-text-icon-dark);
}

.polly-month-picker__month:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-month-picker__month--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-month-picker__month:hover {
    background-color: var(--colors-background-common-accent-light);
  }
}
</style>
