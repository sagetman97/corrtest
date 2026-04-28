<template>
  <component-demo-layout
    class="custom-properties-view"
    name="CSS Custom Properties"
    default-title=""
  >
    <section-header
      title="Welcome to Polly UI Components"
      :description="`Version ${version || 'Development'}`"
    />

    <section-header
      title="CSS Custom Properties"
      description="Customize the design system using CSS custom properties (CSS variables)."
    />
    <component-example :code="customPropertiesExample">
      <div class="custom-properties-intro">
        <p>
          Most of the underlying CSS styles that built this library are exported for you to use in your end application through CSS
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
            target="_blank"
            >Custom Properties</a
          >.
        </p>

        <p>These custom properties allow you to:</p>
        <ul>
          <li>Customize colors, spacing, fonts, and other design tokens</li>
          <li>Create consistent theming across your application</li>
          <li>Override default values without modifying component styles</li>
          <li>Build responsive designs with dynamic values</li>
        </ul>

        <h3>Available Categories:</h3>
        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category"
            class="category-card"
          >
            <h4>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</h4>
            <p>{{ getCategoryDescription(category) }}</p>
          </div>
        </div>
      </div>
    </component-example>

    <section-header
      title="Unit Converter"
      description="Convert between pixels and rem units for consistent spacing."
    />
    <component-example :code="converterExample">
      <div class="converter-section">
        <p>Many values in the design system use REMs for scalability. Use this converter to translate between pixels and rems:</p>

        <p-form class="custom-properties-view__px-to-rem-form">
          <p-input-number
            v-model="formValues.pxValue"
            v-bind="fields.pxValue"
            :format="(value: number) => `${value} px`"
            label="Pixel value"
            placeholder="24px"
            @update:model-value="pxValueChanged"
          />

          <p-input-number
            v-model="formValues.remValue"
            v-bind="fields.remValue"
            :format="(value: number) => `${value} rem`"
            label="REM value"
            placeholder="1.5rem"
            @update:model-value="remValueChanged"
          />
        </p-form>

        <p class="converter-note"><strong>Note:</strong> Conversion is based on a 16px base font size (1rem = 16px).</p>
      </div>
    </component-example>

    <section-header
      title="Usage Examples"
      description="How to use custom properties in your CSS."
    />
    <component-example :code="usageExample">
      <div class="usage-examples">
        <h3>Basic Usage</h3>
        <pre><code>/* Use existing custom properties */
.my-component {
  padding: var(--spacing-base);
  color: var(--colors-text-primary);
  border-radius: var(--border-radius-base);
}</code></pre>

        <h3>Override Default Values</h3>
        <pre><code>/* Override at the root level */
:root {
  --colors-primary: #your-brand-color;
  --spacing-base: 1.2rem;
}

/* Override for specific components */
.my-theme .polly-button {
  --polly-button-background-color: var(--colors-primary);
}</code></pre>

        <h3>Responsive Design</h3>
        <pre><code>/* Responsive spacing */
:root {
  --spacing-responsive: 1rem;
}

@media (min-width: 768px) {
  :root {
    --spacing-responsive: 1.5rem;
  }
}</code></pre>
      </div>
    </component-example>

    <section-header
      title="Browse Categories"
      description="Explore available custom properties by category."
    />
    <component-example :code="navigationExample">
      <nav>
        <ul class="custom-properties-view__categories">
          <template
            v-for="category in categories"
            :key="category"
          >
            <li>
              <p-button
                class="custom-properties-view__category"
                variant="accent"
                text
                :to="{ name: `properties.${category}` }"
              >
                {{ category.charAt(0).toUpperCase() + category.slice(1) }}
              </p-button>
            </li>
          </template>
        </ul>
      </nav>
      <router-view />
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types/validation'

import { useValidationFields } from '@/composables'
import { useValidation } from '@/composables/useValidation'

const version = import.meta.env.VITE_VERSION

const categories = ['spacing', 'borders', 'colors', 'fonts', 'layers']

// Category descriptions
function getCategoryDescription(category: string): string {
  const descriptions = {
    spacing: 'Margins, padding, gaps, and layout spacing values',
    borders: 'Border radius, width, and style properties',
    colors: 'Color palette including primary, secondary, and semantic colors',
    fonts: 'Typography including font sizes, weights, and line heights',
    layers: 'Z-index values for layering components',
  }
  return descriptions[category as keyof typeof descriptions] || ''
}

