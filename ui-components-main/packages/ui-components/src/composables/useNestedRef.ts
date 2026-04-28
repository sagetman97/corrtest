import { computed, Ref } from 'vue'

export function useNestedRef<TData extends Record<PropertyKey, unknown>, TKey extends keyof TData>(data: Ref<TData>, key: TKey): Ref<TData[TKey]> {
  return computed({
    get() {
      return data.value[key]
    },
    set(value) {
      data.value = {
        ...data.value,
        [key]: value,
      }
    },
  })
}
