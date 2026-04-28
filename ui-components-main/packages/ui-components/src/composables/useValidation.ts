import { MaybeRef, provide, Ref, ref } from 'vue'

import * as v from 'valibot'

import { AnySchema, AnySchemaAsync, Nullable, VALIDATION_INJECTION_KEY, VALIDATION_OBSERVER_INJECTION_KEY } from '@/types'

import { injectFromSelfOrAncestor } from '@/utilities/injection'
import { tryOnScopeDispose } from '@/utilities/scope'

type SchemaInput<TSchema extends AnySchema | AnySchemaAsync> = Nullable<Partial<v.InferInput<TSchema>>>
type ValidationOptions = { silent: boolean }

export type BaseUseValidation = {
  isValid: Ref<undefined | boolean>
  issues: Ref<v.BaseIssue<unknown>[]>
  pending: Ref<boolean>
  clear: () => void
  abort: () => void
  signal: () => AbortSignal
  validate: (values: SchemaInput<AnySchema | AnySchemaAsync>, options?: ValidationOptions) => boolean | Promise<boolean>
  parse: (values: SchemaInput<AnySchema | AnySchemaAsync>) => v.InferOutput<AnySchema | AnySchemaAsync> | Promise<v.InferOutput<AnySchema | AnySchemaAsync>>
}

export type UseValidationOptions<TSchema extends AnySchema | AnySchemaAsync> = {
  /*
    When isolated is `true`, this validation instance will NOT report it's state to parent validation observers
    This also means you won't be able to rely on `useValidationField` to pull state and message. Instead isolated 
    instances should use `getValidationField()`.
  */
  isolated?: boolean
  config?: v.Config<v.InferIssue<TSchema>>
}

export type UseValidation<TSchema extends AnySchema | AnySchemaAsync> = TSchema extends { async: true }
  ? Omit<BaseUseValidation, 'validate' | 'parse'> & {
      validate: (values: SchemaInput<TSchema>, options?: ValidationOptions) => Promise<boolean>
      parse: (values: SchemaInput<TSchema>) => Promise<v.InferOutput<TSchema>>
    }
  : Omit<BaseUseValidation, 'validate' | 'parse'> & {
      validate: (values: SchemaInput<TSchema>, options?: ValidationOptions) => boolean
      parse: (values: SchemaInput<TSchema>) => v.InferOutput<TSchema>
    }

export function useValidation<TSchema extends AnySchema | AnySchemaAsync>(
  schema: MaybeRef<TSchema>,
  options: UseValidationOptions<TSchema> = {}
): UseValidation<TSchema> {
  const { isolated, config } = options
  const schemaRef = ref(schema)
  const isValid = ref<boolean>()
  const controller = ref(new AbortController())
  const issues = ref<v.BaseIssue<unknown>[]>([])
  const pending = ref(false)

  function getCombinedSchema(): TSchema {
    return schemaRef.value as TSchema
  }

  function handleError(error: unknown, silent: boolean): void {
    if (error instanceof v.ValiError) {
      if (!silent) {
        issues.value = error.issues
      }

      isValid.value = false
    } else {
      throw error
    }
  }

  function validate(values: SchemaInput<TSchema>, options: ValidationOptions = { silent: false }): boolean | Promise<boolean> {
    const combined = getCombinedSchema()

    clear()

    if (combined.async) {
      return Promise.resolve(parse(values))
        .then(() => {
          isValid.value = true

          return true
        })
        .catch((error) => {
          handleError(error, options.silent)

          return false
        })
    }

    try {
      parse(values)

      isValid.value = true

      return true
    } catch (error) {
      handleError(error, options.silent)

      return false
    }
  }

  function parse(values: SchemaInput<TSchema>): v.InferOutput<TSchema>
  function parse(values: unknown): unknown {
    const combined = getCombinedSchema()

    pending.value = true

    if (combined.async) {
      return new Promise((resolve, reject) => {
        signal().addEventListener('abort', () => {
          reject()
        })

        return v.parseAsync(combined, values, config).then(resolve, reject)
      }).finally(() => (pending.value = false))
    }

    try {
      return v.parse(combined, values, config)
    } finally {
      pending.value = false
    }
  }

  const clear: UseValidation<TSchema>['clear'] = () => {
    isValid.value = undefined
    issues.value = []

    controller.value = new AbortController()
  }

  const abort: UseValidation<TSchema>['abort'] = () => {
    controller.value.abort()

    controller.value = new AbortController()
  }

  const signal = () => controller.value.signal

  const validation: BaseUseValidation = {
    isValid,
    issues,
    pending,
    validate,
    parse,
    clear,
    abort,
    signal,
  }

  const observer = isolated ? undefined : injectFromSelfOrAncestor(VALIDATION_OBSERVER_INJECTION_KEY)
  const unregister = observer?.register(validation)

  if (!isolated) {
    provide(VALIDATION_INJECTION_KEY, validation)
  }

  tryOnScopeDispose(() => {
    unregister?.()
  })

  return validation as UseValidation<TSchema>
}
