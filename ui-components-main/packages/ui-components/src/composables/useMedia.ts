import { ref, Ref, unref, watch } from 'vue'

import { tryOnScopeDispose } from '@/utilities'

export function useMedia(query: Ref<string> | string): Ref<boolean> {
  const mediaQuery = ref(window.matchMedia(unref(query)))
  const queryRef = ref(query)
  const matches = ref(mediaQuery.value.matches)

  function updateMatches(event: MediaQueryListEvent): void {
    matches.value = event.matches
  }

  mediaQuery.value.addEventListener('change', updateMatches)

  const unwatch = watch(queryRef, () => {
    mediaQuery.value.removeEventListener('change', updateMatches)
    mediaQuery.value = window.matchMedia(unref(query))
    mediaQuery.value.addEventListener('change', updateMatches)
  })

  tryOnScopeDispose(() => {
    mediaQuery.value.removeEventListener('change', updateMatches)

    unwatch()
  })

  return matches
}
