import { markRaw, reactive } from 'vue'

import { isCustomToast, Toast, ToastCustomOptions, ToastOptions } from '@/types'

import { randomId } from '@/utilities'

const toasts = reactive<Toast[]>([])

type UseToast = {
  notify: (options: ToastOptions | ToastCustomOptions) => () => void
  dismiss: (id: string) => void
  stopTimer: (id: string) => void
  startTimer: (id: string) => void
  toasts: Toast[]
  clearToasts: () => void
}

export function useToast(): UseToast {
  const notify: UseToast['notify'] = (options) => {
    const toast = withRawComponent({
      ...options,
      id: randomId(),
    })

    if (options.duration && options.duration > 0) {
      toast.timer = setTimeout(() => {
        dismiss(toast.id)
      }, options.duration)
    }

    toasts.push(toast)

    return () => dismiss(toast.id)
  }

  const dismiss: UseToast['dismiss'] = (id) => {
    const index = toasts.findIndex((toast) => toast.id === id)

    if (index > -1) {
      clearTimeout(toasts[index]?.timer)
      toasts.splice(index, 1)
    }
  }

  const stopTimer: UseToast['stopTimer'] = (id: string) => {
    const toast = toasts.find((toast) => toast.id === id)

    clearTimeout(toast?.timer)
  }

  const startTimer: UseToast['startTimer'] = (id: string) => {
    const toast = toasts.find((toast) => toast.id === id)

    if (toast) {
      toast.timer = setTimeout(() => dismiss(id), toast.duration)
    }
  }

  function clearToasts() {
    toasts.length = 0
  }

  return {
    notify,
    dismiss,
    startTimer,
    stopTimer,
    toasts,
    clearToasts,
  }
}

function withRawComponent(toast: Toast): Toast {
  if (isCustomToast(toast)) {
    return {
      ...toast,
      message: markRaw(toast.message),
    }
  }

  return toast
}
