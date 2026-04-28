<template>
  <component-demo-layout name="Select">
    <section-header
      title="Basic Usage"
      description="A simple select component with options."
    />
    <component-example :code="basicExample">
      <p-select
        v-model="basicValue"
        label="Choose an option"
        :options="basicOptions"
      />
      <p>Selected: {{ JSON.stringify(basicValue) }}</p>
    </component-example>

    <section-header
      title="Multiple Selection"
      description="Allow users to select multiple options."
    />
    <component-example :code="multipleExample">
      <p-select
        v-model="multipleValue"
        label="Choose multiple options"
        :options="basicOptions"
        multiple
      />
      <p>Selected: {{ JSON.stringify(multipleValue) }}</p>
    </component-example>

    <section-header
      title="Sizes"
      description="Different sizes for the select component."
    />
    <component-example :code="sizesExample">
      <p-select
        v-model="sizeSmallValue"
        label="Small Select"
        :options="basicOptions"
        size="small"
      />
      <p-select
        v-model="sizeDefaultValue"
        label="Default Select"
        :options="basicOptions"
      />
    </component-example>

    <section-header
      title="Variants"
      description="Different visual styles for the select component."
    />
    <component-example :code="variantsExample">
      <p-select
        v-model="variantDefaultValue"
        label="Default Variant"
        :options="basicOptions"
      />
      <p-select
        v-model="variantSimpleValue"
        label="Simple Variant"
        :options="basicOptions"
        variant="simple"
      />
      <p-select
        v-model="variantMinimalValue"
        label="Minimal Variant"
        :options="basicOptions"
        variant="minimal"
      />
      <p-select
        v-model="variantMinimalValue"
        label="Minimal Dark Variant"
        :options="basicOptions"
        variant="minimal"
        dark
      />
      <p-select
        v-model="variantMinimalAccentValue"
        label="Minimal Accent"
        :options="basicOptions"
        variant="minimal"
        accent
      />
    </component-example>

    <section-header
      title="With Filtering"
      description="Enable search/filter functionality within options."
    />
    <component-example :code="filterExample">
      <p-select
        v-model="filterValue"
        label="Filterable Select"
        :options="manyOptionsData"
        filter
        placeholder="Search options..."
      />
      <p>Selected: {{ JSON.stringify(filterValue) }}</p>
    </component-example>

    <section-header
      title="Grouped Options"
      description="Organize options into groups."
    />
    <component-example :code="groupedExample">
      <p-select
        v-model="groupedValue"
        label="Grouped Select"
        :options="groupedOptionsData"
      />
      <p>Selected: {{ JSON.stringify(groupedValue) }}</p>
    </component-example>

    <section-header
      title="Grouped Options with Disabled Options"
      description="Disabling entire groups, leaves the header option enabled"
    />
    <component-example :code="groupedWithDisabledExample">
      <p-select
        v-model="groupedWithDisabledValue"
        label="Grouped Select with Disabled"
        :options="groupedOptionsWithDisabledData"
      />
    </component-example>

    <section-header
      title="With Sub-labels"
      description="Show additional information for each option."
    />
    <component-example :code="subLabelsExample">
      <p-select
        v-model="subLabelValue"
        label="Select with Sub-labels"
        :options="subLabelOptionsData"
      />
      <p>Selected: {{ JSON.stringify(subLabelValue) }}</p>
    </component-example>

    <section-header
      title="States"
      description="Different states like disabled, and error."
    />
    <component-example :code="statesExample">
      <p-select
        v-model="disabledValue"
        label="Disabled Select"
        :options="basicOptions"
        disabled
      />
      <p-select
        v-model="errorValue"
        label="Error State Select"
        :options="basicOptions"
        state="errored"
        message="Please select a valid option"
      />
    </component-example>

    <section-header
      title="With Apply Button"
      description="Show an apply button for confirming selections."
    />
    <component-example :code="applyButtonExample">
      <p-select
        v-model="applyValue"
        label="Select with Apply Button"
        :options="basicOptions"
        show-apply
        multiple
      />
      <p>Selected: {{ JSON.stringify(applyValue) }}</p>
    </component-example>

    <section-header
      title="Custom Empty State"
      description="Customize the message when no options are available."
    />
    <component-example :code="emptyStateExample">
      <p-select
        v-model="emptyValue"
        label="Select with Custom Empty State"
        :options="[]"
      >
        <template #emptyOptions>
          <p-icon icon="heart-crack" />
          <span>No options available</span>
        </template>
      </p-select>
    </component-example>

    <section-header
      title="Positioning"
      description="Control where the options dropdown appears."
    />
    <component-example :code="positionExample">
      <p-select
        v-model="positionValue"
        label="Select with Custom Position"
        :options="basicOptions"
        position="right"
      />
    </component-example>

    <section-header
      title="Options with Icons"
      description="Display icons alongside option labels."
    />
    <component-example :code="iconsExample">
      <p-select
        v-model="iconsValue"
        label="Select with Icons"
        :options="iconOptionsData"
        show-input-icons
      />
      <p>Selected: {{ JSON.stringify(iconsValue) }}</p>
    </component-example>

    <section-header
      title="Custom Option Slot"
      description="Fully customize how options are rendered."
    />
    <component-example :code="customOptionExample">
      <p-select
        v-model="customOptionValue"
        label="Custom Option Rendering"
        :options="subLabelOptionsData"
      >
        <template #option="{ option, selected }">
          <div class="custom-option">
            <p-icon
              :icon="selected ? 'check-circle' : 'circle'"
              :fa-style="selected ? 'solid' : 'regular'"
            />
            <div>
              <div class="custom-option__label">{{ option.label }}</div>
              <div
                v-if="'subLabel' in option && option.subLabel"
                class="custom-option__sublabel"
              >
                {{ option.subLabel }}
              </div>
            </div>
          </div>
        </template>
      </p-select>
      <p>Selected: {{ JSON.stringify(customOptionValue) }}</p>
    </component-example>

    <section-header
      title="Custom Target Icon"
      description="Customize the dropdown indicator icon."
    />
    <component-example :code="customTargetIconExample">
      <p-select
        v-model="customTargetIconValue"
        label="Custom Target Icon"
        :options="basicOptions"
      >
        <template #targetIcon="{ isOpen: dropdownOpen }">
          <p-icon
            :icon="dropdownOpen ? 'chevron-up' : 'chevron-down'"
            fa-style="solid"
          />
        </template>
      </p-select>
    </component-example>

    <section-header
      title="Custom Footer Slot"
      description="Add custom content to the bottom of the options dropdown."
    />
    <component-example :code="customFooterExample">
      <p-select
        v-model="customFooterValue"
        label="Select with Footer"
        :options="basicOptions"
      >
        <template #footer="{ close }">
          <div class="custom-footer">
            <p-button
              size="sm"
              @click="close"
            >
              Close
            </p-button>
          </div>
        </template>
      </p-select>
    </component-example>

    <section-header
      title="Change Event"
      description="Listen to selection changes with the @change event."
    />
    <component-example :code="changeEventExample">
      <p-select
        v-model="changeEventValue"
        label="Select with Change Event"
        :options="basicOptions"
        @change="handleChangeEvent"
      />
      <p>Last changed to: {{ lastChangedValue }}</p>
    </component-example>

    <section-header
      title="Controlled Open State"
      description="Control the dropdown open state programmatically."
    />
    <component-example :code="controlledOpenExample">
      <p-button @click="toggleControlledOpen"> {{ controlledOpen ? 'Close' : 'Open' }} Dropdown </p-button>
      <p-select
        v-model="controlledOpenValue"
        v-model:is-open="controlledOpen"
        label="Controlled Open State"
        :options="basicOptions"
      />
    </component-example>

    <section-header
      title="Options Component"
      description="Standalone options component for custom implementations."
    />
    <component-example :code="optionsComponentExample">
      <span ref="targetElement">
        <p-button
          icon="raccoon"
          fa-style="solid"
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          @click="toggle"
        >
          Toggle Options
        </p-button>
      </span>

      <p-options
        v-model:is-open="isOpen"
        v-model="optionsValue"
        :position="position"
        :target-element="targetElement"
        :combobox-element="buttonElement"
        :options="basicOptions"
      />
      <p>Selected from options: {{ JSON.stringify(optionsValue) }}</p>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Select with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="showInputIcons"
          label="Show input icons"
        />

        <p-toggle
          v-model="showApply"
          label="Show apply button"
        />

        <p-toggle
          v-model="multiple"
          label="Multiple"
        />

        <p-toggle
          v-model="disabled"
          label="Disabled"
        />

        <p-toggle
          v-model="required"
          label="Required"
        />
        <p-toggle
          v-model="highlighted"
          label="Highlight"
        />
        <p-toggle
          v-model="showSubLabels"
          label="Show sub labels"
        />

        <p-toggle
          v-model="manyOptions"
          label="Lots of options"
        />

        <p-toggle
          v-model="showGrouped"
          label="Show grouped"
        />
        <p-toggle
          v-model="filter"
          label="Filter"
        />
        <p-toggle
          v-model="isErrored"
          label="Show error state"
        />
        <p-input
          v-model="placeholder"
          label="Placeholder"
        />

        <p-input
          v-model="message"
          label="Message"
        />

        <p-input
          v-model="emptyOptionsMessage"
          label="Empty options message (slot)"
        />

        <p-select
          v-model="relativePosition"
          label="Options position"
          :options="relativePositionOptions"
        />

        <p-select
          v-model="variant"
          label="Variant"
          :options="variantOptions"
        />

        <p-toggle
          v-if="variant === 'minimal'"
          v-model="dark"
          label="Dark"
        />

        <p-toggle
          v-if="variant === 'minimal'"
          v-model="accent"
          label="Accent"
        />
      </p-form>
      <p-select
        v-if="variant === 'minimal'"
        v-model="modelValue"
        label="Interactive Select"
        :options="options"
        :position="relativePosition"
        :message="message"
        :state="isErrored ? 'errored' : undefined"
        variant="minimal"
        v-bind="{ required, disabled, showInputIcons, showApply, placeholder, multiple, highlighted, filter, dark, accent }"
      >
        <template
          v-if="emptyOptionsMessage"
          #emptyOptions
        >
          <p-icon icon="heart-crack" />
          <span>{{ emptyOptionsMessage }}</span>
        </template>
      </p-select>
      <p-select
        v-else
        v-model="modelValue"
        label="Interactive Select Label"
        :options="options"
        :position="relativePosition"
        :message="message"
        :state="isErrored ? 'errored' : undefined"
        v-bind="{ required, disabled, showInputIcons, showApply, placeholder, multiple, highlighted, filter, variant }"
      >
        <template
          v-if="emptyOptionsMessage"
          #emptyOptions
        >
          <p-icon icon="heart-crack" />
          <span>{{ emptyOptionsMessage }}</span>
        </template>
      </p-select>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { SelectOption } from '@/types'
