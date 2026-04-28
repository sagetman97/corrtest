import { computed, ComputedRef, MaybeRef, Ref, ref } from 'vue'

import { BaseIssue } from 'valibot'

import { VALIDATION_INJECTION_KEY, ValidationState } from '@/types/validation'

import { injectFromSelfOrAncestor } from '@/utilities/injection'

export type UseValidationField = {
  issue: Ref<BaseIssue<unknown> | undefined>
  message: Ref<string | undefined>
  state: Ref<ValidationState>
}

export function useValidationField(field: MaybeRef<string>): UseValidationField {
  const fieldRef = ref(field)
  const observer = injectFromSelfOrAncestor(VALIDATION_INJECTION_KEY)

  const issue = computed(() => getValidationIssue(observer?.issues, fieldRef.value).value)
  const message = computed<string | undefined>(() => issue.value?.message)
  const state = computed<ValidationState>(() => (issue.value ? 'errored' : 'normal'))

  return { issue, message, state }
}

export function getValidationIssue(issues?: MaybeRef<BaseIssue<unknown>[]>, field?: string): ComputedRef<BaseIssue<unknown> | undefined> {
  const issuesRef = ref(issues)

  return computed(() =>
    issuesRef.value?.find((issue) => {
      const path = issue.path?.map((item) => item.key).join('.') ?? ''

      return path === field
    })
  )
}

export function getValidationField(issues: MaybeRef<BaseIssue<unknown>[]>, field: string): UseValidationField {
  const issue = getValidationIssue(issues, field)
  const message = computed(() => issue.value?.message)
  const state = computed(() => (issue.value ? 'errored' : 'normal'))

  return { issue, message, state }
}
