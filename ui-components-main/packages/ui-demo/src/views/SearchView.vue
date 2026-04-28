<template>
  <component-demo-layout name="Search">
    <section-header
      title="Basic Usage"
      description="A simple search input component."
    />
    <component-example :code="basicExample">
      <p-search
        v-model="basicValue"
        placeholder="Search..."
      />
    </component-example>

    <section-header
      title="Custom Placeholder"
      description="Customize the placeholder text to guide users."
    />
    <component-example :code="placeholderExample">
      <p-search
        v-model="placeholderValue"
        placeholder="Search for products, categories, or brands..."
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Search input can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-search
        v-model="disabledValue"
        placeholder="Search disabled"
        disabled
      />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Search input with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="disabled"
          label="Disabled"
        />

        <p-input
          v-model="placeholder"
          label="Placeholder"
        />
      </p-form>
      <p-search
        v-model="value"
        v-bind="{ disabled, placeholder }"
      />
      <p>Search value: {{ value }}</p>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Example values
const basicValue = ref<string>()
const placeholderValue = ref<string>()
const disabledValue = ref<string>('Cannot edit this')

// Interactive example
const value = ref<string>()
const disabled = ref(false)
const placeholder = ref<string>('Search...')

// Code examples
const basicExample = {
  code: `<p-search
  v-model="value"
  placeholder="Search..."
/>`,
  language: 'vue-html',
}

const placeholderExample = {
  code: `<p-search
  v-model="value"
  placeholder="Search for products, categories, or brands..."
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-search
  v-model="value"
  placeholder="Search disabled"
  disabled
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-search
  v-model="value"
  :disabled="disabled"
  :placeholder="placeholder"
/>`,
  language: 'vue-html',
}
</script>