import { PopoverPositionMethod } from '@/types'

import { useBoolean } from '@/composables'
import { autoPosition, randomId, RelativePosition } from '@/utilities'

// Example values for different sections
const basicValue = ref(null)
const multipleValue = ref([])
const sizeSmallValue = ref(null)
const sizeDefaultValue = ref(null)
const variantDefaultValue = ref(null)
const variantSimpleValue = ref(null)
const variantMinimalValue = ref(null)
const variantMinimalAccentValue = ref(null)
const filterValue = ref(null)
const groupedValue = ref(null)
const groupedWithDisabledValue = ref(null)
const subLabelValue = ref(null)
const disabledValue = ref(null)
const errorValue = ref(null)
const applyValue = ref([])
const emptyValue = ref(null)
const positionValue = ref(null)
const optionsValue = ref(null)
const iconsValue = ref(null)
const customOptionValue = ref(null)
const customTargetIconValue = ref(null)
const customFooterValue = ref(null)
const changeEventValue = ref(null)
const lastChangedValue = ref<unknown>(null)
const controlledOpenValue = ref(null)
const controlledOpen = ref(false)
const required = ref(false)

// Basic options for simple examples
const basicOptions = computed<SelectOption[]>(() => [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Disabled Option', value: 5, disabled: true },
  { label: 'Destructive option', value: 6, variant: 'destructive' },
  { label: 'Disabled Destructive option', value: 8, variant: 'destructive', disabled: true },
])

