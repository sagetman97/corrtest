<template>
  <component-demo-layout
    class="css-variables-layers-view"
    name="Layers"
  >
    <section-header
      title="Layer Scale"
      description="Available z-index values"
    />
    <component-example :code="scaleExample">
      <div class="layers-demos">
        <div
          v-for="layer in layerScale"
          :key="layer.label"
          class="layer-demo"
        >
          <div class="layer-preview-container">
            <div
              v-for="i in layer.visualIndex"
              :key="i"
              class="layer-preview"
              :style="{ zIndex: i, transform: `translate(${i * 8}px, ${i * 8}px)` }"
            >
              <span class="layer-preview-label">z: {{ layer.value }}</span>
            </div>
          </div>
          <div
            class="layer-info"
            :class="{ 'is-copied': copiedLabels.has(layer.label) }"
            @click="copyToClipboard(layer.label)"
          >
            <code class="layer-label">--{{ layer.label }}</code>
            <span class="layer-value">z-index: {{ layer.value }}</span>
            <span class="layer-description">{{ layer.description }}</span>
          </div>
        </div>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { useCopyToClipboard } from '@/composables'

const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const layerScale = [
  { label: 'layout-below', value: '-1', visualIndex: 1, description: 'Below normal content' },
  { label: 'layout-above', value: '1', visualIndex: 2, description: 'Above normal content' },
  { label: 'layout-navigation-bar', value: '10', visualIndex: 3, description: 'Navigation bars' },
  { label: 'layout-accessory-panel', value: '20', visualIndex: 4, description: 'Accessory panels and sidebars' },
  { label: 'layout-modal', value: '30', visualIndex: 5, description: 'Modal dialogs' },
  { label: 'layout-tooltip', value: '100', visualIndex: 6, description: 'Tooltips and popovers' },
  { label: 'layout-max', value: '9999', visualIndex: 7, description: 'Maximum z-index for critical overlays' },
]

const scaleExample = {
  code: `/* Z-index layer scale examples */
.nav-bar {
  position: sticky;
  z-index: var(--layout-navigation-bar);
}

.modal-dialog {
  position: fixed;
  z-index: var(--layout-modal);
}

.tooltip {
  position: absolute;
  z-index: var(--layout-tooltip);
}`,
  language: 'css',
}
</script>

<style>
.layers-intro p {
  margin-bottom: var(--spacing-base);
}

.layers-demos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.layer-demo {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
  padding: var(--spacing-lg);
}

.layer-preview-container {
  width: 200px;
  height: 200px;
  position: relative;
  background: var(--colors-background-common-ultra-light-neutral);
  border: 2px dashed var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  flex-shrink: 0;
}

.layer-preview {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
  background: var(--colors-background-common-white);
  border: 2px solid var(--colors-border-common-accent-light);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-preview-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--colors-text-icon-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.layer-info {
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
  flex-grow: 1;
  min-width: 300px;
}

.layer-info:hover {
  border-color: var(--colors-border-common-active);
}

.layer-info:active {
  background-color: var(--colors-background-common-default-grey);
}

.layer-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
  font-weight: var(--font-weight-medium);
}

.layer-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.layer-description {
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-medium);
}

.layer-info.is-copied::after {
  content: 'Copied!';
  opacity: 1;
}

.layer-info::after {
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
