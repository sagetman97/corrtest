<template>
  <div class="custom-properties-viewer">
    <h1 class="custom-properties-viewer__title">{{ title }}</h1>

    <p class="custom-properties-viewer__description">
      <slot name="description" />
    </p>

    <p-table
      v-if="values.length"
      class="custom-properties-viewer__table"
      :data="values"
      :columns="columns"
      :column-classes="columnClasses"
    >
      <template #value="{ value }">
        <template v-if="typeof value === 'string' && (value.startsWith('#') || value.startsWith('var(--colors'))">
          <div
            class="custom-properties-viewer__color-preview"
            :style="{ backgroundColor: value }"
          />
        </template>
        <code>
          {{ value }}
        </code>
      </template>

      <template #actions-header><span /></template>

      <template #actions="{ row }">
        <p-button
          icon="copy"
          text
          round
          @click="copy(row.label)"
        />
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
import { ColumnClassesMethod, TableColumn } from '@/types/table'

import { useToast } from '@/composables'

export type CustomProperty = { label: string; value: string }

defineProps<{
  title: string
  values: CustomProperty[]
}>()

defineSlots<{
  description: () => unknown
}>()

const { notify } = useToast()

const columnClasses: ColumnClassesMethod<CustomProperty> = (column) => {
  if (column.label === 'actions') {
    return 'custom-properties-viewer__action-column'
  }
}

const columns = [
  { label: 'actions', width: '34px' },
  { label: 'label', property: 'label' },
  { label: 'value', property: 'value' },
] as const satisfies TableColumn<CustomProperty>[]

function copy(property: string): void {
  navigator.clipboard.writeText(property)

  notify({
    icon: 'copy',
    message: 'Copied!',
    duration: 750,
  })
}
</script>

<style>
.custom-properties-viewer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.custom-properties-viewer__title {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  letter-spacing: var(--letter-spacing-lg);
}

.custom-properties-viewer__description {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.custom-properties-viewer code {
  padding: 1px 2px;
  border-radius: 4px;
  white-space: nowrap;
  color: var(--colors-background-button-error-active);
  background: var(--colors-background-common-default-grey);
}

.custom-properties-viewer__action-column {
  justify-content: flex-end;
}

.custom-properties-viewer__color-preview {
  border: 1px solid lightgray;
  margin-left: 4px;
  height: 20px;
  width: 20px;
  border-radius: 4px;
}
</style>
