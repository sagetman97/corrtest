<template>
  <component-demo-layout
    class="css-variables-colors-view"
    name="Colors"
  >
    <section-header
      title="Color Variables"
      description="There are three layers of color variables, primitives, tokens, and brand colors. We should only use brand colors in our application."
    />
    <component-example>
      <p-tabset
        v-model:selected="activeTab"
        class="css-variables-colors-view__tabset"
        :tabs="tabs"
        secondary
      >
        <template #brand-colors>
          <component-example>
            <div class="color-section">
              <h3>Text & Icons</h3>
              <div class="color-swatches">
                <div
                  v-for="color in brandColors.textIcon"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <span class="color-label">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Backgrounds</h3>
              <div class="color-swatches">
                <div
                  v-for="color in brandColors.background"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <span class="color-label">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Borders</h3>
              <div class="color-swatches">
                <div
                  v-for="color in brandColors.border"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <span class="color-label">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Brand Products</h3>
              <div class="color-swatches">
                <div
                  v-for="color in brandColors.brand"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <span class="color-label">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Backdrop</h3>
              <div class="color-swatches">
                <div
                  v-for="color in brandColors.backdrop"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-backdrop-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>
        </template>

        <template #token-colors>
          <component-example>
            <div class="color-section">
              <h3>Primary</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.primary"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-primary-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Neutral</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.neutral"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-neutral-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Accent</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.accent"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-accent-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Status</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.status"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-status-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>AI / Copilot</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.AI"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-AI-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Info</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.info"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-info-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Bespoke</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.bespoke"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-bespoke-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Graphics</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.graphics"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-graphics-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Nav</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.nav"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-nav-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Brands</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.brands"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-brand-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>

          <component-example>
            <div class="color-section">
              <h3>Data Visualization</h3>
              <div class="color-swatches">
                <div
                  v-for="color in tokenColors.dataviz"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: getColorValue(color.value) }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, 'colors-dataviz-') }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>
        </template>

        <template #primitive-colors>
          <component-example>
            <div
              v-for="(colors, family) in primitiveColorFamilies"
              :key="family"
              class="color-section"
            >
              <h3>{{ family }}</h3>
              <div class="color-swatches">
                <div
                  v-for="color in colors"
                  :key="color.label"
                  class="color-swatch"
                  :class="{ 'is-copied': copiedLabels.has(color.label) }"
                  @click="copyToClipboard(color.label)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: color.value }"
                  />
                  <div class="color-info">
                    <code class="color-label">{{ shortenLabel(color.label, `--colors-${family.toLowerCase()}-`) }}</code>
                    <span class="color-value">{{ color.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </component-example>
        </template>
      </p-tabset>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Tab } from '@/types'

import { useCopyToClipboard } from '@/composables'

const activeTab = ref('brand-colors')
const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const tabs: Tab[] = [
  { label: 'Brand Colors', value: 'brand-colors' },
  { label: 'Token Colors', value: 'token-colors' },
  { label: 'Primitive Colors', value: 'primitive-colors' },
]

function getColorValue(value: string): string {
  if (value.startsWith('var(')) {
    return getComputedStyle(document.documentElement).getPropertyValue(value.slice(4, -1))
  }
  return value
}

function shortenLabel(label: string, prefix: string): string {
  return label.replace(prefix, '')
}

// Brand colors organized by category
const brandColors = {
  textIcon: [
    { label: 'colors-text-icon-dark', value: 'var(--colors-neutral-darkest)' },
    { label: 'colors-text-icon-dark-unavailable', value: 'var(--colors-status-unavailable-dark)' },
    { label: 'colors-text-icon-medium', value: 'var(--colors-neutral-darker)' },
    { label: 'colors-text-icon-placeholder', value: 'var(--colors-neutral-darker)' },
    { label: 'colors-text-icon-primary', value: 'var(--colors-primary-darkest)' },
    { label: 'colors-text-icon-primary-unavailable', value: 'var(--colors-status-unavailable-primary)' },
    { label: 'colors-text-icon-primary-medium', value: 'var(--colors-primary-darker)' },
    { label: 'colors-text-icon-light', value: 'var(--colors-neutral-white)' },
    { label: 'colors-text-icon-light-unavailable', value: 'var(--colors-grey-200)' },
    { label: 'colors-text-icon-link', value: 'var(--colors-accent-mid)' },
    { label: 'colors-text-icon-accent-dark', value: 'var(--colors-accent-darker)' },
    { label: 'colors-text-icon-accent', value: 'var(--colors-accent-mid)' },
    { label: 'colors-text-icon-accent-medium', value: 'var(--colors-accent-light)' },
    { label: 'colors-text-icon-accent-unavailable', value: 'var(--colors-status-unavailable-accent)' },
    { label: 'colors-text-icon-copilot-dark', value: 'var(--colors-AI-darker)' },
    { label: 'colors-text-icon-copilot', value: 'var(--colors-AI-mid)' },
    { label: 'colors-text-icon-copilot-unavailable', value: 'var(--colors-status-unavailable-AI)' },
    { label: 'colors-text-icon-status-success-AA', value: 'var(--colors-status-success-darkest)' },
    { label: 'colors-text-icon-status-success-decorative', value: 'var(--colors-status-success-mid)' },
    { label: 'colors-text-icon-status-warning-AA', value: 'var(--colors-status-warning-darkest)' },
    { label: 'colors-text-icon-status-warning-decorative', value: 'var(--colors-status-warning-mid)' },
    { label: 'colors-text-icon-status-error-AA', value: 'var(--colors-status-error-darker)' },
    { label: 'colors-text-icon-status-error-decorative', value: 'var(--colors-red-600)' },
    { label: 'colors-text-icon-status-error-unavailable', value: 'var(--colors-status-unavailable-error)' },
    { label: 'colors-text-icon-status-info-AA', value: 'var(--colors-info-darker)' },
    { label: 'colors-text-icon-status-info-decorative', value: 'var(--colors-info-mid)' },
    { label: 'colors-text-icon-positive-trend-down', value: 'var(--colors-bespoke-positive-red)' },
    { label: 'colors-text-icon-positive-trend-up', value: 'var(--colors-bespoke-positive-green)' },
    { label: 'colors-text-icon-status-mandatory-star', value: 'var(--colors-red)' },
  ],
  background: [
    { label: 'colors-background-common-white', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-common-default-grey', value: 'var(--colors-neutral-lighter)' },
    { label: 'colors-background-common-default-grey-light', value: 'var(--colors-grey-50)' },
    { label: 'colors-background-common-default-grey-unavailable', value: 'var(--colors-status-unavailable-light)' },
    { label: 'colors-background-common-primary', value: 'var(--colors-primary-darkest)' },
    { label: 'colors-background-common-primary-medium', value: 'var(--colors-primary-darker)' },
    { label: 'colors-background-common-primary-unavailable', value: 'var(--colors-primary-mid)' },
    { label: 'colors-background-common-dark', value: 'var(--colors-neutral-darker)' },
    { label: 'colors-background-common-dark-unavailable', value: 'var(--colors-neutral-mid)' },
    { label: 'colors-background-common-light-unavailable', value: 'var(--colors-primary-light)' },
    { label: 'colors-background-common-accent-dark', value: 'var(--colors-accent-dark)' },
    { label: 'colors-background-common-accent', value: 'var(--colors-accent-mid)' },
    { label: 'colors-background-common-accent-light', value: 'var(--colors-neutral-accent-light)' },
    { label: 'colors-background-common-accent-lighter', value: 'var(--colors-neutral-accent-lighter)' },
    { label: 'colors-background-common-accent-unavailable', value: 'var(--colors-status-unavailable-accent)' },
    { label: 'colors-background-common-ultra-light-neutral', value: 'var(--colors-neutral-ultra-light)' },
    { label: 'colors-background-status-info-light', value: 'var(--colors-info-lightest)' },
    { label: 'colors-background-status-success-light', value: 'var(--colors-status-success-lightest)' },
    { label: 'colors-background-status-warning-light', value: 'var(--colors-status-warning-lightest)' },
    { label: 'colors-background-status-error-light', value: 'var(--colors-status-error-lightest)' },
    { label: 'colors-background-p-banner-default', value: 'var(--colors-blue-25)' },
    { label: 'colors-background-p-banner-active', value: 'var(--colors-blue-100)' },
    { label: 'colors-background-p-table-header', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-p-table-body-default', value: 'var(--colors-neutral-accent-lightest)' },
    { label: 'colors-background-p-table-body-hover', value: 'var(--colors-neutral-accent-lighter)' },
    { label: 'colors-background-p-table-body-active', value: 'var(--colors-neutral-accent-light)' },
    { label: 'colors-background-p-accordion-accent-header-default', value: 'var(--colors-neutral-accent-lighter)' },
    { label: 'colors-background-p-accordion-accent-header-active', value: 'var(--colors-accent-lightest)' },
    { label: 'colors-background-p-accordion-accent-body', value: 'var(--colors-neutral-accent-lighter)' },
    { label: 'colors-background-p-accordion-warning-header-default', value: 'var(--colors-status-warning-lightest)' },
    { label: 'colors-background-p-accordion-warning-body', value: 'var(--colors-status-warning-lightest)' },
    { label: 'colors-background-p-accordion-warning-header-active', value: 'var(--colors-status-warning-lighter)' },
    { label: 'colors-background-button-primary-default', value: 'var(--colors-primary-darkest)' },
    { label: 'colors-background-button-primary-active', value: 'var(--colors-primary-darker)' },
    { label: 'colors-background-button-primary-unavailable', value: 'var(--colors-status-unavailable-primary)' },
    { label: 'colors-background-button-accent-default', value: 'var(--colors-accent-mid)' },
    { label: 'colors-background-button-accent-active', value: 'var(--colors-accent-darker)' },
    { label: 'colors-background-button-accent-unavailable', value: 'var(--colors-status-unavailable-accent)' },
    { label: 'colors-background-button-secondary-default', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-secondary-focus', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-secondary-active', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-secondary-unavailable', value: 'var(--colors-status-unavailable-light)' },
    { label: 'colors-background-button-text-default', value: 'var(--colors-neutral-white-transparent)' },
    { label: 'colors-background-button-text-focus', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-text-hover', value: 'var(--colors-neutral-ultra-light)' },
    { label: 'colors-background-button-text-active', value: 'var(--colors-neutral-lightest)' },
    { label: 'colors-background-button-text-unavailable', value: 'var(--colors-neutral-white-transparent)' },
    { label: 'colors-background-button-simple-default', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-simple-focus', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-button-simple-active', value: 'var(--colors-neutral-ultra-light)' },
    { label: 'colors-background-button-simple-unavailable', value: 'var(--colors-neutral-ultra-light)' },
    { label: 'colors-background-button-error-default', value: 'var(--colors-status-error-dark)' },
    { label: 'colors-background-button-error-active', value: 'var(--colors-status-error-darker)' },
    { label: 'colors-background-button-error-unavailable', value: 'var(--colors-status-unavailable-error)' },
    { label: 'colors-background-button-copilot-default', value: 'var(--colors-AI-mid)' },
    { label: 'colors-background-button-copilot-active', value: 'var(--colors-AI-dark)' },
    { label: 'colors-background-button-copilot-unavailable', value: 'var(--colors-status-unavailable-AI)' },
    { label: 'colors-background-button-copilot-light-default', value: 'var(--colors-AI-lighter)' },
    { label: 'colors-background-button-copilot-light-active', value: 'var(--colors-AI-lightish)' },
    { label: 'colors-background-button-copilot-light-unavailable', value: 'var(--colors-status-unavailable-AI-light)' },
    { label: 'colors-background-uncommon-notification', value: 'var(--colors-bespoke-notification-light)' },
    { label: 'colors-background-uncommon-copilot', value: 'var(--colors-AI-mid)' },
    { label: 'colors-background-uncommon-copilot-light', value: 'var(--colors-AI-ultralight)' },
    { label: 'colors-background-uncommon-new', value: 'var(--colors-bespoke-new-light)' },
    { label: 'colors-background-uncommon-online', value: 'var(--colors-bespoke-online)' },
    { label: 'colors-background-uncommon-online-unavailable', value: 'var(--colors-bespoke-online-light)' },
    { label: 'colors-background-uncommon-online-dark', value: 'var(--colors-bespoke-online-dark)' },
    { label: 'colors-background-uncommon-sticky-note', value: 'var(--colors-bespoke-sticky-note-light)' },
    { label: 'colors-background-uncommon-sticky-note-corner', value: 'var(--colors-bespoke-sticky-note-mid)' },
    { label: 'colors-background-uncommon-product-pricing-engine', value: 'var(--colors-brand-teal-grey-fill)' },
    { label: 'colors-background-uncommon-product-exchange', value: 'var(--colors-brand-yellow-grey-fill)' },
    { label: 'colors-background-uncommon-product-analytics', value: 'var(--colors-brand-pink-grey-fill)' },
    { label: 'colors-background-uncommon-nav-nav', value: 'var(--colors-nav-mid)' },
    { label: 'colors-background-uncommon-nav-section-default', value: 'var(--colors-nav-mid)' },
    { label: 'colors-background-uncommon-nav-section-active', value: 'var(--colors-nav-darkest)' },
    { label: 'colors-background-uncommon-nav-subsection-default', value: 'var(--colors-nav-darkest)' },
    { label: 'colors-background-uncommon-nav-subsection-active', value: 'var(--colors-nav-mid)' },
    { label: 'colors-background-p-grid-header', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-p-grid-body-default', value: 'var(--colors-neutral-white)' },
    { label: 'colors-background-p-grid-hover', value: 'var(--colors-neutral-accent-light)' },
    { label: 'colors-background-p-grid-hover-intersection', value: 'var(--colors-accent-lightest)' },
    { label: 'colors-background-p-grid-selected', value: 'var(--colors-neutral-accent-lighter)' },
    { label: 'colors-background-p-grid-grey-default', value: 'var(--colors-neutral-lighter)' },
    { label: 'colors-background-p-grid-distinguished-default', value: 'var(--colors-neutral-lightest)' },
    { label: 'colors-background-p-grid-net-default', value: 'var(--colors-neutral-lighter)' },
    { label: 'colors-background-p-grid-net-intersection', value: 'var(--colors-neutral-light)' },
    { label: 'colors-background-p-grid-column-row-selected', value: 'var(--colors-accent-mid)' },
  ],
  border: [
    { label: 'colors-border-common-default', value: 'var(--colors-neutral-lighter)' },
    { label: 'colors-border-common-active', value: 'var(--colors-neutral-light)' },
    { label: 'colors-border-common-active-dark', value: 'var(--colors-neutral-darker)' },
    { label: 'colors-border-common-dark', value: 'var(--colors-neutral-darkest)' },
    { label: 'colors-border-common-primary', value: 'var(--colors-primary-darkest)' },
    { label: 'colors-border-common-accent', value: 'var(--colors-accent-mid)' },
    { label: 'colors-border-common-accent-dark', value: 'var(--colors-accent-dark)' },
    { label: 'colors-border-common-accent-darker', value: 'var(--colors-accent-darker)' },
    { label: 'colors-border-common-accent-light', value: 'var(--colors-accent-light)' },
    { label: 'colors-border-common-accent-decorative', value: 'var(--colors-accent-lightest)' },
    { label: 'colors-border-common-copilot-dark', value: 'var(--colors-AI-dark)' },
    { label: 'colors-border-common-copilot', value: 'var(--colors-AI-mid)' },
    { label: 'colors-border-status-success-dark', value: 'var(--colors-status-success-darker)' },
    { label: 'colors-border-status-warning-dark', value: 'var(--colors-status-warning-darker)' },
    { label: 'colors-border-status-error-dark', value: 'var(--colors-status-error-darker)' },
    { label: 'colors-border-status-info-dark', value: 'var(--colors-info-darker)' },
    { label: 'colors-border-status-success-light', value: 'var(--colors-status-success-lighter)' },
    { label: 'colors-border-status-warning-light', value: 'var(--colors-status-warning-lighter)' },
    { label: 'colors-border-status-error-light', value: 'var(--colors-status-error-lighter)' },
    { label: 'colors-border-status-info-light', value: 'var(--colors-info-lighter)' },
    { label: 'colors-border-uncommon-notification', value: 'var(--colors-bespoke-notification-dark)' },
    { label: 'colors-border-uncommon-new', value: 'var(--colors-bespoke-new-dark)' },
    { label: 'colors-border-uncommon-sticky-note-corner', value: 'var(--colors-bespoke-sticky-note-dark)' },
    { label: 'colors-border-uncommon-nav-pricing-engine', value: 'var(--colors-brand-teal)' },
    { label: 'colors-border-uncommon-nav-exchange', value: 'var(--colors-brand-exchange)' },
    { label: 'colors-border-uncommon-nav-hedge', value: 'var(--colors-brand-hedge)' },
    { label: 'colors-border-uncommon-nav-analytics', value: 'var(--colors-brand-analytics)' },
    { label: 'colors-border-p-grid-cell-gap', value: 'var(--colors-neutral-light)' },
    { label: 'colors-border-p-grid-border', value: 'var(--colors-neutral-light)' },
  ],
  brand: [
    { label: 'colors-brand-exchange', value: 'var(--colors-brand-yellow)' },
    { label: 'colors-brand-pricing-engine', value: 'var(--colors-brand-teal)' },
    { label: 'colors-brand-analytics-product', value: 'var(--colors-brand-analytics)' },
    { label: 'colors-brand-hedge', value: 'var(--colors-brand-purple)' },
  ],
  backdrop: [
    { label: 'colors-backdrop', value: '#051a5a40' },
    { label: 'colors-backdrop-copilot', value: 'var(--colors-AI-mid)' },
  ],
}

// Token colors organized by category
const tokenColors = {
  primary: [
    { label: 'colors-primary-darkest', value: 'var(--colors-grey-900)' },
    { label: 'colors-primary-darker', value: 'var(--colors-grey-700)' },
    { label: 'colors-primary-dark', value: 'var(--colors-grey-600)' },
    { label: 'colors-primary-mid', value: 'var(--colors-grey-500)' },
    { label: 'colors-primary-light', value: 'var(--colors-grey-200)' },
    { label: 'colors-primary-lighter', value: 'var(--colors-grey-100)' },
    { label: 'colors-primary-lightest', value: 'var(--colors-grey-25)' },
    { label: 'colors-primary-white', value: 'var(--colors-grey-white)' },
    { label: 'colors-primary-white-transparent', value: 'var(--colors-grey-white-0)' },
  ],
  neutral: [
    { label: 'colors-neutral-darkest', value: 'var(--colors-grey-900)' },
    { label: 'colors-neutral-darker', value: 'var(--colors-grey-700)' },
    { label: 'colors-neutral-dark', value: 'var(--colors-grey-600)' },
    { label: 'colors-neutral-mid', value: 'var(--colors-grey-500)' },
    { label: 'colors-neutral-light', value: 'var(--colors-grey-200)' },
    { label: 'colors-neutral-lighter', value: 'var(--colors-grey-100)' },
    { label: 'colors-neutral-lightest', value: 'var(--colors-grey-50)' },
    { label: 'colors-neutral-white', value: 'var(--colors-grey-white)' },
    { label: 'colors-neutral-white-transparent', value: 'var(--colors-grey-white-0)' },
    { label: 'colors-neutral-ultra-light', value: 'var(--colors-grey-25)' },
    { label: 'colors-neutral-accent-lightest', value: 'var(--colors-blue-10)' },
    { label: 'colors-neutral-accent-lighter', value: 'var(--colors-blue-25)' },
    { label: 'colors-neutral-accent-light', value: 'var(--colors-blue-50)' },
  ],
  accent: [
    { label: 'colors-accent-darkest', value: 'var(--colors-blue-800)' },
    { label: 'colors-accent-darker', value: 'var(--colors-blue-700)' },
    { label: 'colors-accent-dark', value: 'var(--colors-blue-600)' },
    { label: 'colors-accent-mid', value: 'var(--colors-blue-500)' },
    { label: 'colors-accent-light', value: 'var(--colors-blue-300)' },
    { label: 'colors-accent-lighter', value: 'var(--colors-blue-200)' },
    { label: 'colors-accent-lightest', value: 'var(--colors-blue-100)' },
  ],
  status: [
    { label: 'colors-status-success-darkest', value: 'var(--colors-green-800)' },
    { label: 'colors-status-success-darker', value: 'var(--colors-green-700)' },
    { label: 'colors-status-success-dark', value: 'var(--colors-green-600)' },
    { label: 'colors-status-success-mid', value: 'var(--colors-green-500)' },
    { label: 'colors-status-success-light', value: 'var(--colors-green-300)' },
    { label: 'colors-status-success-lighter', value: 'var(--colors-green-200)' },
    { label: 'colors-status-success-lightest', value: 'var(--colors-green-100)' },
    { label: 'colors-status-error-darkest', value: 'var(--colors-red-800)' },
    { label: 'colors-status-error-darker', value: 'var(--colors-red-700)' },
    { label: 'colors-status-error-dark', value: 'var(--colors-red-600)' },
    { label: 'colors-status-error-mid', value: 'var(--colors-red-500)' },
    { label: 'colors-status-error-light', value: 'var(--colors-red-300)' },
    { label: 'colors-status-error-lighter', value: 'var(--colors-red-200)' },
    { label: 'colors-status-error-lightest', value: 'var(--colors-red-100)' },
    { label: 'colors-status-warning-darkest', value: 'var(--colors-yellow-800)' },
    { label: 'colors-status-warning-darker', value: 'var(--colors-yellow-700)' },
    { label: 'colors-status-warning-dark', value: 'var(--colors-yellow-600)' },
    { label: 'colors-status-warning-mid', value: 'var(--colors-yellow-500)' },
    { label: 'colors-status-warning-light', value: 'var(--colors-yellow-300)' },
    { label: 'colors-status-warning-lighter', value: 'var(--colors-yellow-200)' },
    { label: 'colors-status-warning-lightest', value: 'var(--colors-yellow-100)' },
    { label: 'colors-status-unavailable-primary', value: 'var(--colors-grey-400)' },
    { label: 'colors-status-unavailable-dark', value: 'var(--colors-grey-600)' },
    { label: 'colors-status-unavailable-light', value: 'var(--colors-grey-50)' },
    { label: 'colors-status-unavailable-accent', value: 'var(--colors-blue-200)' },
    { label: 'colors-status-unavailable-error', value: 'var(--colors-red-300)' },
    { label: 'colors-status-unavailable-AI', value: 'var(--colors-purple-200)' },
    { label: 'colors-status-unavailable-AI-light', value: 'var(--colors-purple-50)' },
  ],
  AI: [
    { label: 'colors-AI-darkest', value: 'var(--colors-purple-800)' },
    { label: 'colors-AI-darker', value: 'var(--colors-purple-700)' },
    { label: 'colors-AI-dark', value: 'var(--colors-purple-600)' },
    { label: 'colors-AI-mid', value: 'var(--colors-purple-500)' },
    { label: 'colors-AI-lightish', value: 'var(--colors-purple-200)' },
    { label: 'colors-AI-light', value: 'var(--colors-purple-100)' },
    { label: 'colors-AI-lighter', value: 'var(--colors-purple-75)' },
    { label: 'colors-AI-lightest', value: 'var(--colors-purple-50)' },
    { label: 'colors-AI-ultralight', value: 'var(--colors-purple-25)' },
  ],
  info: [
    { label: 'colors-info-darkest', value: 'var(--colors-old-brand-aqua-800)' },
    { label: 'colors-info-darker', value: 'var(--colors-old-brand-aqua-700)' },
    { label: 'colors-info-dark', value: 'var(--colors-old-brand-aqua-600)' },
    { label: 'colors-info-mid', value: 'var(--colors-old-brand-aqua-500)' },
    { label: 'colors-info-light', value: 'var(--colors-old-brand-aqua-300)' },
    { label: 'colors-info-lighter', value: 'var(--colors-old-brand-aqua-200)' },
    { label: 'colors-info-lightest', value: 'var(--colors-old-brand-aqua-100)' },
  ],
  bespoke: [
    { label: 'colors-bespoke-notification-dark', value: 'var(--colors-bespoke-tropical-dark)' },
    { label: 'colors-bespoke-notification-light', value: 'var(--colors-bespoke-tropical-light)' },
    { label: 'colors-bespoke-new-dark', value: 'var(--colors-bespoke-citron-dark)' },
    { label: 'colors-bespoke-new-light', value: 'var(--colors-bespoke-citron-light)' },
    { label: 'colors-bespoke-online-dark', value: 'var(--colors-bespoke-lime-dark)' },
    { label: 'colors-bespoke-online', value: 'var(--colors-bespoke-lime)' },
    { label: 'colors-bespoke-online-light', value: 'var(--colors-bespoke-lime-light)' },
    { label: 'colors-bespoke-mandatory', value: 'var(--colors-bespoke-red-bright)' },
    { label: 'colors-bespoke-sticky-note-light', value: 'var(--colors-yellow-100)' },
    { label: 'colors-bespoke-sticky-note-mid', value: 'var(--colors-yellow-200)' },
    { label: 'colors-bespoke-sticky-note-dark', value: 'var(--colors-yellow-300)' },
  ],
  graphics: [
    { label: 'colors-graphics-positive', value: 'var(--colors-bespoke-watermelon)' },
    { label: 'colors-graphics-negative', value: 'var(--colors-bespoke-cherry)' },
  ],
  nav: [
    { label: 'colors-nav-darkest', value: 'var(--colors-grey-black)' },
    { label: 'colors-nav-mid', value: 'var(--colors-grey-850)' },
  ],
  brands: [
    { label: 'colors-brand-yellow', value: 'var(--colors-old-brand-yellow-500)' },
    { label: 'colors-brand-teal', value: 'var(--colors-old-brand-teal-500)' },
    { label: 'colors-brand-aqua', value: 'var(--colors-old-brand-aqua-500)' },
    { label: 'colors-brand-pink', value: 'var(--colors-old-brand-pink-500)' },
    { label: 'colors-brand-purple', value: 'var(--colors-old-brand-grape-500)' },
    { label: 'colors-brand-yellow-grey-fill', value: 'var(--colors-old-brand-yellow-grey)' },
    { label: 'colors-brand-teal-grey-fill', value: 'var(--colors-old-brand-teal-grey-fill)' },
    { label: 'colors-brand-pink-grey-fill', value: 'var(--colors-old-brand-pink-grey-fill)' },
    { label: 'colors-brand-purple-grey-fill', value: 'var(--colors-old-brand-grape-grey)' },
  ],
  dataviz: [
    { label: 'colors-dataviz-primary-ocean', value: 'var(--colors-ocean-400)' },
    { label: 'colors-dataviz-primary-turquoise', value: 'var(--colors-turquoise-400)' },
    { label: 'colors-dataviz-primary-violet', value: 'var(--colors-violet-400)' },
    { label: 'colors-dataviz-primary-blush', value: 'var(--colors-blush-400)' },
    { label: 'colors-dataviz-primary-poppy', value: 'var(--colors-poppy-400)' },
    { label: 'colors-dataviz-primary-lemon', value: 'var(--colors-lemon-400)' },
    { label: 'colors-dataviz-primary-sky', value: 'var(--colors-sky-400)' },
    { label: 'colors-dataviz-primary-coral', value: 'var(--colors-coral-400)' },
    { label: 'colors-dataviz-secondary-ocean', value: 'var(--colors-ocean-200)' },
    { label: 'colors-dataviz-secondary-turquoise', value: 'var(--colors-turquoise-200)' },
    { label: 'colors-dataviz-secondary-violet', value: 'var(--colors-violet-200)' },
    { label: 'colors-dataviz-secondary-blush', value: 'var(--colors-blush-200)' },
    { label: 'colors-dataviz-secondary-poppy', value: 'var(--colors-poppy-200)' },
    { label: 'colors-dataviz-secondary-lemon', value: 'var(--colors-lemon-200)' },
    { label: 'colors-dataviz-secondary-sky', value: 'var(--colors-sky-200)' },
    { label: 'colors-dataviz-secondary-coral', value: 'var(--colors-coral-200)' },
    { label: 'colors-dataviz-texture-ocean', value: 'var(--colors-ocean-600)' },
    { label: 'colors-dataviz-texture-turquoise', value: 'var(--colors-turquoise-600)' },
    { label: 'colors-dataviz-texture-violet', value: 'var(--colors-violet-600)' },
    { label: 'colors-dataviz-texture-blush', value: 'var(--colors-blush-600)' },
    { label: 'colors-dataviz-texture-poppy', value: 'var(--colors-poppy-600)' },
    { label: 'colors-dataviz-texture-lemon', value: 'var(--colors-lemon-600)' },
    { label: 'colors-dataviz-texture-sky', value: 'var(--colors-sky-600)' },
    { label: 'colors-dataviz-texture-coral', value: 'var(--colors-coral-600)' },
    { label: 'colors-dataviz-basic-grey', value: 'var(--colors-grey-200)' },
    { label: 'colors-dataviz-basic-night', value: 'var(--colors-grey-900)' },
    { label: 'colors-dataviz-actual-ocean', value: 'var(--colors-ocean-500)' },
    { label: 'colors-dataviz-actual-turquoise', value: 'var(--colors-turquoise-500)' },
    { label: 'colors-dataviz-actual-violet', value: 'var(--colors-violet-500)' },
    { label: 'colors-dataviz-actual-blush', value: 'var(--colors-blush-500)' },
    { label: 'colors-dataviz-actual-poppy', value: 'var(--colors-poppy-500)' },
    { label: 'colors-dataviz-actual-lemon', value: 'var(--colors-lemon-500)' },
    { label: 'colors-dataviz-actual-sky', value: 'var(--colors-sky-500)' },
    { label: 'colors-dataviz-actual-coral', value: 'var(--colors-coral-500)' },
    { label: 'colors-dataviz-projection-ocean', value: 'var(--colors-ocean-10)' },
    { label: 'colors-dataviz-projection-turquoise', value: 'var(--colors-turquoise-10)' },
    { label: 'colors-dataviz-projection-violet', value: 'var(--colors-violet-50)' },
    { label: 'colors-dataviz-projection-blush', value: 'var(--colors-blush-50)' },
    { label: 'colors-dataviz-projection-poppy', value: 'var(--colors-poppy-50)' },
    { label: 'colors-dataviz-projection-lemon', value: 'var(--colors-lemon-50)' },
    { label: 'colors-dataviz-projection-sky', value: 'var(--colors-sky-50)' },
    { label: 'colors-dataviz-projection-coral', value: 'var(--colors-coral-50)' },
    { label: 'colors-dataviz-categorical-1', value: 'var(--colors-ocean-400)' },
    { label: 'colors-dataviz-categorical-2', value: 'var(--colors-turquoise-400)' },
    { label: 'colors-dataviz-categorical-3', value: 'var(--colors-violet-400)' },
    { label: 'colors-dataviz-categorical-4', value: 'var(--colors-blush-400)' },
    { label: 'colors-dataviz-categorical-5', value: 'var(--colors-poppy-400)' },
    { label: 'colors-dataviz-categorical-6', value: 'var(--colors-lemon-400)' },
    { label: 'colors-dataviz-categorical-7', value: 'var(--colors-sky-400)' },
    { label: 'colors-dataviz-categorical-8', value: 'var(--colors-coral-400)' },
    { label: 'colors-dataviz-sequential-1', value: 'var(--colors-ocean-100)' },
    { label: 'colors-dataviz-sequential-2', value: 'var(--colors-ocean-200)' },
    { label: 'colors-dataviz-sequential-3', value: 'var(--colors-ocean-300)' },
    { label: 'colors-dataviz-sequential-4', value: 'var(--colors-ocean-400)' },
    { label: 'colors-dataviz-sequential-5', value: 'var(--colors-ocean-500)' },
    { label: 'colors-dataviz-sequential-6', value: 'var(--colors-ocean-600)' },
    { label: 'colors-dataviz-sequential-7', value: 'var(--colors-ocean-700)' },
    { label: 'colors-dataviz-sequential-8', value: 'var(--colors-ocean-800)' },
    { label: 'colors-dataviz-elements-grid', value: 'var(--colors-grey-200)' },
    { label: 'colors-dataviz-elements-axis', value: 'var(--colors-grey-900)' },
  ],
}

// Primitive colors organized by color family
const primitiveColorFamilies = {
  Blue: [
    { label: 'colors-blue-50', value: '#e7ecfc' },
    { label: 'colors-blue-100', value: '#cfd9f9' },
    { label: 'colors-blue-200', value: '#9eb3f3' },
    { label: 'colors-blue-300', value: '#6e8ded' },
    { label: 'colors-blue-400', value: '#3d67e7' },
    { label: 'colors-blue-500', value: '#0d41e1' },
    { label: 'colors-blue-600', value: '#0a34b4' },
    { label: 'colors-blue-700', value: '#082787' },
    { label: 'colors-blue-800', value: '#051a5a' },
    { label: 'colors-blue-900', value: '#030d2d' },
  ],
  Ocean: [
    { label: 'colors-ocean-50', value: '#dbe9fc' },
    { label: 'colors-ocean-100', value: '#b7d3f8' },
    { label: 'colors-ocean-200', value: '#92bcf5' },
    { label: 'colors-ocean-300', value: '#6ea6f1' },
    { label: 'colors-ocean-400', value: '#4a90ee' },
    { label: 'colors-ocean-500', value: '#3b73be' },
    { label: 'colors-ocean-600', value: '#3465a7' },
    { label: 'colors-ocean-700', value: '#254877' },
    { label: 'colors-ocean-800', value: '#162b47' },
    { label: 'colors-ocean-900', value: '#0f1d30' },
  ],
  Turquoise: [
    { label: 'colors-turquoise-50', value: '#d5f2f2' },
    { label: 'colors-turquoise-100', value: '#abe6e6' },
    { label: 'colors-turquoise-200', value: '#80d9d9' },
    { label: 'colors-turquoise-300', value: '#56cdcd' },
    { label: 'colors-turquoise-400', value: '#2cc0c0' },
    { label: 'colors-turquoise-500', value: '#239a9a' },
    { label: 'colors-turquoise-600', value: '#1a7373' },
    { label: 'colors-turquoise-700', value: '#124d4d' },
    { label: 'colors-turquoise-800', value: '#0d3a3a' },
    { label: 'colors-turquoise-900', value: '#092626' },
  ],
  Violet: [
    { label: 'colors-violet-50', value: '#eadbf8' },
    { label: 'colors-violet-100', value: '#d6b7f2' },
    { label: 'colors-violet-200', value: '#c194eb' },
    { label: 'colors-violet-300', value: '#ad70e5' },
    { label: 'colors-violet-400', value: '#984cde' },
    { label: 'colors-violet-500', value: '#7a3db2' },
    { label: 'colors-violet-600', value: '#5b2e85' },
    { label: 'colors-violet-700', value: '#3d1e59' },
    { label: 'colors-violet-800', value: '#2e1743' },
    { label: 'colors-violet-900', value: '#1e0f2c' },
  ],
  Blush: [
    { label: 'colors-blush-50', value: '#fadeec' },
    { label: 'colors-blush-100', value: '#f5bed9' },
    { label: 'colors-blush-200', value: '#f09dc5' },
    { label: 'colors-blush-300', value: '#eb7db2' },
    { label: 'colors-blush-400', value: '#e65c9f' },
    { label: 'colors-blush-500', value: '#b84a7f' },
    { label: 'colors-blush-600', value: '#8a375f' },
    { label: 'colors-blush-700', value: '#5c2540' },
    { label: 'colors-blush-800', value: '#451c30' },
    { label: 'colors-blush-900', value: '#2e1220' },
  ],
  Poppy: [
    { label: 'colors-poppy-50', value: '#fcebdb' },
    { label: 'colors-poppy-100', value: '#fad6b7' },
    { label: 'colors-poppy-200', value: '#f7c292' },
    { label: 'colors-poppy-300', value: '#f5ad6e' },
    { label: 'colors-poppy-400', value: '#f2994a' },
    { label: 'colors-poppy-500', value: '#da8a43' },
    { label: 'colors-poppy-600', value: '#915c2c' },
    { label: 'colors-poppy-700', value: '#794d25' },
    { label: 'colors-poppy-800', value: '#492e16' },
    { label: 'colors-poppy-900', value: '#301f0f' },
  ],
  Lemon: [
    { label: 'colors-lemon-50', value: '#fcf4db' },
    { label: 'colors-lemon-100', value: '#fbefc9' },
    { label: 'colors-lemon-200', value: '#f9e4a6' },
    { label: 'colors-lemon-300', value: '#f6d982' },
    { label: 'colors-lemon-400', value: '#f2c94c' },
    { label: 'colors-lemon-500', value: '#dab544' },
    { label: 'colors-lemon-600', value: '#a98d35' },
    { label: 'colors-lemon-700', value: '#796526' },
    { label: 'colors-lemon-800', value: '#61501e' },
    { label: 'colors-lemon-900', value: '#493c17' },
  ],
  Sky: [
    { label: 'colors-sky-50', value: '#e0f6ff' },
    { label: 'colors-sky-100', value: '#e0f6ff' },
    { label: 'colors-sky-200', value: '#b3e9ff' },
    { label: 'colors-sky-300', value: '#80dbff' },
    { label: 'colors-sky-400', value: '#3fc1ff' },
    { label: 'colors-sky-500', value: '#329acc' },
    { label: 'colors-sky-600', value: '#267499' },
    { label: 'colors-sky-700', value: '#194d66' },
    { label: 'colors-sky-800', value: '#133a4c' },
    { label: 'colors-sky-900', value: '#0d2733' },
  ],
  Coral: [
    { label: 'colors-coral-50', value: '#fbe5e3' },
    { label: 'colors-coral-100', value: '#f7cac8' },
    { label: 'colors-coral-200', value: '#f4b0ac' },
    { label: 'colors-coral-300', value: '#f09591' },
    { label: 'colors-coral-400', value: '#ec7b75' },
    { label: 'colors-coral-500', value: '#bd625e' },
    { label: 'colors-coral-600', value: '#8e4a46' },
    { label: 'colors-coral-700', value: '#763e3b' },
    { label: 'colors-coral-800', value: '#472523' },
    { label: 'colors-coral-900', value: '#2f1917' },
  ],
  Green: [
    { label: 'colors-green-50', value: '#f1faf5' },
    { label: 'colors-green-100', value: '#e2f5ea' },
    { label: 'colors-green-200', value: '#c5ecd5' },
    { label: 'colors-green-300', value: '#a9e2c1' },
    { label: 'colors-green-400', value: '#8cd9ac' },
    { label: 'colors-green-500', value: '#6fcf97' },
    { label: 'colors-green-600', value: '#59a679' },
    { label: 'colors-green-700', value: '#437c5b' },
    { label: 'colors-green-800', value: '#2c533c' },
    { label: 'colors-green-900', value: '#16291e' },
  ],
  Yellow: [
    { label: 'colors-yellow-50', value: '#fdf7ea' },
    { label: 'colors-yellow-100', value: '#fceed5' },
    { label: 'colors-yellow-200', value: '#f9deac' },
    { label: 'colors-yellow-300', value: '#f6cd82' },
    { label: 'colors-yellow-400', value: '#f3bd59' },
    { label: 'colors-yellow-500', value: '#f0ac2f' },
    { label: 'colors-yellow-600', value: '#c08a26' },
    { label: 'colors-yellow-700', value: '#90671c' },
    { label: 'colors-yellow-800', value: '#604513' },
    { label: 'colors-yellow-900', value: '#302209' },
  ],
  Red: [
    { label: 'colors-red-50', value: '#feeeec' },
    { label: 'colors-red-100', value: '#fddeda' },
    { label: 'colors-red-200', value: '#fbbcb5' },
    { label: 'colors-red-300', value: '#f89b90' },
    { label: 'colors-red-400', value: '#f6796b' },
    { label: 'colors-red-500', value: '#f45846' },
    { label: 'colors-red-600', value: '#c34638' },
    { label: 'colors-red-700', value: '#92352a' },
    { label: 'colors-red-800', value: '#62231c' },
    { label: 'colors-red-900', value: '#31120e' },
  ],
  Grey: [
    { label: 'colors-grey-25', value: '#fafafa' },
    { label: 'colors-grey-50', value: '#f4f4f4' },
    { label: 'colors-grey-100', value: '#eaeaea' },
    { label: 'colors-grey-200', value: '#d5d5d5' },
    { label: 'colors-grey-300', value: '#bfbfbf' },
    { label: 'colors-grey-400', value: '#aaaaaa' },
    { label: 'colors-grey-500', value: '#959595' },
    { label: 'colors-grey-600', value: '#777777' },
    { label: 'colors-grey-700', value: '#595959' },
    { label: 'colors-grey-800', value: '#3c3c3c' },
    { label: 'colors-grey-850', value: '#333333' },
    { label: 'colors-grey-900', value: '#1e1e1e' },
  ],
}
</script>

<style>
.colors-intro p {
  margin-bottom: var(--spacing-base);
}

.color-section {
  margin-bottom: var(--spacing-xl);
  width: 100%;
}

.color-section h3 {
  margin-bottom: var(--spacing-base);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--colors-text-icon-dark);
}

.color-swatches {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-base);
  width: 100%;
}

.color-swatch {
  position: relative;
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  padding: var(--spacing-sm);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition:
    background-color 100ms ease-in-out,
    border-color 100ms ease-in-out;
}

.color-swatch:hover {
  border-color: var(--colors-border-common-active);
}

.color-swatch:active {
  background-color: var(--colors-background-common-default-grey);
}

.color-preview {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-base);
  border: 1px solid var(--colors-border-common-default);
  flex-shrink: 0;
}

.color-info {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--spacing-xxs);
  min-width: 0;
}

.color-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
  word-break: normal;
}

.color-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.color-swatch.is-copied .color-info::after {
  content: 'Copied!';
  opacity: 1;
}

.color-info::after {
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
}

.css-variables-colors-view__tabset .polly-tabset__header {
  width: 100%;
  justify-content: center;
}
</style>
