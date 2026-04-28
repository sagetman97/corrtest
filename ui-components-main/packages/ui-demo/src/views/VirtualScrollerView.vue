<template>
  <component-demo-layout name="Virtual Scroller">
    <section-header
      title="Basic Virtual Scroller"
      description="Efficiently render large lists by only displaying visible items."
    />
    <component-example :code="basicExample">
      <div class="virtual-scroller-demo">
        <p-virtual-scroller
          :items="basicItems"
          :item-estimate-height="basicItemHeight"
          :item-key="getItemKeyById"
        >
          <template #default="{ item, index }">
            <div class="demo-item">
              <h4>Item #{{ index + 1 }}</h4>
              <p>{{ item.name }}</p>
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </component-example>

    <section-header
      title="Custom Item Height"
      description="Specify estimated height for better performance."
    />
    <component-example :code="customHeightExample">
      <div class="virtual-scroller-demo">
        <p-virtual-scroller
          :items="tallItems"
          :item-estimate-height="tallItemHeight"
          :item-key="getItemKeyById"
        >
          <template #default="{ item, index }">
            <div class="demo-item demo-item--tall">
              <h4>Tall Item #{{ index + 1 }}</h4>
              <p>{{ item.description }}</p>
              <p>This item has more content and is taller than the basic items.</p>
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </component-example>

    <section-header
      title="Custom Chunk Size"
      description="Control how many items are rendered in each chunk."
    />
    <component-example :code="chunkSizeExample">
      <div class="virtual-scroller-demo">
        <p-virtual-scroller
          :items="basicItems"
          :item-estimate-height="basicItemHeight"
          :chunk-size="10"
          :item-key="getItemKeyById"
        >
          <template #default="{ item, index }">
            <div class="demo-item">
              <h4>Chunked Item #{{ index + 1 }}</h4>
              <p>{{ item.name }} (Chunk size: 10)</p>
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </component-example>

    <section-header
      title="Large Dataset"
      description="Virtual scroller handling thousands of items efficiently."
    />
    <component-example :code="largeDatasetExample">
      <div class="virtual-scroller-demo">
        <p>Rendering {{ largeItems.length.toLocaleString() }} items efficiently</p>
        <p-virtual-scroller
          :items="largeItems"
          :item-estimate-height="basicItemHeight"
          :chunk-size="50"
          :item-key="getItemKeyById"
        >
          <template #default="{ item, index }">
            <div class="demo-item">
              <h4>Large Item #{{ index + 1 }}</h4>
              <p>ID: {{ item.id }}</p>
              <p>Value: {{ item.value }}</p>
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Virtual scroller with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-input-number
          v-model="formValues.count"
          v-bind="fields.count"
          label="Item Count"
        />

        <p-input-number
          v-model="formValues.chunkSize"
          v-bind="fields.chunkSize"
          label="Chunk Size"
          message="Default 50"
        />

        <p-input-number
          :model-value="chunkCount.toString()"
          disabled
          label="# Chunks"
        />

        <p-input-number
          :model-value="itemCount.toString()"
          disabled
          label="# Rendered Items"
        />

        <p-toggle
          v-model="formValues.chunkOutline"
          v-bind="fields.chunkOutline"
          label="Outline Chunks"
        />
      </p-form>
      <div
        ref="containerElement"
        class="virtual-scroller-view__container"
        :class="classes"
      >
        <p-virtual-scroller
          :items="items"
          :item-estimate-height="itemEstimateHeight"
          :chunk-size="formOutput.chunkSize"
          :item-key="getItemKey"
        >
          <template #default="{ item, index }">
            <div class="virtual-scroller-view__item">
              <h3>Item #{{ index + 1 }}</h3>
              <pre>{{ JSON.stringify(item, null, 2) }}</pre>
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

import * as v from 'valibot'

import { ItemKeyMethod } from '@/types'
import { stringToNumberSchema } from '@/types/validation'

import { useMutationObserver, useValidation, useValidationFields } from '@/composables'
import { createUnitValue, randomId } from '@/utilities'

type BasicItem = {
  id: string
  name: string
}

type TallItem = {
  id: string
  name: string
  description: string
}

type LargeItem = {
  id: string
  value: number
}

// Example data for different sections
const basicItems = computed<BasicItem[]>(() =>
  new Array(100).fill(null).map((_, index) => ({
    id: `basic-${index}`,
    name: `Basic Item ${index + 1}`,
  }))
)

const tallItems = computed<TallItem[]>(() =>
  new Array(50).fill(null).map((_, index) => ({
    id: `tall-${index}`,
    name: `Tall Item ${index + 1}`,
    description: `This is a longer description for item ${index + 1} that makes the item taller.`,
  }))
)

const largeItems = computed<LargeItem[]>(() =>
  new Array(10000).fill(null).map((_, index) => ({
    id: `large-${index}`,
    value: Math.floor(Math.random() * 1000),
  }))
)

// Item heights for different examples
const basicItemHeight = createUnitValue(80, 'px')
const tallItemHeight = createUnitValue(120, 'px')

type ItemExample = {
  id: string
  foo: string
  bar: number
}

function getItemKeyById<T extends { id: string }>(item: T): string {
  return item.id
}

const items = computed<ItemExample[]>(() =>
  new Array(formOutput.count).fill(null).map(() => ({
    id: randomId(),
    foo: randomId(),
    bar: Math.random(),
  }))
)

const itemEstimateHeight = createUnitValue(170, 'px')
const defaultValues = {
  count: '1000',
  chunkSize: '20',
  chunkOutline: false,
}
const formValues = reactive({ ...defaultValues })

