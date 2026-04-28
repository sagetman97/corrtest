import { beforeEach, describe, expect, test, vi } from 'vitest'

import { buildSelectOptionId, randomId } from './id'

describe('buildSelectOptionId', () => {
  describe('with string values', () => {
    test('creates id with sanitized string value', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'test-value')
      expect(result).toBe('listbox-1-option-test-value')
    })

    test('converts to lowercase', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'TEST-VALUE')
      expect(result).toBe('listbox-1-option-test-value')
    })

    test('replaces spaces with hyphens', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'test value here')
      expect(result).toBe('listbox-1-option-test-value-here')
    })

    test('removes special characters', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'test@#$%value!')
      expect(result).toBe('listbox-1-option-testvalue')
    })

    test('trims whitespace', () => {
      const result = buildSelectOptionId('listbox-1', 'option', '  test-value  ')
      expect(result).toBe('listbox-1-option-test-value')
    })

    test('truncates long strings to 100 characters', () => {
      const longString = 'a'.repeat(150)
      const result = buildSelectOptionId('listbox-1', 'option', longString)
      expect(result).toBe(`listbox-1-option-${'a'.repeat(100)}`)
    })

    test('handles empty string', () => {
      const result = buildSelectOptionId('listbox-1', 'option', '')
      expect(result).toBe('listbox-1-option-empty')
    })

    test('handles whitespace-only string', () => {
      const result = buildSelectOptionId('listbox-1', 'option', '   ')
      expect(result).toBe('listbox-1-option-empty')
    })

    test('preserves underscores and hyphens', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'test_value-123')
      expect(result).toBe('listbox-1-option-test_value-123')
    })

    test('preserves numbers', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 'option123')
      expect(result).toBe('listbox-1-option-option123')
    })
  })

  describe('with number values', () => {
    test('converts positive integers', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 42)
      expect(result).toBe('listbox-1-option-42')
    })

    test('converts negative integers', () => {
      const result = buildSelectOptionId('listbox-1', 'option', -42)
      expect(result).toBe('listbox-1-option--42')
    })

    test('converts decimals', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 3.14)
      expect(result).toBe('listbox-1-option-3.14')
    })

    test('converts zero', () => {
      const result = buildSelectOptionId('listbox-1', 'option', 0)
      expect(result).toBe('listbox-1-option-0')
    })
  })

  describe('with boolean values', () => {
    test('converts true', () => {
      const result = buildSelectOptionId('listbox-1', 'option', true)
      expect(result).toBe('listbox-1-option-true')
    })

    test('converts false', () => {
      const result = buildSelectOptionId('listbox-1', 'option', false)
      expect(result).toBe('listbox-1-option-false')
    })
  })

  describe('with null and undefined', () => {
    test('handles null', () => {
      const result = buildSelectOptionId('listbox-1', 'option', null)
      expect(result).toBe('listbox-1-option-null')
    })

    test('handles undefined', () => {
      const result = buildSelectOptionId('listbox-1', 'option', undefined)
      expect(result).toBe('listbox-1-option-null')
    })
  })

  describe('with symbol values', () => {
    test('uses symbol description', () => {
      const sym = Symbol('test-symbol')
      const result = buildSelectOptionId('listbox-1', 'option', sym)
      expect(result).toBe('listbox-1-option-test-symbol')
    })

    test('sanitizes symbol description', () => {
      const sym = Symbol('Test Symbol!')
      const result = buildSelectOptionId('listbox-1', 'option', sym)
      expect(result).toBe('listbox-1-option-test-symbol')
    })

    test('handles symbol without description', () => {
      const sym = Symbol()
      const result = buildSelectOptionId('listbox-1', 'option', sym)
      expect(result).toBe('listbox-1-option-symbol')
    })
  })

  describe('with object values', () => {
    test('creates hash for simple objects', () => {
      const obj = { id: 1, name: 'test' }
      const result = buildSelectOptionId('listbox-1', 'option', obj)
      expect(result).toMatch(/^listbox-1-option-obj-[a-z0-9]+$/)
    })

    test('creates consistent hash for same object', () => {
      const obj = { id: 1, name: 'test' }
      const result1 = buildSelectOptionId('listbox-1', 'option', obj)
      const result2 = buildSelectOptionId('listbox-1', 'option', obj)
      expect(result1).toBe(result2)
    })

    test('creates different hash for different objects', () => {
      const obj1 = { id: 1, name: 'test1' }
      const obj2 = { id: 2, name: 'test2' }
      const result1 = buildSelectOptionId('listbox-1', 'option', obj1)
      const result2 = buildSelectOptionId('listbox-1', 'option', obj2)
      expect(result1).not.toBe(result2)
    })

    test('handles arrays', () => {
      const arr = [1, 2, 3]
      const result = buildSelectOptionId('listbox-1', 'option', arr)
      expect(result).toMatch(/^listbox-1-option-obj-[a-z0-9]+$/)
    })

    test('handles empty objects', () => {
      const obj = {}
      const result = buildSelectOptionId('listbox-1', 'option', obj)
      expect(result).toMatch(/^listbox-1-option-obj-[a-z0-9]+$/)
    })
  })

  describe('with group type', () => {
    test('creates id with group type', () => {
      const result = buildSelectOptionId('listbox-1', 'group', 'test-group')
      expect(result).toBe('listbox-1-group-test-group')
    })
  })
})

describe('randomId', () => {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test('generates valid UUID format', () => {
    const id = randomId()
    expect(id).toMatch(UUID_REGEX)
  })

  test('generates unique IDs', () => {
    const id1 = randomId()
    const id2 = randomId()
    expect(id1).not.toBe(id2)
  })

  test('uses crypto.randomUUID when available', () => {
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000'
    const randomUUIDSpy = vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID)

    const id = randomId()
    expect(id).toBe(mockUUID)
    expect(randomUUIDSpy).toHaveBeenCalled()
  })

  test('generates multiple unique IDs', () => {
    const ids = new Set()
    for (let i = 0; i < 10; i++) {
      ids.add(randomId())
    }
    expect(ids.size).toBe(10)
  })

  test('all generated IDs match UUID format', () => {
    for (let i = 0; i < 5; i++) {
      const id = randomId()
      expect(id).toMatch(UUID_REGEX)
    }
  })

  test('generated IDs have correct length', () => {
    const id = randomId()
    expect(id.length).toBe(36)
  })

  test('generated IDs have hyphens in correct positions', () => {
    const id = randomId()
    expect(id[8]).toBe('-')
    expect(id[13]).toBe('-')
    expect(id[18]).toBe('-')
    expect(id[23]).toBe('-')
  })
})
