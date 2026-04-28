import { TableData } from './table'

export type SortDirection = 'asc' | 'desc'
export type Sort<T extends TableData> = {
  property?: keyof T
  direction?: SortDirection
}
export type SortMethod<T extends TableData> = (a: T, b: T) => number