const defaultValues = {
  pxValue: '24',
  remValue: '1.5',
}
const formValues = reactive({ ...defaultValues })
const formSchema = v.object({
  pxValue: stringToNumberSchema(),
  remValue: stringToNumberSchema(),
})

const { parse, validate } = useValidation(formSchema)
const fields = useValidationFields(formSchema)

function pxValueChanged(pxValue: string | null): void {
  if (validate({ ...defaultValues, pxValue })) {
    const values = parse({ ...defaultValues, pxValue })
    formValues.remValue = convertPxToRem(values.pxValue).toString()
  }
}
function remValueChanged(remValue: string | null): void {
  if (validate({ ...defaultValues, remValue })) {
    const values = parse({ ...defaultValues, remValue })
    formValues.pxValue = convertRemToPx(values.remValue).toString()
  }
}

function getRemSize(): number {
  const fontSize = getComputedStyle(document.documentElement).fontSize
  return parseFloat(fontSize)
}

function round(value: number, decimals = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.round(multiplier * value) / multiplier
}

function convertRemToPx(value: number): number {
  const pxValue = value * getRemSize()
  return round(pxValue, 2)
}

function convertPxToRem(value: number): number {
  const remValue = value / getRemSize()
  return round(remValue, 2)
}

// Code examples
const customPropertiesExample = {
  code: `/* Available CSS Custom Properties Categories */

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-base: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Colors */
--colors-primary: #007bff;
--colors-secondary: #6c757d;
--colors-text-primary: #212529;
--colors-background-light: #f8f9fa;

/* Borders */
--border-radius-base: 0.375rem;
--border-radius-lg: 0.5rem;
--border-width-base: 1px;

/* Fonts */
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-weight-normal: 400;
--font-weight-bold: 700;`,
  language: 'css',
}

const converterExample = [
  {
    code: `const convertPxToRem = (px: number) => px / 16;
const convertRemToPx = (rem: number) => rem * 16;`,
    language: 'typescript',
  },
  {
    code: `/* Example conversions */
24px = 1.5rem
16px = 1rem
32px = 2rem`,
    language: 'css',
  },
]

const usageExample = {
  code: `/* Basic usage in your CSS */
.my-component {
  padding: var(--spacing-base);
  margin: var(--spacing-sm) 0;
  background-color: var(--colors-background-light);
  border: var(--border-width-base) solid var(--colors-border-light);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-base);
  color: var(--colors-text-primary);
}

/* Override default values */
:root {
  --colors-primary: #your-brand-color;
  --spacing-base: 1.2rem;
}

/* Component-specific overrides */
.my-theme .polly-button {
  --polly-button-background-color: var(--colors-primary);
  --polly-button-padding: var(--spacing-sm) var(--spacing-base);
}`,
  language: 'css',
}

const navigationExample = {
  code: `<!-- Navigate to specific property categories -->
<router-link :to="{ name: 'properties.spacing' }">Spacing</router-link>
<router-link :to="{ name: 'properties.colors' }">Colors</router-link>
<router-link :to="{ name: 'properties.fonts' }">Typography</router-link>`,
  language: 'vue-html',
}
</script>

<style>
.custom-properties-intro {
  max-width: none;
}

.custom-properties-intro ul {
  margin: var(--spacing-base) 0;
  padding-left: var(--spacing-lg);
}

.custom-properties-intro li {
  margin-bottom: var(--spacing-xs);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-base);
  margin-top: var(--spacing-base);
}

.category-card {
  padding: var(--spacing-base);
  border: 1px solid var(--colors-border-light);
  border-radius: var(--border-radius-base);
  background: var(--colors-background-light);
}

.category-card h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--colors-text-primary);
}

.category-card p {
  margin: 0;
  color: var(--colors-text-secondary);
  font-size: var(--font-size-sm);
}

.converter-section {
  max-width: none;
}

.converter-note {
  margin-top: var(--spacing-base);
  padding: var(--spacing-sm);
  background: var(--colors-background-info);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-sm);
}

.usage-examples h3 {
  margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
  color: var(--colors-text-primary);
}

.usage-examples pre {
  background: var(--colors-background-dark);
  color: var(--colors-text-inverse);
  padding: var(--spacing-base);
  border-radius: var(--border-radius-base);
  overflow-x: auto;
  font-size: var(--font-size-sm);
}

.usage-examples code {
  font-family: var(--font-family-mono);
}

.custom-properties-view__introduction {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.custom-properties-view__px-to-rem-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 200px));
}

.custom-properties-view__categories {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
</style>
