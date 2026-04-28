import { KebabCase } from 'string-ts'

import { ClassValue } from './attributes'
import { Sort } from './sort'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<PropertyKey, any>

export type TableColumn<T extends TableData = Record<never, never>, K extends keyof T = keyof T> = {
  label: string
  property?: K
  width?: string
  minWidth?: string
  maxWidth?: string
  visible?: boolean
  sortable?: boolean
  dataTestid?: string
  align?: 'left' | 'right' | 'center'
  freeze?: boolean
  truncate?: boolean
}

export type RowClassesMethod<T extends TableData> = (row: T, rowIndex: number) => ClassValue

export type ColumnClassesMethod<T extends TableData> = (column: TableColumn<T>, columnIndex: number) => ClassValue

export type CellClassesMethod<T extends TableData> = (
  value: unknown,
  column: TableColumn<T>,
  columnIndex: number,
  row: TableData,
  rowIndex: number
) => ClassValue

export type RowKeyMethod<T extends TableData> = (row: T, rowIndex: number) => string

export type DisabledRowSelectionMethod<T extends TableData> = (row: T) => boolean

export type TableProps<TValue extends TableData, TColumns extends TableColumn<TValue>[]> = {
  columns: TColumns
  data: TValue[]
  rowClasses?: RowClassesMethod<TValue>
  columnClasses?: ColumnClassesMethod<TValue>
  cellClasses?: CellClassesMethod<TValue>
  rowKey?: RowKeyMethod<TValue>
  sort?: Sort<TValue>
  selected?: TValue[]
  selectionLimit?: number
  emptyTitle?: string
  emptyMessage?: string
  fullWidth?: boolean
  disabledRowSelection?: DisabledRowSelectionMethod<TValue>
  variant?: 'default' | 'compact'
  headerUnderline?: boolean
}

export type TableEmits<TValue extends TableData> = {
  'update:sort': [value: Sort<TValue>]
  'update:selected': [value: TValue[]]
  'row-click': [TValue]
  'row-dblclick': [TValue]
}

export type TableSlots<TValue extends TableData, TColumns extends TableColumn<TValue>[]> = TableHeaderSlots<TValue, TColumns> &
  TableBodySlots<TValue, TColumns> & {
    footer?: () => unknown
    emptyTitle?: () => unknown
    emptyMessage?: () => unknown
  }

export type TableHeaderSlots<
  TValue extends TableData,
  TColumns extends TableColumn<TValue>[],
  TLabel extends string = `${TColumns[number]['label']}-header`,
> = {
  [K in TLabel as KebabCase<K>]?: (props: { column: TableColumn<TValue>; columnIndex: number }) => unknown
}

export type TableBodySlots<TValue extends TableData, TColumns extends TableColumn<TValue>[], TLabel extends string = TColumns[number]['label']> = {
  [K in TLabel as KebabCase<K>]?: (props: { column: TableColumn<TValue>; columnIndex: number; row: TValue; rowIndex: number; value: unknown }) => unknown
}
