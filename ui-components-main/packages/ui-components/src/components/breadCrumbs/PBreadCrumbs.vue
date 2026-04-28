<template>
  <nav class="polly-bread-crumbs">
    <ul
      class="polly-bread-crumbs__list"
      role="list"
      aria-label="Breadcrumb"
    >
      <template
        v-for="(crumb, index) in crumbs"
        :key="crumb.label"
      >
        <li
          class="polly-bread-crumbs__list-item"
          :aria-current="isLast(crumbs, index)"
        >
          <component
            :is="crumbComponent(crumb)"
            class="polly-bread-crumbs__crumb"
            :class="classes.crumb(crumb, index)"
            :to="crumb.path"
          >
            <slot
              v-if="isSlot(crumb.label)"
              :name="crumb.label"
              :crumb="crumb"
            >
              <p-icon
                v-if="crumb.icon"
                v-bind="getIconProps(crumb)"
              />
              {{ crumb.label }}
            </slot>
          </component>
        </li>

        <PIcon
          v-if="!isLast(crumbs, index)"
          class="polly-bread-crumbs__divider"
          icon="chevron-right"
          size="xs"
        />
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts" generic="T extends (Crumb | string)[]">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { BreadCrumbProps, BreadCrumbSlots, Crumb, IconProps, normalizeCrumbs } from '@/types'

import { PIcon } from '../icon'

const props = defineProps<BreadCrumbProps<T>>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slots = defineSlots<BreadCrumbSlots<T>>()

const crumbs = computed(() => {
  return normalizeCrumbs(props.crumbs ?? [])
})

const classes = computed(() => ({
  crumb: (crumb: Crumb, index: number) => ({
    'polly-bread-crumbs__crumb--last': isLast(crumbs.value, index),
    'polly-bread-crumbs__crumb--link': !!crumb.path,
  }),
}))

function isSlot(value: string): value is keyof typeof slots {
  return crumbs.value.some((crumb) => crumb.label === value)
}

function isLast(crumbList: Crumb[], index: number) {
  return index === crumbList.length - 1
}

function crumbComponent(crumb: Crumb): typeof RouterLink | 'span' {
  return crumb.path ? RouterLink : 'span'
}

function getIconProps(crumb: Crumb): Partial<IconProps> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { path, label, ...iconProps } = crumb
  return iconProps
}
</script>

<style>
.polly-bread-crumbs {
  --polly-bread-crumb-text-color: var(--colors-text-icon-medium);
  --polly-bread-crumb-text-last-color: var(--colors-text-icon-dark);

  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-md);
}

.polly-bread-crumbs__list {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  cursor: default;
  color: var(--polly-bread-crumb-text-color);
}

.polly-bread-crumbs__crumb {
  color: var(--polly-bread-crumb-text-color);
  text-decoration: none;
}

.polly-bread-crumbs__crumb.router-link-exact-active {
  font-weight: normal;
}
@media (hover: hover) and (pointer: fine) {
  .polly-bread-crumbs__crumb--link:hover {
    text-decoration: underline;
  }
}

.polly-bread-crumbs__crumb--last {
  font-weight: 500;
  color: var(--polly-bread-crumb-text-last-color);
}

.polly-bread-crumbs__divider {
  color: var(--polly-bread-crumb-text-color);
}
</style>
