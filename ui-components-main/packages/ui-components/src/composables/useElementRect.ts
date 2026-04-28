import { ref, Ref, watch } from 'vue'

import { useEventListener, useResizeObserver } from '@/composables'
import { nodeIsElement } from '@/utilities'

export type UseElementRect = {
  value: Ref<DOMRect>
  check: () => void
}

export function useElementRect(element: Element | Ref<Element | null | undefined>): UseElementRect {
  const elementRef = ref(element)
  const elementRect = ref(new DOMRect())

  function observerCallback([entry]: { target: Node }[]): void {
    if (nodeIsElement(entry.target)) {
      updateElementRect(entry.target)
    }
  }

  function check(): void {
    if (elementRef.value) {
      updateElementRect(elementRef.value)
    }
  }

  function updateElementRect(element: Element): void {
    const rect = element.getBoundingClientRect()
    const updated = rect ?? new DOMRect()

    elementRect.value = updated
  }

  function getScrollableParents(element: Element) {
    const parents: Element[] = []
    let parent = element.parentNode

    while (!!parent && nodeIsElement(parent)) {
      const overflowY = window.getComputedStyle(parent, null).getPropertyValue('overflow-y')
      const isScrollable = ['auto', 'scroll'].includes(overflowY)

      if (isScrollable) {
        parents.push(parent)
      }

      parent = parent.parentNode
    }

    return parents
  }

  const observer = useResizeObserver(observerCallback)

  const removeEventListeners = ref<(() => void)[]>([])

  function setEventListeners(elements: Element[]): void {
    removeEventListeners.value.forEach((remove) => remove())
    removeEventListeners.value = elements.map((parent) => {
      const { add, remove } = useEventListener(parent, 'scroll', check)

      add()

      return remove
    })
  }

  watch(
    elementRef,
    (element) => {
      if (element) {
        const scrollableParents = getScrollableParents(element)
        setEventListeners(scrollableParents)

        updateElementRect(element)

        observer.disconnect()
        observer.observe(elementRef)
      }
    },
    { immediate: true }
  )

  return {
    value: elementRect,
    check,
  }
}
