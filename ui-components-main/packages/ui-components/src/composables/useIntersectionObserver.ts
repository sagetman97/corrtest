import { MaybeRef, MaybeRefOrGetter, onMounted, onUnmounted, ref, Ref, toValue, unref, watch } from 'vue'

export type UseIntersectionObserverResponse = {
  observe: (element: MaybeRefOrGetter<HTMLElement | null | undefined>) => void
  unobserve: (element: MaybeRefOrGetter<HTMLElement | null | undefined>) => void
  disconnect: () => void
  check: (element: MaybeRefOrGetter<HTMLElement | null | undefined>) => void
}

export type UseIntersectionObserverOptions = {
  root?: Element | Document | null | Ref<Element | null>
  rootMargin?: string
  threshold?: number | number[]
}

export type UseIntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void

export function useIntersectionObserver(
  callback: UseIntersectionObserverCallback,
  options: MaybeRef<UseIntersectionObserverOptions> = {}
): UseIntersectionObserverResponse {
  const optionsRef = ref(options)
  const elements = new Set<HTMLElement>()

  let intersectionObserver: IntersectionObserver | null = null

  const observe: UseIntersectionObserverResponse['observe'] = (element) => {
    const value = toValue(element)
    const observer = getObserver()

    if (value) {
      observer.observe(value)
      elements.add(value)
    }
  }

  const unobserve: UseIntersectionObserverResponse['unobserve'] = (element) => {
    const value = toValue(element)
    const observer = getObserver()

    if (value) {
      observer.unobserve(value)
      elements.delete(value)
    }
  }

  const disconnect: UseIntersectionObserverResponse['disconnect'] = () => {
    const observer = getObserver()

    observer.disconnect()
    elements.clear()
  }

  const check: UseIntersectionObserverResponse['check'] = (element) => {
    const value = toValue(element)

    if (!value) {
      return
    }

    const { root, rootMargin, threshold } = optionsRef.value
    const observer = new IntersectionObserver(callback, {
      root: unref(root),
      rootMargin,
      threshold,
    })

    observer.observe(value)

    setTimeout(() => observer.disconnect(), 100)
  }

  function getObserver(): IntersectionObserver {
    if (!intersectionObserver) {
      createObserver()
    }

    return intersectionObserver!
  }

  function createObserver(): void {
    if (intersectionObserver) {
      intersectionObserver.disconnect()
    }

    const { root, rootMargin, threshold } = optionsRef.value
    intersectionObserver = new IntersectionObserver(callback, {
      root: unref(root),
      rootMargin,
      threshold,
    })

    elements.forEach((element) => intersectionObserver!.observe(element))
  }

  onMounted(() => {
    createObserver()
  })

  onUnmounted(() => {
    disconnect()
  })

  watch(optionsRef, () => {
    createObserver()
  })

  return {
    observe,
    disconnect,
    unobserve,
    check,
  }
}
