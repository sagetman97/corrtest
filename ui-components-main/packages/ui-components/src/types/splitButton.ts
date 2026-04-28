import { ButtonProps, SelectOption, SelectOptionGroup, SelectSlots } from '@/types'

import { RelativePosition } from '@/utilities'

export type SplitButtonProps<T = unknown> = Partial<ButtonProps> & {
  options: (SelectOption<T> | SelectOptionGroup<T>)[]
  showInputIcons?: boolean
  showApply?: boolean
  placeholder?: string
  multiple?: boolean
  position?: RelativePosition
}

export type SplitButtonSlots<T = unknown> = SelectSlots<T> & {
  target?: (props: { isOpen: boolean; toggle: () => void }) => unknown
  default?: unknown
}

export type SplitButtonEmits<T = unknown> = {
  selected: [value: T]
}