// Interactive example values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelValue = ref<any>([2])
const relativePosition = ref<RelativePosition>('left')
const relativePositionOptions = computed<SelectOption<RelativePosition>[]>(() => [
  { label: 'Left', value: 'left' },
  { label: 'Stretch', value: 'stretch' },
  { label: 'Right', value: 'right' },
])

const variant = ref<'default' | 'simple' | 'minimal'>('default')
const variantOptions = computed<SelectOption<'default' | 'simple' | 'minimal'>[]>(() => [
  { label: 'Default', value: 'default' },
  { label: 'Simple', value: 'simple' },
  { label: 'Minimal', value: 'minimal' },
])

const targetElement = ref<HTMLSpanElement>()
const buttonElement = computed(() => targetElement.value?.querySelector('button') ?? undefined)
const { state: isOpen, toggle } = useBoolean()

const showInputIcons = ref(false)
const showApply = ref(false)
const multiple = ref(false)
const disabled = ref(false)
const highlighted = ref(false)
const showSubLabels = ref(false)
const manyOptions = ref(false)
const showGrouped = ref(false)
const placeholder = ref<string>()
const message = ref<string>()
const emptyOptionsMessage = ref<string>()
const filter = ref(false)
const isErrored = ref(false)
const dark = ref(false)
const accent = ref(false)

