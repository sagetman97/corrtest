<template>
  <div class="polly-navigation">
    <PNavigationBar
      v-bind="props"
      v-model:expanded="expanded"
    >
      <template #logo>
        <slot name="logo" />
      </template>

      <template #above>
        <slot name="above" />
      </template>

      <template #footer>
        <slot name="footer" />
      </template>

      <template #right>
        <slot name="right" />
      </template>
    </PNavigationBar>

    <PNavigationAside
      v-bind="props"
      v-model:expanded="expanded"
    >
      <template #logo>
        <slot name="logo" />
      </template>

      <template #above>
        <slot name="above" />
      </template>

      <template #footer>
        <slot name="footer" />
      </template>
    </PNavigationAside>
  </div>
</template>

<script lang="ts" setup generic="T extends Navigation[]">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { Navigation, NavigationProps, NavigationSlots } from '@/types/navigation'

import PNavigationAside from './PNavigationAside.vue'
import PNavigationBar from './PNavigationBar.vue'

const route = useRoute()

const expanded = ref(false)

const props = defineProps<NavigationProps<T>>()

defineSlots<NavigationSlots>()

watch(route, () => (expanded.value = false))
</script>

<style>
.polly-navigation {
  height: 0;
}
</style>
