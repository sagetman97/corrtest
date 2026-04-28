<template>
  <p-label
    ref="wrapper"
    class="polly-select"
    :class="classes.select"
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
      v-bind="attrs"
      :aria-required="required"
      :invalid="isInvalid"
      :highlighted="highlighted"
      :accent="accent"
      :dark="dark"
      :disabled="disabled"
      @click="handleClick"
    >
      <template #suffix>
        <slot
          name="targetIcon"
          v-bind="{ isOpen }"
        >
          <p-icon
            icon="angle-down"
            :class="{ 'p-rotate-180': isOpen }"
            class="polly-select__target-icon"
          />
        </slot>
      </template>

      <template #default="{ classes: baseClasses, attrs: baseAttrs }">
        <button
          ref="targetElement"
          type="button"
          role="combobox"
          class="polly-select__control"
          :aria-label="label || placeholder"
          :aria-controls="selectId"
          :aria-expanded="isOpen"
          aria-haspopup="listbox"
          :aria-disabled="disabled"
          :aria-required="required"
          :aria-invalid="isInvalid"
          :class="baseClasses"
          v-bind="baseAttrs"
        >
          <template v-if="multiple">
            <POverflow v-if="selectedOptions.length">
              <template #default>
                <slot
                  name="default"
                  v-bind="{ value: modelValue, displayValue }"
                >
                  <template
                    v-for="selectedOption in selectedOptions"
                    :key="String(selectedOption.value)"
                  >
                    <PChip
                      class="polly-select__multiple-chip"
                      :disabled="disabled || selectedOption.disabled"
                      :dismissible="!isMobileWidth"
                      tabindex="-1"
                      @click.stop="removeFromSelected(selectedOption.value)"
                    >
                      {{ selectedOption.label }}
                    </PChip>
                  </template>
                </slot>
              </template>

              <template #overflow="{ count }">
                <slot
                  name="overflow"
                  :count="count"
                >
                  <PBadge>+{{ count }}</PBadge>
                </slot>
              </template>
            </POverflow>

            <template v-else> &nbsp; </template>
          </template>

          <span v-else-if="displayValue">
            <slot
              name="default"
              v-bind="{ value: modelValue, displayValue }"
            >
              {{ displayValue }}
            </slot>
          </span>

          <span
            v-else
            class="polly-select__placeholder"
          >
            <slot
              name="default"
              v-bind="{ value: modelValue, displayValue }"
            >
              <template v-if="hasValue(placeholder)"> {{ placeholder }} </template>
              <template v-else> &nbsp; </template>
            </slot>
          </span>
        </button>

        <POptions
          :id="selectId"
          v-model="modelValue"
          v-model:is-open="isOpen"
          :options="filteredOptions"
          :position="position"
          :target-element="targetElement"
          :combobox-element="targetElement"
          v-bind="{ multiple, showApply, showInputIcons, label, required, disabled }"
          @change="handleChange"
        >
          <template
            v-if="shouldFilter"
            #filter
          >
            <slot name="filter">
              <p-search
                v-model="filterText"
                class="polly-select__search"
                :variant="searchVariant"
                autofocus
              />
            </slot>
          </template>
          <template
            v-if="slots.optionIcon"
            #icon="scope"
          >
            <slot
              name="optionIcon"
              v-bind="scope"
            />
          </template>

          <template
            v-if="slots.option"
            #option="scope"
          >
            <slot
              name="option"
              v-bind="scope"
            />
          </template>

          <template
            v-if="slots.label"
            #label="scope"
          >
            <slot
              name="label"
              v-bind="scope"
            />
          </template>

          <template
            v-if="slots.footer"
            #footer="scope"
          >
            <slot
              name="footer"
              v-bind="scope"
            />
          </template>

          <template
            v-if="slots.emptyOptions"
            #emptyOptions
          >
            <slot name="emptyOptions" />
          </template>
        </POptions>
      </template>
    </component>
  </p-label>
</template>

<script setup lang="ts" generic="T">
import { computed, inject, ref, useTemplateRef, watch } from 'vue'

import type { Ref } from 'vue'
import {
  isSelectOptionGroup,
  PopoverPositionMethod,
  SelectEmits,
  SelectOption,
  SelectOptionGroup,
  selectOptionIsSelected,
  SelectProps,
  SelectSlots,
} from '@/types'

import { PChip } from '@/components/chip'
import { PInputBase, PMinimalInputBase, PSimpleInputBase } from '@/components/inputBase'
import { POverflow } from '@/components/overflow'
import { POptions } from '@/components/select'
import { useBoolean, useClassesStylesAndAttrs, useMobile, useValidationState } from '@/composables'
import { asArray, hasValue, randomId } from '@/utilities'
import { filterSelectOptions } from '@/utilities/filter'
import { autoPosition } from '@/utilities/position'

const selectId = randomId()

const aiHighlighted = inject<Ref<boolean>>('aiHighlighted', ref(false))
const clearAiHighlight = inject<() => void>('clearAiHighlight', () => {})

const {
  position: positionProp = 'left',
  variant = 'default' as 'default' | 'simple' | 'minimal',
  size = 'default',
  filterThreshold = 10,
  placeholder = 'Select...',
  state: stateProp,
  multiple,
  showApply,
  options,
  required,
  disabled,
  filter,
} = defineProps<SelectProps<T>>()