watch(emptyOptionsMessage, () => {
  modelValue.value = null
})

watch(multiple, (value) => {
  if (value) {
    modelValue.value = [2]
  } else {
    modelValue.value = null
  }
})

// Data for different examples
const manyOptionsData = computed<SelectOption[]>(() =>
  new Array(50).fill(null).map((_, index) => ({
    label: `Option ${index + 1}`,
    value: index + 1,
  }))
)

const groupedOptionsData = computed(() => [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
])

const groupedOptionsWithDisabledData = computed(() => [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple', disabled: true },
      { label: 'Banana', value: 'banana', disabled: true },
      { label: 'Orange', value: 'orange', disabled: true },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
])

const subLabelOptionsData = computed<SelectOption[]>(() => [
  { label: 'John Doe', value: 'john', subLabel: 'Software Engineer' },
  { label: 'Jane Smith', value: 'jane', subLabel: 'Product Manager' },
  { label: 'Bob Johnson', value: 'bob', subLabel: 'Designer' },
])

const iconOptionsData = computed<SelectOption[]>(() => [
  { label: 'Dashboard', value: 'dashboard', icon: 'gauge' },
  { label: 'Settings', value: 'settings', icon: 'gear' },
  { label: 'Profile', value: 'profile', icon: 'user' },
  { label: 'Messages', value: 'messages', icon: 'envelope' },
  { label: 'Notifications', value: 'notifications', icon: 'bell' },
])

const options = computed(() => {
  if (emptyOptionsMessage.value) {
    return []
  }

  const value = [
    {
      label: 'Annual Income',
      value: 1,
      subLabel: showSubLabels.value ? 'Borrower' : undefined,
    },
    { label: 'FICO', value: 2, subLabel: showSubLabels.value ? 'Borrower' : undefined, disabled: true },
    {
      label: 'Custom Rewards (disabled)',
      value: 3,
      disabled: true,
      subLabel: showSubLabels.value ? 'Grid' : undefined,
    },
    { label: 'Debt Accumulation', value: 4, subLabel: showSubLabels.value ? 'Borrower' : undefined },
  ]

  if (manyOptions.value) {
    value.push(
      ...new Array(30).fill(null).map(() => ({
        label: randomId(),
        subLabel: showSubLabels.value ? randomId() : undefined,
        value: Math.random(),
      }))
    )
  }

  if (showGrouped.value) {
    const [first, second, third, fourth, ...rest] = value

    return [
      {
        label: 'Borrower',
        options: [first, second, fourth],
      },
      {
        label: 'Grid',
        options: [third],
      },
      ...rest,
    ]
  }

  return value
})

