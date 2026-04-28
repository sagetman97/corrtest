<template>
  <component-demo-layout name="Overflow">
    <section-header
      title="Basic Usage"
      description="A component that handles overflow by showing a count of hidden items."
    />
    <component-example :code="basicExample">
      <p-overflow>
        <p-badge class="overflow-view__demo-item">1</p-badge>
        <p-badge class="overflow-view__demo-item">2</p-badge>
        <p-badge class="overflow-view__demo-item">3</p-badge>
        <p-badge class="overflow-view__demo-item">4</p-badge>
        <p-badge class="overflow-view__demo-item">5</p-badge>
        <p-badge class="overflow-view__demo-item">6</p-badge>
        <p-badge class="overflow-view__demo-item">7</p-badge>
        <p-badge class="overflow-view__demo-item">8</p-badge>
        <p-badge class="overflow-view__demo-item">9</p-badge>
        <p-badge class="overflow-view__demo-item">10</p-badge>
      </p-overflow>
    </component-example>

    <section-header
      title="Custom Overflow Slot"
      description="Customize how the overflow count is displayed."
    />
    <component-example :code="customOverflowExample">
      <p-overflow>
        <p-badge class="overflow-view__demo-item">Item 1</p-badge>
        <p-badge class="overflow-view__demo-item">Item 2</p-badge>
        <p-badge class="overflow-view__demo-item">Item 3</p-badge>
        <p-badge class="overflow-view__demo-item">Item 4</p-badge>
        <p-badge class="overflow-view__demo-item">Item 5</p-badge>
        <p-badge class="overflow-view__demo-item">Item 6</p-badge>
        <p-badge class="overflow-view__demo-item">Item 7</p-badge>
        <p-badge class="overflow-view__demo-item">Item 8</p-badge>

        <template #overflow="{ count }">
          <p-badge variant="highlight">{{ count }} more items</p-badge>
        </template>
      </p-overflow>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Overflow component with configurable number of items."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-input-number
          v-model="formValues.itemCount"
          v-bind="fields.itemCount"
          label="Number of items"
        />
      </p-form>
      <p-overflow>
        <template
          v-for="index in formOutput.itemCount"
          :key="index"
        >
          <p-badge class="overflow-view__demo-item">
            {{ index }}
          </p-badge>
        </template>

        <template #overflow="{ count }">
          <p-badge>+{{ count }}</p-badge>
        </template>
      </p-overflow>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types/validation'

import { useValidation, useValidationFields } from '@/composables'

const defaultValues = {
  itemCount: '16',
}

const formValues = reactive({ ...defaultValues })

const formSchema = v.object({
  itemCount: stringToNumberSchema(),
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
  code: `<p-overflow>
  <p-badge>1</p-badge>
  <p-badge>2</p-badge>
  <p-badge>3</p-badge>
  <p-badge>4</p-badge>
  <p-badge>5</p-badge>
  <!-- More items that will overflow -->
</p-overflow>`,
  language: 'vue-html',
}

const customOverflowExample = {
  code: `<p-overflow>
  <p-badge>Item 1</p-badge>
  <p-badge>Item 2</p-badge>
  <!-- More items -->

  <template #overflow="{ count }">
    <p-badge variant="accent">{{ count }} more items</p-badge>
  </template>
</p-overflow>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-overflow>
  <template v-for="index in itemCount" :key="index">
    <p-badge>{{ index }}</p-badge>
  </template>

  <template #overflow="{ count }">
    <p-badge>+{{ count }}</p-badge>
  </template>
</p-overflow>`,
  language: 'vue-html',
}
</script>

<style>
.overflow-view__demo-item {
  flex-shrink: 0;
}
</style>
