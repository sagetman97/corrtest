export type TimelineItem = {
  title?: string
  subtitle?: string
  disabled?: boolean
}

export type TimelineProps<T extends TimelineItem> = {
  items?: T[]
  singleOpen?: boolean
}

export type TimelineSlots<T extends TimelineItem> = {
  default?(props: {
    items: T[]
    isOpen: (index: number) => boolean | undefined
    setOpen: (index: number, value: boolean) => void
    isSingleItem: boolean
  }): unknown
}
