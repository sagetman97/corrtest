import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { convertViewportToPx, getPxValue } from './computedStyle'

describe('getPxValue', () => {
  test('returns 0 when value is undefined', () => {
    expect(getPxValue(undefined)).toBe(0)
  })

  test('returns 0 when value is empty string', () => {
    expect(getPxValue('')).toBe(0)
  })

  test('extracts numeric value from px string', () => {
    expect(getPxValue('16px')).toBe(16)
    expect(getPxValue('100px')).toBe(100)
    expect(getPxValue('0px')).toBe(0)
  })

  test('handles decimal values', () => {
    expect(getPxValue('16.5px')).toBe(16.5)
    expect(getPxValue('0.75px')).toBe(0.75)
  })

  test('handles negative values', () => {
    expect(getPxValue('-10px')).toBe(-10)
    expect(getPxValue('-5.5px')).toBe(-5.5)
  })

  test('returns 0 for non-numeric strings', () => {
    expect(getPxValue('auto')).toBe(0)
    expect(getPxValue('inherit')).toBe(0)
    expect(getPxValue('invalid')).toBe(0)
  })

  test('handles values without px suffix', () => {
    expect(getPxValue('16')).toBe(16)
    expect(getPxValue('100')).toBe(100)
  })
})

describe('convertViewportToPx', () => {
  let originalWindow: typeof globalThis.window | undefined
  let mockInnerWidth: number
  let mockInnerHeight: number

  beforeEach(() => {
    originalWindow = globalThis.window

    mockInnerWidth = 1920
    mockInnerHeight = 1080

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      configurable: true,
      value: {
        innerWidth: mockInnerWidth,
        innerHeight: mockInnerHeight,
      },
    })
  })

  afterEach(() => {
    if (originalWindow) {
      Object.defineProperty(globalThis, 'window', {
        writable: true,
        configurable: true,
        value: originalWindow,
      })
    }
  })

  describe('viewport width (vw)', () => {
    test('converts 50vw to pixels', () => {
      expect(convertViewportToPx(50, 'vw')).toBe(960) // 50% of 1920
    })

    test('converts 100vw to pixels', () => {
      expect(convertViewportToPx(100, 'vw')).toBe(1920)
    })

    test('converts 0vw to pixels', () => {
      expect(convertViewportToPx(0, 'vw')).toBe(0)
    })

    test('handles decimal values', () => {
      expect(convertViewportToPx(33.33, 'vw')).toBeCloseTo(639.936, 2)
    })

    test('handles values greater than 100', () => {
      expect(convertViewportToPx(150, 'vw')).toBe(2880) // 150% of 1920
    })
  })

  describe('viewport height (vh)', () => {
    test('converts 50vh to pixels', () => {
      expect(convertViewportToPx(50, 'vh')).toBe(540) // 50% of 1080
    })

    test('converts 100vh to pixels', () => {
      expect(convertViewportToPx(100, 'vh')).toBe(1080)
    })

    test('converts 0vh to pixels', () => {
      expect(convertViewportToPx(0, 'vh')).toBe(0)
    })

    test('handles decimal values', () => {
      expect(convertViewportToPx(25.5, 'vh')).toBeCloseTo(275.4, 2)
    })

    test('handles values greater than 100', () => {
      expect(convertViewportToPx(200, 'vh')).toBe(2160) // 200% of 1080
    })
  })

  describe('edge cases', () => {
    test('returns 0 for NaN value', () => {
      expect(convertViewportToPx(NaN, 'vw')).toBe(0)
      expect(convertViewportToPx(NaN, 'vh')).toBe(0)
    })

    test('returns 0 for invalid unit', () => {
      // @ts-expect-error - testing invalid unit
      expect(convertViewportToPx(50, 'px')).toBe(0)
      // @ts-expect-error - testing invalid unit
      expect(convertViewportToPx(50, 'rem')).toBe(0)
    })
  })
})
