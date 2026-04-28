<template>
  <component-demo-layout
    class="css-variables-borders-view"
    name="Borders"
  >
    <section-header
      title="Border Radius"
      description="Rounded corner values"
    />
    <component-example :code="radiusExample">
      <div class="border-demos">
        <div
          v-for="radius in borderRadii"
          :key="radius.label"
          class="border-demo"
        >
          <div class="border-preview-container">
            <div
              class="border-preview"
              :style="{ borderRadius: `var(--${radius.label})` }"
            />
          </div>
          <div
            class="border-info"
            :class="{ 'is-copied': copiedLabels.has(radius.label) }"
            @click="copyToClipboard(radius.label)"
          >
            <code class="border-label">--{{ radius.label }}</code>
            <span class="border-value">{{ radius.value }}</span>
          </div>
        </div>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { useCopyToClipboard } from '@/composables'

const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const borderRadii = [
  { label: 'border-radius-xxs', value: '2px' },
  { label: 'border-radius-xs', value: '4px' },
  { label: 'border-radius-sm', value: '8px' },
  { label: 'border-radius-base', value: '16px' },
  { label: 'border-radius-md', value: '24px' },
  { label: 'border-radius-lg', value: '32px' },
  { label: 'border-radius-xl', value: '99px' },
  { label: 'border-radius-round', value: '100%' },
]

const radiusExample = {
  code: `/* Border radius examples */
.rounded-sm {
  border-radius: var(--border-radius-sm);
}

.rounded-lg {
  border-radius: var(--border-radius-lg);
}

.rounded-xl {
  border-radius: var(--border-radius-xl);
}

.rounded-full {
  border-radius: var(--border-radius-round);
}`,
  language: 'css',
}
</script>

<style>
.borders-intro p {
  margin-bottom: var(--spacing-base);
}

.border-demos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.border-demo {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.border-preview-container {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--colors-background-common-ultra-light-neutral);
  border: 2px dashed var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  flex-shrink: 0;
}

.border-preview {
  width: 80px;
  height: 80px;
  border: 2px solid var(--colors-border-common-accent-light);
  background: var(--colors-background-common-white);
}

.border-info {
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

.border-info:hover {
  border-color: var(--colors-border-common-active);
}

.border-info:active {
  background-color: var(--colors-background-common-default-grey);
}

.border-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
}

.border-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.border-info.is-copied::after {
  content: 'Copied!';
  opacity: 1;
}

.border-info::after {
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
