export type OverflowSlots = {
  default?(): unknown
  overflow?: (props: { count: number }) => unknown
}
