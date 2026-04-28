<template>
  <p-base-page
    class="component-demo-layout"
    :bread-crumbs="[]"
  >
    <div class="component-demo-layout__content">
      <div
        v-if="slots.default"
        class="component-demo-layout__demo"
      >
        <h1 class="component-demo-layout__title">
          {{ name }}
        </h1>
        <slot />
      </div>
      <template v-if="!isMobileWidth">
        <TableOfContents :contents="contents" />
      </template>
    </div>

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
import { useMobile } from '@/composables'
import { type ComponentBasePageProps, type ComponentBasePageSlots } from '../types/ComponentBasePageTypes'
import TableOfContents from './TableOfContents.vue'

const { isMobileWidth } = useMobile()

withDefaults(defineProps<ComponentBasePageProps>(), {
  propsTitle: 'Props',
  slotsTitle: 'Slots',
  defaultTitle: 'Component',
  contents: () => [],
})

const slots = defineSlots<ComponentBasePageSlots>()
</script>

<style>
.component-demo-layout {
  height: unset;
}

.component-demo-layout .polly-base-page__main {
  margin-inline: auto;
  overflow: unset;
  width: 100%;
}

.component-demo-layout__content {
  display: flex;
  gap: var(--spacing-xxxl);
  justify-content: center;
}

.component-demo-layout__demo {
  width: 100%;
  max-width: var(--max-width-readable);
}
</style>
