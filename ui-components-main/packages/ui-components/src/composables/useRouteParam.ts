import { computed, Ref } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteParam(param: string, useFirstIfArray?: true): Ref<string>
export function useRouteParam(param: string, useFirstIfArray: false): Ref<string | string[]>
export function useRouteParam(param: string, useFirstIfArray = true): Ref<string | string[]> {
  const route = useRoute()

  return computed(() => {
    const paramValue = route.params[param]

    if (useFirstIfArray && Array.isArray(paramValue) && paramValue.length) {
      const [first] = paramValue

      return first
    }

    return paramValue
  })
}
