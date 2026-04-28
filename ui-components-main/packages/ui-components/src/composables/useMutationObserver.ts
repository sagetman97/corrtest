import { onMounted, onUnmounted, ref, Ref } from 'vue'

export type UseMutationObserverResponse = {
  observe: (element: Element | Ref<Element | null | undefined>, options: MutationObserverInit) => void
  disconnect: () => void
  check: (element: Element | Ref<Element | null | undefined>) => void
}

export function useMutationObserver(callback: MutationCallback): UseMutationObserverResponse {
  let mutationObserver: MutationObserver | null = null

  const observe: UseMutationObserverResponse['observe'] = (element, options) => {
    const elementRef = ref(element)
    const observer = getObserver()

    if (elementRef.value) {
      observer.observe(elementRef.value, options)
    }
  }

  const disconnect: UseMutationObserverResponse['disconnect'] = () => {
    const observer = getObserver()

    observer.disconnect()
  }

  const check: UseMutationObserverResponse['check'] = (element) => {
    const elementRef = ref(element)
    if (!elementRef.value) {
      return
    }

    const observer = new MutationObserver(callback)

    // Add default options to ensure at least one observation type is enabled
    observer.observe(elementRef.value, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    setTimeout(() => observer.disconnect(), 100)
  }

  function getObserver(): MutationObserver {
    if (!mutationObserver) {
      createObserver()
    }

    return mutationObserver!
  }

  function createObserver(): void {
    mutationObserver = new MutationObserver(callback)
  }

  onMounted(() => {
    createObserver()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    observe,
    disconnect,
    check,
  }
}
