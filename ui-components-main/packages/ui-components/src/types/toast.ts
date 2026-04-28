import { Component } from 'vue'

import { IconProps } from '@/types/icon'

export type ToastOptions = Partial<IconProps> & {
  message: string
  title?: string
  duration?: number
  dismissible?: boolean
}

export type ToastCustomOptions = {
  message: Component
  duration?: number
}

export function isCustomToast(toast: Toast): toast is ToastCustomOptions & {
  id: string
} {
  return typeof toast.message !== 'string'
}

export type Toast = (ToastOptions | ToastCustomOptions) & {
  id: string
  timer?: ReturnType<typeof setTimeout>
}

export type ToastProps = Partial<IconProps> & {
  id: string
  message?: string
  title?: string
  dismissible?: boolean
}

export type ToastSlots = {
  default: unknown
  icon: unknown
  close?: (props: { close: () => void }) => unknown
}

export type ToastEmits = {
  'dismiss-toast': [value?: number]
}
