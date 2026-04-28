import { type LabelProps } from './label'

export type CheckboxProps = LabelProps & {
  modelValue: boolean | null | undefined
  disabled?: boolean
  indeterminate?: boolean
  tabindex?: number
}