const formSchema = v.object({
  count: v.pipe(stringToNumberSchema(), v.minValue(1)),
  chunkSize: v.pipe(stringToNumberSchema(), v.minValue(1)),
  chunkOutline: v.boolean(),
})

const { validate, parse } = useValidation(formSchema)

const fields = useValidationFields(formSchema)
const formOutput = reactive({
  ...parse(defaultValues),
})

watch(formValues, (values) => {
  if (validate(values)) {
    Object.assign(formOutput, parse(values))
  }
})

const itemCount = ref(0)
const chunkCount = computed(() => Math.ceil(formOutput.count / formOutput.chunkSize))
const containerElement = ref<HTMLDivElement>()

const updateItemCount: MutationCallback = () => {
  const elements = document.querySelectorAll('.virtual-scroller-view__item')

  itemCount.value = elements.length
}

const observer = useMutationObserver(updateItemCount)

onMounted(() => {
  observer.observe(containerElement, { childList: true, subtree: true })
})

const getItemKey: ItemKeyMethod<ItemExample> = (item, index) => {
  return item.id + index
}

const classes = computed(() => ({
  'virtual-scroller-view__container--outlined': formOutput.chunkOutline,
}))

// Code examples
const basicExample = [
  {
    code: `const items = computed(() =>
  new Array(100).fill(null).map((_, index) => ({
    id: \`item-\${index}\`,
    name: \`Item \${index + 1}\`,
  }))
)`,
    language: 'typescript',
  },
  {
    code: `<p-virtual-scroller
  :items="items"
  :item-estimate-height="80"
>
  <template #default="{ item, index }">
    <div class="item">
      <h4>Item #{{ index + 1 }}</h4>
      <p>{{ item.name }}</p>
    </div>
  </template>
</p-virtual-scroller>`,
    language: 'vue-html',
  },
]

const customHeightExample = {
  code: `<p-virtual-scroller
  :items="items"
  :item-estimate-height="120"
>
  <template #default="{ item, index }">
    <div class="tall-item">
      <h4>Tall Item #{{ index + 1 }}</h4>
      <p>{{ item.description }}</p>
      <p>Additional content making this item taller.</p>
    </div>
  </template>
</p-virtual-scroller>`,
  language: 'vue-html',
}

const chunkSizeExample = {
  code: `<p-virtual-scroller
  :items="items"
  :item-estimate-height="80"
  :chunk-size="10"
>
  <template #default="{ item, index }">
    <div class="item">
      <h4>Chunked Item #{{ index + 1 }}</h4>
      <p>{{ item.name }} (Chunk size: 10)</p>
    </div>
  </template>
</p-virtual-scroller>`,
  language: 'vue-html',
}

const largeDatasetExample = [
  {
    code: `const largeItems = computed(() =>
  new Array(10000).fill(null).map((_, index) => ({
    id: \`large-\${index}\`,
    value: Math.floor(Math.random() * 1000),
  }))
)`,
    language: 'typescript',
  },
  {
    code: `<p-virtual-scroller
  :items="largeItems"
  :item-estimate-height="80"
  :chunk-size="50"
>
  <template #default="{ item, index }">
    <div class="item">
      <h4>Large Item #{{ index + 1 }}</h4>
      <p>ID: {{ item.id }}</p>
      <p>Value: {{ item.value }}</p>
    </div>
  </template>
</p-virtual-scroller>`,
    language: 'vue-html',
  },
]

const interactiveExample = {
  code: `<p-virtual-scroller
  :items="items"
  :item-estimate-height="itemEstimateHeight"
  :chunk-size="chunkSize"
  :item-key="getItemKey"
>
  <template #default="{ item, index }">
    <div class="item">
      <h3>Item #{{ index + 1 }}</h3>
      <pre>{{ JSON.stringify(item, null, 2) }}</pre>
    </div>
  </template>
</p-virtual-scroller>`,
  language: 'vue-html',
}
</script>

<style>
.virtual-scroller-demo {
  height: 300px;
  border: 1px solid var(--colors-border-light);
  border-radius: var(--border-radius-base);
}

.demo-item {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--colors-border-light);
  background: var(--colors-background-light);
}

.demo-item--tall {
  padding: var(--spacing-base);
}

.demo-item h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--colors-text-primary);
}

.demo-item p {
  margin: 0;
  color: var(--colors-text-secondary);
  font-size: var(--font-size-sm);
}

.virtual-scroller-view__item {
  padding: var(--spacing-sm);
  color: var(--colors-text-icon-accent);
  font-weight: var(--font-weight-bold);
  border: 1px solid var(--colors-text-icon-accent);
  background: var(--colors-text-icon-accent-medium);
  border-radius: var(--border-radius-lg);
  margin: 0 var(--spacing-xxs);
  width: 450px;
}

.virtual-scroller-view__item pre {
  color: var(--colors-text-icon-light);
  background-color: var(--colors-text-icon-accent);
  font-weight: normal;
  margin-top: var(--spacing-sm);
}

.virtual-scroller-view__container {
  max-height: 500px;
  counter-reset: line-number;
  overflow-y: auto;
}

.virtual-scroller-view__container .polly-virtual-scroller-chunk {
  --polly-virtual-scroller-gap: var(--spacing-xs);
}

.virtual-scroller-view__container--outlined .polly-virtual-scroller-chunk {
  background-color: rgba(50, 205, 50, 0.05);
  border: 1px solid limegreen;
  counter-increment: line-number;
}

.virtual-scroller-view__container--outlined .polly-virtual-scroller-chunk::before {
  color: limegreen;
  font-weight: bold;
  content: 'Chunk #' counter(line-number);
}
</style>
