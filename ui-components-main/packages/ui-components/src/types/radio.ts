import { type LabelProps } from './label'

export type RadioProps = LabelProps & {
  name?: string
  disabled?: boolean
  value?: string
  checked?: boolean
  tabindex?: number
}
