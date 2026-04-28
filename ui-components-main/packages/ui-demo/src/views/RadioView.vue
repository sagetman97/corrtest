<template>
  <component-demo-layout name="Radio">
    <section-header
      title="Basic Usage"
      description="A simple radio component."
    />
    <component-example :code="basicRadioExample">
      <p-form>
        <p-radio
          v-model="basicValue"
          label="Option 1"
          value="Option 1"
        />
        <p-radio
          v-model="basicValue"
          label="Option 2"
          value="Option 2"
        />
        value: {{ basicValue }}
      </p-form>
    </component-example>

    <section-header
      title="Radio Groups"
      description="Radios should be grouped together using the same v-model and name props. Radios have a default name of 'radio' that will group all radios in the same form together. You can change the name prop to group radios together."
    />
    <component-example :code="groupRadioExample">
      <p-form>
        <p-radio
          v-model="groupValue"
          label="group 1: Option 1"
          value="Option 1"
          name="group1"
        />
        <p-radio
          v-model="groupValue"
          label="group 1: Option 2"
          value="Option 2"
          name="group1"
        />
        value: {{ groupValue }}
        <p-radio
          v-model="groupValue2"
          label="group 2: Option 1"
          value="Option 1"
          name="group2"
        />
        <p-radio
          v-model="groupValue2"
          label="group 2: Option 2"
          value="Option 2"
          name="group2"
        />
        value: {{ groupValue2 }}
      </p-form>
    </component-example>

    <section-header
      title="PForm"
      description="PForms will also group together radios without having to worry about the name prop."
    />

    <component-example :code="pformRadioExample">
      <p-form class="radio-view__form">
        <p-radio
          v-model="formValue"
          label="Option 1"
          value="Option 1"
        />
        <p-radio
          v-model="formValue"
          label="Option 2"
          value="Option 2"
        />
        value: {{ formValue }}
      </p-form>
      <p-form class="radio-view__form">
        <p-radio
          v-model="formValue2"
          label="Option 1"
          value="Option 1"
        />
        <p-radio
          v-model="formValue2"
          label="Option 2"
          value="Option 2"
        />
        value: {{ formValue2 }}
      </p-form>
    </component-example>
    <section-header
      title="Disabled"
      description="Radios can be disabled using the `disabled` prop. Disabled radios will not be clickable, and will not emit any events. They also will not be keyboard accessible."
    />
    <component-example :code="disabledRadioExample">
      <p-form>
        <p-radio
          v-model="disabledValue"
          disabled
          label="Disabled - checked"
        />
        <p-radio
          v-model="disabledValue"
          disabled
          label="Disabled - unchecked"
        />
        <p-radio
          v-model="disabledErrorValue"
          disabled
          name="disabled-error"
          label="Disabled - errored"
          state="errored"
        />
      </p-form>
    </component-example>
    <section-header
      title="Errored"
      description="Radios can be errored using the `state` prop. Errored radios will have a red border."
    />
    <component-example :code="erroredRadioExample">
      <p-form>
        <p-radio
          v-model="errorValue"
          state="errored"
          label="Errored 1"
        />
        <p-radio
          v-model="errorValue"
          state="errored"
          label="Errored 2"
        />
        <p-radio
          v-model="errorValue"
          state="errored"
          label="Errored 3"
        />
      </p-form>
    </component-example>
    <section-header
      title="using checked prop"
      description="Radios can be checked using the `checked` prop. Checked radios will be checked regardless of the v-model value."
    />
    <component-example :code="checkedRadioExample">
      <p-form>
        <p-radio
          label="Option 1"
          value="Option 1"
          checked
        />
        <p-radio
          label="Option 2"
          value="Option 2"
        />
      </p-form>
    </component-example>
    <section-header
      title="Label Position"
      description="Radios can have their label on the left using the `label-position` prop."
    />
    <component-example :code="labelPositionExample">
      <p-form>
        <p-radio
          label="Option 1"
          value="Option 1"
          label-position="left"
        />
        <p-radio
          label="Option 2"
          value="Option 2"
          label-position="left"
        />
      </p-form>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Radio with configurable properties."
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
      <p-form
        name="interactive-radio-group"
        class="radio-view__form"
      >
        <p-radio
          v-model="interactiveValue"
          :disabled="disabled"
          :required="required"
          :label-position="labelPosition"
          :state="state"
          :label="label"
          :message="message"
          value="Option 1"
        />
        <p-radio
          v-model="interactiveValue"
          :disabled="disabled"
          :required="required"
          :label-position="labelPosition"
          :state="state"
          label="Option 2"
          value="Option 2"
        />
        <p-radio
          v-model="interactiveValue"
          :disabled="disabled"
          :required="required"
          :label-position="labelPosition"
          :state="state"
          label="Option 3"
          value="Option 3"
        />
      </p-form>
      <p>Value: {{ interactiveValue }}</p>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { LabelPosition, ValidationState } from '@/types'

