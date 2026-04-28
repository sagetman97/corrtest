import { LabelProps, LabelSlots } from './label'

export type ToggleProps = LabelProps & {
  modelValue: boolean | null | undefined
  disabled?: boolean
}

export type ToggleSlots = LabelSlots & {
  icon?: (props: { selected: boolean }) => unknown
}
