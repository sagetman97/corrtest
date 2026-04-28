<template>
  <div class="polly-table">
    <div
      class="polly-table__table"
      :class="classes.table"
      role="table"
      :aria-colcount="columns.length"
      :aria-rowcount="data.length"
    >
      <div class="polly-table__header">
        <template
          v-for="(column, columnIndex) in columns"
          :key="column.label"
        >
          <div
            :id="`polly-table-header-cell-${columnIndex}`"
            class="polly-table__header-cell"
            :class="classes.headerCell(column)"
            :style="getLeft(columnIndex)"
            :title="column.label"
            :data-testid="column.dataTestidWithHeader"
            :aria-colindex="columnIndex"
          >
            <template v-if="column.showSort && column.property">
              <PSortButton
                v-model:sort="sort"
                :property="column.property"
              >
                <slot
                  v-if="isSlot(column.kebabLabelWithHeader)"
                  :name="column.kebabLabelWithHeader"
                  v-bind="{ column, columnIndex }"
                >
                  {{ column.label }}
                </slot>
              </PSortButton>
            </template>

            <template v-else-if="isSelectAllColumn(column)">
              <PCheckbox
                v-if="!limitSelection"
                v-model="allSelected"
                class="polly-table__checkbox"
                :indeterminate="!!selected.length"
              />
              <PCheckbox
                v-else
                v-model="allSelected"
                :disabled="selected.length === 0"
                class="polly-table__checkbox"
                :indeterminate="!!selected.length"
              />
            </template>

            <template v-else>
              <div class="polly-table__header-cell-content">
                <slot
                  v-if="isSlot(column.kebabLabelWithHeader)"
                  :name="column.kebabLabelWithHeader"
                  v-bind="{ column, columnIndex }"
                >
                  {{ column.label }}
                </slot>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div
        v-for="(row, rowIndex) in data"
        :key="getRowKeyValue(row, rowIndex)"
        class="polly-table__body-row"
        :class="classes.bodyRow(row, rowIndex)"
        role="row"
        :aria-rowindex="rowIndex"
      >
        <template
          v-for="(column, columnIndex) in columns"
          :key="column.label"
        >
          <div
            class="polly-table__body-cell"
            :data-testid="column.dataTestid"
            :class="classes.bodyCell(column, columnIndex, row, rowIndex)"
            :style="getLeft(columnIndex)"
            role="cell"
            :aria-colindex="columnIndex"
            :aria-rowindex="rowIndex"
            :title="String(getValueForCell(column, row) ?? '')"
            @click="(event) => handleRowClick(event, column, row)"
            @dblclick="(event) => handleRowDblclick(event, column, row)"
          >
            <slot
              v-if="isSlot(column.kebabLabel)"
              :name="column.kebabLabel"
              v-bind="{
                column,
                columnIndex,
                row,
                rowIndex,
                value: getValueForCell(column, row),
              }"
            >
              <template v-if="isSelectAllColumn(column)">
                <PCheckbox
                  class="polly-table__checkbox"
                  :disabled="(!getIsSelected(row) && selected.length === selectionLimit) || getIsDisabledRowSelection(row)"
                  :model-value="getIsSelected(row)"
                  @update:model-value="(isSelected) => setIsSelected(row, isSelected)"
                />
              </template>

              <template v-else>
                {{ getValueForCell(column, row) ?? emDash }}
              </template>
            </slot>
          </div>
        </template>
      </div>
    </div>
    <div
      v-if="!data.length"
      class="polly-table__body polly-table__empty-body"
    >
      <div
        v-if="emptyTitle || slots.emptyTitle"
        class="polly-table__empty-title"
      >
        <slot name="emptyTitle">
          {{ emptyTitle }}
        </slot>
      </div>

      <div
        v-if="emptyMessage || slots.emptyMessage"
        class="polly-table__empty-message"
      >
        <slot name="emptyMessage">
          {{ emptyMessage }}
        </slot>
      </div>
    </div>
    <template v-if="!!slots.footer">
      <div class="polly-table__footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup generic="TValue extends TableData, TColumns extends TableColumn<TValue>[]">
