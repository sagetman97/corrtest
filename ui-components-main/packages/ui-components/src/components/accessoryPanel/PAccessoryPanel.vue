<template>
  <div
    class="polly-accessory-panel__backdrop"
    :class="{ 'polly-accessory-panel__backdrop--visible': expanded }"
    @click="close"
  />
  <div
    ref="panelElement"
    class="polly-accessory-panel"
    :class="classes"
  >
    <div class="polly-accessory-panel__content">
      <slot
        :expand="handleExpand"
        :expanded="expanded"
        :close="close"
        :open="open"
      />
    </div>

    <div
      v-if="slots.footer"
      class="polly-accessory-panel__footer"
    >
      <slot
        name="footer"
        :expand="handleExpand"
        :expanded="expanded"
        :close="close"
        :open="open"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useTemplateRef, watch } from 'vue'

import { AccessoryPanelProps, AccessoryPanelSlots } from '@/types'

import { useComputedStyle, useElementRect, useEventListener, useMobile } from '@/composables'
import { convertViewportToPx, createUnitValue, getPxValue } from '@/utilities'

const { container, initialWidth = createUnitValue(370, 'px') } = defineProps<AccessoryPanelProps>()

const slots = defineSlots<AccessoryPanelSlots>()

const expanded = defineModel<boolean>('expanded', { required: false, default: false })

const containerRef = toRef(() => container)
const containerWidth = useComputedStyle(containerRef, 'width')

const panelElement = useTemplateRef<HTMLElement>('panelElement')
const { value: panelRect } = useElementRect(panelElement)

const isProgrammaticScroll = ref(false)

const { isDesktopWidth } = useMobile()

useEventListener(containerRef, 'scroll', () => {
  const scrollLeft = container?.scrollLeft ?? 0

  if (panelRect.value.left - scrollLeft === 0 && !isProgrammaticScroll.value) {
    open()
  } else if (scrollLeft === 0 && !isProgrammaticScroll.value) {
    close()
  }
  isProgrammaticScroll.value = false
})

const panelWidth = computed(() => {
  if (expanded.value) {
    const maxWidth = isDesktopWidth.value ? 80 : 100
    const value = Math.min(getPxValue(containerWidth.value), convertViewportToPx(maxWidth, 'vw'))

    return createUnitValue(value, 'px').toString()
  }

  return initialWidth.toString()
})

const handleExpand = () => {
  expanded.value = !expanded.value
}

const close = () => {
  expanded.value = false
}

const open = () => {
  expanded.value = true
}

watch(expanded, (value) => {
  isProgrammaticScroll.value = true
  if (value) {
    panelElement.value?.scrollIntoView({ inline: 'start', behavior: 'smooth' })
  } else {
    container?.scrollTo({ left: 0, behavior: 'smooth' })
  }
})

const handleEsc = (event: KeyboardEvent) => {
  if (event.code === 'Escape') expanded.value = false
}

useEventListener(window, 'keydown', handleEsc)

const classes = computed(() => {
  return {
    'polly-accessory-panel--expanded': expanded.value,
  }
})
</script>

<style>
.polly-accessory-panel {
  width: v-bind(panelWidth);
  background-color: var(--colors-background-common-white);
  border-left: 1px solid var(--colors-border-common-default);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all ease-in-out 350ms;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  z-index: var(--layout-accessory-panel);
}

.polly-accessory-panel--expanded {
  box-shadow: var(--shadow-xl);
}

.polly-accessory-panel__backdrop {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: var(--layout-accessory-panel);
  background-color: transparent;
  transition: all ease-in-out 350ms;
}

.polly-accessory-panel__backdrop--visible {
  pointer-events: all;
}

.polly-accessory-panel__backdrop:has(+ .polly-accessory-panel--expanded) {
  background-color: var(--colors-backdrop);
}

.polly-accessory-panel.polly-swipe--dragging {
  transition: none;
}

.polly-accessory-panel__content {
  position: relative;
}

.polly-accessory-panel__footer {
  padding: var(--spacing-base);
  background-color: var(--colors-background-common-white);
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.polly-accessory-panel__footer > * {
  pointer-events: auto;
}

@media screen and (max-width: 1023px) {
  .polly-accessory-panel {
    position: relative;
    height: calc(100dvh - var(--polly-navigation-bar-height));
    bottom: 0;
    width: 100dvw;
  }

  .polly-accessory-panel__backdrop {
    display: none;
  }
}
</style>
