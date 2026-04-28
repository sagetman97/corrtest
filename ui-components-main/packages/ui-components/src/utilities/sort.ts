import { SortDirection, SortMethod, TableData } from '@/types'

export function sortTableData<T extends TableData>(data: T[] | Readonly<T[]>, property: keyof T, direction: SortDirection, compare?: SortMethod<T>): T[] {
  return data.slice().sort(compare ?? getDefaultCompare(property, direction))
}

export function sortBefore(direction: SortDirection): number {
  return direction === 'asc' ? -1 : +1
}
export function sortAfter(direction: SortDirection): number {
  return direction === 'asc' ? +1 : -1
}

function getDefaultCompare<T extends TableData>(property: keyof T, direction: SortDirection): SortMethod<T> {
  return (a, b) => {
    if (a[property] === b[property]) {
      return 0
    }

    if (a[property] === undefined || a[property] === null) {
      return sortBefore(direction)
    }

    if (b[property] === undefined || b[property] === null) {
      return sortAfter(direction)
    }

    if (a[property] < b[property]) {
      return sortBefore(direction)
    }

    if (a[property] > b[property]) {
      return sortAfter(direction)
    }

    return 0
  }
}