const position = computed<PopoverPositionMethod>(() => (__, contentElement) => {
  if (!targetElement.value) {
    return
  }

  return autoPosition(relativePosition.value)(targetElement.value, contentElement)
})

// Event handlers
function handleChangeEvent(value: unknown): void {
  lastChangedValue.value = value
}

function toggleControlledOpen(): void {
  controlledOpen.value = !controlledOpen.value
}

// Code examples
const basicExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Choose an option"
  :options="options"
/>`,
  language: 'vue-html',
}

const multipleExample = {
  code: `<p-select
  v-model="selectedValues"
  label="Choose multiple options"
  :options="options"
  multiple
/>`,
  language: 'vue-html',
}

const sizesExample = {
  code: `<p-select
  v-model="value"
  label="Small Select"
  :options="options"
  size="small"
/>

<p-select
  v-model="value"
  label="Default Select"
  :options="options"
/>`,
  language: 'vue-html',
}

const variantsExample = {
  code: `<p-select
  v-model="value"
  label="Default Variant"
  :options="options"
/>

<p-select
  v-model="value"
  label="Simple Variant"
  :options="options"
  variant="simple"
/>

<p-select
  v-model="value"
  label="Minimal Dark Variant"
  :options="options"
  variant="minimal"
  dark
/>

<p-select
  v-model="value"
  label="Minimal Accent"
  :options="options"
  variant="minimal"
  accent
/>`,
  language: 'vue-html',
}

const filterExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Filterable Select"
  :options="manyOptions"
  filter
  placeholder="Search options..."
/>`,
  language: 'vue-html',
}

const groupedExample = [
  {
    code: `const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
    ],
  },
]`,
    language: 'typescript',
  },
  {
    code: `<p-select
  v-model="selectedValue"
  label="Grouped Select"
  :options="groupedOptions"
/>`,
    language: 'vue-html',
  },
]

const groupedWithDisabledExample = {
  code: `const groupedOptionsWithDisabled = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple', disabled: true },
      { label: 'Banana', value: 'banana', disabled: true },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
    ],
  },
]`,
  language: 'vue-html',
}

const subLabelsExample = [
  {
    code: `const optionsWithSubLabels = [
  { label: 'John Doe', value: 'john', subLabel: 'Software Engineer' },
  { label: 'Jane Smith', value: 'jane', subLabel: 'Product Manager' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-select
  v-model="selectedValue"
  label="Select with Sub-labels"
  :options="optionsWithSubLabels"
/>`,
    language: 'vue-html',
  },
]

const statesExample = {
  code: `<p-select
  v-model="value"
  label="Disabled Select"
  :options="options"
  disabled
/>

<p-select
  v-model="value"
  label="Error State Select"
  :options="options"
  state="errored"
  message="Please select a valid option"
/>`,
  language: 'vue-html',
}

const applyButtonExample = {
  code: `<p-select
  v-model="selectedValues"
  label="Select with Apply Button"
  :options="options"
  show-apply
  multiple
/>`,
  language: 'vue-html',
}

const emptyStateExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Select with Custom Empty State"
  :options="[]"
>
  <template #emptyOptions>
    <p-icon icon="heart-crack" />
    <span>No options available</span>
  </template>
</p-select>`,
  language: 'vue-html',
}

const positionExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Select with Custom Position"
  :options="options"
  position="right"
/>`,
  language: 'vue-html',
}

