import { BaseInputProps, LabelProps, PopoverPositionMethod } from '@/types'

import { RelativePosition } from '@/utilities'

export type SelectOption<T = unknown> = {
  label: string
  subLabel?: string
  value: T
  disabled?: boolean
  icon?: string
  variant?: 'primary' | 'destructive'
}

export type SelectOptionGroup<T = unknown> = {
  label?: string
  options: SelectOption<T>[]
  disabled?: boolean
  icon?: string
}

export function isSelectOptionGroup<T = unknown>(
  selectOptionOrSelectOptionGroup: SelectOption<T> | SelectOptionGroup<T>
): selectOptionOrSelectOptionGroup is SelectOptionGroup<T> {
  return 'options' in selectOptionOrSelectOptionGroup
}

// put here so that in the future we can consider more sophisticated equality function for comparing objects/arrays
export function selectOptionIsSelected<T>(option: SelectOption<T>, value: T | T[]): boolean {
  if (Array.isArray(value)) {
    return value.includes(option.value)
  }

  return option.value === value
}

export type SelectProps<T = unknown> = LabelProps &
  BaseInputProps & {
    options: (SelectOption<T> | SelectOptionGroup<T>)[]
    showInputIcons?: boolean
    showApply?: boolean
    placeholder?: string
    multiple?: boolean
    position?: RelativePosition
    filter?: boolean | FilterFunction<T>
    size?: 'default' | 'small'
    filterThreshold?: number
  } & (
    | {
        variant?: 'default' | 'simple'
        accent?: never
      }
    | {
        variant: 'minimal'
        accent?: boolean
        dark?: boolean
      }
  )

export type FilterFunction<T = unknown> = (option: SelectOption<T> | SelectOptionGroup<T>) => boolean

export type SelectEmits<T = unknown> = {
  'update:modelValue': [value: T | T[]]
  change: [value: T | T[]]
}

export type SelectIconSlotProps<T> =
  | { isOpen: boolean; option?: never; selected?: never }
  | { isOpen?: never; selected: boolean; option: SelectOption<T> | SelectOptionGroup<T> }

export type SelectSlots<T> = SelectOptionsSlots<T> & {
  default?: (scope: { value: T | T[]; displayValue: string }) => unknown
  targetIcon?: (scope: SelectIconSlotProps<T>) => unknown
  optionIcon?: (scope: SelectIconSlotProps<T>) => unknown
  option?: (scope: { option: SelectOption<T> | SelectOptionGroup<T>; selected: boolean; select: () => void; close: () => void }) => unknown
  label?: (scope: { selected: boolean; option: SelectOption<T> | SelectOptionGroup<T> }) => unknown
  overflow?: (scope: { count: number }) => unknown
}

export type SelectOptionsSlots<T = unknown> = SelectOptionSlots<T> & {
  emptyOptions?(): unknown
  filter?: () => unknown
  footer?: (scope: { value?: T | T[]; setSelected: (value: T) => void; close: () => void }) => unknown
}

export type SelectOptionProps<T = unknown> = {
  value: T | T[]
  option: SelectOption<T> | SelectOptionGroup<T>
  showInputIcons?: boolean
  multiple?: boolean
  listboxId?: string
  activeDescendantId?: string
}

export type SelectOptionSlots<T = unknown> = {
  option?: (scope: { option: SelectOption<T> | SelectOptionGroup<T>; selected: boolean; select: () => void; close: () => void }) => unknown
  label?: (scope: { option: SelectOption<T> | SelectOptionGroup<T>; selected: boolean }) => unknown
  icon?: (scope: { option: SelectOption<T> | SelectOptionGroup<T>; selected: boolean }) => unknown
}

export type SelectOptionsProps<T = unknown> = {
  modelValue: T | T[]
  options: (SelectOption<T> | SelectOptionGroup<T>)[]
  position: PopoverPositionMethod
  isOpen?: boolean
  showInputIcons?: boolean
  showApply?: boolean
  label?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  comboboxElement?: HTMLElement | null
  targetElement?: HTMLElement | null
}

export type SelectOptionsEmits<T = unknown> = {
  'update:modelValue': [value: T | T[]]
  'update:isOpen': [value: boolean]
  change: [value: T | T[]]
  close: []
}
