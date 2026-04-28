<template>
  <component-demo-layout name="Bread Crumbs">
    <section-header
      title="Basic Usage"
      description="A simple bread crumb component that is built around vue-router. You can pass in label, icon, and a vue-router path. Path accepts a string or a vue-router location object."
    />
    <component-example :code="basicBreadCrumbsExample">
      <p-bread-crumbs :crumbs="crumbs" />
    </component-example>

    <section-header
      title="Icons"
      description="You can add icons to the crumb using the icon prop."
    />
    <component-example :code="iconBreadCrumbsExample">
      <p-bread-crumbs :crumbs="IconCrumbs" />
    </component-example>

    <section-header
      title="Custom Slot"
      description="You can customize the crumb using the slot. The slot name is the label of the crumb. The slot has access to the crumb object."
    />
    <component-example :code="customSlotExample">
      <p-bread-crumbs :crumbs="crumbs">
        <template #home="{ crumb }">
          <p-icon
            icon="home"
            family="duotone"
          />
          {{ crumb.label }} - Custom Slot
        </template>
      </p-bread-crumbs>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Crumb } from '@/types'

const crumbs = ref<Crumb[]>([{ label: 'home', path: { name: 'PBreadCrumbs' } }, { label: 'Components', path: '/components' }, { label: 'Bread Crumbs' }])

const basicBreadCrumbsExample = {
  code: `<p-bread-crumbs
  :crumbs="crumbs"
/>`,
  language: 'vue-html',
}

const IconCrumbs = ref<Crumb[]>([
  { label: 'home', path: { name: 'PBreadCrumbs' }, icon: 'home', family: 'duotone', faStyle: 'solid' },
  { label: 'Components', path: '/components', icon: 'gear', family: 'duotone', faStyle: 'solid' },
  { label: 'Bread Crumbs', icon: 'bread-slice', family: 'duotone', faStyle: 'solid' },
])

const iconBreadCrumbsExample = {
  code: `<p-bread-crumbs
  :crumbs="crumbs"
/>`,
  language: 'vue-html',
}

const customSlotExample = {
  code: `<p-bread-crumbs
  :crumbs="crumbs"
>
  <template #home="{ crumb }">
    <p-icon
      icon="home"
      family="duotone"
    />
    {{ crumb.label }} - Custom Slot
  </template>
</p-bread-crumbs>`,
  language: 'vue-html',
}
</script>
