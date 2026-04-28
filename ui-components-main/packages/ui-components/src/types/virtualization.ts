export type ItemKeyMethod<T> = (row: T, rowIndex?: number) => string

export type VirtualScrollerProps<T> = {
  items: T[]
  itemKey: ItemKeyMethod<T>
  itemEstimateHeight?: CSSUnitValue
  chunkSize?: number
  observerOptions?: IntersectionObserverInit
}

export type VirtualScrollerEmits = {
  (event: 'top'): void
  (event: 'scroll'): void
  (event: 'bottom'): void
  (event: 'loaded', value: { containerElement: HTMLDivElement; scrollTo: (top: number) => void }): void
}

export type VirtualScrollerSlots<T> = {
  default?: (props: { item: T; index: number }) => unknown
}

export type VirtualScrollerChunkProps = {
  estimateHeight: CSSUnitValue
  observerOptions?: IntersectionObserverInit
}
