export type StickyNoteProps = {
  message?: string
  disabled?: boolean
  context?: {
    author?: string
    date?: Date
  }
}

export type StickyNoteEmits = {
  delete: []
  save: [value: string | undefined]
}

export type StickyNoteSlots = {
  default?(): unknown
  context?(): unknown
  actions?(): unknown
}
