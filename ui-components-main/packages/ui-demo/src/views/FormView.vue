<template>
  <component-demo-layout
    name="Polly Form Components"
    default-title=""
  >
    <section-header
      title="Basic Form"
      description="A simple form with basic input fields and validation."
    />
    <component-example :code="basicFormExample">
      <p-form @submit="handleBasicSubmit">
        <p-input
          v-model="basicForm.name"
          label="Name"
          required
        />
        <p-input
          v-model="basicForm.email"
          label="Email"
          type="email"
          required
        />
        <p-button type="submit">Submit</p-button>
      </p-form>
    </component-example>

    <section-header
      title="Label Positioning"
      description="Control where labels appear relative to form fields."
    />
    <component-example :code="labelPositionExample">
      <p-form>
        <p-input
          v-model="positionForm.leftLabel"
          label="Left Label"
          label-position="left"
        />
        <p-input
          v-model="positionForm.topLabel"
          label="Top Label"
          label-position="top"
        />
        <p-input
          v-model="positionForm.rightLabel"
          label="Right Label"
          label-position="right"
        />
      </p-form>
    </component-example>

    <section-header
      title="Form Field Types"
      description="Different types of form inputs and controls."
    />
    <component-example :code="fieldTypesExample">
      <p-form>
        <p-toggle
          v-model="fieldTypes.toggle"
          label="Toggle Field"
        />
        <p-checkbox
          v-model="fieldTypes.checkbox"
          label="Checkbox Field"
        />
        <p-select
          v-model="fieldTypes.select"
          label="Select Field"
          :options="[
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
          ]"
        />
        <p-input-currency
          v-model="fieldTypes.currency"
          label="Currency Field"
        />
      </p-form>
    </component-example>

    <section-header
      title="Simple Variant Form"
      description="A form using the simple variant for a more compact, minimal appearance."
    />
    <component-example :code="simpleFormExample">
      <p-form class="form-view__simple-form">
        <p-input
          v-model="simpleForm.name"
          label="Name"
          variant="simple"
          placeholder="Enter your name"
        />
        <p-input
          v-model="simpleForm.email"
          label="Email"
          variant="simple"
          placeholder="Enter your email"
        />
        <p-input-number
          v-model="simpleForm.age"
          label="Age"
          variant="simple"
        />
        <p-input-currency
          v-model="simpleForm.salary"
          label="Salary"
          variant="simple"
        />
        <p-select
          v-model="simpleForm.department"
          label="Department"
          variant="simple"
          multiple
          :options="[
            { label: 'Engineering', value: 'eng' },
            { label: 'Design', value: 'design' },
            { label: 'Product', value: 'product' },
            { label: 'Marketing', value: 'marketing' },
          ]"
        />
        <p-select
          v-model="simpleForm.location"
          label="Location"
          variant="simple"
          :options="[
            { label: 'New York', value: 'ny' },
            { label: 'San Francisco', value: 'sf' },
            { label: 'London', value: 'ldn' },
            { label: 'Tokyo', value: 'tyo' },
          ]"
        />
        <p-input
          v-model="simpleForm.phone"
          label="Phone"
          variant="simple"
          placeholder="(555) 123-4567"
        />
        <p-input
          v-model="simpleForm.title"
          label="Job Title"
          variant="simple"
          placeholder="Enter job title"
        />
        <p-button
          type="submit"
          class="form-view__simple-form-submit"
        >
          Submit
        </p-button>
      </p-form>
    </component-example>

    <section-header
      title="Form Validation"
      description="Real-time validation with error messages and states."
    />
    <component-example :code="validationExample">
      <p-form @submit="handleValidationSubmit">
        <p-input
          v-model="validationForm.name"
          label="Name (Required)"
          :state="nameValidation.state"
          :message="nameValidation.message"
          required
        />
        <p-input
          v-model="validationForm.email"
          label="Email (Required)"
          type="email"
          :state="emailValidation.state"
          :message="emailValidation.message"
          required
        />
        <p-button
          type="submit"
          :disabled="!isValidationFormValid"
        >
          Submit
        </p-button>
      </p-form>
    </component-example>

    <section-header
      title="Silent Validation"
      description="Validation that doesn't show errors until form submission."
    />
    <component-example :code="silentValidationExample">
      <p-form @submit="handleSilentSubmit">
        <p-input
          v-model="silentForm.name"
          label="Name"
          :state="showSilentErrors ? silentNameState : 'normal'"
          :message="showSilentErrors ? silentNameMessage : ''"
          required
        />
        <p-button type="submit">Submit (Silent Validation)</p-button>
      </p-form>
    </component-example>

    <section-header
      title="AI Highlight"
      description="Highlight form fields with AI assistance."
    />
    <component-example :code="aiHighlightExample">
      <p-form>
        <p-toggle
          v-model="enableAIHighlight"
          label="Enable AI Highlight"
        />
        <p-input
          v-model="aiForm.field1"
          label="AI Highlighted Field"
          :highlighted="enableAIHighlight"
        />
        <p-input
          v-model="aiForm.field2"
          label="Normal Field"
        />
      </p-form>
    </component-example>

    <section-header
      title="Comprehensive Form Example"
      description="A complete form with all features and validation."
    />
    <component-example :code="comprehensiveExample">
      <p-form>
        <p-select
          v-model="labelPosition"
          label="Label Position"
          :options="labelPositions"
        />

        <p-toggle
          v-model="silent"
          label="Silent Validation"
        />

        <p-toggle
          v-model="asyncTimeout"
          label="Simulate Async Validation"
        />
        <p-toggle
          v-model="AIhighlight"
          label="AI Highlight"
        />
      </p-form>
      <p-form
        class="form-view__form"
        @submit="submit"
      >
        <p-toggle
          v-model="current"
          v-bind="{ labelPosition, ...fields.current }"
          label="Currently Employed"
          required
        />

        <p-checkbox
          v-model="current"
          v-bind="{ labelPosition, ...fields.current }"
          label="Currently Employed"
          required
        />

        <p-input
          v-model="name"
          v-bind="{ labelPosition, ...fields.name }"
          label="Employee Name"
          required
        />

        <p-input-currency
          v-model="salary"
          v-bind="{ labelPosition, ...fields.salary }"
          label="Salary"
          required
        />

        <p-select
          v-model="dept"
          v-bind="{ labelPosition, ...fields.dept }"
          :options="deptOptions"
          label="Department"
          required
        />

        <div class="form-view__form-actions">
          <p-button
            outline
            @click="reset"
          >
            Clear
          </p-button>
          <p-button
            :disabled="pending"
            type="submit"
          >
            Submit
          </p-button>

          <template v-if="pending">
            <p-button @click="cancelValidation">Cancel</p-button>
          </template>
        </div>

        <code>
          <span class="form-view__label">[Validation State]</span>
          <pre class="form-view__code">{{ JSON.stringify({ isValid: isValid?.toString() ?? 'undefined', issues, pending }, null, 2) }}</pre>
          <span class="form-view__label">[Current Values]</span>
          <pre class="form-view__code">{{ JSON.stringify(values, null, 2) }}</pre>
          <span class="form-view__label">[Previously Submitted Values]</span>
          <pre class="form-view__code">{{ JSON.stringify(submitted ?? 'undefined', null, 2) }}</pre>
          <span class="form-view__label">[AI Highlight State]</span>
          <pre class="form-view__code">{{ JSON.stringify({ aiHighlighted: aiHighlighted, AIhighlight: AIhighlight }, null, 2) }}</pre>
        </code>
      </p-form>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, toRef, watch } from 'vue'

