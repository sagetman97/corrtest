<template>
  <PVirtualScroller
    :items="viewingYears"
    :item-estimate-height="itemEstimateHeight"
    :chunk-size="100"
    :item-key="getItemKey"
    @loaded="scrollToCurrent"
    @top="atTop"
    @bottom="atBottom"
  >
    <template #default="{ item }">
      <button
        type="button"
        class="polly-year-picker__year"
        :class="classes(item)"
        :data-year="format(item, 'yyyy')"
        @click="dateValue = setYear(dateValue, getYear(item))"
      >
        {{ format(item, 'yyyy') }}
      </button>
    </template>
  </PVirtualScroller>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { addYears, eachYearOfInterval, format, max as getMaxDate, min as getMinDate, getYear, isSameYear, setYear, toDate } from 'date-fns'

import { DateFormats } from '@/types/calendar'
import { ItemKeyMethod } from '@/types/virtualization'

import { createUnitValue } from '@/utilities/cssUnitValue'
import PVirtualScroller from '../virtualScroller/PVirtualScroller.vue'

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

const minDate = computed(() => (props.min ? toDate(props.min) : null))
const maxDate = computed(() => (props.max ? toDate(props.max) : null))

const viewingCount = 42
const itemEstimateHeight = createUnitValue(48, 'px')

const viewingDate = ref<Date>(dateValue.value ?? new UTCDate())

watch(dateValue, (value, previous) => {
  if (!isSameYear(value, previous)) {
    viewingDate.value = value
    direction.value = undefined
  }
})

const viewingYears = computed(() => {
  const rangeStart = addYears(viewingDate.value, -viewingCount / 2)
  const rangeEnd = addYears(viewingDate.value, viewingCount / 2)
  const start = minDate.value ? getMaxDate([rangeStart, minDate.value]) : rangeStart
  const end = maxDate.value ? getMinDate([rangeEnd, maxDate.value]) : rangeEnd

  return eachYearOfInterval({ start, end }).map((date) => {
    return setYear(new UTCDate(viewingDate.value), getYear(date))
  })
})

const classes = computed(() => (date: Date) => ({
  'polly-year-picker__year--selected': isSameYear(date, dateValue.value),
}))

const getItemKey: ItemKeyMethod<Date> = (item) => {
  return item.toISOString()
}

const direction = ref<'up' | 'down'>()

const scrollToCurrent = (() => {
  let hasRun = false

  return ({ containerElement, scrollTo }: { containerElement: HTMLDivElement; scrollTo: (top: number) => void }) => {
    if (!hasRun) {
      hasRun = true
      return scrollTo((viewingCount / 2 + 1) * itemEstimateHeight.value)
    }

    switch (direction.value) {
      case 'down':
        return scrollTo((viewingCount / 2 - 10) * itemEstimateHeight.value)
      case 'up':
        return scrollTo((viewingCount / 2) * itemEstimateHeight.value)
      default:
        scrollIntoView(containerElement)
    }
  }
})()

function scrollIntoView(containerElement: HTMLElement): void {
  const elements = Array.from(containerElement.querySelectorAll('.polly-year-picker__year')) as HTMLElement[]
  const selectedElement = elements.find((element) => !!element.dataset.item && isSameYear(new Date(element.dataset.item), viewingDate.value))

  selectedElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

function atTop(): void {
  direction.value = 'up'
  viewingDate.value = addYears(viewingDate.value, -viewingCount / 2 + 3)
}

function atBottom(): void {
  direction.value = 'down'
  viewingDate.value = addYears(viewingDate.value, viewingCount / 2 + 7)
}
</script>

<style>
.polly-year-picker__year {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  width: 100%;
  cursor: pointer;
  color: var(--colors-text-icon-dark);
}

.polly-year-picker__year:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-year-picker__year--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-year-picker__year:hover {
    background-color: var(--colors-background-common-accent-light);
  }
}
</style>
