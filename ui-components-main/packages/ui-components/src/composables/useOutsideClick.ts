import { Ref, ref } from 'vue'

import { useEventListener } from '@/composables'
import { nodeContainsTarget } from '@/utilities'

export function useOutsideClick(element: HTMLElement | Ref<HTMLElement | null | undefined>, callback: (event: Event) => void) {
  const elementRef = ref(element)

  useEventListener(document, 'click', (event) => {
    if (elementRef.value && nodeContainsTarget(elementRef.value, event)) {
      return
    }

    callback(event)
  })
}