import * as v from 'valibot'

import type { ValidationState } from '@/types'
import { LabelPosition, minMaxDecimalCount, SelectOption, stringToNumberSchema } from '@/types'

import { useValidation, useValidationFields } from '@/composables'

// Example form data for different sections
const basicForm = reactive({
  name: '',
  email: '',
})

const positionForm = reactive({
  leftLabel: '',
  topLabel: '',
  rightLabel: '',
})

const fieldTypes = reactive({
  toggle: false,
  checkbox: false,
  select: '',
  currency: '',
})

const simpleForm = reactive({
  name: '',
  email: '',
  age: '',
  salary: '',
  department: [] as string[],
  location: '',
  phone: '',
  title: '',
})

const validationForm = reactive({
  name: '',
  email: '',
})

const silentForm = reactive({
  name: '',
})

const aiForm = reactive({
  field1: '',
  field2: '',
})

// Example form handlers
const handleBasicSubmit = (event: Event) => {
  event.preventDefault()
}

const handleValidationSubmit = (event: Event) => {
  event.preventDefault()
}

const handleSilentSubmit = (event: Event) => {
  event.preventDefault()
  showSilentErrors.value = true
}

// Simple validation states for examples
const nameValidation = computed<{ state: ValidationState; message: string }>(() => {
  if (!validationForm.name) {
    return { state: 'errored', message: 'Name is required' }
  }
  return { state: 'normal', message: '' }
})

