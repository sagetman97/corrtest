import { computed, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useScrollableQuery(): Ref<boolean> {
  const router = useRouter()
  const route = useRoute()

  return computed({
    get() {
      if (route.query && 'scrollable' in route.query && !!route.query.scrollable) {
        return true
      }

      return false
    },
    set(value) {
      router.push({ query: { scrollable: value ? 'true' : undefined } })
    },
  })
}