const basicValue = ref<string | null>(null)
const groupValue = ref<string | null>(null)
const groupValue2 = ref<string | null>(null)
const formValue = ref<string | null>(null)
const formValue2 = ref<string | null>(null)
const disabledValue = ref<string | null>('Disabled - checked')
const disabledErrorValue = ref<string | null>('Disabled - errored')
const errorValue = ref<string | null>('Errored 1')

const basicRadioExample = {
  code: `<p-form>
  <p-radio
    v-model="value"
    label="Option 1"
    value="Option 1"
  />
  <p-radio
    v-model="value"
    label="Option 2"
    value="Option 2"
  />
</p-form>`,
  language: 'vue-html',
}

const groupRadioExample = {
  code: `<p-form>
  <p-radio
    v-model="value"
    label="Option 1"
    value="Option 1"
    name="group1"
  />
  <p-radio
    v-model="value"
    label="Option 2"
    value="Option 2"
    name="group1"
  />
  <p-radio
    v-model="value"
    label="Option 1"
    value="Option 1"
    name="group2"
  />
  <p-radio
    v-model="value"
    label="Option 2"
    value="Option 2"
    name="group2"
  />
</p-form>`,
  language: 'vue-html',
}

const pformRadioExample = {
  code: `<p-form>
  <p-radio
    v-model="value"
    label="Option 1"
    value="Option 1"
  />
  <p-radio
    v-model="value"
    label="Option 2"
    value="Option 2"
  />
</p-form>
<p-form>
  <p-radio
    v-model="value"
    label="Option 1"
    value="Option 1"
  />
  <p-radio
    v-model="value"
    label="Option 2"
    value="Option 2"
  />
</p-form>`,
  language: 'vue-html',
}

const disabledRadioExample = {
  code: `<p-radio
  v-model="value"
  disabled
  label="Disabled"
/>`,
  language: 'vue-html',
}

const erroredRadioExample = {
  code: `<p-radio
  v-model="value"
  state="errored"
  label="Errored"
/>`,
  language: 'vue-html',
}

const checkedRadioExample = {
  code: `<p-radio
  label="Option 1"
  value="Option 1"
  checked
/>
<p-radio
  label="Option 2"
  value="Option 2"
/>`,
  language: 'vue-html',
}

const labelPositionExample = {
  code: `<p-radio
  label="Option 1"
  value="Option 1"
  label-position="left"
/>
<p-radio
  label="Option 2"
  value="Option 2"
  label-position="left"
/>`,
  language: 'vue-html',
}

const interactiveValue = ref<string | null>(null)
const disabled = ref(false)
const required = ref(false)
const labelPosition = ref<LabelPosition>('right')
const state = ref<ValidationState>('normal')
const label = ref<string>('Option 1')
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
  code: `<p-radio
  v-model="value"
  :disabled="disabled"
  :required="required"
  :label-position="labelPosition"
  :state="state"
  :label="label"
  :message="message"
  value="Option 1"
/>
<p-radio
  v-model="value"
  :disabled="disabled"
  :required="required"
  :label-position="labelPosition"
  :state="state"
  label="Option 2"
  value="Option 2"
/>
<p-radio
  v-model="value"
  :disabled="disabled"
  :required="required"
  :label-position="labelPosition"
  :state="state"
  label="Option 3"
  value="Option 3"
/>`,
  language: 'vue-html',
}
</script>

<style>
.radio-view__form {
  margin-top: var(--spacing-lg);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}
</style>
