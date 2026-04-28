<template>
  <component-demo-layout name="Textarea">
    <section-header
      title="Basic Usage"
      description="A simple textarea component for multi-line text input."
    />
    <component-example :code="basicExample">
      <p-textarea
        v-model="basicValue"
        label="Basic Textarea"
        placeholder="Enter your text here..."
      />
      <p>Value: {{ basicValue }}</p>
    </component-example>

    <section-header
      title="With Character Limit"
      description="Set a maximum character limit for the textarea."
    />
    <component-example :code="maxlengthExample">
      <p-textarea
        v-model="maxlengthValue"
        label="Limited Textarea"
        placeholder="Maximum 100 characters"
        :maxlength="100"
      />
      <p>Characters: {{ maxlengthValue.length }}/100</p>
    </component-example>

    <section-header
      title="Custom Dimensions"
      description="Control the size of the textarea with rows and columns."
    />
    <component-example :code="dimensionsExample">
      <p-textarea
        v-model="dimensionsValue"
        label="Custom Size Textarea"
        placeholder="This textarea has custom dimensions"
        :cols="50"
        :rows="6"
      />
    </component-example>

    <section-header
      title="States"
      description="Different states like disabled, and required."
    />
    <component-example :code="statesExample">
      <p-textarea
        v-model="disabledValue"
        label="Disabled Textarea"
        placeholder="This textarea is disabled"
        disabled
      />
      <p-textarea
        v-model="requiredValue"
        label="Required Textarea"
        placeholder="This field is required"
        required
      />
    </component-example>

    <section-header
      title="With Prefix and Suffix"
      description="Add buttons or icons before or after the textarea."
    />
    <component-example :code="slotsExample">
      <p-textarea
        v-model="prefixValue"
        label="Textarea with Prefix"
        placeholder="Type your message..."
      >
        <template #prefix>
          <p-button
            icon="user"
            fa-style="solid"
            size="sm"
            variant="accent"
            round
          />
        </template>
      </p-textarea>

      <p-textarea
        v-model="suffixValue"
        label="Textarea with Suffix"
        placeholder="Type your message..."
      >
        <template #suffix>
          <p-button
            icon="paper-plane-top"
            fa-style="solid"
            size="sm"
            variant="accent"
            round
            @click="sendMessage"
          />
        </template>
      </p-textarea>
    </component-example>

    <section-header
      title="Validation States"
      description="Show validation feedback with different states."
    />
    <component-example :code="validationExample">
      <p-textarea
        v-model="validValue"
        label="Valid Textarea"
        placeholder="This has valid content"
        state="normal"
        message="Looks good!"
      />
      <p-textarea
        v-model="errorValue"
        label="Error Textarea"
        placeholder="This has an error"
        state="errored"
        message="Please enter valid content"
      />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Textarea with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="formValues.disabled"
          v-bind="fields.disabled"
          label="Disabled"
        />
        <p-toggle
          v-model="formValues.required"
          v-bind="fields.required"
          label="Required"
        />
        <p-input
          v-model="formValues.placeholder"
          v-bind="fields.placeholder"
          label="Placeholder"
        />
        <p-input
          v-model="formValues.label"
          v-bind="fields.label"
          label="Label"
        />
        <p-input-number
          v-model="formValues.cols"
          v-bind="fields.cols"
          label="Cols"
        />
        <p-input-number
          v-model="formValues.maxlength"
          v-bind="fields.maxlength"
          label="Maxlength"
        />
      </p-form>
      <p-textarea
        v-model="value"
        v-bind="formOutput"
      />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types'

import { useValidation, useValidationFields } from '@/composables'

// Example values for different sections
const basicValue = ref('')
const maxlengthValue = ref('')
const dimensionsValue = ref('')
const disabledValue = ref('This textarea is disabled')
const requiredValue = ref('')
const prefixValue = ref('')
const suffixValue = ref('')
const validValue = ref('This is valid content')
const errorValue = ref('')

// Interactive example
const value = ref('')

// Example action handler
const sendMessage = () => {
  // eslint-disable-next-line no-console
  console.log('Sending message:', suffixValue.value)
  suffixValue.value = ''
}

const defaultValues = {
  label: 'Label',
  disabled: false,
  cols: '20',
  maxlength: '2000',
  required: false,
  placeholder: '',
}

const formValues = reactive({ ...defaultValues })

const formSchema = v.object({
  label: v.string(),
  disabled: v.boolean(),
  cols: v.pipe(stringToNumberSchema(), v.minValue(1)),
  maxlength: v.pipe(stringToNumberSchema(), v.minValue(1)),
  required: v.boolean(),
  placeholder: v.string(),
})

const { parse, validate } = useValidation(formSchema)
const fields = useValidationFields(formSchema)

const formOutput = reactive({
  ...parse(defaultValues),
})

watch(formValues, (values) => {
  if (validate(values)) {
    Object.assign(formOutput, parse(values))
  }
})

// Code examples
const basicExample = {
  code: `<p-textarea
  v-model="textValue"
  label="Basic Textarea"
  placeholder="Enter your text here..."
/>`,
  language: 'vue-html',
}

const maxlengthExample = {
  code: `<p-textarea
  v-model="textValue"
  label="Limited Textarea"
  placeholder="Maximum 100 characters"
  :maxlength="100"
/>`,
  language: 'vue-html',
}

const dimensionsExample = {
  code: `<p-textarea
  v-model="textValue"
  label="Custom Size Textarea"
  placeholder="This textarea has custom dimensions"
  :cols="50"
  :rows="6"
/>`,
  language: 'vue-html',
}

const statesExample = {
  code: `<p-textarea
  v-model="disabledValue"
  label="Disabled Textarea"
  placeholder="This textarea is disabled"
  disabled
/>

<p-textarea
  v-model="requiredValue"
  label="Required Textarea"
  placeholder="This field is required"
  required
/>`,
  language: 'vue-html',
}

const slotsExample = {
  code: `<p-textarea
  v-model="textValue"
  label="Textarea with Prefix"
  placeholder="Type your message..."
>
  <template #prefix>
    <p-button
      icon="user"
      fa-style="solid"
      size="sm"
      variant="accent"
      round
    />
  </template>
</p-textarea>

<p-textarea
  v-model="textValue"
  label="Textarea with Suffix"
  placeholder="Type your message..."
>
  <template #suffix>
    <p-button
      icon="paper-plane-top"
      fa-style="solid"
      size="sm"
      variant="accent"
      round
      @click="sendMessage"
    />
  </template>
</p-textarea>`,
  language: 'vue-html',
}

const validationExample = {
  code: `<p-textarea
  v-model="validValue"
  label="Valid Textarea"
  placeholder="This has valid content"
  state="normal"
  message="Looks good!"
/>

<p-textarea
  v-model="errorValue"
  label="Error Textarea"
  placeholder="This has an error"
  state="errored"
  message="Please enter valid content"
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-textarea
  v-model="textValue"
  :label="label"
  :placeholder="placeholder"
  :disabled="disabled"
  :required="required"
  :cols="cols"
  :maxlength="maxlength"
/>`,
  language: 'vue-html',
}
</script>
