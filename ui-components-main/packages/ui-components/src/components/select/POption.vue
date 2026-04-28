<template>
  <template v-if="isSelectOptionGroup(option)">
    <component
      :is="multiple ? 'button' : 'div'"
      :id="optionId"
      type="button"
      tabindex="-1"
      v-bind="attrs"
      :class="classes.group"
      class="polly-option--group"
      role="group"
      :aria-labelledby="`${optionId}-label`"
      :aria-disabled="option.disabled"
      @click.stop="handleGroupClick"
    >
      <slot
        name="icon"
        v-bind="{ selected, option }"
      >
        <PCheckbox
          v-if="multiple"
          class="polly-option__selected-icon"
          :indeterminate="groupIndeterminate"
          :model-value="allSelected"
          :aria-disabled="option.disabled"
          :tabindex="-1"
          @click.prevent
        />
      </slot>
      <slot
        name="option"
        :option="option"
        :selected="false"
        :select="handleOptionClick"
        :close="handleClose"
      >
        <POptionLabel
          :id="`${optionId}-label`"
          :label="option.label ?? ''"
        />
      </slot>
    </component>

    <template
      v-for="nestedOption in option.options"
      :key="nestedOption.value"
    >
      <POption
        class="polly-option--nested"
        :option="{ ...nestedOption, disabled: option.disabled || nestedOption.disabled }"
        :value="value"
        :listbox-id="listboxId"
        :active-descendant-id="activeDescendantId"
        v-bind="{ multiple, showInputIcons }"
        @select="(val: T) => emit('select', val)"
      >
        <template
          v-if="slots.option"
          #option="scope"
        >
          <slot
            name="option"
            v-bind="scope"
          />
        </template>
      </POption>
    </template>
  </template>

  <template v-else>
    <slot
      name="option"
      :option="option"
      :selected="selected"
      :select="handleOptionClick"
      :close="handleClose"
    >
      <button
        :id="optionId"
        type="button"
        tabindex="-1"
        v-bind="attrs"
        class="polly-option polly-option--option"
        :class="classes.option"
        role="option"
        :aria-selected="selected"
        :aria-disabled="option.disabled"
        @click.stop="handleOptionClick"
      >
        <slot
          name="icon"
          v-bind="{ selected, option }"
        >
          <PIcon
            v-if="option.icon"
            :icon="option.icon"
            class="polly-option__icon"
          />
          <component
            :is="multiple ? PCheckbox : PRadio"
            v-else-if="showIcon"
            class="polly-option__selected-icon"
            :model-value="selected"
            :checked="selected"
            :value="option.label"
            :aria-disabled="option.disabled"
            :tabindex="-1"
            @click.prevent
          />
        </slot>

        <slot
          name="label"
          v-bind="{ selected, option }"
        >
          <POptionLabel
            :label="option.label"
            :sub-label="option.subLabel"
          />
        </slot>
      </button>
    </slot>
  </template>
</template>

<script lang="ts" setup generic="T">
import { computed, useAttrs } from 'vue'

import { isSelectOptionGroup, SelectOptionGroup, selectOptionIsSelected, SelectOptionProps, SelectOptionSlots } from '@/types'

import { PCheckbox, PIcon, POptionLabel, PRadio } from '@/components'
import { buildSelectOptionId } from '@/utilities'

const props = defineProps<SelectOptionProps<T>>()

const emit = defineEmits<{
  select: [value: T]
  'select-all': [option: SelectOptionGroup<T>]
  'deselect-all': [option: SelectOptionGroup<T>]
  close: []
}>()

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const slots = defineSlots<SelectOptionSlots<T>>()

const selected = computed(() => {
  const { option } = props

  return !isSelectOptionGroup(option) && selectOptionIsSelected(option, props.value)
})

const variant = computed(() => {
  const { option } = props

  if (isSelectOptionGroup(option)) {
    return
  }

  return option.variant
})

const isFocused = computed(() => {
  return optionId.value !== undefined && optionId.value === props.activeDescendantId
})

const classes = computed(() => ({
  group: {
    'polly-option--selected': allSelected.value,
    'polly-option--group-select-all': props.multiple,
    'polly-option--focused': isFocused.value,
  },
  option: [
    `polly-option--${variant.value ?? 'primary'}`,
    {
      'polly-option--selected': selected.value,
      'polly-option--focused': isFocused.value,
    },
  ],
}))

