export type AccordionVariant = 'primary' | 'secondary'

export type AccordionProps = {
  title?: string
  hideIcon?: boolean
  variant?: AccordionVariant
  disabled?: boolean
}

export type AccordionSlots = {
  title?: (props: { expanded: boolean; toggle: () => void }) => unknown
  heading?: (props: { expanded: boolean; toggle: () => void }) => unknown
  default?: (props: { expanded: boolean; toggle: () => void }) => unknown
  icon?: (props: { expanded: boolean; toggle: () => void }) => unknown
  header?: (props: { expanded: boolean; toggle: () => void }) => unknown
  summary?: (props: { expanded: boolean; toggle: () => void }) => unknown
}
