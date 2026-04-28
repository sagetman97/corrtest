<template>
  <component
    :is="component"
    v-model:is-open="isOpen"
    :position="position"
    :title="label"
    variant="light"
    class="polly-options"
    :class="classes.container"
    :triggers="[]"
    @click.stop
    @keydown.esc.stop
  >
    <div
      :id="id"
      ref="listboxElement"
      role="listbox"
      :aria-multiselectable="multiple"
      :tabindex="!targetElement && !comboboxElement ? 0 : undefined"
      class="polly-options__container"
    >
      <slot name="filter" />
      <POption
        v-if="multiple"
        :value="modelValue"
        :option="selectAllOption"
        :listbox-id="id"
        :active-descendant-id="activeDescendantId"
        label="Select all"
        class="polly-option polly-option--select-all"
        :class="{ 'polly-option--selected': allSelected }"
        :indeterminate="someSelected && !allSelected"
        @select="handleSelectAll"
      >
        <template #icon>
          <PCheckbox
            v-if="showInputIcons"
            :indeterminate="someSelected && !allSelected"
            :model-value="allSelected"
            :checked="allSelected"
            :value="allSelected"
            :tabindex="-1"
            @click.prevent
          />
        </template>
      </POption>
      <template
        v-for="option in options"
        :key="option.value"
      >
        <POption
          :value="modelValue"
          :listbox-id="id"
          :active-descendant-id="activeDescendantId"
          v-bind="{ option, showInputIcons, multiple }"
          @select="setSelectedThenClose"
          @select-all="handleSelectAllGroup"
          @deselect-all="handleDeselectAllGroup"
          @close="close"
          @keyup.enter="showApply && applyThenClose(unappliedValue!)"
        >
          <template
            v-if="slots.icon"
            #icon="scope"
          >
            <slot
              name="icon"
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
        </POption>
      </template>
    </div>

    <template v-if="options.length === 0">
      <div class="polly-options__empty-message">
        <slot name="emptyOptions"> No options </slot>
      </div>
    </template>

    <template v-if="(!!slots.footer || showApply) && !isMobileWidth">
      <div class="polly-options--footer">
        <slot
          name="footer"
          :set-selected="setSelected"
          :value="unappliedValue"
          :close="close"
        >
          <p-button @click.stop="applyThenClose(unappliedValue!)">Apply</p-button>
        </slot>
      </div>
    </template>

    <template
      v-if="(!!slots.footer || showApply) && isMobileWidth"
      #footer
    >
      <slot
        name="footer"
        :set-selected="setSelected"
        :value="unappliedValue"
        :close="close"
      >
        <p-button
          class="polly-options__footer-apply"
          @click="applyThenClose(unappliedValue!)"
        >
          Apply
        </p-button>
      </slot>
    </template>
  </component>
</template>

