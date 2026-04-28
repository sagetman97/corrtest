export type AccessoryPanelProps = {
  container?: Element | null
  initialWidth?: CSSUnitValue
}

export type AccessoryPanelSlots = {
  default?: (props: { expanded: boolean; expand: () => void; close: () => void; open: () => void }) => unknown
  footer?: (props: { expanded: boolean; expand: () => void; close: () => void; open: () => void }) => unknown
}
