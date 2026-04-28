<template>
  <component-demo-layout name="Date Picker">
    <section-header
      title="Basic Usage"
      description="A simple date picker component for selecting dates."
    />
    <component-example :code="basicExample">
      <p-date-picker v-model="basicValue" />
      <p-label :message="JSON.stringify(basicValue)" />
    </component-example>

    <section-header
      title="Date Range Constraints"
      description="Set minimum and maximum date constraints."
    />
    <component-example :code="constraintsExample">
      <p-date-picker
        v-model="constraintsValue"
        min="2024-01-01"
        max="2024-12-31"
      />
      <p-label :message="JSON.stringify(constraintsValue)" />
    </component-example>

    <section-header
      title="Clearable Date Picker"
      description="Allow users to clear the selected date."
    />
    <component-example :code="clearableExample">
      <p-date-picker
        v-model="clearableValue"
        clearable
      />
      <p-label :message="JSON.stringify(clearableValue)" />
    </component-example>

    <section-header
      title="Hide Today Button"
      description="Hide the 'Today' button in the date picker."
    />
    <component-example :code="hideTodayExample">
      <p-date-picker
        v-model="hideTodayValue"
        hide-today
      />
      <p-label :message="JSON.stringify(hideTodayValue)" />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Date picker with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-date-picker
          v-model="min"
          label="Min value"
        />

        <p-date-picker
          v-model="max"
          label="Max value"
        />

        <p-toggle
          v-model="clearable"
          label="Clearable"
        />

        <p-toggle
          v-model="hideToday"
          label="Hide Today"
        />
      </p-form>
      <p-date-picker
        v-model="value"
        v-bind="{ min, max, clearable, hideToday }"
        variant="simple"
      />
      <p-label :message="JSON.stringify(value)" />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Example values
const basicValue = ref<Date | null>(null)
const constraintsValue = ref<Date | null>(null)
const clearableValue = ref<Date | null>(new Date())
const hideTodayValue = ref<Date | null>(null)

// Interactive example
const min = ref<string>()
const max = ref<string>()
const clearable = ref(false)
const hideToday = ref(false)
const value = ref<Date | null>(null)

// Code examples
const basicExample = {
  code: `<p-date-picker v-model="selectedDate" />`,
  language: 'vue-html',
}

const constraintsExample = {
  code: `<p-date-picker
  v-model="selectedDate"
  min="2024-01-01"
  max="2024-12-31"
/>`,
  language: 'vue-html',
}

const clearableExample = {
  code: `<p-date-picker
  v-model="selectedDate"
  clearable
/>`,
  language: 'vue-html',
}

const hideTodayExample = {
  code: `<p-date-picker
  v-model="selectedDate"
  hide-today
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-date-picker
  v-model="selectedDate"
  :min="min"
  :max="max"
  :clearable="clearable"
  :hide-today="hideToday"
/>`,
  language: 'vue-html',
}
</script>
