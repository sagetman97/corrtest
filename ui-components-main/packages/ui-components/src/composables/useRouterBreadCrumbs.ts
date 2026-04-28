import { useRoute, useRouter } from 'vue-router'

import { Crumb } from '@/types'

export function useRouterBreadCrumbs(): Crumb[] {
  const route = useRoute()
  const { resolve } = useRouter()
  const params = route.params
  return route?.matched.map(({ name, path, meta }) => {
    return {
      ...meta.crumb,
      label: (meta.crumb && meta.crumb.label) ?? String(name) ?? '',
      path: path === route.path ? '' : resolve({ name, params }),
    }
  })
}
