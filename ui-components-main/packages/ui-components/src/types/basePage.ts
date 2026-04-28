import type { Crumb } from '@/types'
import { BreadCrumbSlots } from '@/types'

type BasePageHeaderSlots = {
  title: unknown
  controls: unknown
}

export type BasePageProps = {
  title?: string
  breadCrumbs?: Crumb[]
  leftCols?: number
  initialRightWidth?: CSSUnitValue
}

export type BasePageSlots = BreadCrumbSlots<string[]> &
  BasePageHeaderSlots & {
    left?: unknown
    right?: (props: { basePage?: HTMLDivElement | null }) => unknown
    default?: unknown
  }

export type BasePageHeaderProps = {
  title?: string
}
