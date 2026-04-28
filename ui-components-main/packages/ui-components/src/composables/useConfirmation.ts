import { nextTick, reactive } from 'vue'

import { Confirmation, ConfirmationOptions } from '@/types'

import { randomId } from '@/utilities'

export const confirmations = reactive(new Map<string, Confirmation>())

type UseConfirmation = {
  confirm: (message?: string, options?: ConfirmationOptions) => Promise<boolean>
  clear: (id: string) => void
  open: (id: string) => void
  close: (id: string) => void
}

export function useConfirmation(): UseConfirmation {
  const confirm: UseConfirmation['confirm'] = async (message, options = {}) => {
    const id = options.id ?? randomId()

    return new Promise<boolean>((resolve) => {
      confirmations.set(id, {
        modalSize: 'default',
        ...options,
        id,
        resolve,
        message: message ?? 'Are you sure?',
        isOpen: false,
        showClose: true,
      })
      nextTick(() => {
        open(id)
      })
    }).then((answer) => {
      close(id)

      return answer
    })
  }

  const clear: UseConfirmation['clear'] = (id) => {
    const confirm = confirmations.get(id)

    if (confirm) {
      confirm.resolve(false)
      close(id)
    }
  }

  const close = (id: string) => {
    const confirm = confirmations.get(id)

    if (confirm) {
      confirm.isOpen = false

      nextTick(() => {
        confirmations.delete(id)
      })
    }
  }

  const open = (id: string) => {
    const confirm = confirmations.get(id)

    if (confirm) {
      confirm.isOpen = true
    }
  }

  return {
    confirm,
    clear,
    open,
    close,
  }
}
