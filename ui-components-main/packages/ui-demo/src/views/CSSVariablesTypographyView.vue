<template>
  <component-demo-layout
    class="css-variables-typography-view"
    name="Typography"
  >
    <section-header
      title="Font Sizes"
      description="Text size scale"
    />
    <component-example>
      <div class="typography-demos">
        <div
          v-for="size in fontSizes"
          :key="size.label"
          class="typography-demo"
        >
          <div
            class="typography-preview"
            :style="{ fontSize: `var(${size.label})` }"
          >
            The quick brown fox
          </div>
          <div
            class="typography-info"
            :class="{ 'is-copied': copiedLabels.has(size.label) }"
            @click="copyToClipboard(size.label)"
          >
            <code class="typography-label">--{{ size.label }}</code>
            <span class="typography-value">{{ size.value }}</span>
          </div>
        </div>
      </div>
    </component-example>

    <section-header
      title="Font Weights"
      description="Text weight scale"
    />
    <component-example>
      <div class="typography-demos">
        <div
          v-for="weight in fontWeights"
          :key="weight.label"
          class="typography-demo"
        >
          <div
            class="typography-preview"
            :style="{ fontWeight: `var(${weight.label})` }"
          >
            The quick brown fox
          </div>
          <div
            class="typography-info"
            :class="{ 'is-copied': copiedLabels.has(weight.label) }"
            @click="copyToClipboard(weight.label)"
          >
            <code class="typography-label">--{{ weight.label }}</code>
            <span class="typography-value">{{ weight.value }}</span>
          </div>
        </div>
      </div>
    </component-example>

    <section-header
      title="Letter Spacing"
      description="Horizontal spacing between characters"
    />
    <component-example>
      <div class="typography-demos">
        <div
          v-for="spacing in letterSpacing"
          :key="spacing.label"
          class="typography-demo"
        >
          <div
            class="typography-preview"
            :style="{ letterSpacing: `var(${spacing.label})` }"
          >
            The quick brown fox
          </div>
          <div
            class="typography-info"
            :class="{ 'is-copied': copiedLabels.has(spacing.label) }"
            @click="copyToClipboard(spacing.label)"
          >
            <code class="typography-label">--{{ spacing.label }}</code>
            <span class="typography-value">{{ spacing.value }}</span>
          </div>
        </div>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { useCopyToClipboard } from '@/composables'

const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const fontSizes = [
  { label: '--font-size-xs', value: '0.75rem' },
  { label: '--font-size-sm', value: '0.875rem' },
  { label: '--font-size-md', value: '1rem' },
  { label: '--font-size-lg', value: '1.125rem' },
  { label: '--font-size-xl', value: '1.25rem' },
  { label: '--font-size-xxl', value: '1.5rem' },
  { label: '--font-size-xxxl', value: '2rem' },
]

const fontWeights = [
  { label: '--font-weight-light', value: '300' },
  { label: '--font-weight-normal', value: '400' },
  { label: '--font-weight-medium', value: '500' },
  { label: '--font-weight-semibold', value: '600' },
  { label: '--font-weight-bold', value: '700' },
  { label: '--font-weight-extra-bold', value: '800' },
]

const letterSpacing = [
  { label: '--letter-spacing-sm', value: '0' },
  { label: '--letter-spacing-md', value: '0.002em' },
  { label: '--letter-spacing-lg', value: '0.005em' },
  { label: '--letter-spacing-xl', value: '0.05em' },
]
</script>

<style>
.typography-intro p {
  margin-bottom: var(--spacing-base);
}

.typography-demos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.typography-demo {
  display: flex;
  gap: var(--spacing-base);
  align-items: center;
  padding: var(--spacing-base);
}

.typography-preview {
  flex: 1;
  color: var(--colors-text-icon-dark);
}

.typography-preview.multiline {
  max-width: 300px;
}

.typography-info {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  min-width: 200px;
  padding: var(--spacing-sm);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition:
    background-color 100ms ease-in-out,
    border-color 100ms ease-in-out;
}

.typography-info:hover {
  border-color: var(--colors-border-common-active);
}

.typography-info:active {
  background-color: var(--colors-background-common-default-grey);
}

.typography-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
}

.typography-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.typography-info.is-copied::after {
  content: 'Copied!';
  opacity: 1;
}

.typography-info::after {
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
  z-index: 1;
}
</style>