import { computed } from 'vue'

import { kebabCase } from 'string-ts'

import { TableColumn, TableData, TableEmits, TableProps, TableSlots } from '@/types/table'

import { PSortButton } from '@/components/button'
import { PCheckbox } from '@/components/checkbox'
import { asArray, emDash } from '@/utilities'

const {
  emptyTitle = 'No Data',
  emptyMessage = 'There is no data to display.',
  fullWidth = true,
  columns: columnsProp,
  data,
  sort: sortProp,
  selected: selectedProp,
  selectionLimit,
  rowClasses,
  columnClasses,
  cellClasses,
  rowKey,
  disabledRowSelection,
  variant = 'default',
  headerUnderline = false,
} = defineProps<TableProps<TValue, TColumns>>()
const emit = defineEmits<TableEmits<TValue>>()
const slots = defineSlots<TableSlots<TValue, TColumns>>()

type ColumnWithSlotNamesAndShowSort = TableColumn<TValue> & {
  kebabLabelWithHeader: string
  kebabLabel: string
  showSort: boolean
  dataTestidWithHeader: string
}

const columns = computed<ColumnWithSlotNamesAndShowSort[]>(() => {
  const selection: ColumnWithSlotNamesAndShowSort[] = supportSelection.value ? [selectionColumn] : []

  const value: ColumnWithSlotNamesAndShowSort[] = columnsProp
    .filter((column) => column.visible !== false)
    .map((column) => {
      const minWidth = column.minWidth ?? (column.truncate ? '200px' : 'min-content')
      const maxWidth = column.maxWidth ?? (column.truncate ? 'min-content' : 'auto')
      const baseWidth = column.width ?? minWidth

      const width = fullWidth ? `minmax(${minWidth}, ${maxWidth})` : `minmax(${minWidth}, ${baseWidth})`

      return {
        width,
        align: 'left',
        ...column,
        truncate: column.truncate ?? false,
        kebabLabelWithHeader: kebabCase(column.label + '-header'),
        kebabLabel: kebabCase(column.label),
        showSort: column.sortable ?? !!sortProp,
        dataTestid: column.dataTestid ?? kebabCase(column.label),
        dataTestidWithHeader: (column.dataTestid ?? kebabCase(column.label)) + '-header',
      }
    })
  return selection.concat(value)
})

function isSlot(value: string): value is keyof TableSlots<TValue, TColumns> {
  return columns.value.some(({ kebabLabel, kebabLabelWithHeader }) => [kebabLabel, kebabLabelWithHeader].includes(value))
}

const sort = computed({
  get() {
    return sortProp ?? {}
  },
  set(value) {
    emit('update:sort', value)
  },
})

const supportSelection = computed(() => selectedProp !== undefined)
const limitSelection = computed(() => typeof selectionLimit === 'number')
const selectionColumn: ColumnWithSlotNamesAndShowSort & { _isSelectAll: true } = {
  label: 'Select All',
  width: '42px',
  kebabLabel: '',
  kebabLabelWithHeader: '',
  dataTestid: 'selection',
  dataTestidWithHeader: 'selection-header',
  showSort: false,
  _isSelectAll: true,
  freeze: true,
}

function isSelectAllColumn(column: unknown): boolean {
  return !!column && typeof column === 'object' && '_isSelectAll' in column
}

const selected = computed({
  get() {
    return selectedProp ?? []
  },
  set(value) {
    emit('update:selected', value)
  },
})

const allSelected = computed<boolean | null>({
  get() {
    switch (selected.value.length) {
      case 0:
        return false
      case selectionLimit:
        return true
      case data.length:
        return true
      default:
        return null
    }
  },
  set(value) {
    if (limitSelection.value) {
      return (selected.value = [])
    }

    switch (value) {
      case true:
        selected.value = data.slice()
        break
      case false:
        selected.value = []
        break
    }
  },
})

