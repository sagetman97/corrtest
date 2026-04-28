<template>
  <nav
    class="polly-pagination"
    role="navigation"
    aria-label="Pagination Navigation"
    :class="classes.container"
  >
    <p-select
      v-if="props.showPageSize"
      v-model="pageSize"
      class="polly-pagination__page-size"
      variant="simple"
      :label="props.pageSizeLabel"
      label-position="left"
      :options="pageSizeOptions"
    />
    <ul
      ref="listElement"
      class="polly-pagination__list"
    >
      <li class="polly-pagination__list-item">
        <p-icon-button
          class="polly-pagination__arrow-button"
          icon="circle-arrow-left"
          family="duotone"
          size="lg"
          aria-label="Goto Previous Page"
          :disabled="previousDisabled"
          @click="previousPage"
        />
      </li>
      <div
        ref="cursorElement"
        class="polly-pagination__cursor"
      />
      <template
        v-for="(visiblePage, index) in visiblePages"
        :key="visiblePage"
      >
        <li
          ref="pageElements"
          class="polly-pagination__page"
          :class="{
            'polly-pagination__page--selected': page === visiblePage,
          }"
          :data-selected="page === visiblePage"
        >
          <p-button
            v-if="visiblePage === ellipsis"
            class="polly-pagination__ellipsis"
            icon="ellipsis"
            :aria-current="false"
            outline
            round
            @click="setVisiblePages(index === 1 ? 1 : totalPages)"
          >
          </p-button>

          <p-button
            v-else
            outline
            round
            class="polly-pagination__page-button"
            :aria-current="page === visiblePage"
            :aria-label="`Goto Page ${visiblePage}`"
            :class="{
              'polly-pagination__page--selected': page === visiblePage,
            }"
            @click="gotoPage(visiblePage)"
          >
            {{ visiblePage.toLocaleString() }}
          </p-button>
        </li>
      </template>
      <li class="polly-pagination__arrow">
        <p-icon-button
          class="polly-pagination__arrow-button"
          aria-label="Goto Next Page"
          icon="circle-arrow-right"
          size="lg"
          family="duotone"
          :disabled="nextDisabled"
          @click="nextPage"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUpdated, ref, useTemplateRef, watch } from 'vue'

import { PaginationEmits, PaginationProps } from '@/types'

import { useComputedStyle, useResizeObserver } from '@/composables'
import { createUnitValue, getPxValue } from '@/utilities'

type RangeItem = number | typeof ellipsis

const props = withDefaults(defineProps<PaginationProps>(), {
  start: 1,
  pageSizes: () => [25, 50, 75, 100, 150, 200, 250, 500],
  pageSizeLabel: 'Per Page',
})

const pageSize = defineModel<number>('pageSize', { default: 25 })

const emit = defineEmits<PaginationEmits>()

const totalPages = computed(() => Math.ceil(props.totalPages))
const pageElements = useTemplateRef<HTMLLIElement[]>('pageElements')

const cursorElement = useTemplateRef<HTMLDivElement>('cursorElement')
const listElement = useTemplateRef<HTMLUListElement>('listElement')
const width = useComputedStyle(listElement, 'width')

const resize = useResizeObserver(setCursorPosition)

onUpdated(() => setCursorPosition())
onMounted(() => resize.observe(listElement))

const pageSizeOptions = computed(() => props.pageSizes.map((value) => ({ value, label: value.toLocaleString() })))

const pagesShown = computed(() => {
  const averageWidthOfPage = 74
  const maxPages = Math.floor(getPxValue(width.value) / averageWidthOfPage)
  if (typeof props.pagesShown === 'number') {
    return maxPages < props.pagesShown ? maxPages : props.pagesShown
  }

  return maxPages
})

const classes = computed(() => ({
  container: {
    'polly-pagination--full-width': props.fullWidth,
  },
}))

const ellipsis = '...'
const visiblePages = ref<RangeItem[]>([])

const page = computed({
  get() {
    return props.page
  },
  set(value) {
    emit('update:page', value)
  },
})

watch(
  page,
  (page) => {
    if (visiblePages.value.includes(page) && !isSiblingToEllipsis(page)) {
      return
    }

    visiblePages.value = getVisiblePages(page, pagesShown.value, totalPages.value, props.start)
  },
  { immediate: true }
)

watch(
  [pagesShown, totalPages, () => props.start],
  ([pagesShownVal, totalPagesVal, startVal]) => (visiblePages.value = getVisiblePages(page.value, pagesShownVal, totalPagesVal, startVal)),
  { immediate: true }
)

const previousDisabled = computed(() => {
  return page.value <= props.start
})

const nextDisabled = computed(() => {
  return page.value >= totalPages.value
})

function previousPage(): void {
  if (!previousDisabled.value) {
    page.value--
  }
}

