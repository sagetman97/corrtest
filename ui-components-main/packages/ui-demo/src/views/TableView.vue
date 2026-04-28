<template>
  <component-demo-layout name="Table">
    <section-header
      title="Basic Table"
      description="A simple table with columns and data rows."
    />
    <component-example :code="basicTableExample">
      <p-table
        :data="basicData"
        :columns="basicColumns"
      />
    </component-example>

    <section-header
      title="Compact Table"
      description="A compact table with a header underline, columns and data rows."
    />
    <component-example :code="compactTableExample">
      <p-table
        :data="basicData"
        :columns="basicColumns"
        header-underline
        variant="compact"
      />
    </component-example>

    <section-header
      title="Table with Selection"
      description="Enable row selection with checkboxes. Optionally allow a selection limit and disable row selection based on a condition."
    />
    <component-example :code="selectionExample">
      <p-table
        v-model:selected="basicSelected"
        :data="selectableData"
        :columns="basicColumns"
        :selection-limit="3"
        :disabled-row-selection="disabledRowSelection"
      />
      <p>Selected: {{ basicSelected.length }} rows</p>
    </component-example>

    <section-header
      title="Column Alignment"
      description="Control text alignment within columns using the align property."
    />
    <component-example :code="alignmentExample">
      <p-table
        :data="alignmentData"
        :columns="alignmentColumns"
      />
    </component-example>

    <section-header
      title="Column Width Control"
      description="Set specific widths, minimum and maximum widths for columns."
    />
    <component-example :code="widthExample">
      <p-table
        :data="widthData"
        :columns="widthColumns"
        :full-width="false"
      />
    </component-example>

    <section-header
      title="Frozen/Sticky Columns"
      description="Pin columns to the left side of the table for horizontal scrolling."
    />
    <component-example :code="frozenExample">
      <p-table
        :data="frozenData"
        :columns="frozenColumns"
        style="max-width: 600px"
      />
    </component-example>

    <section-header
      title="Text Truncation"
      description="Enable text truncation for columns with long content."
    />
    <component-example :code="truncateExample">
      <p-table
        :data="truncateData"
        :columns="truncateColumns"
        style="max-width: 500px"
      />
    </component-example>

    <section-header
      title="Column Visibility"
      description="Control which columns are displayed using the visible property."
    />
    <component-example :code="visibilityExample">
      <p-table
        :data="visibilityData"
        :columns="visibilityColumns"
      />
      <p-form>
        <p-toggle
          v-model="showEmailColumn"
          label="Show Email Column"
        />
        <p-toggle
          v-model="showPhoneColumn"
          label="Show Phone Column"
        />
      </p-form>
    </component-example>

    <section-header
      title="Sortable Table"
      description="Enable column sorting functionality. Click column headers to sort."
    />
    <component-example :code="sortableExample">
      <p-table
        v-model:sort="basicSort"
        :data="sortedBasicData"
        :columns="sortableColumns"
      >
        <template #salary="{ row }">
          {{ row.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </template>
      </p-table>
      <p>Current sort: {{ basicSort.property || 'none' }} {{ basicSort.direction || '' }}</p>
    </component-example>

    <section-header
      title="Custom Cell Templates"
      description="Customize how data is displayed in specific columns."
    />
    <component-example :code="customCellExample">
      <p-table
        :data="customData"
        :columns="customColumns"
      >
        <template #price="{ row }">
          {{ row.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </template>
        <template #status="{ row }">
          <span :class="{ 'status-active': row.status === 'active', 'status-inactive': row.status === 'inactive' }">
            {{ row.status }}
          </span>
        </template>
      </p-table>
    </component-example>

    <section-header
      title="Empty State"
      description="Display custom content when the table has no data."
    />
    <component-example :code="emptyStateExample">
      <p-table
        :data="[]"
        :columns="basicColumns"
        empty-title="No Data Available"
        empty-message="There are no items to display at this time."
      />
    </component-example>

    <section-header
      title="Full Width Table"
      description="Make the table take up the full available width."
    />
    <component-example :code="fullWidthExample">
      <p-table
        :data="basicData"
        :columns="basicColumns"
        full-width
      />
    </component-example>

    <section-header
      title="Table with Actions"
      description="Add action buttons to table rows."
    />
    <component-example :code="actionsExample">
      <p-table
        :data="basicData"
        :columns="actionsColumns"
      >
        <template #actions="{ row }">
          <p-button
            size="xs"
            outline
            @click="editRow(row)"
          >
            Edit
          </p-button>
          <p-button
            size="xs"
            outline
            @click="deleteRow(row)"
          >
            Delete
          </p-button>
        </template>
      </p-table>
    </component-example>

    <section-header
      title="Interactive Table Example"
      description="Table with configurable properties and advanced features."
    />
    <component-example :code="interactiveExample">
      <p-form class="table-view__layout">
        <p-toggle
          v-model="formValues.showSelection"
          v-bind="fields.showSelection"
          label="Show Selection"
        />

        <p-input-number
          v-model="formValues.selectionLimit"
          v-bind="fields.selectionLimit"
          label="Selection Limit"
        />

        <p-input-number
          v-model="formValues.rowCount"
          v-bind="fields.rowCount"
          label="# Rows"
        />

        <p-input
          v-model="formValues.emptyTitle"
          v-bind="fields.emptyTitle"
          label="Empty Title"
        />

        <p-input
          v-model="formValues.emptyMessage"
          v-bind="fields.emptyMessage"
          label="Empty Message"
        />

        <p-toggle
          v-model="formValues.showFooter"
          v-bind="fields.showFooter"
          label="Show Footer"
        />
        <p-toggle
          v-model="formValues.fullWidth"
          v-bind="fields.fullWidth"
          label="Full Width"
        />
        <p-select
          v-model="formValues.variant"
          v-bind="fields.variant"
          :options="variantOptions"
          label="Variant"
        />
        <p-toggle
          v-model="formValues.freezeRateColumns"
          v-bind="fields.freezeRateColumns"
          label="Freeze Rate Column"
        />
        <p-toggle
          v-model="formValues.freezeCreditColumns"
          v-bind="fields.freezeCreditColumns"
          label="Freeze Credit Column"
        />
        <p-toggle
          v-model="formValues.headerUnderline"
          v-bind="fields.headerUnderline"
          label="Header Underline"
        />
      </p-form>
      <p-table
        v-model:sort="sort"
        v-model:selected="selected"
        :data="sortedData"
        :selection-limit="formOutput.selectionLimit"
        :empty-title="formOutput.emptyTitle"
        :empty-message="formOutput.emptyMessage"
        :full-width="formOutput.fullWidth"
        :variant="formOutput.variant"
        :header-underline="formOutput.headerUnderline"
        v-bind="{ columns, columnClasses, rowClasses }"
      >
        <template #actions-header>
          <span />
        </template>
        <template #rate="{ row }">
          {{ row.rate.toFixed(2) }}
        </template>
        <template #apr="{ row }">
          {{ row.apr.toFixed(2) }}
        </template>
        <template #price="{ row }">
          {{
            row.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </template>
        <template #p-&-i="{ row }">
          {{ row.premiums.toFixed(0) }}
        </template>
        <template #credit="{ row }">
          {{ row.credit.toFixed(2) }}
        </template>

        <template #lorem> Lorem ipsum dolor </template>

        <template #actions>
          <p-button
            style="padding: 0"
            text
          >
            View Adjustments
          </p-button>
        </template>

        <template
          v-if="formOutput.showFooter"
          #footer
        >
          <div class="table-view__footer">
            <div
              v-if="formOutput.showSelection"
              class="table-view__selected-count"
            >
              {{ selected?.length.toLocaleString() }} Rates Selected
            </div>
            <p-button>Update Pricing</p-button>
          </div>
        </template>
      </p-table>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import * as v from 'valibot'

import { ColumnClassesMethod, RowClassesMethod, SelectOption, Sort, stringToNumberSchema, TableColumn } from '@/types'

import { useValidation, useValidationFields } from '@/composables'
import { sortTableData } from '@/utilities'

// Example data for different sections
type BasicDataType = { id: number; name: string; email: string; role: string }
type SelectableDataType = { id: number; name: string; email: string; role: string; selectable: boolean }
type SortableDataType = { id: number; name: string; email: string; role: string; salary: number }
type CustomDataType = { id: number; name: string; price: number; status: string }
type AlignmentDataType = { id: number; product: string; quantity: number; price: number; total: number }
type WidthDataType = { id: number; shortCol: string; mediumColumn: string; veryLongColumnName: string }
type FrozenDataType = { id: number; name: string; col1: string; col2: string; col3: string; col4: string; col5: string; actions: string }
type TruncateDataType = { id: number; title: string; description: string; category: string }
type VisibilityDataType = { id: number; name: string; email: string; phone: string; department: string }

const basicData: BasicDataType[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
]

const selectableData: SelectableDataType[] = [
  { id: 1, name: 'Amy Admin', email: 'amy@example.com', role: 'Admin', selectable: false },
  { id: 2, name: 'Jane User', email: 'jane@example.com', role: 'User', selectable: true },
  { id: 3, name: 'Bob Editor', email: 'bob@example.com', role: 'Editor', selectable: true },
  { id: 4, name: 'Chris Intern', email: 'chris@example.com', role: 'Intern', selectable: true },
]

const disabledRowSelection = (row: SelectableDataType) => !row.selectable

const sortableData: SortableDataType[] = [
  { id: 1, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', salary: 75000 },
  { id: 2, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', salary: 95000 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', salary: 65000 },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Manager', salary: 85000 },
]

const basicColumns: TableColumn<BasicDataType>[] = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
]

const sortableColumns: TableColumn<SortableDataType>[] = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
  { property: 'salary', label: 'Salary', sortable: true },
]

const customData: CustomDataType[] = [
  { id: 1, name: 'Product A', price: 29.99, status: 'active' },
  { id: 2, name: 'Product B', price: 49.99, status: 'inactive' },
  { id: 3, name: 'Product C', price: 19.99, status: 'active' },
]

// Alignment example data
const alignmentData: AlignmentDataType[] = [
  { id: 1, product: 'Widget A', quantity: 10, price: 25.5, total: 255.0 },
  { id: 2, product: 'Widget B', quantity: 5, price: 45.99, total: 229.95 },
  { id: 3, product: 'Widget C', quantity: 20, price: 12.75, total: 255.0 },
]

// Width control example data
const widthData: WidthDataType[] = [
  { id: 1, shortCol: 'A', mediumColumn: 'Medium Text', veryLongColumnName: 'This is a very long text that demonstrates column width control' },
  { id: 2, shortCol: 'B', mediumColumn: 'Another Text', veryLongColumnName: 'Another example of long content that shows how width constraints work' },
  { id: 3, shortCol: 'C', mediumColumn: 'Sample Data', veryLongColumnName: 'Final example showing the width control functionality in action' },
]

// Frozen columns example data
const frozenData: FrozenDataType[] = [
  { id: 1, name: 'John Doe', col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', col5: 'Data 5', actions: 'Edit' },
  { id: 2, name: 'Jane Smith', col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', col5: 'Data 5', actions: 'Edit' },
  { id: 3, name: 'Bob Johnson', col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', col5: 'Data 5', actions: 'Edit' },
]

// Truncation example data
const truncateData: TruncateDataType[] = [
  {
    id: 1,
    title: 'Short Title',
    description: 'This is a very long description that will be truncated when the truncate option is enabled for the column',
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Another Title',
    description: 'Another extremely long description that demonstrates the text truncation functionality in table columns',
    category: 'Business',
  },
  {
    id: 3,
    title: 'Final Title',
    description: 'The last example of a long description that shows how truncation works with ellipsis when content exceeds the available space',
    category: 'Design',
  },
]

const customColumns: TableColumn<CustomDataType>[] = [
  { property: 'name', label: 'Product Name', sortable: true },
  { property: 'price', label: 'Price', sortable: true },
  { property: 'status', label: 'Status', sortable: true },
]

// Alignment columns
const alignmentColumns: TableColumn<AlignmentDataType>[] = [
  { property: 'product', label: 'Product', align: 'left' },
  { property: 'quantity', label: 'Quantity', align: 'center' },
  { property: 'price', label: 'Price', align: 'right' },
  { property: 'total', label: 'Total', align: 'right' },
]

// Width control columns
const widthColumns: TableColumn<WidthDataType>[] = [
  { property: 'shortCol', label: 'Short', width: '80px' },
  { property: 'mediumColumn', label: 'Medium', minWidth: '150px', maxWidth: '200px' },
  { property: 'veryLongColumnName', label: 'Very Long Column Name', minWidth: '300px' },
]

// Frozen columns
const frozenColumns: TableColumn<FrozenDataType>[] = [
  { property: 'name', label: 'Name', freeze: true, width: '120px' },
  { property: 'col1', label: 'Column 1', width: '120px' },
  { property: 'col2', label: 'Column 2', width: '120px' },
  { property: 'col3', label: 'Column 3', width: '120px' },
  { property: 'col4', label: 'Column 4', width: '120px' },
  { property: 'col5', label: 'Column 5', width: '120px' },
  { property: 'actions', label: 'Actions', freeze: true, width: '100px' },
]

// Truncation columns
const truncateColumns: TableColumn<TruncateDataType>[] = [
  { property: 'title', label: 'Title', width: '120px' },
  { property: 'description', label: 'Description', truncate: true, width: '200px' },
  { property: 'category', label: 'Category', width: '100px' },
]

const actionsColumns: TableColumn<BasicDataType>[] = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
  { label: 'Actions', sortable: false },
]

// Visibility data and reactive variables
const visibilityData: VisibilityDataType[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0456', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0789', department: 'Sales' },
]

const showEmailColumn = ref(true)
const showPhoneColumn = ref(true)

const visibilityColumns = computed<TableColumn<VisibilityDataType>[]>(() => [
  { property: 'name', label: 'Name' },
  { property: 'email', label: 'Email', visible: showEmailColumn.value },
  { property: 'phone', label: 'Phone', visible: showPhoneColumn.value },
  { property: 'department', label: 'Department' },
])

// Example reactive values
const basicSelected = ref([])
const basicSort = ref<Sort<SortableDataType>>({ property: 'name', direction: 'asc' })

const sortedBasicData = computed(() => {
  if (basicSort.value.property) {
    return sortTableData(sortableData, basicSort.value.property, basicSort.value.direction ?? 'asc')
  }
  return sortableData
})

// Example action handlers
const editRow = (row: BasicDataType) => {
  // eslint-disable-next-line no-console
  console.log('Edit row:', row)
}

const deleteRow = (row: BasicDataType) => {
  // eslint-disable-next-line no-console
  console.log('Delete row:', row)
}

// Original comprehensive table logic
const defaultValues = {
  showSelection: true,
  showFooter: true,
  fullWidth: false,
  freezeRateColumns: false,
  freezeCreditColumns: false,
  headerUnderline: false,
  selectionLimit: undefined,
  rowCount: '100',
  emptyTitle: 'No Data',
  emptyMessage: 'There is no data to display.',
  variant: 'default' as const,
}

const variantOptions: SelectOption<string>[] = [
  { label: 'Default', value: 'default' },
  { label: 'Compact', value: 'compact' },
]

const formValues = reactive({ ...defaultValues })
const formSchema = v.object({
  showSelection: v.boolean(),
  showFooter: v.boolean(),
  freezeRateColumns: v.boolean(),
  freezeCreditColumns: v.boolean(),
  headerUnderline: v.boolean(),
  selectionLimit: v.optional(stringToNumberSchema()),
  rowCount: v.pipe(stringToNumberSchema(), v.minValue(1)),
  emptyTitle: v.string(),
  emptyMessage: v.string(),
  fullWidth: v.boolean(),
  variant: v.picklist(['default', 'compact']),
})

const { validate, parse } = useValidation(formSchema)
const fields = useValidationFields(formSchema)

const formOutput = reactive({
  ...parse(defaultValues),
})

watch(formValues, (values: typeof defaultValues) => {
  if (validate(values)) {
    Object.assign(formOutput, parse(values))
  }
})

const selectedValue = ref<ExampleData[]>([])
const selected = computed({
  get(): ExampleData[] | undefined {
    if (formOutput.showSelection) {
      return selectedValue.value
    }

    return undefined
  },
  set(value: ExampleData[] | undefined) {
    if (formOutput.showSelection && value !== undefined) {
      selectedValue.value = value
    }
  },
})

type ExampleData = {
  rate: number
  apr: number
  price: number
  premiums: number
  credit: number
  lockPeriod?: string
  investor: string
}

const columns = computed(
  () =>
    [
      {
        label: 'Rate',
        property: 'rate',
        align: 'right',
        freeze: formOutput.freezeRateColumns,
      },
      {
        label: 'APR',
        property: 'apr',
        align: 'right',
      },
      {
        label: 'Price',
        property: 'price',
        align: 'right',
      },
      {
        label: 'P&I',
        property: 'premiums',
        align: 'right',
      },
      {
        label: 'Credit',
        property: 'credit',
        align: 'right',
        freeze: formOutput.freezeCreditColumns,
      },
      { label: 'Lock Period', property: 'lockPeriod', sortable: false, align: 'right' },
      { label: 'Investor', property: 'investor' },
      { label: 'Lorem' },
      { label: 'actions' },
    ] as const satisfies TableColumn<ExampleData>[]
)

const data = computed<ExampleData[]>(() =>
  new Array(formOutput.rowCount).fill(null).map((_, index) => ({
    rate: Math.random() * 10,
    apr: Math.random() * 10,
    price: Math.random() * 1000,
    premiums: Math.random() * 1000,
    credit: Math.random() * 10,
    lockPeriod: undefined,
    investor: `#${(index + 1).toLocaleString()}`,
  }))
)

const sortedData = computed(() => {
  if (sort.value.property) {
    return sortTableData(data.value, sort.value.property, sort.value.direction ?? 'asc')
  }

  return data.value
})

const sort = ref<Sort<ExampleData>>({})

const columnClasses: ColumnClassesMethod<ExampleData> = (column) => {
  const numberColumns: (keyof ExampleData)[] = ['rate', 'apr', 'price', 'premiums', 'credit']

  if (!!column.property && numberColumns.includes(column.property)) {
    return 'table-view__number-column'
  }
}

const rowClasses: RowClassesMethod<ExampleData> = (_, index: number) => {
  return [`table-view__row-${index}`]
}

// Code examples
const basicTableExample = [
  {
    code: `const columns = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
/>`,
    language: 'vue-html',
  },
]

const compactTableExample = [
  {
    code: `const columns = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
  variant="compact"
/>`,
    language: 'vue-html',
  },
]

const selectionExample = [
  {
    code: `const selectableData: SelectableDataType[] = [
  { id: 1, name: 'Amy Admin', email: 'amy@example.com', role: 'Admin', selectable: false },
  { id: 2, name: 'Jane User', email: 'jane@example.com', role: 'User', selectable: true },
  { id: 3, name: 'Bob Editor', email: 'bob@example.com', role: 'Editor', selectable: true },
  { id: 4, name: 'Chris Intern', email: 'chris@example.com', role: 'Intern', selectable: true },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  v-model:selected="selected"
  :data="data"
  :columns="columns"
  :selection-limit="3"
  :disabled-row-selection="(row: { selectable: any }) => !row.selectable"
/>`,
    language: 'vue-html',
  },
]

const sortableExample = [
  {
    code: `const sortableData = [
  { id: 1, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', salary: 75000 },
  { id: 2, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', salary: 95000 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', salary: 65000 },
]

const columns = [
  { property: 'name', label: 'Name', sortable: true },
  { property: 'email', label: 'Email', sortable: true },
  { property: 'role', label: 'Role', sortable: true },
  { property: 'salary', label: 'Salary', sortable: true },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  v-model:sort="sort"
  :data="sortedData"
  :columns="columns"
>
  <template #salary="{ row }">
    {{ row.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
  </template>
</p-table>`,
    language: 'vue-html',
  },
]

const customCellExample = {
  code: `<p-table
  :data="data"
  :columns="columns"
>
  <template #price="{ row }">
    {{ row.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
  </template>
  <template #status="{ row }">
    <span :class="statusClass(row.status)">
      {{ row.status }}
    </span>
  </template>
</p-table>`,
  language: 'vue-html',
}

const emptyStateExample = {
  code: `<p-table
  :data="[]"
  :columns="columns"
  empty-title="No Data Available"
  empty-message="There are no items to display at this time."
/>`,
  language: 'vue-html',
}

const fullWidthExample = {
  code: `<p-table
  :data="data"
  :columns="columns"
  full-width
/>`,
  language: 'vue-html',
}

const actionsExample = {
  code: `<p-table
  :data="data"
  :columns="columnsWithActions"
>
  <template #actions="{ row }">
    <p-button size="xs" outline @click="editRow(row)">Edit</p-button>
    <p-button size="xs" outline @click="deleteRow(row)">Delete</p-button>
  </template>
</p-table>`,
  language: 'vue-html',
}

const alignmentExample = [
  {
    code: `const columns = [
  { property: 'product', label: 'Product', align: 'left' },
  { property: 'quantity', label: 'Quantity', align: 'center' },
  { property: 'price', label: 'Price', align: 'right' },
  { property: 'total', label: 'Total', align: 'right' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
/>`,
    language: 'vue-html',
  },
]

const widthExample = [
  {
    code: `const columns = [
  { property: 'shortCol', label: 'Short', width: '80px' },
  { property: 'mediumColumn', label: 'Medium', minWidth: '150px', maxWidth: '200px' },
  { property: 'veryLongColumnName', label: 'Very Long Column Name', minWidth: '300px' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
  :full-width="false"
/>`,
    language: 'vue-html',
  },
]

const frozenExample = [
  {
    code: `const columns = [
  { property: 'name', label: 'Name', freeze: true, width: '120px' },
  { property: 'col1', label: 'Column 1', width: '120px' },
  { property: 'col2', label: 'Column 2', width: '120px' },
  { property: 'col3', label: 'Column 3', width: '120px' },
  { property: 'col4', label: 'Column 4', width: '120px' },
  { property: 'col5', label: 'Column 5', width: '120px' },
  { property: 'actions', label: 'Actions', freeze: true, width: '100px' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
  style="max-width: 600px;"
/>`,
    language: 'vue-html',
  },
]

const truncateExample = [
  {
    code: `const columns = [
  { property: 'title', label: 'Title', width: '120px' },
  { property: 'description', label: 'Description', truncate: true, width: '200px' },
  { property: 'category', label: 'Category', width: '100px' },
]`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
  style="max-width: 500px;"
/>`,
    language: 'vue-html',
  },
]

const visibilityExample = [
  {
    code: `const showEmailColumn = ref(true)
const showPhoneColumn = ref(true)

const columns = computed(() => [
  { property: 'name', label: 'Name' },
  { property: 'email', label: 'Email', visible: showEmailColumn.value },
  { property: 'phone', label: 'Phone', visible: showPhoneColumn.value },
  { property: 'department', label: 'Department' },
])`,
    language: 'typescript',
  },
  {
    code: `<p-table
  :data="data"
  :columns="columns"
/>`,
    language: 'vue-html',
  },
]

const interactiveExample = {
  code: `<p-table
  v-model:sort="sort"
  v-model:selected="selected"
  :data="sortedData"
  :selection-limit="selectionLimit"
  :empty-title="emptyTitle"
  :empty-message="emptyMessage"
  :full-width="fullWidth"
  :variant="variant"
  :columns="columns"
  :column-classes="columnClasses"
  :row-classes="rowClasses"
>
  <template #rate="{ row }">
    {{ row.rate.toFixed(2) }}
  </template>
  <template #price="{ row }">
    {{ row.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
  </template>
  <template #actions="{ row }">
    <p-button text>View Details</p-button>
  </template>
  <template v-if="showFooter" #footer>
    <div class="table-footer">
      <p-button>Load More</p-button>
    </div>
  </template>
</p-table>`,
  language: 'vue-html',
}
</script>

<style>
.table-view__number-column {
  text-align: end;
  justify-content: flex-end;
}

.table-view__footer {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
}

.table-view__selected-count {
  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-sm);
  color: var(--colors-text-icon-medium);
}

.table-view__layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.table-view__sticky-notes {
  list-style: disc;
  margin-left: var(--spacing-lg);
}
</style>
