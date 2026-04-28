<template>
  <component-demo-layout name="Input Number">
    <section-header
      title="Basic Usage"
      description="A number input component with built-in formatting and validation."
    />
    <component-example :code="basicExample">
      <p-input-number
        v-model="basicValue"
        label="Basic Number Input"
      />
    </component-example>

    <section-header
      title="Currency Formatting"
      description="Format numbers as currency with different display options."
    />
    <component-example :code="currencyExample">
      <p-input-number
        v-model="currencyValue"
        label="Currency Input"
        :format="{
          locales: 'en-US',
          options: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          },
        }"
      />
    </component-example>

    <section-header
      title="Percentage Formatting"
      description="Format numbers as percentages."
    />
    <component-example :code="percentageExample">
      <p-input-number
        v-model="percentageValue"
        label="Percentage Input"
        :format="{
          locales: 'en-US',
          options: {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        }"
      />
    </component-example>

    <section-header
      title="Unit Formatting"
      description="Format numbers with units like bytes, meters, etc."
    />
    <component-example :code="unitExample">
      <p-input-number
        v-model="unitValue"
        label="Unit Input"
        :format="{
          locales: 'en-US',
          options: {
            style: 'unit',
            unit: 'byte',
            unitDisplay: 'short',
          },
        }"
      />
    </component-example>

    <section-header
      title="Scientific Notation"
      description="Display numbers in scientific notation."
    />
    <component-example :code="scientificExample">
      <p-input-number
        v-model="scientificValue"
        label="Scientific Notation"
        :format="{
          locales: 'en-US',
          options: {
            notation: 'scientific',
          },
        }"
      />
    </component-example>

    <section-header
      title="Compact Notation"
      description="Display large numbers in compact format (e.g., 1.2K, 1.2M)."
    />
    <component-example :code="compactExample">
      <p-input-number
        v-model="compactValue"
        label="Compact Notation"
        :format="{
          locales: 'en-US',
          options: {
            notation: 'compact',
            compactDisplay: 'short',
          },
        }"
      />
    </component-example>

    <section-header
      title="Fraction Digits"
      description="Control the number of decimal places displayed."
    />
    <component-example :code="fractionExample">
      <p-input-number
        v-model="fractionValue"
        label="Fraction Digits"
        :format="{
          locales: 'en-US',
          options: {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          },
        }"
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Number input can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-input-number
        v-model="disabledValue"
        label="Disabled Input"
        disabled
      />
    </component-example>

    <section-header
      title="Simple Variant"
      description="A simplified input style with minimal borders."
    />
    <component-example :code="simpleExample">
      <p-input-number
        v-model="simpleValue"
        label="Simple Variant Number Input"
        variant="simple"
      />
      <p-input-number
        v-model="simpleFormattedValue"
        label="Simple Variant with Currency"
        variant="simple"
        :format="{
          locales: 'en-US',
          options: {
            style: 'currency',
            currency: 'USD',
          },
        }"
      />
    </component-example>

    <section-header
      title="Advanced Formatting"
      description="Comprehensive formatting options using Intl.NumberFormat."
    />
    <component-example :code="advancedExample">
      <p-form class="input-number-view__props">
        <p-input-number
          v-model="formValues.minimumSignificantDigits"
          :message="minimumSignificantDigitsMessage"
          :state="minimumSignificantDigitsState"
          label="Minimum Significant Digits"
        />

        <p-input-number
          v-model="formValues.maximumSignificantDigits"
          :message="maximumSignificantDigitsMessage"
          :state="maximumSignificantDigitsState"
          label="Maximum Significant Digits"
        />

        <p-input-number
          v-model="formValues.minimumFractionDigits"
          :message="minimumFractionDigitsMessage"
          :state="minimumFractionDigitsState"
          label="Minimum Fraction Digits"
        />

        <p-input-number
          v-model="formValues.maximumFractionDigits"
          :message="maximumFractionDigitsMessage"
          :state="maximumFractionDigitsState"
          label="Maximum Fraction Digits"
        />

        <p-input-number
          v-model="formValues.minimumIntegerDigits"
          :message="minimumIntegerDigitsMessage"
          :state="minimumIntegerDigitsState"
          label="Minimum Integer Digits"
        />

        <p-select
          v-model="formValues.currency"
          :message="currencyMessage"
          :state="currencyState"
          label="Currency"
          :options="[
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'CNY', value: 'CNY' },
          ]"
        />

        <p-select
          v-model="formValues.currencyDisplay"
          :message="currencyDisplayMessage"
          :state="currencyDisplayState"
          label="Currency Display"
          :options="[
            { label: 'code', value: 'code' },
            { label: 'symbol', value: 'symbol' },
            { label: 'narrowSymbol', value: 'narrowSymbol' },
            { label: 'name', value: 'name' },
          ]"
        />

        <p-select
          v-model="formValues.currencySign"
          :message="currencySignMessage"
          :state="currencySignState"
          label="Currency Sign"
          :options="[
            { label: 'standard', value: 'standard' },
            { label: 'accounting', value: 'accounting' },
          ]"
        />

        <p-select
          v-model="formValues.notation"
          :message="notationMessage"
          :state="notationState"
          label="Notation"
          :options="[
            { label: 'standard', value: 'standard' },
            { label: 'scientific', value: 'scientific' },
            { label: 'engineering', value: 'engineering' },
            { label: 'compact', value: 'compact' },
          ]"
        />

        <p-select
          v-if="formValues.notation.toString() === 'compact'"
          v-model="formValues.compactDisplay"
          :message="compactDisplayMessage"
          :state="compactDisplayState"
          label="Compact Display"
          :options="[
            { label: 'short', value: 'short' },
            { label: 'long', value: 'long' },
          ]"
        />

        <p-select
          v-model="formValues.style"
          :message="styleMessage"
          :state="styleState"
          label="Style"
          :options="[
            { label: 'decimal', value: 'decimal' },
            { label: 'currency', value: 'currency' },
            { label: 'percent', value: 'percent' },
            { label: 'unit', value: 'unit' },
          ]"
        />

        <p-select
          v-model="formValues.unit"
          :message="unitMessage"
          :state="unitState"
          label="Unit"
          :options="[
            { label: 'byte', value: 'byte' },
            { label: 'day', value: 'day' },
            { label: 'meter', value: 'meter' },
            { label: 'stone', value: 'stone' },
          ]"
        />

        <p-select
          v-model="formValues.unitDisplay"
          :message="unitDisplayMessage"
          :state="unitDisplayState"
          label="Unit Display"
          :options="[
            { label: 'short', value: 'short' },
            { label: 'narrow', value: 'narrow' },
            { label: 'long', value: 'long' },
          ]"
        />

        <p-select
          v-model="formValues.signDisplay"
          :message="signDisplayMessage"
          :state="signDisplayState"
          label="Sign Display"
          :options="[
            { label: 'auto', value: 'auto' },
            { label: 'always', value: 'always' },
            { label: 'exceptZero', value: 'exceptZero' },
            { label: 'never', value: 'never' },
          ]"
        />

        <div class="input-number-view__toggles">
          <p-toggle
            v-model="formValues.useGrouping"
            :message="useGroupingMessage"
            :state="useGroupingState"
            label="Use Grouping"
          />

          <p-toggle
            v-model="disabled"
            label="Disabled"
          />
        </div>

        <p-select
          v-model="variant"
          label="Variant"
          :options="variantOptions"
        />

        <p-banner
          class="input-number-view__format"
          message="Format Output"
        >
          <template #expansion>
            <p-link to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">
              MDN Documentation
            </p-link>
            <pre>{{ JSON.stringify(formOutput, null, 2) }}</pre>
          </template>
        </p-banner>
      </p-form>
      <p-input-number
        v-model="value"
        label="Advanced Number Input"
        :message="JSON.stringify(value)"
        v-bind="{ disabled, format, variant }"
      />
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types'