<script lang="ts" setup generic="T">
import { computed, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue'

import {
  isSelectOptionGroup,
  SelectOption,
  SelectOptionGroup,
  selectOptionIsSelected,
  SelectOptionsEmits,
  SelectOptionsProps,
  SelectOptionsSlots,
} from '@/types'

import PCheckbox from '@/components/checkbox/PCheckbox.vue'
import { PModal } from '@/components/modal'
import { PPopover } from '@/components/popover'
import { POption } from '@/components/select'
import { useBoolean, useEventListener, useMobile } from '@/composables'
import { buildSelectOptionId, randomId } from '@/utilities'

const SELECT_ALL_TOKEN: unique symbol = Symbol('select-all')

function isSelectAllValue(value: T | typeof SELECT_ALL_TOKEN): value is typeof SELECT_ALL_TOKEN {
  return value === SELECT_ALL_TOKEN
}

const {
  id = randomId(),
  isOpen: isOpenProp,
  modelValue: modelValueProp,
  options,
  multiple,
  showApply,
  disabled,
  targetElement,
  comboboxElement,
} = defineProps<SelectOptionsProps<T> & { id?: string }>()

const emit = defineEmits<SelectOptionsEmits<T>>()

const slots = defineSlots<SelectOptionsSlots<T>>()

const listboxElement = useTemplateRef<HTMLDivElement>('listboxElement')
const filterInputElement = ref<HTMLInputElement | null>(null)

const isOpen = computed({
  get() {
    return isOpenProp
  },
  set(value) {
    emit('update:isOpen', value)
  },
})

const { isMobileWidth } = useMobile()
const component = computed(() => (isMobileWidth.value ? PModal : PPopover))
const { setFalse: close } = useBoolean(isOpen)

const unappliedValue = ref<T | T[]>()

const modelValue = computed({
  get() {
    return showApply ? unappliedValue.value! : modelValueProp
  },
  set(value) {
    if (showApply) {
      unappliedValue.value = value
    } else {
      apply(value)
    }

    emit('change', value)
  },
})

watch(
  isOpen,
  (newValue) => {
    unappliedValue.value = modelValueProp

    if (newValue && !targetElement && !comboboxElement) {
      nextTick(() => {
        listboxElement.value?.focus()
        if (flatEnabledOptions.value.length > 0) {
          isKeyboardNavigating.value = true
          updateActiveDescendant(0)
        }
      })
    }
  },
  { immediate: true }
)

const selectAllOption = computed<SelectOption<T | typeof SELECT_ALL_TOKEN>>(() => ({
  label: 'Select all',
  value: SELECT_ALL_TOKEN,
}))

const classes = computed(() => ({
  container: {
    'polly-options--open': isOpen.value,
    'polly-options--closed': !isOpen.value,
    'polly-options--1-option': options.length === 1,
    'polly-options--2-options': options.length === 2,
    'polly-options--3-options': options.length === 3,
  },
}))

function setSelected(value: T): void {
  if (multiple) {
    toggleSelected(value)
  } else {
    modelValue.value = value
  }
}

function toggleSelected(value: T): void {
  if (!Array.isArray(modelValue.value)) {
    return
  }

  const selected = modelValue.value.includes(value)

  if (selected) {
    modelValue.value = modelValue.value.filter((currentValue) => currentValue !== value) as T
  } else {
    modelValue.value = [...modelValue.value, value]
  }
}

function apply(value: T | T[]): void {
  emit('update:modelValue', value)
}

function applyThenClose(value: T | T[]): void {
  apply(value)

  close()
}

function resetKeyboardNavigation(newFocusedIndex?: number): void {
  isKeyboardNavigating.value = false
  activeDescendantId.value = undefined
  focusedIndex.value = newFocusedIndex ?? -1
}

function findOptionIndex(value: T): number {
  return flatEnabledOptions.value.findIndex((option) => !isSelectOptionGroup(option) && option.value === value)
}

function setSelectedThenClose(value: T, viaKeyboard = false): void {
  if (!viaKeyboard) {
    const clickedIndex = findOptionIndex(value)
    resetKeyboardNavigation(clickedIndex !== -1 ? clickedIndex : -1)
  }

  setSelected(value)

  if (!multiple && !showApply) {
    close()
  }
}

const allEnabledOptions = computed(() => {
  return options.flatMap((option) => {
    if (isSelectOptionGroup(option)) {
      if (option.disabled) {
        return []
      }
      return option.options.filter((opt) => !opt.disabled)
    }
    return option.disabled ? [] : [option]
  })
})

const allSelected = computed(() => {
  if (!multiple) {
    return false
  }

  const allValues = allEnabledOptions.value.map((option) => option.value)

  return allValues.every((value) => Array.isArray(modelValue.value) && modelValue.value.includes(value))
})

const someSelected = computed(() => {
  if (!multiple) {
    return false
  }

  const allValues = allEnabledOptions.value.map((option) => option.value)

  return allValues.some((value) => Array.isArray(modelValue.value) && modelValue.value.includes(value))
})

const disabledOptions = computed(() => {
  return options.flatMap((option) => {
    if (isSelectOptionGroup(option)) {
      if (option.disabled) {
        return option.options
      }
      return option.options.filter((opt) => opt.disabled)
    }
    return option.disabled ? [option] : []
  })
})

const selectedDisabledOptions = computed(() => {
  return disabledOptions.value.filter((option) => {
    return selectOptionIsSelected(option, modelValue.value)
  })
})

function toggleSelectAll(): void {
  if (allSelected.value) {
    modelValue.value = selectedDisabledOptions.value.map((option) => option.value)
  } else {
    const allValues = [...allEnabledOptions.value.map((option) => option.value), ...selectedDisabledOptions.value.map((option) => option.value)]
    modelValue.value = allValues
  }
}

function handleSelectAll(): void {
  if (!multiple) {
    return
  }

  const selectAllIndex = flatEnabledOptions.value.findIndex((option) => !isSelectOptionGroup(option) && isSelectAllValue(option.value))
  resetKeyboardNavigation(selectAllIndex !== -1 ? selectAllIndex : -1)
  toggleSelectAll()
}

function findGroupIndex(option: SelectOptionGroup<T>): number {
  return flatEnabledOptions.value.findIndex((opt) => isSelectOptionGroup(opt) && opt.label === option.label)
}

function handleDeselectAllGroup(option: SelectOptionGroup<T>): void {
  if (!multiple) {
    return
  }

  const groupIndex = findGroupIndex(option)
  resetKeyboardNavigation(groupIndex !== -1 ? groupIndex : -1)

  const enabledOptionValues = option.options.filter((opt) => !opt.disabled).map((opt) => opt.value)
  const newValue = Array.isArray(modelValue.value) ? modelValue.value.filter((value) => !enabledOptionValues.includes(value)) : []

  modelValue.value = newValue as T
}

function handleSelectAllGroup(option: SelectOptionGroup<T>): void {
  if (!multiple) {
    return
  }

  const groupIndex = findGroupIndex(option)
  resetKeyboardNavigation(groupIndex !== -1 ? groupIndex : -1)

  const currentValues = Array.isArray(modelValue.value) ? modelValue.value : []
  const optionValues = option.options.filter((opt) => !opt.disabled).map((opt) => opt.value)

  const newValue = Array.from(new Set([...currentValues, ...optionValues]))
  modelValue.value = newValue
}

function toggleGroup(option: SelectOptionGroup<T>): void {
  if (!multiple) {
    return
  }

  const enabledOptions = option.options.filter((opt) => !opt.disabled)
  const allGroupSelected =
    enabledOptions.length > 0 &&
    enabledOptions.every((opt) => {
      if (Array.isArray(modelValue.value)) {
        return modelValue.value.includes(opt.value)
      }
      return modelValue.value === opt.value
    })

  if (allGroupSelected) {
    handleDeselectAllGroup(option)
  } else {
    handleSelectAllGroup(option)
  }
}

const flatEnabledOptions = computed<(SelectOption<T | typeof SELECT_ALL_TOKEN> | SelectOptionGroup<T>)[]>(() => {
  const flatOptions = options.flatMap((option) => {
    if (isSelectOptionGroup(option)) {
      if (option.disabled) {
        return []
      }
      if (multiple) {
        return [option, ...option.options.filter((opt) => !opt.disabled)]
      }
      return option.options.filter((opt) => !opt.disabled)
    }
    return option.disabled ? [] : [option]
  })

  if (multiple) {
    return [{ label: 'Select all', value: SELECT_ALL_TOKEN }, ...flatOptions]
  }

  return flatOptions
})

const focusedIndex = ref<number>(-1)
const typeaheadBuffer = ref('')
const typeaheadTimeout = ref<number | null>(null)
const isKeyboardNavigating = ref(false)
const activeDescendantId = ref<string | undefined>(undefined)

watch(activeDescendantId, (activeId) => {
  if (comboboxElement) {
    if (activeId) {
      comboboxElement.setAttribute('aria-activedescendant', activeId)
    } else {
      comboboxElement.removeAttribute('aria-activedescendant')
    }
  }
})

function getOptionId(option: SelectOption<T | typeof SELECT_ALL_TOKEN> | SelectOptionGroup<T>): string {
  if (isSelectOptionGroup(option)) {
    return buildSelectOptionId(id, 'group', option.label)
  }
  if (isSelectAllValue(option.value)) {
    return buildSelectOptionId(id, 'option', 'select-all')
  }
  return buildSelectOptionId(id, 'option', option.value)
}

function updateActiveDescendant(index: number): void {
  if (index >= 0 && index < flatEnabledOptions.value.length) {
    focusedIndex.value = index
    const option = flatEnabledOptions.value[index]
    if (isKeyboardNavigating.value) {
      activeDescendantId.value = getOptionId(option)
    } else {
      activeDescendantId.value = undefined
    }
    scrollOptionIntoView(option)
  }
}

function scrollOptionIntoView(option: SelectOption<T | typeof SELECT_ALL_TOKEN> | SelectOptionGroup<T>): void {
  nextTick(() => {
    const optionElement = document.getElementById(getOptionId(option))
    if (optionElement && listboxElement.value) {
      const listboxRect = listboxElement.value.getBoundingClientRect()
      const optionRect = optionElement.getBoundingClientRect()

      if (optionRect.bottom > listboxRect.bottom) {
        optionElement.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      } else if (optionRect.top < listboxRect.top) {
        optionElement.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      }
    }
  })
}

function handleTypeahead(char: string): void {
  isKeyboardNavigating.value = true
  if (typeaheadTimeout.value !== null) {
    clearTimeout(typeaheadTimeout.value)
  }

  typeaheadBuffer.value += char.toLowerCase()

  const matchIndex = flatEnabledOptions.value.findIndex((option) => option.label?.toLowerCase().startsWith(typeaheadBuffer.value))

  if (matchIndex !== -1) {
    updateActiveDescendant(matchIndex)
  }

  typeaheadTimeout.value = window.setTimeout(() => {
    typeaheadBuffer.value = ''
  }, 500)
}

watch(isOpen, (newValue) => {
  if (newValue) {
    isKeyboardNavigating.value = false

    if (multiple || modelValue.value === undefined) {
      focusedIndex.value = -1
    } else {
      const selectedIndex = findOptionIndex(modelValue.value as T)
      focusedIndex.value = selectedIndex !== -1 ? selectedIndex : -1
    }

    nextTick(() => {
      filterInputElement.value = listboxElement.value?.querySelector('input[type="search"]') ?? null
    })
  } else {
    resetKeyboardNavigation()
    typeaheadBuffer.value = ''
    filterInputElement.value = null
    if (typeaheadTimeout.value !== null) {
      clearTimeout(typeaheadTimeout.value)
    }
  }
})

watch(
  () => options,
  () => {
    if (isOpen.value && flatEnabledOptions.value.length > 0) {
      isKeyboardNavigating.value = true
      updateActiveDescendant(0)
    }
  },
  { deep: true }
)

function handleTargetKeydown(event: KeyboardEvent): void {
  if (disabled) {
    return
  }

  const key = event.key

  if (key === 'Escape') {
    if (isOpen.value) {
      isOpen.value = false
      event.stopPropagation()
      event.preventDefault()
    }
    return
  }

  if (!isOpen.value) {
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End') {
      isOpen.value = true
      event.preventDefault()
      return
    }

    if (key.length === 1 && key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      isOpen.value = true
      event.preventDefault()
      return
    }
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (!isOpen.value) {
    return
  }

  const key = event.key
  const target = event.target as HTMLElement
  const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'

  if (key === 'Escape') {
    close()
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'ArrowDown') {
    isKeyboardNavigating.value = true
    if (event.altKey) {
      if (focusedIndex.value >= 0 && focusedIndex.value < flatEnabledOptions.value.length) {
        const option = flatEnabledOptions.value[focusedIndex.value]
        if (isSelectOptionGroup(option)) {
          toggleGroup(option)
          close()
        } else if (isSelectAllValue(option.value)) {
          handleSelectAll()
          close()
        } else {
          setSelectedThenClose(option.value, true)
        }
      }
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (isInputElement && filterInputElement.value) {
      updateActiveDescendant(0)
    } else {
      const nextIndex = Math.min(focusedIndex.value + 1, flatEnabledOptions.value.length - 1)
      updateActiveDescendant(nextIndex)
    }
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'ArrowUp') {
    if (event.altKey) {
      isKeyboardNavigating.value = true
      if (focusedIndex.value >= 0 && focusedIndex.value < flatEnabledOptions.value.length) {
        const option = flatEnabledOptions.value[focusedIndex.value]
        if (isSelectOptionGroup(option)) {
          toggleGroup(option)
          close()
        } else if (isSelectAllValue(option.value)) {
          handleSelectAll()
          close()
        } else {
          setSelectedThenClose(option.value, true)
        }
      }
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (isInputElement && focusedIndex.value === 0 && filterInputElement.value) {
      isKeyboardNavigating.value = false
      focusedIndex.value = -1
      activeDescendantId.value = undefined
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (isInputElement && focusedIndex.value === -1 && filterInputElement.value) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (focusedIndex.value === 0 && filterInputElement.value && !isInputElement) {
      isKeyboardNavigating.value = false
      filterInputElement.value.focus()
      focusedIndex.value = -1
      activeDescendantId.value = undefined
    } else {
      isKeyboardNavigating.value = true
      const prevIndex = focusedIndex.value === -1 ? flatEnabledOptions.value.length - 1 : Math.max(focusedIndex.value - 1, 0)
      updateActiveDescendant(prevIndex)
    }
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'Home') {
    isKeyboardNavigating.value = true
    if (isInputElement) {
      comboboxElement?.focus()
    }
    updateActiveDescendant(0)
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'End') {
    isKeyboardNavigating.value = true
    if (isInputElement) {
      comboboxElement?.focus()
    }
    updateActiveDescendant(flatEnabledOptions.value.length - 1)
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'PageDown') {
    isKeyboardNavigating.value = true
    if (isInputElement) {
      comboboxElement?.focus()
    }
    const nextIndex = Math.min(focusedIndex.value + 10, flatEnabledOptions.value.length - 1)
    updateActiveDescendant(nextIndex)
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'PageUp') {
    isKeyboardNavigating.value = true
    if (isInputElement) {
      comboboxElement?.focus()
    }
    const prevIndex = Math.max(focusedIndex.value - 10, 0)
    updateActiveDescendant(prevIndex)
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (key === 'Enter' || key === ' ') {
    if (isInputElement && key === ' ') {
      return
    }
    if (focusedIndex.value >= 0 && focusedIndex.value < flatEnabledOptions.value.length) {
      const option = flatEnabledOptions.value[focusedIndex.value]
      if (isSelectOptionGroup(option)) {
        toggleGroup(option)
      } else if (isSelectAllValue(option.value)) {
        toggleSelectAll()
      } else {
        setSelectedThenClose(option.value, true)
      }
      event.preventDefault()
      event.stopPropagation()
    }
    return
  }

  if (key === 'Tab') {
    if (!multiple && focusedIndex.value >= 0 && focusedIndex.value < flatEnabledOptions.value.length) {
      const option = flatEnabledOptions.value[focusedIndex.value]
      if (isSelectOptionGroup(option)) {
        toggleGroup(option)
      } else if (isSelectAllValue(option.value)) {
        handleSelectAll()
      } else {
        setSelected(option.value)
      }
    }
    close()
    event.preventDefault()
    nextTick(() => {
      comboboxElement?.focus()
    })
    return
  }

  if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !isInputElement) {
    handleTypeahead(key)
    event.preventDefault()
    event.stopPropagation()
  }
}

useEventListener(() => targetElement, 'keydown', handleTargetKeydown)

watch(
  isOpen,
  (open) => {
    if (open) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
.polly-options {
  position: fixed;
  --polly-options-base-option-height: 38px;
}

.polly-options__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) 0;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
}

.polly-options__container:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: -2px;
}

.polly-options--footer {
  background-color: var(--colors-background-common-white);
  border-top: 1px solid var(--colors-border-common-default);
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm);
  position: sticky;
  bottom: 0;
  transition: box-shadow ease-in-out 0.25s;
}

.polly-options__footer-apply {
  justify-content: center;
  flex-grow: 1;
}

.polly-options__empty-message {
  color: var(--colors-text-icon-primary-unavailable);
  display: flex;
  padding: var(--spacing-sm);
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
}

.polly-options .polly-popover__content {
  overflow: hidden;
  overflow-y: auto;
  padding: 0;
  max-width: 100%;
  width: fit-content;
  min-width: 100px;
}

.polly-options .polly-popover-content__body {
  padding: 0;
}

.polly-options .polly-modal-content__body {
  margin-inline: calc(-1 * var(--spacing-md));
}
</style>
