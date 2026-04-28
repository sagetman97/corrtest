<template>
  <component-demo-layout name="Pagination">
    <section-header
      title="Basic Usage"
      description="A simple pagination component for navigating through pages."
    />
    <component-example :code="basicExample">
      <p-pagination
        v-model:page="basicPage"
        :total-pages="10"
      />
      <p>Current page: {{ basicPage }}</p>
    </component-example>

    <section-header
      title="Custom Start Page"
      description="Set a custom starting page number."
    />
    <component-example :code="startPageExample">
      <p-pagination
        v-model:page="startPage"
        :start="5"
        :total-pages="15"
      />
      <p>Current page: {{ startPage }}</p>
    </component-example>

    <section-header
      title="Limited Pages Shown"
      description="Control how many page numbers are displayed."
    />
    <component-example :code="pagesShownExample">
      <p-pagination
        v-model:page="limitedPage"
        :total-pages="50"
        :pages-shown="5"
      />
      <p>Current page: {{ limitedPage }}</p>
    </component-example>

    <section-header
      title="Auto Pages Shown"
      description="Let the component automatically determine how many pages to show."
    />
    <component-example :code="autoExample">
      <p-pagination
        v-model:page="autoPage"
        :total-pages="100"
      />
      <p>Current page: {{ autoPage }}</p>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Pagination with configurable properties and validation."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-input-number
          v-model="page"
          label="Current Page"
          :min="0"
        />

        <p-input-number
          v-model="formValues.start"
          :message="fields.start.message ?? 'default is 1'"
          :state="fields.start.state"
          label="Start Page"
        />

        <fieldset class="pagination-view__pages-shown-group">
          <p-input-number
            v-model="formValues.pagesShown"
            :message="fields.pagesShown.message ?? 'default is auto'"
            :state="fields.pagesShown.state"
            label="Pages Shown"
          />

          <p-toggle
            label="Use Auto"
            label-position="top"
            :model-value="formOutput.pagesShown === null"
            @update:model-value="useAutoChanged"
          />
        </fieldset>

        <p-input-number
          v-model="formValues.totalPages"
          v-bind="fields.totalPages"
          label="Total Pages"
        />
      </p-form>
      <p-pagination
        v-model:page="pageValue"
        v-bind="formOutput"
      />
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types/validation'

import { useRouteQueryParam, useValidation, useValidationFields } from '@/composables'

// Example page values
const basicPage = ref(1)
const startPage = ref(5)
const limitedPage = ref(1)
const autoPage = ref(1)

// Interactive example (existing functionality)
const page = useRouteQueryParam('page', '1')
const pageValue = computed({
  get() {
    return parseInt(page.value)
  },
  set(value) {
    page.value = value.toString()
  },
})

const defaultValues: {
  start: string
  pagesShown?: string
  totalPages: string
} = {
  start: '1',
  pagesShown: undefined,
  totalPages: '20',
}
const formValues = reactive({ ...defaultValues })

const formSchema = v.pipe(
  v.object({
    start: stringToNumberSchema(),
    pagesShown: v.optional(stringToNumberSchema()),
    totalPages: v.pipe(stringToNumberSchema(), v.minValue(1)),
  }),
  v.forward(
    v.check(({ start }) => start <= pageValue.value, 'start value should be less than or equal to current page'),
    ['start']
  )
)

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

function useAutoChanged(value: boolean | undefined): void {
  if (value) {
    formValues.pagesShown = undefined
  } else {
    formValues.pagesShown = (formOutput.totalPages / 2).toString()
  }
}

// Code examples
const basicExample = {
  code: `<p-pagination
  v-model:page="currentPage"
  :total-pages="10"
/>`,
  language: 'vue-html',
}

const startPageExample = {
  code: `<p-pagination
  v-model:page="currentPage"
  :start="5"
  :total-pages="15"
/>`,
  language: 'vue-html',
}

const pagesShownExample = {
  code: `<p-pagination
  v-model:page="currentPage"
  :total-pages="50"
  :pages-shown="5"
/>`,
  language: 'vue-html',
}

const autoExample = {
  code: `<p-pagination
  v-model:page="currentPage"
  :total-pages="100"
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-pagination
  v-model:page="pageValue"
  :start="formOutput.start"
  :pages-shown="formOutput.pagesShown"
  :total-pages="formOutput.totalPages"
/>`,
  language: 'vue-html',
}
</script>

<style>
.pagination-view__pages-shown-group {
  display: flex;
  gap: var(--spacing-sm);
}
</style>
