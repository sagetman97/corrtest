import { computed, Ref } from 'vue'

import { useMedia } from './useMedia'

type UseMobile = {
  isMobile: Ref<boolean>
  isTouchEnabled: Ref<boolean>
  isMobileWidth: Ref<boolean>
  isTabletWidth: Ref<boolean>
  isLaptopWidth: Ref<boolean>
  isDesktopWidth: Ref<boolean>
}

export function useMobile(): UseMobile {
  const hover = useMedia('(hover: none)')
  const coarse = useMedia('(pointer: coarse)')
  const isMobileWidth = useMedia('(max-width: 669px)')
  const isTabletWidth = useMedia('(min-width: 670px) and (max-width: 1023px)')
  const isLaptopWidth = useMedia('(min-width: 1024px) and (max-width: 1279px)')
  const isDesktopWidth = useMedia('(min-width: 1280px)')

  const isTouchEnabled = computed(() => {
    return hover.value || coarse.value
  })

  const isMobile = computed(() => isMobileWidth.value || isTouchEnabled.value)

  return {
    isMobile,
    isTabletWidth,
    isLaptopWidth,
    isDesktopWidth,
    isTouchEnabled,
    isMobileWidth,
  }
}