const gridTemplateColumns = computed(() => {
  const widths = columns.value.map((column) => column.width)

  return widths.join(' ')
})

const showFooter = computed(() => !!slots.footer)

const classes = computed(() => ({
  table: [
    {
      'polly-table__table--with-footer': showFooter.value,
      'polly-table__table--header-underline': headerUnderline,
    },
    `polly-table__table--${variant}`,
  ],
  bodyRow: (row: TValue, rowIndex: number) => rowClasses?.(row, rowIndex),
  bodyCell: (column: TColumns[number], columnIndex: number, row: TValue, rowIndex: number) => {
    const value = getValueForCell(column, row)

    return [
      `polly-table__body-cell--${column.align}`,
      {
        'polly-table__body-cell--sticky': column.freeze || isSelectAllColumn(column),
        'polly-table__body-cell--truncate': column.truncate,
      },
      ...asArray(columnClasses?.(column, columnIndex)),
      ...asArray(cellClasses?.(value, column, columnIndex, row, rowIndex)),
    ]
  },
  headerCell: (column: TColumns[number]) => {
    return [
      `polly-table__header-cell--${column.align}`,
      {
        'polly-table__header-cell--sticky': column.freeze || isSelectAllColumn(column),
      },
    ]
  },
}))

function getLeft(index: number): string {
  const sum = columns.value
    .slice(0, index)
    .filter((column) => column.freeze)
    .map(() => getColumnWidth(index - 1))
    .reduce((sum, width) => sum + width, 0)

  return columns.value[index].freeze ? `left: ${sum}px;` : ''
}

function getColumnWidth(index: number): number {
  const headerCell = document.getElementById(`polly-table-header-cell-${index}`)
  if (!headerCell) return 0
  return Math.floor(headerCell.getBoundingClientRect().width - 1)
}

function getValueForCell(column: TColumns[number], row: TValue): unknown {
  if (!column.property) {
    return undefined
  }

  const value = row[column.property]

  if (value === null || value === undefined || value === '') {
    return undefined
  }

  return value
}

function getRowKeyValue(row: TValue, rowIndex: number): string {
  return rowKey?.(row, rowIndex) ?? `row-${rowIndex}`
}

function getIsDisabledRowSelection(row: TValue): boolean {
  return disabledRowSelection?.(row) ?? false
}

function isSameRow(aRow: TValue, bRow: TValue): boolean {
  return JSON.stringify(aRow) === JSON.stringify(bRow)
}

function getIsSelected(row: TValue): boolean {
  return selected.value.some((selected) => isSameRow(selected, row))
}

function setIsSelected(row: TValue, isSelected: boolean | null): void {
  switch (isSelected) {
    case true:
      selected.value = addToSelected({ ...row })
      break
    case false:
      selected.value = removeFromSelected({ ...row })
      break
  }
}

function addToSelected(row: TValue): TValue[] {
  return [...removeFromSelected(row), row]
}

function removeFromSelected(row: TValue): TValue[] {
  return selected.value.filter((selectedRow) => !isSameRow(selectedRow, row))
}

function isInteractiveElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const cell = target.closest('.polly-table__body-cell')
  if (!cell) return false
  if (target === cell) return false
  return !!target.closest('button, a, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="menuitem"]')
}

function handleRowClick(e: MouseEvent, column: ColumnWithSlotNamesAndShowSort, row: TValue): void {
  if (isSelectAllColumn(column)) return
  if (isInteractiveElement(e.target)) return
  emit('row-click', row)
}

function handleRowDblclick(e: MouseEvent, column: ColumnWithSlotNamesAndShowSort, row: TValue): void {
  if (isSelectAllColumn(column)) return
  if (isInteractiveElement(e.target)) return
  emit('row-dblclick', row)
}
</script>

