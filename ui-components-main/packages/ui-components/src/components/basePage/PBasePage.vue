<template>
  <section
    ref="basePageElement"
    class="polly-base-page"
    :class="classes.basePage"
  >
    <section
      id="polly-base-page-main"
      class="polly-base-page__main"
    >
      <PBreadCrumbs
        v-if="showCrumbs"
        :crumbs="crumbsToUse"
      >
        <template
          v-for="(_, slot) of slots"
          #[slot]="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </PBreadCrumbs>

      <p-base-page-header
        v-if="title || slots.title || slots.controls"
        v-bind="{ title }"
      >
        <template
          v-for="(_, slot) of slots"
          #[slot]="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </p-base-page-header>

      <section class="polly-base-page__content">
        <slot />
      </section>
    </section>

    <section
      v-if="!!slots.right"
      id="polly-base-page-right"
      class="polly-base-page__right"
    >
      <slot
        name="right"
        :base-page="basePageElement"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

import { BasePageProps, BasePageSlots } from '@/types'

import { PBasePageHeader, PBreadCrumbs } from '@/components'
import { useMobile, useRouterBreadCrumbs } from '@/composables'
import { createUnitValue } from '@/utilities'

const { breadCrumbs, initialRightWidth = createUnitValue(370, 'px') } = defineProps<BasePageProps>()

const { isMobileWidth } = useMobile()

const basePageElement = useTemplateRef<HTMLDivElement>('basePageElement')

const showCrumbs = computed(() => {
  // Allow setting breadCrumbs to [] so that bread crumb display can be disabled
  return crumbsToUse.value.length > 0 && !isMobileWidth.value
})
const crumbsToUse = computed(() => {
  return breadCrumbs ?? useRouterBreadCrumbs()
})

const panelWidth = computed(() => {
  return initialRightWidth.toString()
})

const slots = defineSlots<BasePageSlots>()

const classes = computed(() => {
  return {
    basePage: {
      'polly-base-page--has-right': !!slots.right,
    },
  }
})
</script>

<style>
.polly-base-page {
  --initial-right-width: v-bind(panelWidth);

  display: grid;
  height: 100%;
  grid-template-columns: 1fr;

  position: relative;
}

.polly-base-page__main {
  padding: 1.5rem;
  overflow: auto;
  display: flex;
  gap: var(--spacing-base);
  flex-direction: column;
  box-sizing: border-box;
}

.polly-base-page__content {
  min-height: 0;
}

.polly-base-page__right {
  position: relative;
}

.polly-base-page--has-right {
  grid-template-columns: 1fr var(--initial-right-width);
}

@media screen and (max-width: 669px) {
  .polly-base-page__main {
    padding: var(--spacing-md);
  }
}

@media screen and (max-width: 1023px) {
  .polly-base-page {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    -webkit-overflow-scrolling: touch;
  }

  .polly-base-page__main {
    overflow-y: scroll;
    scroll-snap-align: start;
    box-sizing: border-box;
    width: 100vw;
    flex-shrink: 0;
  }

  .polly-base-page__right {
    scroll-snap-align: start;
    position: relative;
    flex-shrink: 0;
    overflow-y: scroll;
  }
}
</style>
