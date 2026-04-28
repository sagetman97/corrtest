import { LabelProps } from '@/types'

export type InputFileProps = LabelProps & {
  multiple?: boolean
  icon?: string
  supportedTypes?: string[] | RegExp | ((file: { type: string }) => boolean)
  errors?: string[]
}

export type InputFileEmits = {
  change: [value: File[]]
}

export type InputFileSlots = {
  default: unknown
  label: unknown
  message: unknown
  icon: unknown
}
