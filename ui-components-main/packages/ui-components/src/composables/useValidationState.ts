import { MaybeRefOrGetter, Ref, ref, toValue, watch } from 'vue'

import { ValidationState } from '@/types'

export type UseValidationState = {
  isInvalid: Ref<boolean>
}

export function useValidationState(state: MaybeRefOrGetter<ValidationState | undefined>, value?: MaybeRefOrGetter<unknown>): UseValidationState {
  const isInvalid = ref(false)

  watch(
    () => toValue(state),
    (state) => {
      isInvalid.value = state === 'errored'
    },
    { immediate: true }
  )

  watch(
    () => toValue(value),
    () => {
      isInvalid.value = false
    }
  )

  return { isInvalid }
}
