import { computed, Ref } from 'vue'

import { useMedia } from './useMedia'

export function useAccessible(): Ref<boolean> {
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)')
  const extraContrast = useMedia('(prefers-contrast: more)')

  return computed(() => {
    return reducedMotion.value || extraContrast.value
  })
}
