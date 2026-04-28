import { StyleValue } from './attributes'

export type PopoverProps = {
  targetId?: string
  targetElement?: HTMLElement
  popoverId?: string
  disabled?: boolean
  isOpen?: boolean
  manual?: boolean
  position?: PopoverPosition | PopoverPositionMethod
  showPointer?: boolean
  triggers?: PopoverTrigger[] | PopoverTrigger
  variant?: 'light' | 'dark'
  draggable?: boolean
  resizable?: boolean
  resizeOptions?: {
    minWidth?: CSSUnitValue
    minHeight?: CSSUnitValue
    maxWidth?: CSSUnitValue
    maxHeight?: CSSUnitValue
  }
}

export type PopoverTrigger = 'focus' | 'hover' | 'click'

export type PopoverEmits = {
  'update:isOpen': [value: boolean]
}

export type PopoverPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-stretch'
  | 'top-left'
  | 'top-right'
  | 'top-stretch'
  | 'left-center'
  | 'right-center'
  | 'bottom-center'
  | 'top-center'

export type PopoverPositionMethod = (targetElement: HTMLElement, contentElement: HTMLElement) => StyleValue

export type PopoverSlots = {
  content?: (props: { close: () => void }) => unknown
  actions?: (props: { close: () => void }) => unknown
  header?: (props: { close: () => void }) => unknown
  default?: (props: { close: () => void; hide: () => void }) => unknown
  footer?: (props: { close: () => void }) => unknown
  target?: (props: {
    attrs: Record<string, unknown>
    toggle: () => void
    show: () => void
    open: () => void
    close: () => void
    hide: () => void
    isOpen: boolean
  }) => unknown
}