const emailValidation = computed<{ state: ValidationState; message: string }>(() => {
  if (!validationForm.email) {
    return { state: 'errored', message: 'Email is required' }
  }
  if (!validationForm.email.includes('@')) {
    return { state: 'errored', message: 'Please enter a valid email' }
  }
  return { state: 'normal', message: '' }
})

const isValidationFormValid = computed(() => {
  return nameValidation.value.state === 'normal' && emailValidation.value.state === 'normal'
})

const showSilentErrors = ref(false)
const silentNameState = computed(() => {
  return silentForm.name ? 'normal' : 'errored'
})
const silentNameMessage = computed(() => {
  return silentForm.name ? '' : 'Name is required'
})

const enableAIHighlight = ref(false)

// Original comprehensive form logic
const aiHighlighted = ref(false)

const AIhighlight = ref(false)

watch(AIhighlight, (newValue) => {
  aiHighlighted.value = newValue
})

provide('aiHighlighted', aiHighlighted)
provide('clearAiHighlight', () => {
  aiHighlighted.value = false
})

const props = reactive<{
  labelPosition?: LabelPosition
}>({
  labelPosition: undefined,
})

const silent = ref(false)
const asyncTimeout = ref(false)

const labelPosition = toRef(props, 'labelPosition')
const labelPositions: SelectOption<LabelPosition | undefined>[] = [
  { label: 'unset', value: undefined },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'top', value: 'top' },
]

type ExampleDept = 'engineering' | 'product' | 'marketing'
type ExampleData = {
  name: string
  salary: number
  current?: boolean
  dept: ExampleDept
}

const values = reactive<
  Partial<{
    name: string
    salary: string
    current?: boolean
    dept: ExampleDept
  }>
>({})
const submitted = ref<ExampleData | undefined>()
const deptOptions: SelectOption<ExampleDept>[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
]

const name = toRef(values, 'name')
const salary = toRef(values, 'salary')
const current = toRef(values, 'current')
const dept = toRef(values, 'dept')

function cancelValidation(): void {
  abort()
}

function myCustomValidator(value: unknown): Promise<boolean> {
  return new Promise((resolve) => {
    // simulate API call, can also pass signal into axios/fetch
    setTimeout(() => resolve(value === 'Evan Sutherland'), asyncTimeout.value ? 2500 : 0)
  })
}

const ExampleDataSchema = v.objectAsync({
  name: v.pipeAsync(v.string('Name is required!'), v.minLength(4), v.customAsync(myCustomValidator, 'Name must be "Evan Sutherland"')),
  salary: v.pipe(
    stringToNumberSchema('Invalid number format'),
    minMaxDecimalCount({ max: 2 }, 'Allows decimals ≤ 2 places'),
    v.minValue(100, 'This value is too low, should be ≥ 100'),
    v.maxValue(1_000_000, 'This value is too high, should be ≤ 1,000,000')
  ),
  current: v.boolean('Value is required!'),
  dept: v.picklist(
    deptOptions.map((option) => option.value),
    'Department is required!'
  ),
})

const { validate, parse, clear, abort, isValid, issues, pending } = useValidation(ExampleDataSchema)
const fields = useValidationFields(ExampleDataSchema)

function reset(): void {
  clear()

  name.value = undefined
  salary.value = undefined
  current.value = undefined
  dept.value = undefined
}

async function submit(): Promise<void> {
  const isValid = await validate(values, { silent: silent.value })

  if (isValid) {
    submitted.value = await parse(values)

    reset()
  }
}

// Code examples
const basicFormExample = {
  code: `<p-form @submit="handleSubmit">
  <p-input
    v-model="form.name"
    label="Name"
    required
  />
  <p-input
    v-model="form.email"
    label="Email"
    type="email"
    required
  />
  <p-button type="submit">Submit</p-button>
</p-form>`,
  language: 'vue-html',
}

const labelPositionExample = {
  code: `<p-form>
  <p-input
    v-model="value"
    label="Left Label"
    label-position="left"
  />
  <p-input
    v-model="value"
    label="Top Label"
    label-position="top"
  />
  <p-input
    v-model="value"
    label="Right Label"
    label-position="right"
  />
</p-form>`,
  language: 'vue-html',
}

