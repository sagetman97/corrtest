import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'
import { RouteLocation, RouteLocationRaw, useRoute, useRouter } from 'vue-router'

import { Tab } from '@/types'

export type RouteTab = Omit<Tab, 'value'> & {
  route: RouteLocationRaw
}

export type UseTabRoutes = {
  tabs: Ref<Tab<RouteLocation>[]>
  selected: Ref<RouteLocation>
}

export function useTabRoutes(tabs: MaybeRefOrGetter<RouteTab[]>): UseTabRoutes {
  const route = useRoute()
  const router = useRouter()

  const routerTabs = computed<Tab<RouteLocation>[]>(() =>
    toValue(tabs).map((tab) => {
      return {
        ...tab,
        value: router.resolve(tab.route),
      }
    })
  )

  const selected = computed<RouteLocation>({
    get() {
      return routerTabs.value.find((tab) => tab.value.fullPath === route.fullPath)?.value ?? route
    },
    set(value) {
      router.push(value)
    },
  })

  return {
    tabs: routerTabs,
    selected,
  }
}
