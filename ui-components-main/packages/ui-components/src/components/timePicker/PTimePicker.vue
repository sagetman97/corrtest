<template>
  <component
    :is="component"
    v-model:is-open="isOpen"
    :position="position"
    :title="label"
    variant="light"
    :triggers="[]"
  >
    <template #target>
      <p-label
        class="polly-time-picker"
        :class="classes"
        :style="styles"
        v-bind="{
          label,
          labelPosition,
          disabled,
          required,
          message,
          state,
        }"
      >
        <p-input-base
          :disabled="disabled"
          :aria-required="required"
          :invalid="isInvalid"
          :prefix="prefix"
          :suffix="suffix"
          v-bind="attrs"
          :title="modelValue"
        >
          <template #default="{ classes: baseClasses, attrs: baseAttrs }">
            <template v-if="isMobile">
              <div
                :model-value="formattedTimeValue"
                class="polly-time-picker__control-mobile"
                :class="baseClasses"
              >
                <template v-if="hasValue(formattedTimeValue)">{{ formattedTimeValue }}</template>
                <template v-else>-- : -- --</template>
              </div>
            </template>
            <template v-else>
              <input
                v-model="stringModel"
                type="time"
                class="polly-time-picker__control"
                :disabled="disabled"
                :aria-disabled="disabled"
                :aria-required="required"
                :aria-invalid="isInvalid"
                :class="baseClasses"
                v-bind="baseAttrs"
              />
            </template>
          </template>

          <template
            v-if="slots.prefix"
            #prefix
          >
            <slot name="prefix" />
          </template>

          <template #suffix>
            <slot name="suffix">
              <p-button
                :disabled="disabled"
                :aria-required="required"
                class="polly-time-picker__target"
                :class="{ 'polly-time-picker__target--open': isOpen }"
                icon="calendar"
                size="sm"
                round
                @click="toggle"
              >
                {{ suffix }}
              </p-button>
            </slot>
          </template>
        </p-input-base>

        <template #label>
          <slot name="label" />
        </template>
        <template #message>
          <slot name="message" />
        </template>
      </p-label>
    </template>

    <template #default="{ close }">
      <div class="polly-time-picker__content">
        <PPickersGrid
          v-model="viewingDate"
          :pickers="['PHourPicker', 'PMinutePicker', 'PMeridianPicker']"
          class="polly-calendar__overlay-component"
        />

        <div class="polly-time-picker__actions">
          <p-button
            variant="accent"
            text
            size="xs"
            @click="close"
          >
            Close
          </p-button>

          <p-button
            size="sm"
            @click="applyAndClose(viewingDate, close)"
          >
            Ok
          </p-button>
        </div>
      </div>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { format, set, setHours, startOfDay } from 'date-fns'

import { DateFormats, TimePickerProps, TimePickerSlots, TupleFormat } from '@/types/calendar'

import PPickersGrid from '@/components/date/PPickersGrid.vue'
import PModal from '@/components/modal/PModal.vue'
import PPopover from '@/components/popover/PPopover.vue'
import { useBoolean } from '@/composables/useBoolean'
import { useClassesStylesAndAttrs } from '@/composables/useClassesStylesAndAttrs'
import { useMobile } from '@/composables/useMobile'
import { useValidationState } from '@/composables/useValidationState'
import { convertDateToTuple, convertTupleToDate, hasValue } from '@/utilities'

const modelValue = defineModel<DateFormats | TupleFormat | null | undefined>()
const { labelPosition = 'top', state } = defineProps<TimePickerProps>()
const slots = defineSlots<TimePickerSlots>()
const { isMobile } = useMobile()
const component = computed(() => (isMobile.value ? PModal : PPopover))
const position = computed(() => (isMobile.value ? undefined : 'bottom-left'))
const { state: isOpen, toggle } = useBoolean()

defineOptions({ inheritAttrs: false })

const { isInvalid } = useValidationState(() => state, modelValue)
const { attrs, classes, styles } = useClassesStylesAndAttrs()

const viewingDate = ref<UTCDate>(new UTCDate())

watch(
  modelValue,
  (value) => {
    viewingDate.value = getDate(value)
  },
  { immediate: true }
)

const dateValue = computed({
  get: () => getDateOrNull(modelValue.value),
  set: (value) => {
    if (isTuple(modelValue.value)) {
      modelValue.value = convertDateToTuple(value)
    } else {
      modelValue.value = value
    }
  },
})

const stringModel = computed({
  get: () => {
    if (!dateValue.value) {
      return ''
    }

    return format(dateValue.value, 'HH:mm')
  },
  set: (value) => {
    if (!value) {
      dateValue.value = null
      return
    }

    const [hours, minutes] = value.split(':').map(Number)

    dateValue.value = set(getDateDefault(), { hours, minutes })
  },
})

const formattedTimeValue = computed(() => {
  if (!dateValue.value) {
    return ''
  }

  return format(dateValue.value, 'hh:mm aa')
})

function isTuple(value: DateFormats | TupleFormat | null | undefined): value is TupleFormat {
  return Array.isArray(value)
}

function getDateDefault(): UTCDate {
  return setHours(startOfDay(new UTCDate()), 1)
}

function getDateOrNull(value: DateFormats | TupleFormat | null | undefined): UTCDate | null {
  if (value === undefined || value === null) {
    return null
  }

  return getDate(value)
}

function getDate(value: DateFormats | TupleFormat | null | undefined): UTCDate {
  const defaultValue = getDateDefault()

  if (value === undefined || value === null) {
    return defaultValue
  }

  if (isTuple(value)) {
    return convertTupleToDate(value) ?? defaultValue
  }

  return new UTCDate(value)
}

function applyAndClose(viewingDate: UTCDate, hide: () => void): void {
  dateValue.value = viewingDate

  hide()
}
</script>

<style>
.polly-time-picker {
  min-width: 240px;
}

.p-date-picker__calendar {
  padding: 0;
}

.polly-time-picker__control::-webkit-inner-spin-button,
.polly-time-picker__control::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

.polly-time-picker__control::-webkit-datetime-edit-day-field:focus,
.polly-time-picker__control::-webkit-datetime-edit-month-field:focus,
.polly-time-picker__control::-webkit-datetime-edit-year-field:focus {
  background-color: var(--colors-background-button-primary-active);
  color: white;
  outline: none;
}

.polly-time-picker__target--open {
  box-shadow: none;
  background-color: var(--polly-button-background-color-darker);
  border-color: var(--polly-button-background-color-darker);
}

.polly-time-picker__target--open .polly-button__icon {
  color: var(--polly-button-icon-color-active);
}

.polly-time-picker__actions {
  margin: var(--spacing-sm);
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}
</style>
