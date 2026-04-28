<template>
  <p-base-page
    :title="name"
    :bread-crumbs="[]"
    class="component-base-page"
  >
    <p-card
      v-if="slots.props"
      class="component-base-page__props"
    >
      <slot name="props" />
    </p-card>

    <p-card
      v-if="slots.slots"
      class="component-base-page__slots"
    >
      <slot name="slots" />
    </p-card>

    <p-card
      v-if="slots.default"
      class="component-base-page__content"
    >
      <slot />
    </p-card>

    <template
      v-if="slots.left"
      #left
    >
      <slot name="left" />
    </template>

    <template
      v-if="slots.right"
      #right="scope"
    >
      <slot
        name="right"
        v-bind="scope"
      />
    </template>
  </p-base-page>
</template>

<script setup lang="ts">
import { type ComponentBasePageProps, type ComponentBasePageSlots } from '../types/ComponentBasePageTypes'

withDefaults(defineProps<ComponentBasePageProps>(), {
  propsTitle: 'Props',
  slotsTitle: 'Slots',
  defaultTitle: 'Component',
})

const slots = defineSlots<ComponentBasePageSlots>()
</script>

<style>
.component-base-page__props {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.component-base-page__content .polly-card__content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-base);
}
</style>
