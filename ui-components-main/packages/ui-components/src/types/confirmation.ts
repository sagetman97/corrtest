import { IconProps } from '@/types/icon'

import { ButtonProps } from './button'
import { ModalProps } from './modal'

export type ConfirmationOptions = Partial<IconProps> & {
  id?: string
  title?: string
  confirmText?: string
  confirmVariant?: ButtonProps['variant']
  cancelText?: string
  cancelVariant?: ButtonProps['variant']
  showClose?: boolean
  modalSize?: ModalProps['size']
}

export type Confirmation = ConfirmationOptions & {
  id: string
  message: string
  isOpen: boolean
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

export type ConfirmationProps = Partial<IconProps> & {
  id: string
  message?: string
  title?: string
  dismissible?: boolean
}

export type ConfirmationSlots = {
  default: unknown
  icon: unknown
  close?: (props: { close: () => void }) => unknown
}

export type ConfirmationEmits = {
  'dismiss-confirmation': [value?: number]
}
