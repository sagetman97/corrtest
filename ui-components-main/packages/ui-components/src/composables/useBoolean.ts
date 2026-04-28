import { computed, isRef, MaybeRefOrGetter, ref, Ref, toValue } from 'vue'

export type UseBoolean = {
  state: Ref<boolean>
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export function useBoolean(initialValue?: MaybeRefOrGetter<boolean | undefined>): UseBoolean {
  const refValue: Ref<boolean | undefined> = isRef(initialValue) ? initialValue : ref(toValue(initialValue))

  const state = computed({
    get() {
      return refValue.value ?? false
    },
    set(value) {
      refValue.value = value
    },
  })

  return {
    state,
    toggle: () => (state.value = !state.value),
    setTrue: () => (state.value = true),
    setFalse: () => (state.value = false),
  }
}
