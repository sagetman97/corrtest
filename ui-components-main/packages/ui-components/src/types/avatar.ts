import { FontAwesomeIconProps } from './icon'

type IconSize = FontAwesomeIconProps['size']

export interface AvatarProps {
  size?: IconSize
  showStatus?: boolean
  fullName?: string
  variant?: 'default' | 'ai'
}

export interface AvatarSlots {
  image?(): unknown
}