const showIcon = computed(() => {
  return props.showInputIcons
})

const optionId = computed(() => {
  if (isSelectOptionGroup(props.option)) {
    const label = props.option.label ?? 'group'
    return props.listboxId && props.multiple ? buildSelectOptionId(props.listboxId, 'group', label) : undefined
  }
  return props.listboxId ? buildSelectOptionId(props.listboxId, 'option', props.option.value) : undefined
})

function handleGroupClick(event: MouseEvent): void {
  if (!props.multiple) {
    event.preventDefault()
    return
  }

  if (props.option.disabled) {
    event.preventDefault()
    return
  }

  toggleAllInGroup()
}

function handleOptionClick(): void {
  if (props.option.disabled) {
    return
  }

  if (isSelectOptionGroup(props.option)) {
    return
  }

  emit('select', props.option.value)
}

function handleClose(): void {
  emit('close')
}

function toggleAllInGroup(): void {
  if (!isSelectOptionGroup(props.option)) {
    return
  }

  if (props.option.disabled) {
    return
  }

  if (allSelected.value) {
    emit('deselect-all', props.option)
  } else {
    emit('select-all', props.option)
  }
}

const allSelected = computed(() => {
  if (!isSelectOptionGroup(props.option)) {
    return false
  }

  // Only consider enabled options when determining if group is "all selected"
  const enabledOptions = props.option.options.filter((option) => !option.disabled)

  // If there are no enabled options, the group cannot be considered "all selected"
  if (enabledOptions.length === 0) {
    return false
  }

  return enabledOptions.every((option) => selectOptionIsSelected(option, props.value))
})

const groupIndeterminate = computed(() => {
  if (!isSelectOptionGroup(props.option)) {
    return false
  }

  return parentOfSelected.value && !allSelected.value
})

const parentOfSelected = computed(() => {
  const { option } = props

  if (!isSelectOptionGroup(option)) {
    return false
  }

  // Only consider enabled options when determining if group has any selected
  const enabledOptions = option.options.filter((opt) => !opt.disabled)
  return enabledOptions.some((child) => selectOptionIsSelected(child, props.value))
})
</script>

<style>
.polly-option {
  --polly-option-text-color: var(--colors-text-icon-dark);
  --polly-option-selected-text-color: var(--colors-text-icon-dark);
  --polly-option-disabled-text-color: var(--colors-text-icon-dark-unavailable);
  position: relative;
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-base);
  text-align: left;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;
  outline: 2px solid transparent;
  outline-offset: -2px;
  color: var(--polly-option-text-color);
  flex-direction: row;
  font-weight: var(--font-weight-base);
}

.polly-option--group {
  position: relative;
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-base);
  text-align: left;
  color: var(--polly-option-text-color);
  flex-direction: row;
  font-weight: var(--font-weight-medium);
  transition: background-color 50ms ease-in-out;
  outline: 2px solid transparent;
  outline-offset: -2px;
}

.polly-option--group.polly-option--focused {
  outline-color: var(--colors-brand-yellow);
  background-color: var(--colors-background-common-ultra-light-neutral);
}

.polly-option--group.polly-option--focused.polly-option--selected {
  background-color: var(--colors-background-common-accent-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-option:hover:not(.polly-option--selected) {
    background-color: var(--colors-background-common-ultra-light-neutral);
  }
}

.polly-option--selected {
  color: var(--polly-option-selected-text-color);
  background-color: var(--colors-background-common-accent-light);
}

.polly-option--focused {
  outline-color: var(--colors-brand-yellow);
  background-color: var(--colors-background-common-ultra-light-neutral);
}

.polly-option--focused.polly-option--selected {
  background-color: var(--colors-background-common-accent-light);
}

.polly-option--destructive {
  --polly-option-text-color: var(--colors-background-button-error-default);
  --polly-option-selected-text-color: var(--colors-text-icon-status-error-AA);
  --polly-option-disabled-text-color: var(--colors-text-icon-status-error-unavailable);
}

.polly-option--nested {
  gap: var(--spacing-base);
  padding-left: var(--spacing-xl);
}

.polly-option--group-select-all {
  cursor: pointer;
}

.polly-option[aria-disabled='true'] {
  color: var(--polly-option-disabled-text-color);
  cursor: not-allowed;
}

.polly-option[aria-disabled='true'].polly-option--selected {
  background-color: var(--colors-background-common-default-grey-unavailable);
}
</style>
