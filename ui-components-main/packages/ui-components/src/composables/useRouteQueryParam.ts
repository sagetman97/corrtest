import { computed, Ref } from 'vue'
import { LocationQueryValue, useRoute, useRouter } from 'vue-router'

export function useRouteQueryParam(key: string): Ref<string | undefined>
export function useRouteQueryParam(key: string, defaultValue: string): Ref<string>
export function useRouteQueryParam(key: string, defaultValue?: string): Ref<string | undefined> {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get() {
      return normalizeQueryValue(route.query[key]) ?? defaultValue
    },
    set(value) {
      const { params, query, hash } = route

      router.push({
        params,
        hash,
        query: { ...query, [key]: value },
      })
    },
  })
}

function normalizeQueryValue(value: LocationQueryValue | LocationQueryValue[]): LocationQueryValue {
  if (Array.isArray(value)) {
    throw new Error('useRouteQueryParams expected single value')
  }

  return value
}
