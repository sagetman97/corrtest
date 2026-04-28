<template>
  <div
    class="app"
    :class="classes"
  >
    <div class="app__nav">
      <DemoNavigation />
    </div>

    <section class="app__view">
      <router-view v-slot="{ Component }">
        <transition
          :name="route.meta.transition"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </transition>
      </router-view>
    </section>
    <RequiredComponents />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import { RequiredComponents } from '@/components'
import DemoNavigation from './components/DemoNavigation.vue'
import { useScrollableQuery } from './composables/useScrollableQuery'

const route = useRoute()
const scrollable = useScrollableQuery()

const classes = computed(() => ({
  'app__demo-scrollable': scrollable.value,
}))
</script>

<style>
.app {
  --nav-width: 240px;
  --polly-navigation-bar-height: 64px;

  min-height: 100dvh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: var(--polly-navigation-bar-height);
  transition: all 250ms ease-in-out;
}

.app__nav .polly-navigation {
  --polly-navigation-width: var(--nav-width);
}

.app__nav {
  position: relative;
}

.app__demo-scrollable .polly-base-page__main {
  height: 5000px;
  width: 5000px;
  background: linear-gradient(in hsl longer hue 45deg, red 0 0);
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-leave-to,
.slide-fade-enter-from {
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(1rem);
}

.slide-fade-enter-from {
  transform: translateX(-1rem);
}

@media screen and (min-width: 1024px) {
  .app {
    --nav-width: 88px;
    grid-template-columns: var(--nav-width) minmax(0, 1fr);
    grid-template-rows: auto;
  }
}

@media screen and (min-width: 1280px) {
  .app {
    --nav-width: 240px;
  }
}
</style>
