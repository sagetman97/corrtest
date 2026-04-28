import { PopoverPosition } from './popover'

export type WalkthroughStep = {
  step: number
  header?: string
  targetId: string
  content: string
  position?: PopoverPosition
  setupEvent?: string
}

export type WalkthroughProps = {
  steps: WalkthroughStep[]
}

export type WalkthroughEmits = {
  'setup-event': [value: string]
}
