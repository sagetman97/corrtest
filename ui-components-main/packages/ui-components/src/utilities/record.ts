import { hasValue, IsEmptyString } from './string'

type IsEmpty<T> = null extends T ? true : undefined extends T ? true : IsEmptyString<T>

export function removeKeysWithEmptyValue<T extends Record<PropertyKey, unknown>>(
  value: T
): {
  [K in keyof T as IsEmpty<T[K]> extends true ? never : K]: T[K]
}
export function removeKeysWithEmptyValue(value: Record<PropertyKey, unknown>): Record<PropertyKey, unknown> {
  return Object.entries(value).reduce<Record<PropertyKey, unknown>>((reduced, [key, value]) => {
    if (typeof value === 'string' && !hasValue(value)) {
      return reduced
    }

    if (value === null || value === undefined) {
      return reduced
    }

    reduced[key] = value

    return reduced
  }, {})
}
