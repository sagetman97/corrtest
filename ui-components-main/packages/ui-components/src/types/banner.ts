import { IconProps } from './icon'

export type BannerProps = Partial<IconProps> & {
  message?: string
  title?: string
  variant?: 'info' | 'warning' | 'error' | 'success' | 'outline' | 'neutral' | 'ai' | 'custom'
  bannerSize?: 'default' | 'small'
  stackedActions?: boolean
  showClose?: boolean
}

export interface BannerEmits {
  close: []
}

export type BannerSlots = {
  container?: () => unknown
  icon?: () => unknown
  title?: () => unknown
  message?: () => unknown
  content?: () => unknown
  expansion?: () => unknown
  actions?: () => unknown
  close?: (scope: { close: () => void }) => unknown
}