import { useValidation } from '@/composables/useValidation'
import { useValidationField } from '@/composables/useValidationField'
import { NumberFormattingOptions } from '@/utilities'
import { removeKeysWithEmptyValue } from '@/utilities/record'

// Example values
const basicValue = ref('0')
const currencyValue = ref('1234.56')
const percentageValue = ref('0.1234')
const unitValue = ref('1024')
const scientificValue = ref('123456789')
const compactValue = ref('1234567')
const fractionValue = ref('123.456789')
const disabledValue = ref('999')
const simpleValue = ref('42')
const simpleFormattedValue = ref('1234.56')

// Advanced example (existing functionality)
const value = ref('0')
const disabled = ref(false)
const variant = ref<'default' | 'simple'>('default')
const variantOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Simple', value: 'simple' },
]

const defaultValues = {
  compactDisplay: 'short',
  currency: undefined,
  currencyDisplay: 'symbol',
  currencySign: 'accounting',
  localeMatcher: 'best fit',
  minimumFractionDigits: undefined,
  maximumFractionDigits: undefined,
  minimumSignificantDigits: undefined,
  maximumSignificantDigits: undefined,
  minimumIntegerDigits: undefined,
  notation: 'standard',
  signDisplay: 'auto',
  style: 'decimal',
  unit: undefined,
  unitDisplay: 'short',
  useGrouping: true,
} as const

