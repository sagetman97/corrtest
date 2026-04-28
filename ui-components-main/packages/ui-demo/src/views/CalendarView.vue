<template>
  <component-demo-layout name="Calendar">
    <section-header
      title="Basic Usage"
      description="A simple calendar component"
    />
    <component-example :code="basicCalendarExample">
      <p-calendar v-model="basicValue" />
      Your date value is: {{ basicValue }}
    </component-example>

    <section-header
      title="Min and Max Dates"
      description="Using the min and max props you can disable dates. This example disables dates 7 days before and after the current date."
    />
    <component-example :code="minMaxCalendarExample">
      <p-calendar
        v-model="minMaxValue"
        :min="minDate"
        :max="maxDate"
      />
    </component-example>

    <section-header
      title="Months to show"
      description="Using the monthsShown prop you can show multiple months at once. This example shows 3 months at once."
    />
    <component-example :code="monthsShownCalendarExample">
      <p-calendar
        v-model="monthsShownValue"
        :months-shown="3"
      />
    </component-example>

    <section-header
      title="Clearable and Hide Today"
      description="Clearable enables a clear button to remove the selected date. Hide today removes the today button."
    />

    <component-example :code="clearableCalendarExample">
      <p-calendar
        v-model="clearableValue"
        :clearable="true"
        :hide-today="true"
      />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(new Date())

const basicCalendarExample = {
  code: `<p-calendar
  v-model="value"
/>`,
  language: 'vue-html',
}

const minMaxValue = ref(new Date())
const minDate = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
const maxDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

const minMaxCalendarExample = {
  code: `<p-calendar
  v-model="value"
  min="minDate"
  max="maxDate"
/>`,
  language: 'vue-html',
}

const monthsShownValue = ref(new Date())

const monthsShownCalendarExample = {
  code: `<p-calendar
  v-model="value"
  :months-shown="3"
/>`,
  language: 'vue-html',
}

const clearableValue = ref(new Date())

const clearableCalendarExample = {
  code: `<p-calendar
  v-model="value"
  :clearable="false"
  :hide-today="true"
/>`,
  language: 'vue-html',
}
</script>
