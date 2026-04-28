<template>
  <component-demo-layout name="Badge">
    <section-header
      title="Basic Usage"
      description="A simple badge component"
    />
    <component-example :code="basicBadgeExample" />

    <section-header
      title="Variants"
      description="Changes the color scheme of the badge. Has 12 options: primary, medium, basic, positive, negative, new, highlight, unavailable, success, warning, error, info."
    />
    <component-example :code="variantBadgeExample" />

    <section-header
      title="Icons"
      description="Badges can have icons on the left or right side of the badge using the `icon` and `icon-position` props"
    />
    <component-example :code="iconBadgeExample" />
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { BadgeProps } from '@/types'

const basicBadgeExample = {
  code: `<p-badge>
  Basic Badge
</p-badge>`,
  language: 'vue-html',
}
const variants: BadgeProps['variant'][] = [
  'primary',
  'medium',
  'basic',
  'positive',
  'negative',
  'new',
  'highlight',
  'unavailable',
  'success',
  'warning',
  'error',
  'info',
]

const variantBadgeExample = variants.map((variant) => `<p-badge variant="${variant}">${variant}</p-badge> \n`).join('\n')

const iconBadgeExample = {
  code: `<p-badge
  icon="gear"
  icon-position="left"
  family="duotone"
>
  Left Icon
</p-badge>

<p-badge
  icon="gear"
  icon-position="right"
  family="duotone"
>
  Right Icon
</p-badge>`,
  language: 'vue-html',
}
</script>

<style>
.badge-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