const formValues = reactive({ ...defaultValues })

const formSchema = v.pipe(
  v.object({
    compactDisplay: v.picklist(['short', 'long']),
    currency: v.optional(v.picklist(['USD', 'EUR', 'CNY'])),
    currencyDisplay: v.picklist(['code', 'symbol', 'narrowSymbol', 'name']),
    currencySign: v.picklist(['standard', 'accounting']),
    localeMatcher: v.literal('best fit'),
    minimumFractionDigits: v.nullish(v.pipe(stringToNumberSchema(), v.minValue(0), v.maxValue(100))),
    maximumFractionDigits: v.nullish(v.pipe(stringToNumberSchema(), v.minValue(0), v.maxValue(100))),
    minimumSignificantDigits: v.nullish(v.pipe(stringToNumberSchema(), v.minValue(1), v.maxValue(21))),
    maximumSignificantDigits: v.nullish(v.pipe(stringToNumberSchema(), v.minValue(1), v.maxValue(21))),
    minimumIntegerDigits: v.nullish(v.pipe(stringToNumberSchema(), v.minValue(1), v.maxValue(21))),
    notation: v.picklist(['standard', 'scientific', 'engineering', 'compact']),
    signDisplay: v.picklist(['auto', 'always', 'exceptZero', 'never']),
    style: v.picklist(['decimal', 'currency', 'percent', 'unit']),
    unit: v.optional(v.picklist(['byte', 'day', 'meter', 'stone'])),
    unitDisplay: v.picklist(['short', 'narrow', 'long']),
    useGrouping: v.boolean(),
  }),
  v.forward(
    v.check(({ currency, style }) => style !== 'currency' || !!currency, 'style currency requires currency code be set'),
    ['currency']
  ),
  v.forward(
    v.check(({ unit, style }) => style !== 'unit' || !!unit, 'style unit requires unit code be set'),
    ['unit']
  ),
  v.transform(removeKeysWithEmptyValue)
)