function nextPage(): void {
  if (!nextDisabled.value) {
    page.value++
  }
}

function gotoPage(value: number): void {
  if (value < props.start) {
    page.value = props.start
  } else if (value > totalPages.value) {
    page.value = totalPages.value
  } else {
    page.value = value
  }
}

function createRange(length: number, start = 0): number[] {
  return Array.from({ length }, (v, k) => start + k)
}

function setVisiblePages(page: number): void {
  visiblePages.value = getVisiblePages(page, pagesShown.value, totalPages.value, props.start)
}

function isSiblingToEllipsis(page: number): boolean {
  const index = visiblePages.value.indexOf(page)

  return [visiblePages.value[index - 1], visiblePages.value[index + 1]].includes(ellipsis)
}

function getVisiblePages(page: number, pagesShown: number, totalPages: number, start: number): RangeItem[] {
  if (pagesShown <= 0) return []
  else if (pagesShown === 1) return [page]

  if (totalPages <= pagesShown) {
    return createRange(totalPages, start)
  }

  const even = pagesShown % 2 === 0
  const middle = even ? pagesShown / 2 : Math.floor(pagesShown / 2)
  const left = even ? middle : middle + 1
  const right = totalPages - middle

  const pageIsAtStart = left - page >= 0
  if (pageIsAtStart) {
    return [...createRange(pagesShown - 2, start), ellipsis, totalPages]
  }

  const pageIsAtEnd = page - right >= (even ? 1 : 0)
  if (pageIsAtEnd) {
    const rangeLength = pagesShown - 2
    const rangeStart = totalPages - rangeLength + start
    return [start, ellipsis, ...createRange(rangeLength, rangeStart)]
  }

  const rangeLength = Math.max(1, pagesShown - 4)
  const rangeStart = rangeLength === 1 ? page : page - Math.ceil(rangeLength / 2) + start
  return [start, ellipsis, ...createRange(rangeLength, rangeStart), ellipsis, totalPages]
}

async function setCursorPosition(): Promise<void> {
  await nextTick()

  if (!cursorElement.value || !listElement.value || !pageElements.value) {
    return
  }

  const selectedElement = pageElements.value.find((element) => element.dataset.selected === 'true')

  if (!selectedElement) {
    cursorElement.value.style.display = 'none'
    return
  }

  cursorElement.value.style.display = 'block'

  const containerRect = listElement.value.getBoundingClientRect()
  const selectedRect = selectedElement.getBoundingClientRect()

  const cursorLeft = selectedRect.left - containerRect.left
  const cursorTop = selectedRect.top - containerRect.top
  const cursorHeight = selectedRect.height
  const cursorWidth = selectedRect.width

  cursorElement.value.style.left = createUnitValue(cursorLeft, 'px').toString()
  cursorElement.value.style.top = createUnitValue(cursorTop, 'px').toString()
  cursorElement.value.style.height = createUnitValue(cursorHeight, 'px').toString()
  cursorElement.value.style.width = createUnitValue(cursorWidth, 'px').toString()
}
</script>

<style>
.polly-pagination {
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 1fr));
  grid-template-areas: 'pageSize pages .';
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  --polly-pagination-selected-background-color: var(--colors-background-button-primary-default);
}

.polly-pagination--full-width {
  grid-template-columns: auto 1fr auto;
}

.polly-pagination:has(.polly-pagination__page-size) {
  gap: var(--spacing-base);
}

.polly-pagination__page-size {
  grid-area: pageSize;
  justify-self: start;
  min-width: 0;
}

.polly-pagination__list {
  grid-area: pages;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-xs);
}

.polly-pagination__list--full-width {
  grid-template-areas: pages;
}

.polly-pagination__list-item {
  flex-shrink: 0;
  display: inline-flex;
}

.polly-pagination__page {
  min-width: unset;
  z-index: 1;
}

.polly-pagination__page .polly-button {
  background-color: transparent;
  border: none;
  border-radius: var(--border-radius-md);
}

.polly-pagination__arrow {
  flex-shrink: 0;
}

.polly-pagination__cursor {
  position: absolute;
  transition: all 250ms ease-in-out;
  box-sizing: border-box;
  border-radius: var(--border-radius-md);
  pointer-events: none;
  backdrop-filter: invert(100%);
  z-index: 10;
}

@media (prefers-reduced-motion) {
  .polly-pagination__cursor {
    transition: none;
  }

  .polly-pagination__page--selected {
    transition: none;
  }
}

@media screen and (max-width: 669px) {
  .polly-pagination {
    grid-template-columns: 1fr;
    justify-content: center;
    grid-template-areas: 'pageSize' 'pages';
  }
  .polly-pagination__page-size {
    justify-self: center;
  }
}
</style>
