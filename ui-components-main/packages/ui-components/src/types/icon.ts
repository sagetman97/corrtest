import { createPropsTypeWithGuard, RequiredConfig } from '@/utilities'
import { ClassValue } from './attributes'

export type FaStyle = 'regular' | 'solid' | 'light' | 'thin' | 'brands'

export type IconFamily = 'classic' | 'duotone' | 'sharp-duotone' | 'sharp' | 'kit' | 'kit-duotone'

export type FontAwesomeIconProps = {
  border?: boolean
  fixedWidth?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  icon?: string
  mask?: object | Array<string> | string
  listItem?: boolean
  pull?: 'right' | 'left'
  pulse?: boolean
  rotation?: 90 | 180 | 270 | '90' | '180' | '270'
  swapOpacity?: boolean
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '1x' | '2x' | '2_5x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' | 'auto'
  spin?: boolean
  transform?: object | string
  symbol?: boolean | string
  inverse?: boolean
  bounce?: boolean
  shake?: boolean
  beat?: boolean
  fade?: boolean
  beatFade?: boolean
  spinPulse?: boolean
  spinReverse?: boolean
}

export type IconProps = FontAwesomeIconProps & {
  faStyle?: FaStyle
  family?: IconFamily
  iconClasses?: ClassValue
}

export const iconPropsConfig: RequiredConfig<IconProps> = {
  faStyle: true,
  family: true,
  iconClasses: true,
  border: true,
  fixedWidth: true,
  flip: true,
  icon: true,
  mask: true,
  listItem: true,
  pull: true,
  pulse: true,
  rotation: true,
  swapOpacity: true,
  size: true,
  spin: true,
  transform: true,
  symbol: true,
  inverse: true,
  bounce: true,
  shake: true,
  beat: true,
  fade: true,
  beatFade: true,
  spinPulse: true,
  spinReverse: true,
} as const

const { keys: iconKeys, guard: isIconProp } = createPropsTypeWithGuard<IconProps>(iconPropsConfig)

export { iconKeys, isIconProp }
