import { IconProps } from '@/types'

export type BadgeProps = Partial<IconProps> & {
  variant?: 'primary' | 'medium' | 'basic' | 'positive' | 'negative' | 'new' | 'highlight' | 'unavailable' | 'success' | 'warning' | 'error' | 'info'
  label?: string
  iconPosition?: 'left' | 'right'
}

export type BadgeSlots = {
  default?(): unknown
  icon?(): unknown
}
