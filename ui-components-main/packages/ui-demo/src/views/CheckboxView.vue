<template>
  <component-demo-layout name="Checkbox">
    <section-header
      title="Basic Usage"
      description="A simple checkbox component"
    />
    <component-example :code="basicCheckboxExample">
      <p-checkbox
        v-model="basicValue"
        label="Hello there"
      />
    </component-example>

    <section-header
      title="Indeterminate"
      description="Checkboxes can be indeterminate using the `indeterminate` prop. Indeterminate can be used when there are a series of checkboxes that can be all checked/unchecked at once. If not all of the checkboxes are checked, the checkbox in control should display as indeterminate."
    />

    <component-example :code="indeterminateCheckboxExample">
      <p-checkbox
        v-model="allSelected"
        label="All Checked"
        :indeterminate="isIndeterminate"
      />
      <p-checkbox
        v-model="value1"
        label="Checkbox 1"
      />
      <p-checkbox
        v-model="value2"
        label="Checkbox 2"
      />
    </component-example>

    <section-header
      title="Disabled"
      description="Checkboxes can be disabled using the `disabled` prop. Disabled checkboxes will not be clickable, and will not emit any events. They also will not be keyboard accessible."
    />
    <component-example :code="disabledCheckboxExample">
      <p-checkbox
        v-model="disabledValue"
        disabled
        label="Disabled"
      />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Checkbox with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="disabled"
          label="Disabled"
        />

        <p-toggle
          v-model="required"
          label="Required"
        />

        <p-toggle
          v-model="indeterminate"
          label="Indeterminate"
        />

        <p-select
          v-model="labelPosition"
          label="Label Position"
          :options="labelPositionOptions"
        />

        <p-select
          v-model="state"
          label="State"
          :options="stateOptions"
        />

        <p-input
          v-model="label"
          label="Label Text"
        />

        <p-input
          v-model="message"
          label="Message Text"
        />
      </p-form>
      <p-checkbox
        v-model="interactiveValue"
        :disabled="disabled"
        :required="required"
        :indeterminate="indeterminate"
        :label-position="labelPosition"
        :state="state"
        :label="label"
        :message="message"
      />
      <p>Value: {{ interactiveValue }}</p>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { LabelPosition, ValidationState } from '@/types'

const basicValue = ref<boolean>(false)
const basicCheckboxExample = {
  code: `<p-checkbox
  v-model="value"
  label="Hello there"
/>`,
  language: 'vue-html',
}

const value1 = ref<boolean>(false)
const value2 = ref<boolean>(false)
const allSelected = computed<boolean | null>({
  get() {
    if (value1.value && value2.value) {
      return true
    } else {
      return null
    }
  },
  set(value) {
    value1.value = !!value
    value2.value = !!value
  },
})

const isIndeterminate = computed<boolean>(() => value1.value !== value2.value)
const indeterminateCheckboxExample = {
  code: `<p-checkbox
  v-model="allSelected"
  label="All Checked"
  :indeterminate="isIndeterminate"
/>
<p-checkbox
  v-model="value1"
  label="Checkbox 1"
/>
<p-checkbox
  v-model="value2"
  label="Checkbox 2"
/>`,
  language: 'vue-html',
}

const disabledValue = ref<boolean>(false)

const disabledCheckboxExample = {
  code: `<p-checkbox
  v-model="value"
  disabled
  label="Disabled"
/>`,
  language: 'vue-html',
}

const interactiveValue = ref<boolean>(false)
const disabled = ref(false)
const required = ref(false)
const indeterminate = ref(false)
const labelPosition = ref<LabelPosition>('right')
const state = ref<ValidationState>('normal')
const label = ref<string>('Interactive Checkbox')
const message = ref<string>('')

const labelPositionOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Top', value: 'top' },
  { label: 'Right', value: 'right' },
]

const stateOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Errored', value: 'errored' },
  { label: 'Pending', value: 'pending' },
]

const interactiveExample = {
  code: `<p-checkbox
  v-model="value"
  :disabled="disabled"
  :required="required"
  :indeterminate="indeterminate"
  :label-position="labelPosition"
  :state="state"
  :label="label"
  :message="message"
/>`,
  language: 'vue-html',
}
</script>
