import { Ref, ref, watch, WatchStopHandle } from 'vue'

import { Theme } from '@/types'

import { useMedia } from '.'

export type UseTheme = {
  theme: Ref<Theme>
  toggle: () => void
  userPrefersDark: Ref<boolean>
}

const theme = ref<Theme>('default')
let unwatch: WatchStopHandle | null = null

export function useTheme(): UseTheme {
  const userPrefersDark = useMedia('(prefers-color-scheme: dark)')

  function toggle(): void {
    if (theme.value === 'default') {
      theme.value = 'dark'
    } else {
      theme.value = 'default'
    }
  }

  if (unwatch === null) {
    unwatch = watch(
      theme,
      (value) => {
        document.documentElement.dataset.theme = value
      },
      { immediate: true }
    )
  }

  return { theme, toggle, userPrefersDark }
}
