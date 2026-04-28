<template>
  <div
    class="polly-tabset"
    :class="classes.container"
  >
    <div
      ref="tabHeaderElement"
      class="polly-tabset__header"
      :class="classes.header"
      aria-orientation="horizontal"
      :aria-labelledby="selectedTab?.label"
      role="tablist"
      @keydown="handleKeyDown"
    >
      <template
        v-for="tab in tabsWithSlotNamesAndIndex"
        :key="tab.kebabLabelWithHeader"
      >
        <div
          ref="tabElements"
          class="polly-tabset__tab"
          :class="classes.tab(tab)"
          role="tab"
          :aria-selected="tabIsSelected(tab, selected)"
          :data-selected="tabIsSelected(tab, selected)"
          :aria-controls="`p-tabset-panel-${tab.kebabLabel}`"
          @click="handleTabClick(tab)"
        >
          <PTab
            :tab="tab"
            :selected="selected"
            :show-count="showCounts"
          >
            <slot
              v-if="isSlot(tab.kebabLabelWithHeader)"
              :name="tab.kebabLabelWithHeader"
              :selected="tabIsSelected(tab, selected)"
            />
          </PTab>
        </div>
      </template>
      <div
        ref="cursorElement"
        class="polly-tabset__cursor"
        :class="classes.cursor"
      />
    </div>

    <template
      v-for="tab in tabsWithSlotNamesAndIndex"
      :key="tab.kebabLabel"
    >
      <div
        v-show="tabIsSelected(tab, selected)"
        :id="`p-tabset-panel-${tab.kebabLabel}`"
        class="polly-tabset__content"
        role="tabpanel"
        :aria-labelledby="tab.label"
      >
        <slot
          v-if="isSlot(tab.kebabLabel)"
          :name="tab.kebabLabel"
          :selected="tabIsSelected(tab, selected)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup generic="T extends Tab[]">
import { computed, nextTick, onMounted, onUpdated, useTemplateRef } from 'vue'

import { kebabCase } from 'string-ts'

import { keys, Tab, tabIsSelected, TabsetEmits, TabsetProps, TabsetSlots } from '@/types'

import { useResizeObserver } from '@/composables'
import { createUnitValue } from '@/utilities'
import PTab from './PTab.vue'

const props = defineProps<TabsetProps<T>>()
const emit = defineEmits<TabsetEmits<T>>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slots = defineSlots<TabsetSlots<T>>()

const tabElements = useTemplateRef<HTMLDivElement[]>('tabElements')
const cursorElement = useTemplateRef<HTMLDivElement>('cursorElement')
const tabHeaderElement = useTemplateRef<HTMLDivElement>('tabHeaderElement')

type TabWithSlotNames = Tab & {
  kebabLabelWithHeader: string
  kebabLabel: string
}

const tabsWithSlotNamesAndIndex = computed<TabWithSlotNames[]>(() =>
  props.tabs.map((tab) => ({
    ...tab,
    kebabLabelWithHeader: kebabCase(tab.label + '-header'),
    kebabLabel: kebabCase(tab.label),
  }))
)

function isSlot(value: string): value is keyof typeof slots {
  return true
}

const selected = computed({
  get() {
    return props.selected
  },
  set(value) {
    emit('update:selected', value)
  },
})

const resize = useResizeObserver(setCursorPosition)

onUpdated(() => setCursorPosition())
onMounted(() => resize.observe(tabHeaderElement))

const selectedTab = computed<TabWithSlotNames | undefined>(() => {
  return tabsWithSlotNamesAndIndex.value.find((tab) => tabIsSelected(tab, selected.value))
})

const classes = computed(() => ({
  container: [
    `polly-tabset--selected-${selectedTab.value?.kebabLabel}`,
    {
      'polly-tabset--secondary': !!props.secondary,
    },
  ],
  header: {
    'polly-tabset__header--secondary': !!props.secondary,
  },
  cursor: [
    {
      'polly-tabset__cursor--secondary': !!props.secondary,
    },
    `polly-tabset__cursor--${selectedTab.value?.variant || 'default'}`,
  ],
  tab: (tab: Tab) => ({
    'polly-tabset__tab--selected': tabIsSelected(tab, selected.value),
    'polly-tabset__tab--disabled': !!tab.disabled,
    'polly-tabset__tab--secondary': !!props.secondary,
    [`polly-tabset__tab--${tab.variant || 'default'}`]: true,
  }),
}))

function handleTabClick(tab: Tab): void {
  if (!tab.disabled) {
    selected.value = tab.value
  }
}

function handleKeyDown(event: KeyboardEvent): void {
  if (event.key === keys.leftArrow) {
    getPreviousSelectableTab()?.focus()
  }

  if (event.key === keys.rightArrow) {
    getNextSelectableTab()?.focus()
  }
}

function getTabButtonElements(): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll('.polly-tabset__tab-button'))
}

