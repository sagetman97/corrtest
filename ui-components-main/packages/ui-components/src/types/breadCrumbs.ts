import { type RouteLocationRaw } from 'vue-router'

import { KebabCase } from 'string-ts'

import { IconProps } from '@/types'

export type Crumb = Partial<IconProps> & {
  label: string
  path?: RouteLocationRaw | string
  icon?: string
}

export type BreadCrumbProps<TCrumbs extends (string | Crumb)[]> = {
  crumbs?: TCrumbs | null | undefined
}

export type BreadCrumbSlots<TCrumbs extends (string | Crumb)[], TLabel extends string = NormalizeCrumbs<TCrumbs>[number]['label']> = {
  [K in TLabel as KebabCase<K>]?: (props: { crumb: Crumb }) => unknown
}

export function normalizeCrumbs<TCrumbs extends (string | Crumb)[]>(crumbs: TCrumbs): Crumb[] {
  return crumbs
    .map((maybeCrumb) => (typeof maybeCrumb === 'string' ? { label: maybeCrumb } : maybeCrumb))
    .filter((maybeCrumb) => (!!maybeCrumb.label && maybeCrumb.label !== 'undefined') || maybeCrumb.icon !== undefined)
}

export type NormalizeCrumbs<TCrumbs extends (string | Crumb)[]> = {
  [K in keyof TCrumbs]: TCrumbs[K] extends Crumb ? TCrumbs[K] : Crumb & { label: string & TCrumbs[K] }
}
