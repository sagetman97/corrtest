import { IconProps } from './icon'

export type ChipVariant = 'primary' | 'white' | 'gray' | 'accent'

export type ChipProps = IconProps & {
  variant?: ChipVariant
  label?: string
  disabled?: boolean
  dismissible?: boolean
}

export type ChipSlots = {
  icon?(): unknown
  default?(): unknown
}