function getNextSelectableTab(): HTMLButtonElement | undefined {
  const tabButtonElements = getTabButtonElements()
  const currentIndex = tabButtonElements.findIndex((tab) => tab === document.activeElement)

  if (currentIndex === undefined) {
    return tabButtonElements.find((tab) => !tab.disabled)
  }

  const tabsAfterSelected = tabButtonElements.slice(currentIndex + 1)
  const tabsBeforeAndIncludingSelected = tabButtonElements.slice(0, currentIndex - 1)
  return [...tabsAfterSelected, ...tabsBeforeAndIncludingSelected].find((tab) => !tab.disabled)
}

function getPreviousSelectableTab(): HTMLButtonElement | undefined {
  const tabButtonElements = getTabButtonElements()
  const currentIndex = tabButtonElements.findIndex((tab) => tab === document.activeElement)

  if (currentIndex === undefined) {
    return tabButtonElements.reverse().find((tab) => !tab.disabled)
  }

  const tabsBeforeSelected = tabButtonElements.slice(0, currentIndex).reverse()
  const tabsAfterAndIncludingSelected = tabButtonElements.slice(currentIndex).reverse()
  return [...tabsBeforeSelected, ...tabsAfterAndIncludingSelected].find((tab) => !tab.disabled)
}

async function setCursorPosition(): Promise<void> {
  await nextTick()

  const selectedElement = tabElements.value?.find((element) => element.dataset.selected === 'true')

  if (!cursorElement.value || !selectedElement || !tabHeaderElement.value) return

  const containerRect = tabHeaderElement.value.getBoundingClientRect()
  const rect = selectedElement.getBoundingClientRect()

  const cursorLeft = rect.left - containerRect.left
  const cursorTop = rect.top - containerRect.top
  const cursorHeight = rect.height
  const cursorWidth = rect.width

  cursorElement.value.style.left = createUnitValue(cursorLeft, 'px').toString()
  cursorElement.value.style.top = createUnitValue(cursorTop, 'px').toString()
  cursorElement.value.style.height = createUnitValue(cursorHeight, 'px').toString()
  cursorElement.value.style.width = createUnitValue(cursorWidth, 'px').toString()
}
</script>

<style>
.polly-tabset {
  --polly-tabset-selected-count-background-color: var(--colors-background-common-dark);
  --polly-tabset-selected-foreground-color: var(--colors-text-icon-light);
  --polly-tabset-selected-background-color: var(--colors-background-button-primary-default);
  --polly-tabset-foreground-color: var(--colors-text-icon-dark);
  --polly-tabset-background-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: var(--spacing-base);
  width: 100%;
  flex-shrink: 0;
}

.polly-tabset--secondary {
  --polly-tabset-selected-count-background-color: var(--colors-background-common-primary);
  --polly-tabset-selected-foreground-color: var(--colors-background-common-primary);
  --polly-tabset-selected-background-color: transparent;
  --polly-tabset-foreground-color: var(--colors-text-icon-dark);
  --polly-tabset-background-color: transparent;
}

.polly-tabset__tab {
  z-index: 1;
  display: flex;
  flex-direction: row;
}

.polly-tabset__header {
  position: relative;
  display: flex;
  background-color: var(--colors-background-common-default-grey);
  border-radius: var(--border-radius-xl);
  gap: var(--spacing-sm);
  align-self: center;
  width: fit-content;
}

.polly-tabset__header--secondary {
  background-color: transparent;
  border-radius: 0;
  border-bottom: 2px solid var(--colors-border-common-default);
  gap: var(--spacing-xs);
}

.polly-tabset__tab--disabled {
  cursor: not-allowed;
}

.polly-tabset__tab--secondary {
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
}

.polly-tabset__tab--secondary .polly-button {
  border-radius: var(--border-radius-xs);
  outline-offset: calc(var(--spacing-xxs) * -1);
}

@media (hover: hover) and (pointer: fine) {
  .polly-tabset__tab--secondary .polly-button:hover {
    box-shadow: none;
  }

  .polly-tabset__tab--secondary:not(.polly-tabset__tab--selected):hover {
    border-color: var(--colors-border-common-active);
  }
}

.polly-tabset__cursor--default {
  --polly-tabset-selected-background-color: var(--colors-background-button-primary-default);
  --polly-tabset-selected-border-color: var(--colors-background-button-primary-default);
}

.polly-tabset__cursor--ai {
  --polly-tabset-selected-background-color: var(--colors-background-uncommon-copilot-light);
  --polly-tabset-selected-border-color: var(--colors-border-common-copilot);
}

.polly-tabset__cursor {
  position: absolute;
  transition: all 200ms ease-in-out;
  background-color: var(--polly-tabset-selected-background-color);
  box-sizing: border-box;
  border-radius: var(--border-radius-xl);
  z-index: 0;
}

.polly-tabset__cursor--secondary {
  border-radius: 0;
  border-bottom: 2px solid var(--polly-tabset-selected-border-color);
  background-color: transparent;
}

.polly-tabset__cursor--transition {
  opacity: 1;
}

@media (prefers-reduced-motion) {
  .polly-tabset__cursor {
    transition: none;
  }
}
</style>
