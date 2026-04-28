export type DragAndDropSlots<T> = {
  default?(props: { item: T; index: number }): unknown
}
