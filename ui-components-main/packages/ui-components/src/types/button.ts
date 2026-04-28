import { RouteLocationRaw } from 'vue-router'

import { IconProps, iconPropsConfig } from '@/types/icon'

import { createPropsTypeWithGuard, RequiredConfig } from '@/utilities'

export type ButtonProps = Partial<IconProps> & {
  variant?: 'primary' | 'accent' | 'error' | 'ai' | 'ai-light'
  outline?: boolean
  text?: boolean
  round?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  to?: RouteLocationRaw
  isLoading?: boolean
  loadingText?: string
  lite?: boolean
  expand?: boolean
}

export const buttonPropsConfig: RequiredConfig<ButtonProps> = {
  ...iconPropsConfig,
  variant: true,
  outline: true,
  text: true,
  round: true,
  size: true,
  iconPosition: true,
  disabled: true,
  to: true,
  isLoading: true,
  loadingText: true,
  lite: true,
  expand: true,
} as const

const { keys: buttonKeys, guard: isButtonProp } = createPropsTypeWithGuard<ButtonProps>(buttonPropsConfig)

export { buttonKeys, isButtonProp }

export type IconButtonProps = Partial<IconProps> & Pick<ButtonProps, 'disabled' | 'size'>
