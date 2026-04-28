import { describe, expect, test } from 'vitest'

import type { SelectOption, SelectOptionGroup } from '@/types'

import { filterSelectOptions } from './filter'

describe('filterSelectOptions', () => {
  const options: SelectOption<string>[] = [
    { value: '1', label: 'Apple' },
    { value: '2', label: 'Banana', subLabel: 'Yellow fruit' },
    { value: '3', label: 'Cherry' },
  ]

  const groupedOptions: (SelectOption<string> | SelectOptionGroup<string>)[] = [
    {
      label: 'Fruits',
      options: [
        { value: '1', label: 'Apple' },
        { value: '2', label: 'Banana', subLabel: 'Yellow fruit' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: '3', label: 'Carrot' },
        { value: '4', label: 'Broccoli' },
      ],
    },
    { value: '5', label: 'Other Item' },
  ]

  test('returns all options when filterText is empty', () => {
    const result = filterSelectOptions(options, '')
    expect(result).toEqual(options)
  })

  test('filters options based on label', () => {
    const result = filterSelectOptions(options, 'app')
    expect(result).toHaveLength(1)
    expect(result[0].label).toBe('Apple')
  })

  test('filters options based on subLabel', () => {
    const result = filterSelectOptions(options, 'yellow')
    expect(result).toHaveLength(1)
    expect(result[0].label).toBe('Banana')
  })

  test('is case insensitive', () => {
    const result = filterSelectOptions(options, 'APPLE')
    expect(result).toHaveLength(1)
    expect(result[0].label).toBe('Apple')
  })

  test('returns empty array when no matches found', () => {
    const result = filterSelectOptions(options, 'xyz')
    expect(result).toHaveLength(0)
  })

  describe('with grouped options', () => {
    test('includes all group options when group label matches', () => {
      const result = filterSelectOptions(groupedOptions, 'fruit')
      expect(result).toHaveLength(1)

      const group = result[0] as SelectOptionGroup<string>
      expect(group.label).toBe('Fruits')
      expect(group.options).toHaveLength(2)
      expect(group.options[0].label).toBe('Apple')
      expect(group.options[1].label).toBe('Banana')
    })

    test('filters options within groups when group label does not match', () => {
      const result = filterSelectOptions(groupedOptions, 'carr')
      expect(result).toHaveLength(1)

      const group = result[0] as SelectOptionGroup<string>
      expect(group.label).toBe('Vegetables')
      expect(group.options).toHaveLength(1)
      expect(group.options[0].label).toBe('Carrot')
    })

    test('filters both grouped and ungrouped options', () => {
      const result = filterSelectOptions(groupedOptions, 'item')
      expect(result).toHaveLength(1)
      expect((result[0] as SelectOption<string>).label).toBe('Other Item')
    })

    test('excludes groups with no matching options', () => {
      const result = filterSelectOptions(groupedOptions, 'apple')
      expect(result).toHaveLength(1)

      const group = result[0] as SelectOptionGroup<string>
      expect(group.label).toBe('Fruits')
      expect(group.options).toHaveLength(1)
      expect(group.options[0].label).toBe('Apple')
    })

    test('handles multiple matching groups', () => {
      const result = filterSelectOptions(
        [
          {
            label: 'Group A',
            options: [{ value: '1', label: 'Test' }],
          },
          {
            label: 'Group B',
            options: [{ value: '2', label: 'Test' }],
          },
        ],
        'test'
      )

      expect(result).toHaveLength(2)
      expect((result[0] as SelectOptionGroup<string>).options).toHaveLength(1)
      expect((result[1] as SelectOptionGroup<string>).options).toHaveLength(1)
    })
  })

  describe('edge cases', () => {
    test('handles undefined subLabels', () => {
      const optionsWithUndefined: SelectOption<string>[] = [
        { value: '1', label: 'Test' },
        { value: '2', label: 'Other', subLabel: undefined },
      ]

      const result = filterSelectOptions(optionsWithUndefined, 'test')
      expect(result).toHaveLength(1)
      expect(result[0].label).toBe('Test')
    })

    test('handles empty groups', () => {
      const emptyGroup: (SelectOption<string> | SelectOptionGroup<string>)[] = [
        {
          label: 'Empty Group',
          options: [],
        },
      ]

      const result = filterSelectOptions(emptyGroup, 'test')
      expect(result).toHaveLength(0)
    })

    test('handles special characters in search', () => {
      const specialOptions: SelectOption<string>[] = [{ value: '1', label: 'Test (special)' }]

      const result = filterSelectOptions(specialOptions, '(spec')
      expect(result).toHaveLength(1)
      expect(result[0].label).toBe('Test (special)')
    })
  })
})