<style>
.polly-table {
  --polly-table-row-background-color: var(--colors-background-p-table-body-default);
  --polly-table-header-background-color: var(--colors-background-p-table-header);
  --polly-table-max-body-height: 40rem;
  --polly-table-cell-padding: var(--spacing-xs);
  --polly-table-row-gap: var(--spacing-xs);
  width: 100%;
  box-sizing: border-box;
  display: grid;
}

.polly-table__table {
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: v-bind(gridTemplateColumns);
  width: 100%;
  row-gap: var(--polly-table-row-gap);
  box-sizing: border-box;
  overflow: auto;
  max-height: var(--polly-table-max-body-height);
}

.polly-table__table--compact {
  --polly-table-row-background-color: var(--colors-background-p-table-body-default-white);
  --polly-table-header-background-color: var(--colors-background-p-table-header);
  --polly-table-cell-padding: 0px;
  --polly-table-row-gap: 0px;
}

.polly-table__header {
  display: contents;
  transition: box-shadow 200ms ease-in-out;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--polly-table-header-background-color);
}

.polly-table__table--header-underline .polly-table__header-cell {
  border-bottom: 1px solid var(--colors-border-common-default);
  margin-bottom: 2px;
  padding-bottom: 2px;
}

.polly-table__header-cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-inline: var(--spacing-xs);
  padding-block: var(--polly-table-cell-padding);
  gap: var(--spacing-xs);
  background-color: var(--polly-table-header-background-color);
  position: sticky;
  top: 0;
  z-index: 2;
}

.polly-table__table--compact .polly-table__header-cell,
.polly-table__table--compact .polly-table__header-cell .polly-sort-button {
  font-weight: var(--font-weight-semibold);
}

.polly-table__header-cell--sticky {
  position: sticky;
  left: 0;
  z-index: 3;
}

.polly-table__header-cell--left {
  justify-content: flex-start;
}

.polly-table__header-cell--right {
  justify-content: flex-end;
}

.polly-table__header-cell--center {
  justify-content: center;
}

.polly-table__header-cell-content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.polly-table__checkbox {
  margin-bottom: 0;
  padding: 2px;
}

.polly-table__body {
  padding-top: var(--spacing-xs);
  overflow: visible;
  max-height: var(--polly-table-max-body-height);
}

.polly-table__body-row {
  display: contents;
}

@media (hover: hover) and (pointer: fine) {
  .polly-table__body-row:hover {
    --polly-table-row-background-color: var(--colors-background-p-table-body-hover);
  }
}

.polly-table__body-row:active:not(:has(*:active)) {
  --polly-table-row-background-color: var(--colors-background-p-table-body-active);
}

.polly-table__body-cell {
  padding-inline: var(--spacing-xs);
  background-color: var(--polly-table-row-background-color);
  transition: background-color 100ms ease-in-out;
  line-height: 26px;
  padding-block: var(--polly-table-cell-padding);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.polly-table__body-cell:first-child {
  border-top-left-radius: var(--border-radius-xs);
  border-bottom-left-radius: var(--border-radius-xs);
}

.polly-table__body-cell:last-child {
  border-top-right-radius: var(--border-radius-xs);
  border-bottom-right-radius: var(--border-radius-xs);
}

.polly-table__table--compact .polly-table__body-cell {
  border-radius: 0px;
}

.polly-table__body-cell--sticky {
  position: sticky;
  left: 0;
  z-index: var(--layout-above);
}

.polly-table__body-cell--left {
  text-align: left;
}

.polly-table__body-cell--right {
  text-align: right;
}

.polly-table__body-cell--center {
  text-align: center;
}

.polly-table__footer {
  padding: var(--spacing-base);
  box-shadow: 0px -4px 8px -6px var(--colors-border-box-shadow);
  background-color: var(--colors-neutral-white);
}

.polly-table__empty-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-block: var(--spacing-xxl);
  background-color: var(--colors-neutral-white);
}

.polly-table__empty-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.polly-table__empty-message {
  font-size: var(--font-size-md);
  color: var(--colors-text-icon-medium);
}
</style>
