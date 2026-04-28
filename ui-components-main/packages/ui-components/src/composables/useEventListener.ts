import { MaybeRefOrGetter, toValue, watch } from 'vue'

import { tryOnScopeDispose } from '@/utilities'

export type UseEventListener = {
  add: () => void
  remove: () => void
}

export function useEventListener<K extends keyof WindowEventMap>(
  window: Window,
  key: K,
  callback: (this: Document, event: WindowEventMap[K]) => unknown,
  options?: AddEventListenerOptions
): UseEventListener
export function useEventListener<K extends keyof DocumentEventMap>(
  target: MaybeRefOrGetter<Document | undefined | null>,
  key: K,
  callback: (this: Document, event: DocumentEventMap[K]) => unknown,
  options?: AddEventListenerOptions
): UseEventListener
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<Element | undefined | null>,
  key: K,
  callback: (this: Element, event: HTMLElementEventMap[K]) => unknown,
  options?: AddEventListenerOptions
): UseEventListener
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<HTMLDivElement | undefined | null>,
  key: K,
  callback: (this: Element, event: HTMLElementEventMap[K]) => unknown,
  options?: AddEventListenerOptions
): UseEventListener
export function useEventListener<K extends string>(
  targetOrWindow: MaybeRefOrGetter<Window | Node | undefined | null>,
  key: K,
  callback: (this: Node, event: Event) => unknown,
  options: AddEventListenerOptions = {}
): UseEventListener {
  function addEventListener(): void {
    toValue(targetOrWindow)?.addEventListener(key, callback, options)
  }

  function removeEventListener(): void {
    toValue(targetOrWindow)?.removeEventListener(key, callback, options)
  }

  tryOnScopeDispose(removeEventListener)

  watch(
    () => toValue(targetOrWindow),
    () => {
      removeEventListener()
      addEventListener()
    },
    { immediate: true }
  )

  return {
    add: () => {
      addEventListener()
    },
    remove: () => {
      removeEventListener()
    },
  }
}
