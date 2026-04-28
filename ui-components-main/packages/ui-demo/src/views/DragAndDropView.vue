<template>
  <component-demo-layout name="Drag and Drop">
    <section-header
      title="Basic Usage"
      description="A simple drag and drop component. New Order of items is reflected in the v-model."
    />
    <component-example :code="basicExample">
      <div class="drag-and-drop-view__demo-container">
        <p-drag-and-drop v-model:items="items">
          <template #default="{ item }">
            <div class="drag-and-drop-view__item">
              {{ item.label }}
            </div>
          </template>
        </p-drag-and-drop>
      </div>
      {{ items }}
    </component-example>
    <section-header
      title="Adding and Removing Items"
      description="You can add and remove items from the list."
    />
    <component-example :code="dynamicItemsExample">
      <div class="drag-and-drop-view__demo-container">
        <p-drag-and-drop v-model:items="dynamicItems">
          <template #default="{ item }">
            <div class="drag-and-drop-view__item">
              {{ item }}
            </div>
          </template>
        </p-drag-and-drop>
      </div>
      <div class="drag-and-drop-view__box">
        <p-button @click="dynamicItems.push(dynamicItems.length + 1)">Add Item</p-button>
        <p-button @click="dynamicItems.pop()">Remove Item</p-button>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
])

const basicExample = {
  code: `<p-drag-and-drop v-model:items="items">
  <template #default="{ item }">
    <div class="drag-and-drop-view__item">
      {{ item.label }}
    </div>
  </template>
</p-drag-and-drop>`,
  language: 'vue-html',
}

const dynamicItems = ref([1, 2, 3, 4, 5, 6])

const dynamicItemsExample = {
  code: `<div class="drag-and-drop-view__demo-container">
  <p-drag-and-drop>
    <div
      v-for="index in numberOfDynamicItems"
      class="drag-and-drop-view__item"
      :key="index"
    >
      Item {{ index - 1 }}
    </div>
  </p-drag-and-drop>
</div>
<div class="drag-and-drop-view__box">
  <p-button @click="numberOfDynamicItems.push(numberOfDynamicItems.length + 1)">Add Item</p-button>
  <p-button @click="numberOfDynamicItems.pop()">Remove Item</p-button>
</div>`,
  language: 'vue-html',
}
</script>

<style>
.drag-and-drop-view__demo-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.drag-and-drop-view__item {
  justify-content: center;
  display: flex;
  padding: var(--spacing-sm);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  width: 300px;
}

.drag-and-drop-view__box {
  display: flex;
  gap: var(--spacing-sm);
}
</style>
