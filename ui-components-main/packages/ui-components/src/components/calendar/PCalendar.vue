<template>
  <div class="polly-calendar">
    <div class="polly-calendar__navigation-bar">
      <p-button
        class="polly-calendar__navigation polly-calendar__navigation--previous"
        icon="chevron-left"
        size="sm"
        round
        text
        @click="navigatePrevious"
      />

      <p-button
        class="polly-calendar__navigation polly-calendar__navigation--next"
        icon="chevron-right"
        size="sm"
        round
        text
        @click="navigateNext"
      />
    </div>

    <div class="polly-calendar__months">
      <template
        v-for="index in monthsShown"
        :key="`month-view-${index}`"
      >
        <div class="polly-calendar__month">
          <div class="polly-calendar__month-heading">
            <p-button
              text
              :class="{ 'polly-calendar__month-heading--overlay-open': overlays[index] }"
              @click="overlays[index] = !overlays[index]"
            >
              <span>
                {{ format(addMonths(viewingDate, index - 1), 'MMMM') }}
              </span>
              <span>
                {{ format(addMonths(viewingDate, index - 1), 'yyyy') }}
              </span>
            </p-button>
          </div>

          <template v-if="overlays[index]">
            <PPickersGrid
              v-model="viewingDate"
              :pickers="['PMonthPicker', 'PYearPicker']"
              class="polly-calendar__overlay-component"
            />
          </template>

          <template v-else>
            <PCalendarGrid
              :viewing-date="addMonths(viewingDate, index - 1)"
              :hide-off-dates="showingMultipleMonths"
            >
              <template #date="{ date }">
                <slot
                  name="date"
                  :date="date"
                  :is-selected="isDateSelected(date)"
                  :is-today="isDateToday(date)"
                >
                  <PCalendarDateButton
                    :disabled="isDateDisabled(date)"
                    :show-selected="isDateSelected(date)"
                    :is-today="isDateToday(date)"
                    :show-out-of-month="!showingMultipleMonths && !isSameMonth(date, viewingDate)"
                    @click="dateValue = date"
                  >
                    {{ format(date, 'd') }}
                  </PCalendarDateButton>
                </slot>
              </template>
            </PCalendarGrid>
          </template>
        </div>
      </template>
    </div>

    <div
      v-if="clearable || !hideToday"
      class="polly-calendar__actions"
    >
      <slot
        name="actions"
        :date-value="dateValue"
      >
        <p-button
          v-if="clearable"
          class="polly-calendar__clear-button"
          variant="accent"
          text
          size="xs"
          :disabled="dateValue === null"
          @click="dateValue = null"
        >
          Clear
        </p-button>

        <p-button
          v-if="!hideToday"
          class="polly-calendar__today-button"
          variant="accent"
          text
          size="xs"
          :disabled="valueIsToday || isDateDisabled(today)"
          @click="dateValue = today"
        >
          Today
        </p-button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue'

import { addMonths, format, isAfter, isBefore, isSameDay, isSameMonth, isToday, startOfToday } from 'date-fns'

import { CalendarProps, CalendarSlots, DateFormats, toDate } from '@/types'

import { PCalendarDateButton, PCalendarGrid } from '@/components/calendar'
import PPickersGrid from '../date/PPickersGrid.vue'

const modelValue = defineModel<DateFormats | null>()
const { monthsShown = 1, min, max, dateIsDisabled } = defineProps<CalendarProps>()
defineSlots<CalendarSlots>()

const dateValue = computed<Date | null>({
  get() {
    return modelValue.value ? toDate(modelValue.value) : null
  },
  set(value) {
    modelValue.value = value
  },
})

const monthsShownRef = toRef(() => monthsShown)
const today = startOfToday()
const valueIsToday = computed(() => !!dateValue.value && isToday(dateValue.value))

const viewingDate = ref(today)
const showingMultipleMonths = computed(() => monthsShown > 1)

const overlays = ref<boolean[]>([])

watch(monthsShownRef, setViewingMonths, { immediate: true })

function setViewingMonths(count: number): void {
  overlays.value = new Array(count).fill(false)
}

function navigatePrevious(): void {
  viewingDate.value = addMonths(viewingDate.value, -1)
}

function navigateNext(): void {
  viewingDate.value = addMonths(viewingDate.value, 1)
}

function isDateSelected(date: Date): boolean {
  if (!dateValue.value) {
    return false
  }

  return isSameDay(date, dateValue.value)
}

function isDateToday(date: Date): boolean {
  return isSameDay(date, today)
}

function isDateDisabled(date: Date): boolean {
  if (min && isBefore(date, min)) {
    return true
  }

  if (max && isAfter(date, max)) {
    return true
  }

  if (dateIsDisabled) {
    return dateIsDisabled(date)
  }

  return false
}

watch(
  dateValue,
  (value) => {
    if (value) {
      viewingDate.value = value
    }
  },
  { immediate: true }
)
</script>

<style>
.polly-calendar {
  --polly-calendar-max-width: 500px;
  --polly-calendar-min-grid-width: 328px;
  --polly-calendar-min-grid-height: 360px;
  --polly-calendar-max-grid-height: 410px;
  --polly-calendar-navigation-height: 48px;

  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);
}

.polly-calendar__navigation-bar {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--polly-calendar-navigation-height);
}

.polly-calendar__navigation {
  border: none;
  z-index: var(--layout-above);
}

.polly-calendar__navigation:active {
  background: var(--polly-button-background-color-darker);
}

.polly-calendar__navigation--previous {
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, var(--colors-background-common-white) 50%);
}

.polly-calendar__navigation--next {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--colors-background-common-white) 50%);
}

.polly-calendar__month-heading {
  display: flex;
  height: var(--polly-calendar-navigation-height);
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
}

.polly-calendar__month-heading .polly-button__contents {
  display: flex;
  gap: var(--spacing-xs);
}

.polly-calendar__month-heading--overlay-open {
  background-color: var(--colors-background-button-text-active);
}

.polly-calendar__months {
  display: flex;
  gap: var(--spacing-xxl);
  max-width: var(--polly-calendar-max-width);
  padding-inline: 2px;
  overflow-x: auto;
  align-self: center;
}

.polly-calendar__month {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  min-width: var(--polly-calendar-min-grid-width);
  min-height: var(--polly-calendar-min-grid-height);
}

.polly-calendar__actions {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.polly-calendar__today-button {
  margin-left: auto;
}
</style>
