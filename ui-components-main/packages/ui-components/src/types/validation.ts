import { InjectionKey } from 'vue'

import * as v from 'valibot'

import { BaseUseValidation } from '@/composables/useValidation'
import { UseValidationObserver } from '@/composables/useValidationObserver'

export type ValidationState = 'normal' | 'errored' | 'pending'

export type AnySchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>

export type AnySchemaAsync = v.BaseSchemaAsync<unknown, unknown, v.BaseIssue<unknown>>

export const VALIDATION_INJECTION_KEY: InjectionKey<BaseUseValidation> = Symbol('useValidationKey')

export const VALIDATION_OBSERVER_INJECTION_KEY: InjectionKey<UseValidationObserver> = Symbol('useValidationObserverKey')

export type MinMaxDecimalCountOptions = { min?: number; max?: number }

export function minMaxDecimalCount(options?: MinMaxDecimalCountOptions, message?: v.ErrorMessage<v.BaseIssue<unknown>>) {
  const { min, max } = {
    min: 0,
    ...options,
  }
  const decimalsOptional = min <= 0 ? '?' : ''
  const pattern = new RegExp(`^-?\\d*(\\.\\d{${min},${max}})${decimalsOptional}$`)

  return v.pipe(
    v.number(message),
    v.transform((value) => value.toString()),
    v.regex(pattern, message),
    v.decimal(message),
    v.transform(Number)
  )
}

export const decimalSchema = (message?: v.ErrorMessage<v.BaseIssue<unknown>>) => v.regex(new RegExp('-?\\d*\\.?\\d+'), message)

export function stringToNumberSchema(message?: v.ErrorMessage<v.BaseIssue<unknown>>) {
  return v.pipe(v.string(message), decimalSchema(message), v.transform(Number))
}

export function stringToDateSchema(message?: v.ErrorMessage<v.BaseIssue<unknown>>) {
  return v.pipe(
    v.string(message),
    v.isoDate(message),
    v.transform((input) => new Date(input))
  )
}
