import { BasePageProps, BasePageSlots } from '@/types'

export type ComponentBasePageProps = BasePageProps & {
  name: string
  propsTitle?: string
  slotsTitle?: string
  defaultTitle?: string
  contents?: { label: string; link: string }[]
}

export type ComponentBasePageSlots = BasePageSlots & {
  props?(): unknown
  slots?(): unknown
  default?(): unknown
}
