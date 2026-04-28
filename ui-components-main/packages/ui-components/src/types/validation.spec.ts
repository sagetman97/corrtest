import * as v from 'valibot'
import { expect, test } from 'vitest'

import { minMaxDecimalCount, stringToNumberSchema } from './validation'

const percentSchema = v.pipe(stringToNumberSchema('Needs to be Number'), minMaxDecimalCount({ max: 3 }))

function expectDecimalErrorToRaise(value: string) {
  try {
    v.parse(percentSchema, value)
  } catch (error) {
    const err = error as Error
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('Needs to be Number')
  }
}

test('string is not a decimal', () => {
  expectDecimalErrorToRaise('a')
})
test('leading 0', () => {
  const percent = v.parse(percentSchema, '0.1')
  expect(percent).toBe(0.1)
})
test('non-leading 0', () => {
  const percent = v.parse(percentSchema, '.1')
  expect(percent).toBe(0.1)
})
test('integer number', () => {
  const percent = v.parse(percentSchema, '1')
  expect(percent).toBe(1)
})
test('Decimal', () => {
  const percent = v.parse(percentSchema, '1.0')
  expect(percent).toBe(1)
})
test('Decimal without trailing value', () => {
  const percent = v.parse(percentSchema, '1.')
  expect(percent).toBe(1)
})
test('Decimal with negative int', () => {
  const percent = v.parse(percentSchema, '-1.')
  expect(percent).toBe(-1)
})
test('only a hyphen', () => {
  expectDecimalErrorToRaise('-')
})
test('only a period', () => {
  expectDecimalErrorToRaise('.')
})