const optionsComponentExample = [
  {
    code: `<!-- Simple usage - POptions handles everything -->
<p-button @click="isOpen = !isOpen">Toggle Options</p-button>

<p-options
  v-model:is-open="isOpen"
  v-model="selectedValue"
  :position="position"
  :options="options"
/>

<!-- Advanced: keyboard navigation from trigger element -->
<span ref="targetElement">
  <p-button
    aria-haspopup="listbox"
    :aria-expanded="isOpen"
    @click="toggle"
  >
    Toggle Options
  </p-button>
</span>

<p-options
  v-model:is-open="isOpen"
  v-model="selectedValue"
  :position="position"
  :target-element="targetElement"
  :combobox-element="buttonElement"
  :options="options"
/>`,
    language: 'vue-html',
  },
  {
    code: `const targetElement = ref()
const buttonElement = computed(() => targetElement.value?.querySelector('button'))`,
    language: 'typescript',
  },
]

const interactiveExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Interactive Select"
  :options="options"
  :disabled="disabled"
  :multiple="multiple"
  :filter="filter"
  :placeholder="placeholder"
  :message="message"
  :show-apply="showApply"
  :show-input-icons="showInputIcons"
  :highlighted="highlighted"
  :variant="variant"
  :dark="variant === 'minimal' ? dark : undefined"
  :accent="variant === 'minimal' ? accent : undefined"
  :state="isErrored ? 'errored' : undefined"
  :position="relativePosition"
>
  <template v-if="emptyOptionsMessage" #emptyOptions>
    <p-icon icon="heart-crack" />
    <span>{{ emptyOptionsMessage }}</span>
  </template>
</p-select>`,
  language: 'vue-html',
}

const iconsExample = [
  {
    code: `const iconOptions = [
  { label: 'Dashboard', value: 'dashboard', icon: 'gauge' },
  { label: 'Settings', value: 'settings', icon: 'gear' },
  { label: 'Profile', value: 'profile', icon: 'user' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-select
  v-model="selectedValue"
  label="Select with Icons"
  :options="iconOptions"
  show-input-icons
/>`,
    language: 'vue-html',
  },
]

const customOptionExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Custom Option Rendering"
  :options="options"
>
  <template #option="{ option, selected }">
    <div class="custom-option">
      <p-icon
        :icon="selected ? 'check-circle' : 'circle'"
        :fa-style="selected ? 'solid' : 'regular'"
      />
      <div>
        <div class="custom-option__label">{{ option.label }}</div>
        <div class="custom-option__sublabel">{{ option.subLabel }}</div>
      </div>
    </div>
  </template>
</p-select>`,
  language: 'vue-html',
}

const customTargetIconExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Custom Target Icon"
  :options="options"
>
  <template #targetIcon="{ isOpen }">
    <p-icon
      :icon="isOpen ? 'chevron-up' : 'chevron-down'"
      fa-style="solid"
    />
  </template>
</p-select>`,
  language: 'vue-html',
}

const customFooterExample = {
  code: `<p-select
  v-model="selectedValue"
  label="Select with Footer"
  :options="options"
>
  <template #footer="{ close }">
    <div class="custom-footer">
      <p-button size="small" @click="close">
        Close
      </p-button>
    </div>
  </template>
</p-select>`,
  language: 'vue-html',
}

const changeEventExample = [
  {
    code: `<p-select
  v-model="selectedValue"
  label="Select with Change Event"
  :options="options"
  @change="handleChange"
/>`,
    language: 'vue-html',
  },
  {
    code: `function handleChange(value) {
  console.log('Selection changed to:', value)
}`,
    language: 'typescript',
  },
]

const controlledOpenExample = [
  {
    code: `<p-button @click="toggleOpen">
  {{ isOpen ? 'Close' : 'Open' }} Dropdown
</p-button>

<p-select
  v-model="selectedValue"
  v-model:is-open="isOpen"
  label="Controlled Open State"
  :options="options"
/>`,
    language: 'vue-html',
  },
  {
    code: `const isOpen = ref(false)

function toggleOpen() {
  isOpen.value = !isOpen.value
}`,
    language: 'typescript',
  },
]
</script>

<style scoped>
.custom-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-option__label {
  font-weight: 500;
}

.custom-option__sublabel {
  font-size: 0.875rem;
  color: var(--p-color-text-subdued);
}

.custom-footer {
  padding: 0.5rem;
  border-top: 1px solid var(--p-color-border-default);
  display: flex;
  justify-content: flex-end;
}
</style>
