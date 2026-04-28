<template>
  <component-demo-layout name="Split Button">
    <section-header
      title="Basic Usage"
      description="A split button component that combines a primary action with a dropdown of additional options."
    />
    <component-example :code="basicExample">
      <p-split-button
        :options="basicOptions"
        @selected="handleBasicAction"
      >
        Save Document
      </p-split-button>
    </component-example>

    <section-header
      title="Button Variants"
      description="Split buttons support different visual variants."
    />
    <component-example :code="variantsExample">
      <p-split-button
        :options="basicOptions"
        variant="primary"
        @selected="handleAction"
      >
        Primary Action
      </p-split-button>
      <p-split-button
        :options="basicOptions"
        variant="accent"
        @selected="handleAction"
      >
        Accent Action
      </p-split-button>
      <p-split-button
        :options="basicOptions"
        variant="error"
        @selected="handleAction"
      >
        Error Action
      </p-split-button>
    </component-example>

    <section-header
      title="Loading State"
      description="Split button can show a loading state."
    />
    <component-example :code="loadingExample">
      <p-split-button
        :options="basicOptions"
        is-loading
        @selected="handleAction"
      >
        Processing...
      </p-split-button>
    </component-example>

    <section-header
      title="Disabled State"
      description="Split button can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-split-button
        :options="basicOptions"
        disabled
        @selected="handleAction"
      >
        Disabled Action
      </p-split-button>
    </component-example>

    <section-header
      title="Custom Option Slots"
      description="Customize the appearance of dropdown options using slots."
    />
    <component-example :code="customSlotExample">
      <p-split-button
        :options="buttonOptions"
        @select="handleAction"
      >
        Custom Options
        <template #option="{ option, select }">
          <p-button
            icon="raccoon"
            text
            :disabled="option.disabled"
            @click="select"
          >
            {{ option.label }}
          </p-button>
        </template>
      </p-split-button>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Comprehensive split button with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="disabled"
          label="Disabled"
          label-position="left"
        />

        <p-toggle
          v-model="isLoading"
          label="Loading"
          label-position="left"
        />

        <p-select
          v-model="variant"
          label="Variant"
          :options="variantOptions"
        />
      </p-form>
      <p-split-button
        :options="buttonOptions"
        v-bind="{ variant, disabled, isLoading }"
        @selected="handleAction"
      >
        Interactive Button
      </p-split-button>
      <div>Last action: {{ action }}</div>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'

import { ButtonProps, SelectOption } from '@/types'

// Interactive example state
const action = ref()
const disabled = ref(false)
const isLoading = ref(false)

// Event handlers
const handleAction = (value: string | undefined) => {
  action.value = value
  // eslint-disable-next-line no-console
  console.log('Action Handled', value)
}

const handleBasicAction = (value: string | undefined) => {
  // eslint-disable-next-line no-console
  console.log('Basic Action Handled', value)
}

const variant = ref<ButtonProps['variant']>('primary')
const variantOptions: SelectOption<ButtonProps['variant']>[] = [
  { label: 'primary', value: 'primary' },
  { label: 'secondary', value: 'accent' },
  { label: 'danger', value: 'error' },
]

// Basic options for simple examples
const basicOptions: SelectOption<string | undefined>[] = [
  { label: 'Save As...', value: 'save-as' },
  { label: 'Export PDF', value: 'export-pdf' },
  { label: 'Print', value: 'print' },
]

// Advanced options for complex examples
const buttonOptions: SelectOption<string | undefined>[] = [
  { label: 'Action 1', value: 'action 1' },
  {
    label: 'Action disabled',
    value: 'Action disabled',
    disabled: true,
  },
  { label: 'Action 2', value: 'action 2' },
  {
    label: 'Action 3',
    value: 'Action 3',
  },
  { label: 'Action 4', value: 'action 4' },
]

// Code examples
const basicExample = {
  code: `<p-split-button
  :options="options"
  @selected="handleAction"
>
  Save Document
</p-split-button>`,
  language: 'vue-html',
}

const variantsExample = {
  code: `<p-split-button
  :options="options"
  variant="primary"
  @selected="handleAction"
>
  Primary Action
</p-split-button>`,
  language: 'vue-html',
}

const loadingExample = {
  code: `<p-split-button
  :options="options"
  is-loading
  @selected="handleAction"
>
  Processing...
</p-split-button>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-split-button
  :options="options"
  disabled
  @selected="handleAction"
>
  Disabled Action
</p-split-button>`,
  language: 'vue-html',
}

const customSlotExample = {
  code: `<p-split-button
  :options="options"
  v-model="selectedOption"
  @select="handleAction"
>
  Custom Options
  <template #option="{ option, select }">
    <p-button
      icon="raccoon"
      text
      :disabled="option.disabled"
      @click="select"
    >
      {{ option.label }}
    </p-button>
  </template>
</p-split-button>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-split-button
  :options="options"
  :variant="variant"
  :disabled="disabled"
  :is-loading="isLoading"
  @selected="handleAction"
>
  Interactive Button
</p-split-button>`,
  language: 'vue-html',
}
</script>
