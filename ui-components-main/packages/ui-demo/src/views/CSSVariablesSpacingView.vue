<template>
  <component-demo-layout
    class="css-variables-spacing-view"
    name="Spacing"
  >
    <section-header
      title="Spacing Scale"
      description="Available spacing values"
    />
    <component-example :code="scaleExample">
      <div class="spacing-demos">
        <div
          v-for="space in spacingScale"
          :key="space.label"
          class="spacing-demo"
        >
          <div class="spacing-preview-container">
            <div
              class="spacing-preview"
              :style="{ width: `var(--${space.label})` }"
            />
          </div>
          <div
            class="spacing-info"
            :class="{ 'is-copied': copiedLabels.has(space.label) }"
            @click="copyToClipboard(space.label)"
          >
            <code class="spacing-label">--{{ space.label }}</code>
            <span class="spacing-value">{{ space.value }} ({{ space.px }})</span>
          </div>
        </div>
      </div>
    </component-example>

    <section-header
      title="Unit Converter"
      description="Convert between pixels and rem units"
    />
    <component-example :code="converterExample">
      <div class="converter-section">
        <p>Spacing values use REMs for scalability. Use this converter to translate between pixels and rems:</p>

        <p-form class="converter-form">
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
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types/validation'

import { useCopyToClipboard, useValidation, useValidationFields } from '@/composables'

const { copiedLabels, copyToClipboard } = useCopyToClipboard()

const spacingScale = [
  { label: 'spacing-xxxs', value: '0.125rem', px: '2px' },
  { label: 'spacing-xxs', value: '0.250rem', px: '4px' },
  { label: 'spacing-xs', value: '0.500rem', px: '8px' },
  { label: 'spacing-sm', value: '0.750rem', px: '12px' },
  { label: 'spacing-base', value: '1.000rem', px: '16px' },
  { label: 'spacing-md', value: '1.000rem', px: '16px (same as base)' },
  { label: 'spacing-lg', value: '1.500rem', px: '24px' },
  { label: 'spacing-xl', value: '2.000rem', px: '32px' },
  { label: 'spacing-xxl', value: '2.500rem', px: '40px' },
  { label: 'spacing-xxxl', value: '3.000rem', px: '48px' },
]

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

const scaleExample = {
  code: `/* Spacing scale examples */
.tight-spacing {
  padding: var(--spacing-xs);
}

.normal-spacing {
  padding: var(--spacing-base);
}

.loose-spacing {
  padding: var(--spacing-xl);
}`,
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
</script>

<style>
.spacing-intro p {
  margin-bottom: var(--spacing-base);
}

.spacing-demos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.spacing-demo {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.spacing-preview-container {
  min-width: 200px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.spacing-preview {
  height: 2px;
  background: var(--colors-background-common-primary-medium);
  position: relative;
}

.spacing-preview::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 10px;
  background: var(--colors-background-common-primary-medium);
}

.spacing-preview::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 10px;
  background: var(--colors-background-common-primary-medium);
}

.spacing-info {
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
  min-width: 250px;
}

.spacing-info:hover {
  border-color: var(--colors-border-common-active);
}

.spacing-info:active {
  background-color: var(--colors-background-common-default-grey);
}

.spacing-label {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-dark);
}

.spacing-value {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.spacing-info.is-copied::after {
  content: 'Copied!';
  opacity: 1;
}

.spacing-info::after {
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

.converter-section {
  max-width: none;
}

.converter-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 200px));
  gap: var(--spacing-base);
  margin: var(--spacing-base) 0;
}

.converter-note {
  margin-top: var(--spacing-base);
  padding: var(--spacing-sm);
  background: var(--colors-background-common-accent-light);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-sm);
}
</style>
