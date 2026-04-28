import { ref, Ref, watch } from 'vue'

import { useMutationObserver, useResizeObserver } from '@/composables'
import { getWindowComputedStyle, nodeIsElement } from '@/utilities'

export function useComputedStyle(
  element: Element | Ref<Element | null | undefined>,
  key: keyof CSSStyleDeclaration & string,
  pseudoElt?: string | null | undefined
): Ref<string | undefined> {
  const elementRef = ref(element)
  const initialStyle = getWindowComputedStyle(elementRef.value ?? undefined, pseudoElt)

  const style = ref(initialStyle?.getPropertyValue(key))

  function observerCallback([entry]: { target: Node }[]): void {
    if (nodeIsElement(entry.target)) {
      updateStyleRef(entry.target)
    }
  }

  function updateStyleRef(element: Element): void {
    const computedStyle = getWindowComputedStyle(element)

    if (computedStyle) {
      style.value = computedStyle.getPropertyValue(key)
    }
  }

  const mutationObserver = useMutationObserver(observerCallback)
  const resizeObserver = useResizeObserver(observerCallback)

  watch(
    elementRef,
    (element) => {
      if (element) {
        updateStyleRef(element)

        mutationObserver.disconnect()
        mutationObserver.observe(elementRef, {
          attributes: true,
        })
        resizeObserver.disconnect()
        resizeObserver.observe(elementRef)
      }
    },
    { immediate: true }
  )

  return style
}
