<template>
  <component-demo-layout name="Toggle">
    <section-header
      title="Basic Usage"
      description="A simple toggle component for boolean values."
    />
    <component-example :code="basicToggleExample">
      <p-toggle
        v-model="basicValue"
        label="Basic Toggle"
      />
    </component-example>

    <section-header
      title="Label Position"
      description="The label can be positioned on the left, top, or right of the toggle."
    />
    <component-example :code="labelPositionExample">
      <p-toggle
        v-model="leftValue"
        label="Left Position"
        label-position="left"
      />
      <p-toggle
        v-model="topValue"
        label="Top Position"
        label-position="top"
      />
      <p-toggle
        v-model="rightValue"
        label="Right Position"
        label-position="right"
      />
    </component-example>

    <section-header
      title="Required State"
      description="Toggle can be marked as required with a visual indicator."
    />
    <component-example :code="requiredExample">
      <p-toggle
        v-model="requiredValue"
        label="Required Toggle"
        required
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Toggle can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-toggle
        v-model="disabledValue"
        label="Disabled Toggle"
        disabled
      />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Basic toggle values
const basicValue = ref(false)

// Label position examples
const leftValue = ref(false)
const topValue = ref(false)
const rightValue = ref(false)

// Required example
const requiredValue = ref(false)

// Disabled example
const disabledValue = ref(true)

// Code examples
const basicToggleExample = {
  code: `<p-toggle
  v-model="toggleValue"
  label="Basic Toggle"
/>`,
  language: 'vue-html',
}

const labelPositionExample = {
  code: `<p-toggle
  v-model="leftValue"
  label="Left Position"
  label-position="left"
/>
<p-toggle
  v-model="topValue"
  label="Top Position"
  label-position="top"
/>
<p-toggle
  v-model="rightValue"
  label="Right Position"
  label-position="right"
/>`,
  language: 'vue-html',
}

const requiredExample = {
  code: `<p-toggle
  v-model="requiredValue"
  label="Required Toggle"
  required
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-toggle
  v-model="disabledValue"
  label="Disabled Toggle"
  disabled
/>`,
  language: 'vue-html',
}
</script>

<style>
.toggle-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.toggle-view__options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-lg);
  background-color: var(--colors-background-common-white);
}
</style>