const { parse, validate } = useValidation(formSchema)
const { state: compactDisplayState, message: compactDisplayMessage } = useValidationField('compactDisplay')
const { state: currencyState, message: currencyMessage } = useValidationField('currency')
const { state: currencyDisplayState, message: currencyDisplayMessage } = useValidationField('currencyDisplay')
const { state: currencySignState, message: currencySignMessage } = useValidationField('currencySign')
const { state: minimumFractionDigitsState, message: minimumFractionDigitsMessage } = useValidationField('minimumFractionDigits')
const { state: maximumFractionDigitsState, message: maximumFractionDigitsMessage } = useValidationField('maximumFractionDigits')
const { state: minimumSignificantDigitsState, message: minimumSignificantDigitsMessage } = useValidationField('minimumSignificantDigits')
const { state: maximumSignificantDigitsState, message: maximumSignificantDigitsMessage } = useValidationField('maximumSignificantDigits')
const { state: minimumIntegerDigitsState, message: minimumIntegerDigitsMessage } = useValidationField('minimumIntegerDigits')
const { state: notationState, message: notationMessage } = useValidationField('notation')
const { state: signDisplayState, message: signDisplayMessage } = useValidationField('signDisplay')
const { state: styleState, message: styleMessage } = useValidationField('style')
const { state: unitState, message: unitMessage } = useValidationField('unit')
const { state: unitDisplayState, message: unitDisplayMessage } = useValidationField('unitDisplay')
const { state: useGroupingState, message: useGroupingMessage } = useValidationField('useGrouping')

const formOutput = ref(parse(formValues))
const format = computed(
  () =>
    ({
      locales: 'en-us',
      options: formOutput.value,
    }) satisfies NumberFormattingOptions
)

watch(formValues, (values) => {
  if (validate(values)) {
    formOutput.value = parse(values)
  }
})

// Code examples
const basicExample = {
  code: `<p-input-number
  v-model="value"
  label="Basic Number Input"
/>`,
  language: 'vue-html',
}

const currencyExample = {
  code: `<p-input-number
  v-model="value"
  label="Currency Input"
  :format="{
    locales: 'en-US',
    options: {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
    }
  }"
/>`,
  language: 'vue-html',
}

const percentageExample = {
  code: `<p-input-number
  v-model="value"
  label="Percentage Input"
  :format="{
    locales: 'en-US',
    options: {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  }"
/>`,
  language: 'vue-html',
}

const unitExample = {
  code: `<p-input-number
  v-model="value"
  label="Unit Input"
  :format="{
    locales: 'en-US',
    options: {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'short'
    }
  }"
/>`,
  language: 'vue-html',
}

const scientificExample = {
  code: `<p-input-number
  v-model="value"
  label="Scientific Notation"
  :format="{
    locales: 'en-US',
    options: {
      notation: 'scientific'
    }
  }"
/>`,
  language: 'vue-html',
}

const compactExample = {
  code: `<p-input-number
  v-model="value"
  label="Compact Notation"
  :format="{
    locales: 'en-US',
    options: {
      notation: 'compact',
      compactDisplay: 'short'
    }
  }"
/>`,
  language: 'vue-html',
}

const fractionExample = {
  code: `<p-input-number
  v-model="value"
  label="Fraction Digits"
  :format="{
    locales: 'en-US',
    options: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }
  }"
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-input-number
  v-model="value"
  label="Disabled Input"
  disabled
/>`,
  language: 'vue-html',
}

const simpleExample = {
  code: `<p-input-number
  v-model="value"
  label="Simple Variant Number Input"
  variant="simple"
/>

<p-input-number
  v-model="value"
  label="Simple Variant with Currency"
  variant="simple"
  :format="{
    locales: 'en-US',
    options: {
      style: 'currency',
      currency: 'USD'
    }
  }"
/>`,
  language: 'vue-html',
}

const advancedExample = {
  code: `<p-input-number
  v-model="value"
  label="Advanced Number Input"
  :format="format"
  :disabled="disabled"
  :variant="variant"
/>`,
  language: 'vue-html',
}
</script>

<style>
.input-number-view__props {
  width: 100%;
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.input-number-view__toggles {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-number-view__format {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-md);
}
</style>
