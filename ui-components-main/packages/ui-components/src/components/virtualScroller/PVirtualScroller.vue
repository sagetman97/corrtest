<template>
  <div
    ref="containerElement"
    class="polly-virtual-scroller"
  >
    <template
      v-for="(chunk, chunkIndex) in chunks"
      :key="chunkIndex"
    >
      <VirtualScrollerChunk
        class="polly-virtual-scroller__chunk"
        :estimate-height="getChunkHeight(chunk.length)"
        v-bind="{ observerOptions: observerOptions }"
      >
        <template
          v-for="(item, itemChunkIndex) in chunk"
          :key="getItemKey(item, chunkIndex, itemChunkIndex)"
        >
          <slot
            :item="item"
            :index="getItemIndex(chunkIndex, itemChunkIndex)"
          />
        </template>
      </VirtualScrollerChunk>
    </template>
    <div
      ref="bottomElement"
      class="polly-virtual-scroller__bottom"
    />
  </div>
</template>

<script lang="ts" setup generic="T">
import { computed, onMounted, useTemplateRef, watch } from 'vue'

import { VirtualScrollerEmits, VirtualScrollerProps, VirtualScrollerSlots } from '@/types/virtualization'

import { useEventListener, useIntersectionObserver, UseIntersectionObserverOptions, useMutationObserver } from '@/composables'
import { createUnitValue } from '@/utilities'
import VirtualScrollerChunk from './PVirtualScrollerChunk.vue'

const props = withDefaults(defineProps<VirtualScrollerProps<T>>(), {
  itemEstimateHeight: () => createUnitValue(50, 'px'),
  chunkSize: 50,
})

const emit = defineEmits<VirtualScrollerEmits>()

defineSlots<VirtualScrollerSlots<T>>()

const containerElement = useTemplateRef<HTMLDivElement>('containerElement')
useEventListener(containerElement, 'scroll', (event) => {
  const target = event.target as HTMLElement

  if (target.scrollTop === 0) {
    return emit('top')
  }

  return emit('scroll')
})

const bottomElement = useTemplateRef<HTMLDivElement>('bottomElement')
const defaultIntersectionOptions = computed<UseIntersectionObserverOptions>(() => {
  const margin = createUnitValue(props.chunkSize * 4, 'px')

  return { rootMargin: margin.toString() }
})
const { observe, check } = useIntersectionObserver(intersect, props.observerOptions ?? defaultIntersectionOptions)

const chunks = computed(() => {
  const chunkArray = []

  for (let index = 0; index < props.items.length; index += props.chunkSize) {
    chunkArray.push(props.items.slice(index, index + props.chunkSize))
  }

  return chunkArray
})

function getChunkHeight(size: number): CSSUnitValue {
  const estimateHeight = props.itemEstimateHeight
  return createUnitValue(estimateHeight.value * size, estimateHeight.unit)
}

function intersect(entries: IntersectionObserverEntry[]): void {
  entries.forEach(({ isIntersecting }) => {
    if (isIntersecting) {
      emit('bottom')
    }
  })
}
const checkLoaded: MutationCallback = () => {
  emit('loaded', {
    containerElement: containerElement.value!,
    scrollTo,
  })
}

const observer = useMutationObserver(checkLoaded)

onMounted(() => {
  observer.observe(containerElement, { childList: true, subtree: true })
})

function getItemKey(item: T, chunkIndex: number, itemChunkIndex: number): string {
  const index = getItemIndex(chunkIndex, itemChunkIndex)

  return props.itemKey(item, index)
}

function getItemIndex(chunkIndex: number, itemChunkIndex: number): number {
  return props.chunkSize * chunkIndex + itemChunkIndex
}

function scrollTo(top: number): void {
  containerElement.value?.scrollTo({ top })
}

watch(
  () => props.items,
  () => check(bottomElement)
)

onMounted(() => {
  observe(bottomElement)
})
</script>

<style>
.polly-virtual-scroller {
  --polly-virtual-scroller-gap: var(--spacing-xs);

  overflow-y: auto;
}

.polly-virtual-scroller__chunk {
  margin-bottom: var(--polly-virtual-scroller-gap);
}
</style>
