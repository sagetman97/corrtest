<template>
  <component-demo-layout name="Toast">
    <section-header
      title="Basic Toast"
      description="Simple toast notifications with title and message."
    />
    <component-example :code="basicExample">
      <p-button @click="createBasicToast">Show Basic Toast</p-button>
    </component-example>

    <section-header
      title="Toast with Icon"
      description="Toast notifications can include icons for better visual communication."
    />
    <component-example :code="iconExample">
      <p-button @click="createSuccessToast">Success Toast</p-button>
      <p-button @click="createErrorToast">Error Toast</p-button>
      <p-button @click="createWarningToast">Warning Toast</p-button>
    </component-example>

    <section-header
      title="Custom Duration"
      description="Control how long the toast is displayed before auto-dismissing."
    />
    <component-example :code="durationExample">
      <p-button @click="createShortToast">Short Duration (2s)</p-button>
      <p-button @click="createLongToast">Long Duration (10s)</p-button>
      <p-button @click="createPersistentToast">Persistent (No auto-dismiss)</p-button>
    </component-example>

    <section-header
      title="Dismissible Control"
      description="Control whether users can manually dismiss the toast."
    />
    <component-example :code="dismissibleExample">
      <p-button @click="createDismissibleToast">Dismissible Toast</p-button>
      <p-button @click="createNonDismissibleToast">Non-Dismissible Toast</p-button>
    </component-example>

    <section-header
      title="Custom Component Toast"
      description="Use custom Vue components as toast content."
    />
    <component-example :code="customExample">
      <p-button @click="createCustomToast">Custom Component Toast</p-button>
      <p-button @click="createAsyncToast">Async Loading Toast</p-button>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Toast with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-input
        v-model="formValues.title"
        v-bind="fields.title"
        label="Title"
        label-position="left"
      />
      <p-input
        v-model="formValues.message"
        v-bind="fields.message"
        label="Message"
        label-position="left"
      />
      <p-input
        v-model="formValues.icon"
        v-bind="fields.icon"
        label="Icon"
        label-position="left"
      />
      <p-input-number
        v-model="formValues.duration"
        v-bind="fields.duration"
        label="Duration"
        label-position="left"
        suffix="ms"
      />
      <p-toggle
        v-model="formValues.dismissible"
        v-bind="fields.dismissible"
        label="Dismissible"
        label-position="left"
      />
      <p-button @click="createToast">Create Toast</p-button>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import * as v from 'valibot'

import { IconProps } from '@/types'
import { stringToNumberSchema } from '@/types/validation'

import { useToast, useValidation, useValidationFields } from '@/composables'
import DemoLoadingToast from '../components/DemoLoadingToast.vue'
import DemoToast from '../components/DemoToast.vue'

const { notify } = useToast()

const defaultValues = {
  title: 'Toast Title',
  message: 'Toast Message',
  icon: 'gear',
  duration: '0',
  dismissible: true,
}
const formValues = reactive({ ...defaultValues })
const formSchema = v.object({
  title: v.string(),
  message: v.string(),
  icon: v.string(),
  duration: stringToNumberSchema(),
  dismissible: v.boolean(),
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

const iconProps = computed<Partial<IconProps> | undefined>(() => {
  if (!formOutput.icon) {
    return undefined
  }

  return {
    icon: formOutput.icon,
    family: 'duotone',
    faStyle: 'solid',
  }
})

const createToast = () => {
  notify({
    ...formOutput,
    ...iconProps.value,
  })
}

const createAsyncToast = () => {
  let dismiss = notify({
    message: DemoLoadingToast,
  })

  setTimeout(() => dismiss(), 5000)
}

const createCustomToast = () => {
  const { duration } = formOutput

  notify({
    message: DemoToast,
    duration,
  })
}

// Simple toast functions for examples
const createBasicToast = () => {
  notify({
    title: 'Basic Toast',
    message: 'This is a simple toast notification.',
  })
}

const createSuccessToast = () => {
  notify({
    title: 'Success!',
    message: 'Operation completed successfully.',
    icon: 'check-circle',
    family: 'duotone',
    faStyle: 'solid',
  })
}

const createErrorToast = () => {
  notify({
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    icon: 'exclamation-triangle',
    family: 'duotone',
    faStyle: 'solid',
  })
}

const createWarningToast = () => {
  notify({
    title: 'Warning',
    message: 'Please review your input before proceeding.',
    icon: 'exclamation-circle',
    family: 'duotone',
    faStyle: 'solid',
  })
}

const createShortToast = () => {
  notify({
    title: 'Short Duration',
    message: 'This toast will disappear in 2 seconds.',
    duration: 2000,
  })
}

const createLongToast = () => {
  notify({
    title: 'Long Duration',
    message: 'This toast will stay for 10 seconds.',
    duration: 10000,
  })
}

const createPersistentToast = () => {
  notify({
    title: 'Persistent Toast',
    message: 'This toast will not auto-dismiss.',
    duration: 0,
  })
}

const createDismissibleToast = () => {
  notify({
    title: 'Dismissible',
    message: 'You can close this toast manually.',
    dismissible: true,
  })
}

const createNonDismissibleToast = () => {
  notify({
    title: 'Non-Dismissible',
    message: 'This toast cannot be manually closed.',
    dismissible: false,
    duration: 3000,
  })
}

// Code examples
const basicExample = {
  code: `const { notify } = useToast()

notify({
  title: 'Basic Toast',
  message: 'This is a simple toast notification.'
})`,
  language: 'typescript',
}

const iconExample = {
  code: `notify({
  title: 'Success!',
  message: 'Operation completed successfully.',
  icon: 'check-circle',
  faStyle: 'duotone'
})`,
  language: 'typescript',
}

const durationExample = {
  code: `notify({
  title: 'Custom Duration',
  message: 'This toast has a custom duration.',
  duration: 5000 // 5 seconds
})`,
  language: 'typescript',
}

const dismissibleExample = {
  code: `notify({
  title: 'Dismissible Toast',
  message: 'You can close this manually.',
  dismissible: true
})`,
  language: 'typescript',
}

const customExample = {
  code: `notify({
  message: CustomComponent,
  duration: 0
})`,
  language: 'typescript',
}

const interactiveExample = {
  code: `notify({
  title: formOutput.title,
  message: formOutput.message,
  icon: formOutput.icon,
  duration: formOutput.duration,
  dismissible: formOutput.dismissible
})`,
  language: 'typescript',
}
</script>
