import { expect, test } from 'vitest'

import { SortMethod, TableData } from '@/types'

import { sortAfter, sortBefore, sortTableData } from '@/utilities/sort'

const notSorted = [
  {
    numberProp: 4,
    stringProp: 'delta',
    dateProp: new Date('2023-04-24'),
    customProp: 'green',
  },
  {
    numberProp: 1,
    stringProp: 'alpha',
    dateProp: new Date('2023-01-24'),
    customProp: 'red',
  },
  {
    numberProp: 6,
    stringProp: 'foxtrot',
    dateProp: new Date('2023-06-24'),
    customProp: 'indigo',
  },
  {
    numberProp: 7,
    stringProp: 'gama',
    dateProp: new Date('2023-07-24'),
    customProp: 'violet',
  },
  {
    numberProp: 5,
    stringProp: 'echo',
    dateProp: new Date('2023-05-24'),
    customProp: 'blue',
  },
  {
    numberProp: 2,
    stringProp: 'bravo',
    dateProp: new Date('2023-02-24'),
    customProp: 'orange',
  },
  {
    numberProp: 3,
    stringProp: 'charlie',
    dateProp: new Date('2023-03-24'),
    customProp: 'yellow',
  },
] as const satisfies TableData[]
type SortExampleData = (typeof notSorted)[number]

function makePartial(property: keyof SortExampleData, likelihood: number): Partial<SortExampleData>[] {
  return notSorted.slice().map((actual) => {
    if (Math.random() < likelihood) {
      delete actual[property]
    }

    return actual
  })
}

test('given string key and asc direction, returns values sorted alphabetically ascending', () => {
  const sorted = sortTableData(notSorted, 'stringProp', 'asc')

  expect(sorted.map((item) => item.numberProp)).toMatchObject([1, 2, 3, 4, 5, 6, 7])
})

test('given string key and desc direction, returns values sorted alphabetically descending', () => {
  const sorted = sortTableData(notSorted, 'stringProp', 'desc')

  expect(sorted.map((item) => item.numberProp)).toMatchObject([7, 6, 5, 4, 3, 2, 1])
})

test('given number key and asc direction, returns values sorted alphabetically ascending', () => {
  const sorted = sortTableData(notSorted, 'numberProp', 'asc')

  expect(sorted.map((item) => item.stringProp)).toMatchObject(['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'gama'])
})

test('given number key and desc direction, returns values sorted alphabetically descending', () => {
  const sorted = sortTableData(notSorted, 'numberProp', 'desc')

  expect(sorted.map((item) => item.stringProp)).toMatchObject(['gama', 'foxtrot', 'echo', 'delta', 'charlie', 'bravo', 'alpha'])
})

test('given date key and asc direction, returns values sorted alphabetically ascending', () => {
  const sorted = sortTableData(notSorted, 'dateProp', 'asc')

  expect(sorted.map((item) => item.numberProp)).toMatchObject([1, 2, 3, 4, 5, 6, 7])
})

test('given date key and desc direction, returns values sorted alphabetically descending', () => {
  const sorted = sortTableData(notSorted, 'dateProp', 'desc')

  expect(sorted.map((item) => item.numberProp)).toMatchObject([7, 6, 5, 4, 3, 2, 1])
})

const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
const customSortAsc: SortMethod<SortExampleData> = (a, b) => {
  if (rainbow.indexOf(a.customProp) < rainbow.indexOf(b.customProp)) {
    return sortBefore('asc')
  }

  if (rainbow.indexOf(a.customProp) > rainbow.indexOf(b.customProp)) {
    return sortAfter('asc')
  }

  return 0
}

const customSortDesc: SortMethod<SortExampleData> = (a, b) => {
  if (rainbow.indexOf(a.customProp) < rainbow.indexOf(b.customProp)) {
    return sortBefore('desc')
  }

  if (rainbow.indexOf(a.customProp) > rainbow.indexOf(b.customProp)) {
    return sortAfter('desc')
  }

  return 0
}

test('given custom key and asc direction, returns values sorted alphabetically ascending', () => {
  const sorted = sortTableData(notSorted, 'customProp', 'asc', customSortAsc)

  expect(sorted.map((item) => item.numberProp)).toMatchObject([1, 2, 3, 4, 5, 6, 7])
})

test('given custom key and desc direction, returns values sorted alphabetically descending', () => {
  const sorted = sortTableData(notSorted, 'customProp', 'desc', customSortDesc)

  expect(sorted.map((item) => item.numberProp)).toMatchObject([7, 6, 5, 4, 3, 2, 1])
})

test('given possibly partial and asc direction, returns those undefined values first', () => {
  const possiblyPartial = makePartial('stringProp', 0.5)
  const undefinedCount = possiblyPartial.filter((item) => item.stringProp === undefined).length
  const sorted = sortTableData(possiblyPartial, 'stringProp', 'asc')

  expect(sorted.slice(0, undefinedCount).every((item) => item.stringProp === undefined)).toBe(true)
  expect(sorted.slice(undefinedCount).every((item) => item.stringProp !== undefined)).toBe(true)
})

test('given possibly partial and desc direction, returns those undefined values last', () => {
  const possiblyPartial = makePartial('stringProp', 0.5)
  const undefinedCount = possiblyPartial.filter((item) => item.stringProp === undefined).length
  const sorted = sortTableData(possiblyPartial, 'stringProp', 'desc')

  expect(sorted.slice(0, sorted.length - undefinedCount).every((item) => item.stringProp !== undefined)).toBe(true)
  expect(sorted.slice(sorted.length - undefinedCount).every((item) => item.stringProp === undefined)).toBe(true)
})
