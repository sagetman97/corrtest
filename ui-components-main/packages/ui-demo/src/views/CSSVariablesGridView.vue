<template>
  <component-demo-layout
    class="css-variables-grid-view"
    name="Grid"
  >
    <section-header
      title="Grid Columns"
      description="Column count variables"
    />
    <component-example :code="columnsExample">
      <div class="grid-demos">
        <div
          v-for="grid in gridColumns"
          :key="grid.label"
          class="grid-demo"
        >
          <div class="grid-header">
            <div
              class="grid-label-container"
              :class="{ 'is-copied': copiedLabels.has(grid.label) }"
              @click="copyToClipboard(grid.label)"
            >
              <code class="grid-label">--{{ grid.label }}</code>
              <span class="grid-value">{{ grid.value }}</span>
            </div>
          </div>
          <div class="grid-container-wrapper">
            <div
              class="grid-preview"
              :style="{ gridTemplateColumns: `repeat(${grid.columns}, 1fr)` }"
            >
              <div
                v-for="i in grid.cells"
                :key="i"
                class="grid-cell"
              >
                <span class="grid-cell-number">{{ i }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { useCopyToClipboard } from '@/composables'

const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const gridColumns = [
  { label: 'grid-1-col', value: 'repeat(1, minmax(0,1fr))', columns: 1, cells: 3 },
  { label: 'grid-2-col', value: 'repeat(2, minmax(0,1fr))', columns: 2, cells: 6 },
  { label: 'grid-3-col', value: 'repeat(3, minmax(0,1fr))', columns: 3, cells: 6 },
  { label: 'grid-4-col', value: 'repeat(4, minmax(0,1fr))', columns: 4, cells: 8 },
  { label: 'grid-5-col', value: 'repeat(5, minmax(0,1fr))', columns: 5, cells: 10 },
  { label: 'grid-6-col', value: 'repeat(6, minmax(0,1fr))', columns: 6, cells: 12 },
]

const columnsExample = {
  code: `/* Grid column examples */
.grid-2-col {
  display: grid;
  grid-template-columns: var(--grid-2-col);
}

.grid-4-col {
  display: grid;
  grid-template-columns: var(--grid-4-col);
}

.grid-6-col {
  display: grid;
  grid-template-columns: var(--grid-6-col);
}`,
  language: 'css',
}
</script>

<style>
.grid-intro p {
  margin-bottom: var(--spacing-base);
}

.grid-demos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.grid-demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid-label-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  padding: var(--spacing-sm);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition:
    background-color 100ms ease-in-out,
    border-color 100ms ease-in-out;
  min-width: 300px;
}

.grid-label-container:hover {
  border-color: var(--colors-border-common-active);
}

.grid-label-container:active {
  background-color: var(--colors-background-common-default-grey);
}

.grid-container-wrapper {
  padding: var(--spacing-lg);
  border: 2px dashed var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  background-color: var(--colors-background-common-ultra-light-neutral);
  position: relative;
}

.grid-container-wrapper::before {
  content: 'Grid Container';
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--colors-text-icon-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.grid-preview {
  display: grid;
  gap: var(--spacing-base);
  width: 100%;
}

.grid-cell {
  min-height: 80px;
  background: var(--colors-background-common-white);
  border: 2px solid var(--colors-border-common-accent-light);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-cell-number {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--colors-text-icon-primary);
}

.grid-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
}

.grid-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.grid-label-container.is-copied::after {
  content: 'Copied!';
  opacity: 1;
}

.grid-label-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
  background-color: var(--colors-background-common-white);
  color: var(--colors-text-icon-dark);
  font-weight: 600;
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-base);
}
</style>
