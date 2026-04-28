<template>
  <nav
    class="polly-navigation-aside"
    :class="classes.container"
  >
    <div class="polly-navigation-aside__content">
      <div class="polly-navigation-aside__logo">
        <slot name="logo" />
      </div>

      <template v-if="slots.above">
        <div class="polly-navigation-aside__above">
          <slot name="above" />
        </div>
      </template>

      <template
        v-for="item in items"
        :key="item.label"
      >
        <template v-if="isNavigationGroup(item)">
          <PNavigationGroup
            v-if="item.show"
            v-bind="item"
            :open="groupIsOpen(item)"
            @update:open="setGroupOpen(item, $event)"
          />
        </template>

        <template v-else>
          <PNavigationItem
            v-if="item.show"
            v-bind="item"
          />
        </template>
      </template>
    </div>

    <template v-if="slots.footer">
      <div class="polly-navigation-aside__footer">
        <slot name="footer" />
      </div>
    </template>
  </nav>
</template>

<script lang="ts" setup generic="T extends Navigation[]">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { kebabCase } from 'string-ts'

import { isNavigationGroup, Navigation, NavigationGroup, NavigationProps, NavigationSlots } from '@/types/navigation'

import { PNavigationGroup, PNavigationItem } from '@/components/navigation'

type NavigationWithSlotName = Navigation & {
  kebabLabel: string
}

const props = defineProps<NavigationProps<T>>()

const slots = defineSlots<NavigationSlots>()

const expanded = defineModel('expanded', { default: false, type: Boolean })

const classes = computed(() => {
  return {
    container: {
      'polly-navigation-aside--expanded': expanded.value,
    },
  }
})

const items = computed<NavigationWithSlotName[]>(() =>
  props.items.map((item) => ({
    show: true,
    ...item,
    kebabLabel: kebabCase(item.label),
  }))
)

const { resolve } = useRouter()
const route = useRoute()
const openGroups = ref<NavigationGroup[]>([])

const groups = computed(() => props.items.filter(isNavigationGroup))

watch(
  route,
  () => {
    const groupForRoute = groups.value.find((group) => {
      const groupMatches = group.items.some((item) => {
        const { to } = item

        if (!to) return false

        return route?.matched.some((match) => resolve(match).href === resolve(to).href)
      })
      return groupMatches && group
    })

    if (groupForRoute) {
      setGroupOpen(groupForRoute, true)
    }

    expanded.value = false
  },
  { immediate: true }
)

function groupIsOpen(group: NavigationGroup): boolean {
  return openGroups.value.some(({ label }) => label === group.label)
}

function setGroupOpen(group: NavigationGroup, expanded: boolean): void {
  closeAllGroups()

  const valueWithoutGroup = openGroups.value.filter(({ label }) => label !== group.label)

  if (expanded) {
    openGroups.value = [...valueWithoutGroup, group]
  } else {
    openGroups.value = [...valueWithoutGroup]
  }
}

function closeAllGroups(): void {
  openGroups.value = []
}
</script>

<style>
/* mobile */
.polly-navigation-aside {
  --polly-navigation-aside-width: 100vw;
  --polly-navigation-bar-height: 64px;

  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-base);
  width: var(--polly-navigation-aside-width);
  transition:
    transform 300ms var(--polly-transition-ease-out),
    width ease-in-out 200ms,
    background-color 300ms,
    color 300ms;
  background-color: var(--colors-background-uncommon-nav-nav);
  bottom: 0;
  top: var(--polly-navigation-bar-height);
  height: calc(100dvh - var(--polly-navigation-bar-height) + 1px);
  transform: translateY(-100%);
  z-index: calc(var(--layout-navigation-bar) - 1);
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.polly-navigation-aside--expanded {
  transform: translateY(0);
}

.polly-navigation-aside__content {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding-inline: var(--spacing-md);
  gap: var(--spacing-xs);
  align-items: normal;
}

.polly-navigation-aside__logo {
  position: sticky;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  padding: var(--spacing-sm);
  background-color: var(--colors-background-uncommon-nav-nav);
  top: 0;
  z-index: var(--layout-above);
  display: none;
}

.polly-navigation-aside__footer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
}

/* laptop/small desktop */
@media screen and (min-width: 1024px) {
  .polly-navigation-aside {
    --polly-navigation-aside-width: 88px;
    transform: none;
    height: 100dvh;
    top: 0;
    scrollbar-gutter: unset;
  }

  .polly-navigation-aside__logo {
    display: flex;
  }
}

/* laptop/small desktop */
@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .polly-navigation-aside {
    z-index: calc(var(--layout-navigation-bar) - 1);
  }

  .polly-navigation-aside__content::-webkit-scrollbar {
    display: none;
  }

  .polly-navigation-aside__content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .polly-navigation-aside__content {
    align-items: center;
    overflow-x: hidden;
    padding-inline: 0;
  }

  .polly-navigation-aside__footer {
    align-items: center;
    padding-inline: 0;
  }
}

/* large desktop styles */
@media screen and (min-width: 1280px) {
  .polly-navigation-aside {
    --polly-navigation-aside-width: 240px;
    z-index: calc(var(--layout-navigation-bar) - 1);
  }

  .polly-navigation-aside__content {
    align-items: normal;
  }
}
</style>
