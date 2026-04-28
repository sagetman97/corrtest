<template>
  <component-demo-layout name="Progress Bar">
    <section-header
      title="Basic Usage"
      description="A progress bar component to show completion status."
    />
    <component-example :code="basicExample">
      <p-progress-bar :value="50" />
    </component-example>

    <section-header
      title="With Percentage Display"
      description="Show the percentage value alongside the progress bar."
    />
    <component-example :code="percentageExample">
      <p-progress-bar
        :value="75"
        show-percentage
      />
    </component-example>

    <section-header
      title="Interactive Progress"
      description="Adjust the progress value dynamically."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-label
          label="Progress Amount"
          label-position="left"
        >
          <input
            v-model.number="value"
            type="range"
            min="0"
            max="100"
            label="Value"
          />
        </p-label>
        <p-toggle
          v-model="showPercentage"
          label="Show Percentage"
        />
        Current value: {{ value }}%
      </p-form>
      <p-progress-bar v-bind="{ showPercentage, value }" />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Interactive example values
const value = ref(25)
const showPercentage = ref(true)

// Code examples
const basicExample = {
  code: `<p-progress-bar :value="50" />`,
  language: 'vue-html',
}

const percentageExample = {
  code: `<p-progress-bar
  :value="75"
  show-percentage
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-progress-bar
  :value="value"
  :show-percentage="showPercentage"
/>`,
  language: 'vue-html',
}
</script>
