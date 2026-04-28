export function toSpaced(value: string): string {
  return value.replace(/([A-Z])/g, ' $1').trim()
}

export const emDash = '—'

export function hasValue(value?: string | null): value is string {
  return typeof value === 'string' && value.length > 0
}

export type IsEmptyString<T> = undefined extends T ? true : '' extends T ? true : false
