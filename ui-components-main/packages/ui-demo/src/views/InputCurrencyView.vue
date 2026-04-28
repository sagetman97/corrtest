<template>
  <component-demo-layout name="Input Currency">
    <section-header
      title="Basic Usage"
      description="A currency input component with automatic formatting and validation."
    />
    <component-example :code="basicExample">
      <p-input-currency
        v-model="basicValue"
        label="Basic Currency Input"
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Currency input can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-input-currency
        v-model="disabledValue"
        label="Disabled Currency Input"
        disabled
      />
    </component-example>

    <section-header
      title="Simple Variant"
      description="A simplified input style with minimal borders."
    />
    <component-example :code="simpleExample">
      <p-input-currency
        v-model="simpleValue"
        label="Simple Variant Currency Input"
        variant="simple"
      />
      <p-input-currency
        v-model="simpleHighlightedValue"
        label="Simple Variant Highlighted"
        variant="simple"
        highlighted
      />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Currency input with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="disabled"
          label="Disabled"
        />
        <p-toggle
          v-model="highlighted"
          label="Highlighted"
        />
        <p-select
          v-model="variant"
          label="Variant"
          :options="variantOptions"
        />
      </p-form>
      <p-input-currency
        v-model="value"
        label="Interactive Currency Input"
        :message="JSON.stringify(value)"
        v-bind="{ disabled, highlighted, variant }"
      />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Example values
const basicValue = ref('123454')
const disabledValue = ref('555555')
const simpleValue = ref('42000')
const simpleHighlightedValue = ref('99999')

// Interactive example
const value = ref('12345')
const disabled = ref(false)
const highlighted = ref(false)
const variant = ref<'default' | 'simple'>('default')
const variantOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Simple', value: 'simple' },
]

// Code examples
const basicExample = {
  code: `<p-input-currency
  v-model="value"
  label="Basic Currency Input"
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-input-currency
  v-model="value"
  label="Disabled Currency Input"
  disabled
/>`,
  language: 'vue-html',
}

const simpleExample = {
  code: `<p-input-currency
  v-model="value"
  label="Simple Variant Currency Input"
  variant="simple"
/>

<p-input-currency
  v-model="value"
  label="Simple Variant Highlighted"
  variant="simple"
  highlighted
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-input-currency
  v-model="value"
  label="Interactive Currency Input"
  :disabled="disabled"
  :highlighted="highlighted"
  :variant="variant"
/>`,
  language: 'vue-html',
}
</script>
