import { MaybeRef, reactive, ref, UnwrapNestedRefs } from 'vue'

import { BaseIssue } from 'valibot'

import { getValidationField, useValidationField, UseValidationField } from './useValidationField'

type LooseObjectSchema = { entries: Record<string, unknown> }
type UseValidationFieldsEntry = UnwrapNestedRefs<Pick<UseValidationField, 'message' | 'state'>>

export type UseValidationFields<TSchema extends LooseObjectSchema> = TSchema extends LooseObjectSchema
  ? Record<keyof TSchema['entries'], UseValidationFieldsEntry>
  : never

export function useValidationFields<TSchema extends LooseObjectSchema>(schema: TSchema): UseValidationFields<TSchema>
export function useValidationFields(schema: { entries: Record<string, unknown> }): Record<string, UseValidationFieldsEntry> {
  const keys = Object.keys(schema.entries)
  const fields = keys.reduce<Record<string, UseValidationFieldsEntry>>((response, entry) => {
    const { state, message } = useValidationField(entry)

    response[entry] = reactive({ state, message })

    return response
  }, {})

  return reactive(fields)
}

export function getValidationFields<TSchema extends LooseObjectSchema>(issues: MaybeRef<BaseIssue<unknown>[]>, schema: TSchema): UseValidationFields<TSchema>
export function getValidationFields(
  issues: MaybeRef<BaseIssue<unknown>[]>,
  schema: { entries: Record<string, unknown> }
): Record<string, UseValidationFieldsEntry> {
  const issuesRef = ref(issues)
  const keys = Object.keys(schema.entries)

  return keys.reduce<Record<string, UseValidationFieldsEntry>>((response, entry) => {
    const { state, message } = getValidationField(issuesRef, entry)

    response[entry] = reactive({ state, message })

    return response
  }, {})
}
