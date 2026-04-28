<template>
  <component-demo-layout
    class="timeline-view"
    name="Timeline"
  >
    <section-header
      title="Basic Usage"
      description="A simple timeline component using an array of items."
    />
    <component-example :code="basicExample" />

    <section-header
      title="Custom Content"
      description="Use slots to customize timeline item content with complex layouts."
    />

    <component-example :code="customExample">
      <p-timeline :items="customItems">
        <template #default="{ items }">
          <p-timeline-item
            v-for="item in items"
            :key="item.title"
            :disabled="item.disabled"
          >
            <template #header>
              <div class="polly-timeline__header">
                <div class="polly-timeline__title">{{ item.title }}</div>
                <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
                <div class="polly-timeline__label">{{ item.label }}</div>
                <div class="polly-timeline__price">{{ item.price }}</div>
              </div>
            </template>
            <template #content>
              <div>{{ item.subtitle }}</div>
            </template>
          </p-timeline-item>
        </template>
      </p-timeline>
    </component-example>

    <section-header
      title="Only open one item"
      description="Only one timeline item can be open at a time (without custom slots)."
    />

    <component-example :code="accordionBasicExample">
      <p-timeline
        single-open
        :items="basicItems"
      />
    </component-example>

    <section-header
      title="Only open one item with custom slots"
      description="Use isOpen and setOpen slot props to coordinate single-open behavior with custom content."
    />

    <component-example :code="accordionExample">
      <p-timeline
        single-open
        :items="customItems"
      >
        <template #default="{ items, isOpen, setOpen }">
          <p-timeline-item
            v-for="(item, index) in items"
            :key="item.title"
            :disabled="item.disabled"
            :open="isOpen(index)"
            @update:open="(value) => setOpen(index, value)"
          >
            <template #header>
              <div class="polly-timeline__header">
                <div class="polly-timeline__title">{{ item.title }}</div>
                <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
                <div class="polly-timeline__label">{{ item.label }}</div>
                <div class="polly-timeline__price">{{ item.price }}</div>
              </div>
            </template>
            <template #content>
              <div>{{ item.subtitle }}</div>
            </template>
          </p-timeline-item>
        </template>
      </p-timeline>
    </component-example>

    <section-header
      title="Single event"
      description="A timeline with a single item - no timeline styling (dot and line), always open and non-interactive"
    />
    <component-example :code="singleEventExample">
      <p-timeline :items="[singleEventItem]">
        <template #default="{ items, isSingleItem }">
          <p-timeline-item
            v-for="item in items"
            :key="item.title"
            :force-open="isSingleItem"
          >
            <template #header>
              <div class="polly-timeline__header">
                <div class="polly-timeline__title">{{ item.title }}</div>
                <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
                <div class="polly-timeline__label">{{ item.label }}</div>
                <div class="polly-timeline__price">{{ item.price }}</div>
              </div>
            </template>
            <template #content>
              <p-table
                :data="singleEventTableData"
                :columns="singleEventColumns"
                variant="compact"
              />
            </template>
          </p-timeline-item>
        </template>
      </p-timeline>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '@/types'

type CustomItem = {
  title: string
  subtitle: string
  timestamp: string
  label: string
  price: string
  disabled?: boolean
}

type SingleEventTableData = {
  name: string
  status: string
  amount: string
}

type SingleEventItem = CustomItem

const basicItems = [
  { title: 'Event 1', subtitle: 'First milestone' },
  { title: 'Event 2', subtitle: 'Second milestone' },
  { title: 'Event 3', subtitle: 'Third milestone' },
  { title: 'Event 4', subtitle: 'Final milestone' },
]

const customItems: CustomItem[] = [
  { title: 'Project Started', subtitle: 'Initial planning and setup', timestamp: 'Jan 1, 2024', label: 'Planning', price: '105.10', disabled: true },
  { title: 'Design Complete', subtitle: 'UI/UX design approved', timestamp: 'Jan 15, 2024', label: 'Design', price: '205.50' },
  { title: 'Development', subtitle: 'Implementation in progress', timestamp: 'Feb 1, 2024', label: 'Dev', price: '505.75' },
  { title: 'Testing', subtitle: 'QA and bug fixes', timestamp: 'Mar 1, 2024', label: 'QA', price: '105.00' },
]

const singleEventItem: SingleEventItem = {
  title: 'Project Summary',
  subtitle: 'Q1 2024 Overview',
  timestamp: 'Mar 31, 2024',
  label: 'Total',
  price: '$85,000',
}

const singleEventColumns: TableColumn<SingleEventTableData>[] = [
  { property: 'name', label: 'Name' },
  { property: 'status', label: 'Status' },
  { property: 'amount', label: 'Amount', align: 'right' },
]

const singleEventTableData: SingleEventTableData[] = [
  { name: 'Development', status: 'Completed', amount: '$45,000' },
  { name: 'Design', status: 'Completed', amount: '$25,000' },
  { name: 'Testing', status: 'In Progress', amount: '$15,000' },
]

