<template>
  <component-demo-layout name="Label">
    <section-header
      title="Basic Usage"
      description="A simple label component for form elements."
    />
    <component-example :code="basicExample">
      <p-label label="Basic Label">
        <p-button>Button with Label</p-button>
      </p-label>
    </component-example>

    <section-header
      title="Label Positioning"
      description="Control where the label appears relative to the content."
    />
    <component-example :code="positionExample">
      <p-label
        label="Left Position"
        label-position="left"
      >
        <p-button>Button</p-button>
      </p-label>
      <p-label
        label="Top Position"
        label-position="top"
      >
        <p-button>Button</p-button>
      </p-label>
      <p-label
        label="Right Position"
        label-position="right"
      >
        <p-button>Button</p-button>
      </p-label>
    </component-example>

    <section-header
      title="Required Indicator"
      description="Show a required indicator for mandatory fields."
    />
    <component-example :code="requiredExample">
      <p-label
        label="Required Field"
        required
      >
        <p-input placeholder="This field is required" />
      </p-label>
    </component-example>

    <section-header
      title="Validation States"
      description="Display different states for validation feedback."
    />
    <component-example :code="statesExample">
      <p-label
        label="Normal State"
        state="normal"
      >
        <p-input
          placeholder="Normal input"
          state="normal"
        />
      </p-label>
      <p-label
        label="Error State"
        state="errored"
      >
        <p-input
          placeholder="Error input"
          state="errored"
        />
      </p-label>
      <p-label
        label="Pending State"
        state="pending"
      >
        <p-input
          placeholder="Pending input"
          state="pending"
        />
      </p-label>
    </component-example>

    <section-header
      title="Disabled State"
      description="Label can be disabled along with its content."
    />
    <component-example :code="disabledExample">
      <p-label
        label="Disabled Label"
        disabled
      >
        <p-input
          placeholder="Disabled input"
          disabled
        />
      </p-label>
    </component-example>

    <section-header
      title="Long Labels"
      description="Labels handle overflow with text ellipsis."
    />
    <component-example :code="longLabelExample">
      <p-label label="This is a very long label that should overflow with text ellipsis when the container is too narrow">
        <p-button>Button</p-button>
      </p-label>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Label with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-select
          v-model="labelPosition"
          :options="positionOptions"
          label="Position"
          label-position="left"
        />

        <p-select
          v-model="labelState"
          :options="stateOptions"
          label="State"
          label-position="left"
        />

        <p-toggle
          v-model="required"
          label="Required"
          label-position="left"
        />

        <p-toggle
          v-model="disabled"
          label="Disabled"
          label-position="left"
        />
      </p-form>
      <p-label
        :label-position="labelPosition"
        :state="labelState"
        :required="required"
        :disabled="disabled"
        label="Interactive Label"
      >
        <p-input
          v-model="textInput"
          placeholder="Enter text here..."
          :disabled="disabled"
        />
      </p-label>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { LabelPosition, SelectOption } from '@/types'
import { ValidationState } from '@/types'

const labelPosition = ref<LabelPosition>('left')
const positionOptions: SelectOption<LabelPosition>[] = [
  { label: 'left', value: 'left' },
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
]

const labelState = ref<ValidationState>('normal')
const stateOptions: SelectOption<ValidationState>[] = [
  { label: 'normal', value: 'normal' },
  { label: 'errored', value: 'errored' },
  { label: 'pending', value: 'pending' },
]

// Interactive example
const required = ref(false)
const disabled = ref(false)
const textInput = ref('')

// Code examples
const basicExample = {
  code: `<p-label label="Basic Label">
  <p-button>Button with Label</p-button>
</p-label>`,
  language: 'vue-html',
}

const positionExample = {
  code: `<p-label
  label="Left Position"
  label-position="left"
>
  <p-button>Button</p-button>
</p-label>`,
  language: 'vue-html',
}

const requiredExample = {
  code: `<p-label
  label="Required Field"
  required
>
  <p-input placeholder="This field is required" />
</p-label>`,
  language: 'vue-html',
}

const statesExample = {
  code: `<p-label
  label="Normal State"
  state="normal"
>
  <p-input placeholder="Normal input" state="normal" />
</p-label>

<p-label
  label="Error State"
  state="errored"
>
  <p-input placeholder="Error input" state="errored" />
</p-label>

<p-label
  label="Pending State"
  state="pending"
>
  <p-input placeholder="Pending input" state="pending" />
</p-label>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-label
  label="Disabled Label"
  disabled
>
  <p-input placeholder="Disabled input" disabled />
</p-label>`,
  language: 'vue-html',
}

const longLabelExample = {
  code: `<p-label label="This is a very long label that should overflow with text ellipsis">
  <p-button>Button</p-button>
</p-label>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-label
  label="Interactive Label"
  :label-position="labelPosition"
  :state="labelState"
  :required="required"
  :disabled="disabled"
>
  <p-input placeholder="Enter text here..." :disabled="disabled" />
</p-label>`,
  language: 'vue-html',
}
</script>

<style>
.label-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.label-view__options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-lg);
  background-color: var(--colors-background-common-white);
}

.label-view__stories {
  width: 100%;
}

.label-view__story {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-lg);
  background-color: var(--colors-background-common-white);
}
</style>
