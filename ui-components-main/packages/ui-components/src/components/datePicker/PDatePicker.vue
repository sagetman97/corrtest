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
        ref="targetContainer"
        class="polly-date-picker"
        :class="labelClasses"
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
        <component
          :is="getInputBaseComponent"
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
                :model-value="formattedDateValue"
                class="polly-date-picker__control-mobile"
                :class="baseClasses"
              >
                <template v-if="hasValue(formattedDateValue)">{{ formattedDateValue }}</template>
                <template v-else> &nbsp; </template>
              </div>
            </template>
            <template v-else>
              <input
                v-model="stringModel"
                type="date"
                class="polly-date-picker__control"
                :disabled="disabled"
                :aria-disabled="disabled"
                :aria-required="required"
                :class="baseClasses"
                v-bind="baseAttrs"
                @keydown="handleKeydown"
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
                ref="targetElement"
                :disabled="disabled"
                :aria-required="required"
                class="polly-date-picker__target"
                :class="{ 'polly-date-picker__target--open': isOpen }"
                icon="calendar"
                size="xs"
                :lite="variant === 'simple'"
                round
                @click="toggle"
              >
                {{ suffix }}
              </p-button>
            </slot>
          </template>
        </component>

        <template #label>
          <slot name="label" />
        </template>
        <template
          v-if="slots.message"
          #message
        >
          <slot name="message" />
        </template>
      </p-label>
    </template>

    <template #default="{ close }">
      <p-calendar
        v-model="dateValue"
        class="p-date-picker__calendar"
        v-bind="{ min, max, clearable, dateIsDisabled, monthsShown, hideToday }"
        @update:model-value="close"
      />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, computed, ref } from 'vue'

import { UTCDate } from '@date-fns/utc'
import { format } from 'date-fns'

import { DateFormats, DatePickerProps, DatePickerSlots, PopoverPositionMethod } from '@/types'
import { keys } from '@/types/keyCode'

import { PInputBase, PSimpleInputBase } from '@/components/inputBase'
import PModal from '@/components/modal/PModal.vue'
import PPopover from '@/components/popover/PPopover.vue'
import { useBoolean, useClassesStylesAndAttrs, useMobile, useValidationState } from '@/composables'
import { autoPosition, hasValue } from '@/utilities'

const modelValue = defineModel<DateFormats | null>()
const { labelPosition = 'top', position: positionProp = 'left', state, variant } = defineProps<DatePickerProps>()
const slots = defineSlots<DatePickerSlots>()
const { isMobile } = useMobile()
const component = computed(() => (isMobile.value ? PModal : PPopover))
const { state: isOpen, toggle } = useBoolean()

defineOptions({ inheritAttrs: false })

const { isInvalid } = useValidationState(() => state, modelValue)
const { attrs, classes, styles } = useClassesStylesAndAttrs()

const labelClasses = computed(() => ({
  ...classes,
  'polly-date-picker--simple-label': variant === 'simple',
}))

const stringModel = computed({
  get: () => {
    if (!modelValue.value) {
      return ''
    }

    return format(modelValue.value, 'yyyy-MM-dd')
  },
  set: (value) => {
    if (!value) {
      modelValue.value = null
      return
    }

    modelValue.value = new UTCDate(value)
  },
})

const dateValue = computed({
  get: () => (modelValue.value ? new UTCDate(modelValue.value) : null),
  set: (value) => (modelValue.value = value),
})

const formattedDateValue = computed(() => {
  if (!dateValue.value) {
    return ''
  }

  return format(dateValue.value, 'MM/dd/yyyy')
})

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === keys.space) {
    event.preventDefault()
  }
}

const getInputBaseComponent = computed(() => {
  switch (variant) {
    case 'simple':
      return PSimpleInputBase
    default:
      return PInputBase
  }
})

const targetContainer = ref<ComponentPublicInstance | null>(null)

const position = computed<PopoverPositionMethod>(() => (__, contentElement) => {
  if (!targetContainer.value?.$el) {
    return
  }

  return autoPosition(positionProp)(targetContainer.value.$el, contentElement)
})
</script>

<style>
.p-date-picker__calendar {
  padding: 0;
}

.polly-date-picker__control::-webkit-inner-spin-button,
.polly-date-picker__control::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

.polly-date-picker__control::-webkit-datetime-edit-day-field:focus,
.polly-date-picker__control::-webkit-datetime-edit-month-field:focus,
.polly-date-picker__control::-webkit-datetime-edit-year-field:focus {
  background-color: var(--colors-background-button-primary-active);
  color: white;
  outline: none;
}

.polly-date-picker__target--open {
  box-shadow: none;
  background-color: var(--polly-button-background-color-darker);
  border-color: var(--polly-button-background-color-darker);
}

.polly-date-picker__target--open .polly-button__icon {
  color: var(--polly-button-icon-color-active);
}

.polly-date-picker--simple-label.polly-label--errored .polly-label__label-text {
  color: var(--colors-text-icon-status-error-AA);
}

.polly-date-picker--simple-label .polly-label__label-text {
  padding: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.polly-date-picker--simple-label .polly-label__message {
  padding-inline: 0;
}

.polly-date-picker--simple-label .polly-simple-input-base__control {
  padding: 0;
}
</style>