const singleEventExample = `
<p-timeline :items="[singleEventItem]">
  <template #default="{ items, isSingleItem }">
    <p-timeline-item
      v-for="item in items"
      :key="item.title"
      :force-open="isSingleItem"
    >
      <template #header>
        <div class="polly-timeline__header">
          <div class="polly-timeline__title">{{ item.title }}</div>
          <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
          <div class="polly-timeline__label">{{ item.label }}</div>
          <div class="polly-timeline__price">{{ item.price }}</div>
        </div>
      </template>
      <template #content>
        <p-table
          :data="singleEventTableData"
          :columns="singleEventColumns"
          variant="compact"
        />
      </template>
    </p-timeline-item>
  </template>
</p-timeline>

<script setup>
const singleEventItem = {
  title: 'Project Summary',
  subtitle: 'Q1 2024 Overview',
  timestamp: 'Mar 31, 2024',
  label: 'Total',
  price: '$85,000',
}

const singleEventColumns = [
  { property: 'name', label: 'Name' },
  { property: 'status', label: 'Status' },
  { property: 'amount', label: 'Amount', align: 'right' },
]

const singleEventTableData = [
  { name: 'Development', status: 'Completed', amount: '$45,000' },
  { name: 'Design', status: 'Completed', amount: '$25,000' },
  { name: 'Testing', status: 'In Progress', amount: '$15,000' },
]
/script>
`

const basicExample = `
<p-timeline :items="[
  { title: 'Event 1', subtitle: 'First milestone' },
  { title: 'Event 2', subtitle: 'Second milestone' },
  { title: 'Event 3', subtitle: 'Third milestone' },
  { title: 'Event 4', subtitle: 'Final milestone' },
]" />
`

const customExample = `
<p-timeline :items="customItems">
  <template #default="{ items }">
    <p-timeline-item
      v-for="item in items"
      :key="item.title"
      :disabled="item.disabled"
    >
      <template #header>
        <div class="polly-timeline__header">
          <div class="polly-timeline__title">{{ item.title }}</div>
          <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
          <div class="polly-timeline__label">{{ item.label }}</div>
          <div class="polly-timeline__price">{{ item.price }}</div>
        </div>
      </template>
      <template #content>
        <div>{{ item.subtitle }}</div>
      </template>
    </p-timeline-item>
  </template>
</p-timeline>

<script setup>
const customItems = [
  { title: 'Project Started', subtitle: 'Initial planning and setup', timestamp: 'Jan 1, 2024', label: 'Planning', price: '$105.10' },
  { title: 'Design Complete', subtitle: 'UI/UX design approved', timestamp: 'Jan 15, 2024', label: 'Design', price: '$205.50' },
  { title: 'Development', subtitle: 'Implementation in progress', timestamp: 'Feb 1, 2024', label: 'Dev', price: '$505.75' },
  { title: 'Testing', subtitle: 'QA and bug fixes', timestamp: 'Mar 1, 2024', label: 'QA', price: '$105.00' },
]
/script>
`

const accordionBasicExample = `
<p-timeline
  single-open
  :items="[
    { title: 'Event 1', subtitle: 'First milestone' },
    { title: 'Event 2', subtitle: 'Second milestone' },
    { title: 'Event 3', subtitle: 'Third milestone' },
    { title: 'Event 4', subtitle: 'Final milestone' },
  ]"
/>
`

const accordionExample = `
<p-timeline
  single-open
  :items="customItems"
>
  <template #default="{ items, isOpen, setOpen }">
    <p-timeline-item
      v-for="(item, index) in items"
      :key="item.title"
      :disabled="item.disabled"
      :open="isOpen(index)"
      @update:open="(value) => setOpen(index, value)"
    >
      <template #header>
        <div class="polly-timeline__header">
          <div class="polly-timeline__title">{{ item.title }}</div>
          <div class="polly-timeline__timestamp">{{ item.timestamp }}</div>
          <div class="polly-timeline__label">{{ item.label }}</div>
          <div class="polly-timeline__price">{{ item.price }}</div>
        </div>
      </template>
      <template #content>
        <div>{{ item.subtitle }}</div>
      </template>
    </p-timeline-item>
  </template>
</p-timeline>

<script setup>
const customItems = [
  { title: 'Project Started', subtitle: 'Initial planning and setup', timestamp: 'Jan 1, 2024', label: 'Planning', price: '$105.10', disabled: true },
  { title: 'Design Complete', subtitle: 'UI/UX design approved', timestamp: 'Jan 15, 2024', label: 'Design', price: '$205.50' },
  { title: 'Development', subtitle: 'Implementation in progress', timestamp: 'Feb 1, 2024', label: 'Dev', price: '$505.75' },
  { title: 'Testing', subtitle: 'QA and bug fixes', timestamp: 'Mar 1, 2024', label: 'QA', price: '$105.00' },
]
/script>
`
</script>

<style>
.timeline-view .polly-timeline {
  margin-top: var(--spacing-md);
}

.polly-timeline__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'title price'
    'timestamp label';
}

.polly-timeline__title {
  grid-area: title;
  font-weight: var(--font-weight-medium);
}

.polly-timeline__timestamp {
  grid-area: timestamp;

  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-medium);
}

.polly-timeline__label {
  grid-area: label;
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-medium);
}

.polly-timeline__price {
  grid-area: price;
  text-align: right;
  font-weight: var(--font-weight-medium);
}
</style>
