import { ValidationState } from '@/types/validation'

import { createPropsTypeWithGuard, RequiredConfig } from '@/utilities'

export type LabelPosition = 'left' | 'top' | 'right'

export type LabelProps = {
  label?: string
  message?: string
  state?: ValidationState
  labelPosition?: LabelPosition
  required?: boolean
  disabled?: boolean
}

export type LabelSlots = {
  default?(): unknown
  label?(): unknown
  message?(): unknown
}

export const labelPropsConfig: RequiredConfig<LabelProps> = {
  label: true,
  message: true,
  state: true,
  labelPosition: true,
  required: true,
  disabled: true,
} as const

const { keys: labelKeys, guard: isLabelProp } = createPropsTypeWithGuard<LabelProps>(labelPropsConfig)

export { labelKeys, isLabelProp }
