<template>
  <div class="polly-calendar-grid">
    <div class="polly-calendar-grid__days-of-week">
      <template
        v-for="day in days"
        :key="`day-${day}`"
      >
        <div class="polly-calendar-grid__day-of-week">{{ day }}</div>
      </template>
    </div>

    <div class="polly-calendar-grid__dates">
      <template
        v-for="date in dates"
        :key="`date-${date}`"
      >
        <span v-if="props.hideOffDates && !isSameMonth(date, viewingDate)" />
        <slot
          v-else
          name="date"
          :date="date"
        >
          <div class="polly-calendar-grid__date">
            {{ format(date, 'd') }}
          </div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'

import { MonthProps, MonthSlots, toDate } from '@/types'

const props = defineProps<MonthProps>()
defineSlots<MonthSlots>()

const viewingDate = computed<Date>(() => toDate(props.viewingDate))
const days = eachDayOfInterval({ start: startOfWeek(new UTCDate()), end: endOfWeek(new UTCDate()) }).map((x) => format(x, 'eeeee'))

const dates = computed(() => {
  const monthStart = startOfMonth(viewingDate.value)
  const monthEnd = endOfMonth(viewingDate.value)
  const start = startOfWeek(monthStart)
  const end = endOfWeek(monthEnd)

  return eachDayOfInterval({ start, end })
})
</script>

<style>
.polly-calendar-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.polly-calendar-grid__days-of-week,
.polly-calendar-grid__dates {
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  gap: var(--spacing-xxs);
}

.polly-calendar-grid__day-of-week,
.polly-calendar-grid__date {
  text-align: center;
  padding: var(--spacing-xs);
  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-sm);
}

.polly-calendar-grid__day-of-week {
  color: var(--colors-text-icon-medium);
}
</style>
