<template>
  <p-navigation
    class="demo-navigation"
    :items="items"
  >
    <template #logo>
      <router-link
        class="demo-navigation__home"
        to="/"
      >
        <PollyLogoMobile v-if="useSmallLogo" />
        <PollyLogoDesktop v-else />
      </router-link>
    </template>

    <template #footer>
      <p-navigation-action
        :label="theme === 'dark' ? 'Light' : 'Dark'"
        :icon="String(theme) === 'dark' ? 'moon' : 'sun'"
        aria-label="toggle theme"
        @click="toggleTheme"
      />

      <p-navigation-action
        label="Scrollable"
        icon="rainbow"
        aria-label="toggle scrollable"
        @click="toggleScrollable"
      />

      <p-navigation-action
        v-if="version"
        :label="'Version ' + version"
        :aria-label="'Version ' + version"
        icon="tag"
        to="https://github.com/PollyEx/ui-components/releases"
        target="_blank"
      />
    </template>
  </p-navigation>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { pascalCase } from 'string-ts'

import { Navigation } from '@/types'

import { useMobile, useTheme } from '@/composables'
import PollyLogoDesktop from '../assets/polly-logo-dark-desktop.svg'
import PollyLogoMobile from '../assets/polly-logo-dark-mobile.svg'
import { useScrollableQuery } from '../composables/useScrollableQuery'
import views from '../views'

const { theme, toggle: toggleTheme } = useTheme()
const { isLaptopWidth } = useMobile()
const useSmallLogo = computed(() => isLaptopWidth.value)
const scrollable = useScrollableQuery()

function toggleScrollable(): void {
  scrollable.value = !scrollable.value
}

const routes = Object.values(views)

const items: Navigation[] = [
  {
    label: 'Welcome',
    icon: 'home',
    collapsedLabel: '',
    faStyle: 'regular',
    to: { name: 'welcome' },
  },
  {
    label: 'CSS Variables',
    collapsedLabel: 'CSS',
    color: '#F2994A',
    icon: 'polly-slash',
    family: 'kit',
    size: 'lg',
    items: [
      {
        label: 'Borders',
        collapsedLabel: '',
        icon: 'border-all',
        faStyle: 'regular',
        to: { name: 'css-variables-borders' },
      },
      {
        label: 'Colors',
        collapsedLabel: '',
        icon: 'droplet',
        faStyle: 'regular',
        to: { name: 'css-variables-colors' },
      },
      {
        label: 'Typography',
        collapsedLabel: '',
        icon: 'font',
        faStyle: 'regular',
        to: { name: 'css-variables-typography' },
      },
      {
        label: 'Grid',
        collapsedLabel: '',
        icon: 'grid',
        faStyle: 'regular',
        to: { name: 'css-variables-grid' },
      },
      {
        label: 'Layers',
        collapsedLabel: '',
        icon: 'layer-group',
        faStyle: 'regular',
        to: { name: 'css-variables-layers' },
      },
      {
        label: 'Spacing',
        collapsedLabel: '',
        icon: 'arrows-left-right',
        faStyle: 'regular',
        to: { name: 'css-variables-spacing' },
      },
    ],
  },
  {
    label: 'Components',
    collapsedLabel: 'UI',
    color: '#01FFF0',
    icon: 'polly-slash',
    family: 'kit',
    size: 'lg',
    items: routes.map((route) => ({
      label: route.label,
      collapsedLabel: '',
      icon: route.icon,
      to: { name: pascalCase(route.label) },
    })),
  },
]

const version = import.meta.env.VITE_VERSION
</script>

<style>
.app-navigation__logo--desktop {
  display: block;
}

.app-navigation__logo--tablet {
  display: none;
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .app-navigation__logo--desktop {
    display: none;
  }

  .app-navigation__logo--tablet {
    display: block;
  }
}
</style>