const fieldTypesExample = {
  code: `<p-form>
  <p-toggle
    v-model="form.toggle"
    label="Toggle Field"
  />
  <p-checkbox
    v-model="form.checkbox"
    label="Checkbox Field"
  />
  <p-select
    v-model="form.select"
    label="Select Field"
    :options="options"
  />
  <p-input-currency
    v-model="form.currency"
    label="Currency Field"
  />
</p-form>`,
  language: 'vue-html',
}

const simpleFormExample = [
  {
    code: `<p-form class="two-column-form">
  <p-input
    v-model="form.name"
    label="Name"
    variant="simple"
    placeholder="Enter your name"
  />
  <p-input
    v-model="form.email"
    label="Email"
    variant="simple"
    placeholder="Enter your email"
  />
  <p-input-number
    v-model="form.age"
    label="Age"
    variant="simple"
  />
  <p-input-currency
    v-model="form.salary"
    label="Salary"
    variant="simple"
  />
  <p-select
    v-model="form.department"
    label="Department"
    variant="simple"
    multiple
    :options="departmentOptions"
  />
  <p-select
    v-model="form.location"
    label="Location"
    variant="simple"
    :options="locationOptions"
  />
  <p-input
    v-model="form.phone"
    label="Phone"
    variant="simple"
    placeholder="(555) 123-4567"
  />
  <p-input
    v-model="form.title"
    label="Job Title"
    variant="simple"
    placeholder="Enter job title"
  />
  <p-button type="submit">Submit</p-button>
</p-form>`,
    language: 'vue-html',
  },
  {
    code: `.two-column-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.two-column-form > p-button {
  grid-column: 1 / -1;
}`,
    language: 'css',
  },
]

const validationExample = {
  code: `<p-form @submit="handleSubmit">
  <p-input
    v-model="form.name"
    label="Name (Required)"
    :state="nameValidation.state"
    :message="nameValidation.message"
    required
  />
  <p-input
    v-model="form.email"
    label="Email (Required)"
    type="email"
    :state="emailValidation.state"
    :message="emailValidation.message"
    required
  />
  <p-button
    type="submit"
    :disabled="!isFormValid"
  >
    Submit
  </p-button>
</p-form>`,
  language: 'vue-html',
}

const silentValidationExample = {
  code: `<p-form @submit="handleSubmit">
  <p-input
    v-model="form.name"
    label="Name"
    :state="showErrors ? validationState : 'normal'"
    :message="showErrors ? validationMessage : ''"
    required
  />
  <p-button type="submit">Submit (Silent Validation)</p-button>
</p-form>`,
  language: 'vue-html',
}

const aiHighlightExample = {
  code: `<p-form>
  <p-toggle
    v-model="enableAI"
    label="Enable AI Highlight"
  />
  <p-input
    v-model="form.field"
    label="AI Highlighted Field"
    :highlighted="enableAI"
  />
</p-form>`,
  language: 'vue-html',
}

const comprehensiveExample = {
  code: `<p-form @submit="handleSubmit">
  <p-toggle
    v-model="form.current"
    label="Currently Employed"
    :label-position="labelPosition"
    :state="fields.current.state"
    :message="fields.current.message"
    required
  />

  <p-input
    v-model="form.name"
    label="Employee Name"
    :label-position="labelPosition"
    :state="fields.name.state"
    :message="fields.name.message"
    required
  />

  <p-input-currency
    v-model="form.salary"
    label="Salary"
    :label-position="labelPosition"
    :state="fields.salary.state"
    :message="fields.salary.message"
    required
  />

  <p-select
    v-model="form.dept"
    label="Department"
    :options="deptOptions"
    :label-position="labelPosition"
    :state="fields.dept.state"
    :message="fields.dept.message"
    required
  />

  <div class="form-actions">
    <p-button outline @click="reset">Clear</p-button>
    <p-button type="submit" :disabled="pending">Submit</p-button>
  </div>
</p-form>`,
  language: 'vue-html',
}
</script>

<style>
.form-view__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-view__form-actions {
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.form-view__code {
  font-size: var(--font-size-sm);
  font-family: monospace;
}

.form-view__label {
  font-size: var(--font-size-sm);
  color: var(--colors-neutral-dark);
}

.form-view__simple-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.form-view__simple-form-submit {
  grid-column: 1 / -1;
}
</style>
