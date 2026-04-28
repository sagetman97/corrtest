import { AttrsValue, ClassValue } from './attributes'
import { LabelProps } from './label'

export type BaseInputProps = {
  prefix?: string
  suffix?: string
  invalid?: boolean
  disabled?: boolean
  highlighted?: boolean
  accent?: boolean
  dark?: boolean
  placeholder?: string
}

export type InputProps = LabelProps &
  BaseInputProps & {
    variant?: 'default' | 'simple'
  }

export type InputSlots = {
  default?: (props: { classes: ClassValue; attrs: AttrsValue }) => unknown
  prefix?(): unknown
  suffix?(): unknown
}
