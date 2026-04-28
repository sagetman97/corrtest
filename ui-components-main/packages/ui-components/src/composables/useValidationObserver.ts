import { computed, ComputedRef, inject, provide, reactive, UnwrapNestedRefs } from 'vue'

import { BaseIssue } from 'valibot'

import { Nullable } from '@/types/nullable'
import { VALIDATION_OBSERVER_INJECTION_KEY } from '@/types/validation'

import { tryOnScopeDispose } from '@/utilities/scope'
import { BaseUseValidation } from './useValidation'

export type UseValidationObserver = {
  register: (validation: BaseUseValidation) => () => void
  issues: ComputedRef<BaseIssue<unknown>[]>
  isValid: ComputedRef<boolean>
  clear: () => void
  validate: (values: Nullable<Partial<unknown>>) => Promise<boolean>
}

export function useValidationObserver(): UseValidationObserver {
  const parent = inject(VALIDATION_OBSERVER_INJECTION_KEY, undefined)
  const registeredValidationInstances: Map<symbol, UnwrapNestedRefs<BaseUseValidation>> = reactive(new Map())
  const unregisters = reactive<(() => void)[]>([])

  function register(validation: BaseUseValidation): () => void {
    const key = Symbol()
    registeredValidationInstances.set(key, reactive(validation))

    const parentUnregister = parent?.register(validation)

    const unregister = () => {
      registeredValidationInstances.delete(key)
      parentUnregister?.()
    }

    unregisters.push(unregister)

    return unregister
  }

  function clear(): void {
    for (const validationInstance of registeredValidationInstances.values()) {
      validationInstance.clear()
    }
  }

  function validate(values: Nullable<Partial<unknown>>): Promise<boolean> {
    const promises = Array.from(registeredValidationInstances.values()).map((validationInstance) => validationInstance.validate(values))

    return Promise.all(promises).then((results) => results.every((isValid) => isValid))
  }

  const issues = computed(() => {
    return Array.from(registeredValidationInstances.values())
      .flatMap((validationInstance) => validationInstance.issues)
      .filter((issues) => !!issues)
  })

  const isValid = computed(() => {
    return Array.from(registeredValidationInstances.values()).every((validationInstance) => validationInstance.isValid)
  })

  tryOnScopeDispose(() => {
    unregisters.forEach((unregister) => unregister())
  })

  const observer: UseValidationObserver = {
    register,
    issues,
    isValid,
    clear,
    validate,
  }

  provide(VALIDATION_OBSERVER_INJECTION_KEY, observer)

  return observer
}
