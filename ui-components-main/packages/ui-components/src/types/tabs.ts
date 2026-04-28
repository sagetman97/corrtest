import { KebabCase } from 'string-ts'

export type Tab<T = unknown> = {
  label: string
  value: T
  count?: number
  disabled?: boolean
  variant?: 'default' | 'ai'
}

export type TabsetProps<T extends Tab[], TValue = T[number]['value']> = {
  selected: TValue
  tabs: T
  showCounts?: boolean
  secondary?: boolean
}

export type TabProps = {
  selected: unknown
  tab: Tab
  showCount?: boolean
}

export type TabsetEmits<T extends Tab[], TValue = T[number]['value']> = {
  'update:selected': [value: TValue]
}

export type TabsetSlots<T extends Tab[], TLabel extends string = T[number]['label'] | `${T[number]['label']}-header`> = {
  [K in TLabel as KebabCase<K>]?: (props: { selected: boolean }) => unknown
}

export function tabIsSelected<T>(tab: Tab, value: T): boolean {
  return tab.value === value
}