const modelValue = defineModel<T | T[]>({ default: null })
const isOpen = defineModel<boolean>('isOpen', { type: Boolean, default: false })

const emit = defineEmits<SelectEmits<T>>()

const slots = defineSlots<SelectSlots<T>>()

defineOptions({ inheritAttrs: false })

const { attrs, classes: inheritedClasses, styles } = useClassesStylesAndAttrs()
const { isMobileWidth } = useMobile()

const getInputBaseComponent = computed(() => {
  if (variant === 'minimal') {
    return PMinimalInputBase
  }
  if (variant === 'simple') {
    return PSimpleInputBase
  }
  return PInputBase
})

const classes = computed(() => ({
  select: [
    [`polly-select--size-${size}`],
    {
      'polly-select--open': isOpen.value,
      'polly-select--closed': !isOpen.value,
      'polly-select--multiple': multiple,
      'polly-select--simple-label': ['simple', 'minimal'].includes(variant),
    },
    ...asArray(inheritedClasses.value),
  ],
}))

const state = computed(() => stateProp)

const { toggle: toggleIsOpen } = useBoolean(isOpen)

function handleClick(): void {
  if (disabled) {
    return
  }

  toggleIsOpen()
}

const wrapper = useTemplateRef<HTMLDivElement>('wrapper')
const targetElement = useTemplateRef<HTMLButtonElement>('targetElement')

const { isInvalid } = useValidationState(state, modelValue)

const noSelectionOption = { label: 'No Selection', value: null as T }

const optionsWithDefaultGroup = computed(() => {
  const hasAnyGrouped = options.some(isSelectOptionGroup)
  const shouldShowNoSelection = !multiple && !required

  if (!hasAnyGrouped) {
    return shouldShowNoSelection ? [noSelectionOption, ...options] : options
  }

  const ungrouped: SelectOption<T>[] = []
  const groups = options.reduce<SelectOptionGroup<T>[]>((opts, option) => {
    if (isSelectOptionGroup(option)) {
      opts.push(option)
    } else {
      ungrouped.push(option)
    }

    return opts
  }, [])

  return shouldShowNoSelection ? [noSelectionOption, ...groups, ...ungrouped] : [...groups, ...ungrouped]
})

const flatOptions = computed(() =>
  options.flatMap((option) => {
    return isSelectOptionGroup(option) ? option.options : option
  })
)

const selectedOptions = computed(
  () =>
    asArray(modelValue.value)
      .map((value) => flatOptions.value.find((option) => selectOptionIsSelected(option, value)))
      .filter((value) => value !== undefined) as SelectOption<T>[]
)

const displayValue = computed(() => selectedOptions.value.map((selectedOption) => selectedOption?.label).join(', '))

const position = computed<PopoverPositionMethod>(() => (__, contentElement) => {
  const containerElement = targetElement.value?.parentElement

  if (!containerElement) {
    return
  }

  return autoPosition(positionProp)(containerElement, contentElement)
})

function handleSelection() {
  if (aiHighlighted.value) {
    clearAiHighlight()
  }
}

function handleChange(value: T | T[]): void {
  emit('change', value)
  handleSelection()
}

function removeFromSelected(value: T): void {
  const correspondingOption = flatOptions.value.find((option) => selectOptionIsSelected(option, value))
  if (disabled || correspondingOption?.disabled) {
    return
  }

  if (!Array.isArray(modelValue.value)) {
    return
  }

  modelValue.value = modelValue.value.filter((currentValue) => currentValue !== value)
  handleSelection()
}

const shouldFilter = computed(() => filter || totalOptionsCount.value >= filterThreshold)

const filterText = defineModel('filterText', { type: String, default: '' })
const filteredOptions = computed(() => {
  if (!shouldFilter.value) {
    return optionsWithDefaultGroup.value
  }

  if (typeof filter === 'function') {
    return optionsWithDefaultGroup.value.filter(filter)
  }

  return filterSelectOptions(optionsWithDefaultGroup.value, filterText.value)
})

const totalOptionsCount = computed(() => {
  return options.reduce((total, option) => {
    if (isSelectOptionGroup(option)) {
      return total + option.options.length
    }
    return total + 1
  }, 0)
})

const searchVariant = computed(() => {
  if (['minimal', 'simple'].includes(variant)) {
    return 'simple'
  }

  return 'default'
})

watch(isOpen, (value) => {
  if (value) {
    filterText.value = ''
  }
})

defineExpose({
  wrapper,
  targetElement,
})
</script>

<style>
.polly-select {
  max-width: 100%;
  cursor: pointer;
  min-width: 80px;
  display: inline-flex;
}

.polly-select__search {
  padding: var(--spacing-xs) var(--spacing-base);
  max-width: 100%;
  box-sizing: border-box;
}

.polly-select__control {
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.polly-select__control .polly-select__placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-select__multiple-chip {
  flex-shrink: 0;
}

.polly-select--simple-label {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  position: relative;
  top: 0;
  transition: all 0.2s ease;
}

.polly-select--simple-label .polly-label__label-text {
  padding: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.polly-select--simple-label .polly-label__message {
  padding-inline: 0;
}

.polly-select--simple-label .polly-simple-input-base__control {
  padding: 0;
}

.polly-select--size-small .polly-select__control {
  padding-block: var(--spacing-xs);
}
</style>
