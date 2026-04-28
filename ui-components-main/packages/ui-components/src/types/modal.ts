import { PopoverProps, StyleValue } from '@/types'

export type ModalPositionMethod = () => StyleValue

export type ModalProps = Omit<PopoverProps, 'position' | 'variant'> & {
  position?: ModalPositionMethod
  title?: string
  subtitle?: string
  cancelText?: string
  showBack?: boolean
  backText?: string
  variant?: 'default' | 'ai'
  keep?: boolean
  hideClose?: boolean
  size?: 'default' | 'small' | 'xs' | 'large' | 'xl' | 'full'
}

export type ModalSlots = {
  content?: (props: { close: () => void }) => unknown
  actions?: (props: { close: () => void }) => unknown
  close?: (props: { close: () => void }) => unknown
  title?: (props: { close: () => void }) => unknown
  subtitle?: (props: { close: () => void }) => unknown
  default?: (props: { close: () => void }) => unknown
  footer?: (props: { close: () => void; cancelText?: string }) => unknown
  target?: (props: { toggle: () => void; open: () => void; close: () => void; isOpen: boolean }) => unknown
}
