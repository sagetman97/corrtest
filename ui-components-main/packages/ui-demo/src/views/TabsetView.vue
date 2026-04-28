<template>
  <component-demo-layout
    name="Tabset"
    :class="{ 'tabset-view__use-header-slots': useHeaderSlots }"
  >
    <section-header
      title="Basic Usage"
      description="A simple tabset component for organizing content into tabs."
    />
    <component-example :code="basicExample">
      <p-tabset
        v-model:selected="basicSelected"
        :tabs="basicTabs"
      >
        <template #home>
          <div>Home content goes here</div>
        </template>
        <template #about>
          <div>About content goes here</div>
        </template>
        <template #contact>
          <div>Contact content goes here</div>
        </template>
      </p-tabset>
    </component-example>

    <section-header
      title="With Tab Counts"
      description="Display counts or badges on tabs."
    />
    <component-example :code="countsExample">
      <p-tabset
        v-model:selected="countsSelected"
        :tabs="countsTabsData"
        show-counts
      >
        <template #inbox>
          <div>Inbox with 5 unread messages</div>
        </template>
        <template #sent>
          <div>Sent items (12 total)</div>
        </template>
        <template #drafts>
          <div>Draft messages (3 total)</div>
        </template>
      </p-tabset>
    </component-example>

    <section-header
      title="Secondary Variant"
      description="Use secondary styling for a more subtle appearance."
    />
    <component-example :code="secondaryExample">
      <p-tabset
        v-model:selected="secondarySelected"
        :tabs="basicTabs"
        secondary
      >
        <template #home>
          <div>Secondary home content</div>
        </template>
        <template #about>
          <div>Secondary about content</div>
        </template>
        <template #contact>
          <div>Secondary contact content</div>
        </template>
      </p-tabset>
    </component-example>

    <section-header
      title="Custom Header Slots"
      description="Customize tab headers with icons or custom content."
    />
    <component-example :code="headerSlotsExample">
      <p-tabset
        v-model:selected="headerSelected"
        :tabs="headerTabsData"
      >
        <template #red-header="{ selected }">
          <p-icon
            :style="{ color: selected ? 'red' : 'inherit' }"
            icon="paint-roller"
          />
        </template>
        <template #green-header="{ selected }">
          <p-icon
            :style="{ color: selected ? 'greenyellow' : 'inherit' }"
            icon="paint-roller"
          />
        </template>
        <template #blue-header="{ selected }">
          <p-icon
            :style="{ color: selected ? 'blue' : 'inherit' }"
            icon="paint-roller"
          />
        </template>

        <template #red>
          <div class="tabset-view__red">Red content with custom header</div>
        </template>
        <template #green>
          <div class="tabset-view__greenish-yellow">Green content with custom header</div>
        </template>
        <template #blue>
          <div class="tabset-view__blue">Blue content with custom header</div>
        </template>
      </p-tabset>
    </component-example>

    <section-header
      title="Router Integration"
      description="Integrate tabs with Vue Router for URL-based navigation."
    />
    <component-example :code="routerExample">
      <p-tabset
        v-model:selected="routerSelected"
        :tabs="routerTabs"
      >
        <router-view />
      </p-tabset>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Tabset with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="useRouter"
          label="Use router"
        />

        <p-toggle
          v-model="useHeaderSlots"
          label="Use header slots"
        />

        <p-toggle
          v-model="showCounts"
          label="Show counts"
        />

        <p-toggle
          v-model="secondary"
          label="Show secondary"
        />

        <div>
          <p>Variant:</p>
          <p-radio
            v-model="variant"
            label="Default"
            value="default"
            name="variant"
          />
          <p-radio
            v-model="variant"
            label="AI"
            value="ai"
            name="variant"
          />
        </div>

        <p>Selected Tab: {{ selectedTab }}</p>
      </p-form>
      <template v-if="useRouter">
        <p-tabset
          v-model:selected="routerSelected"
          :tabs="routerTabs"
          :show-counts="showCounts"
          :secondary="secondary"
        >
          <template
            v-if="useHeaderSlots"
            #red-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'red' : 'inherit' }"
              icon="paint-roller"
            />
          </template>
          <template
            v-if="useHeaderSlots"
            #green-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'greenyellow' : 'inherit' }"
              icon="paint-roller"
            />
          </template>
          <template
            v-if="useHeaderSlots"
            #blue-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'blue' : 'inherit' }"
              icon="paint-roller"
            />
          </template>
          <router-view />
        </p-tabset>
      </template>

      <template v-else>
        <p-tabset
          v-model:selected="selectedTab"
          :tabs="tabs"
          :show-counts="showCounts"
          :secondary="secondary"
        >
          <template
            v-if="useHeaderSlots"
            #red-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'red' : 'inherit' }"
              icon="paint-roller"
            />
          </template>
          <template
            v-if="useHeaderSlots"
            #green-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'greenyellow' : 'inherit' }"
              icon="paint-roller"
            />
          </template>
          <template
            v-if="useHeaderSlots"
            #blue-header="{ selected }"
          >
            <p-icon
              :style="{ color: selected ? 'blue' : 'inherit' }"
              icon="paint-roller"
            />
          </template>

          <template #red>
            <div class="tabset-view__red">red</div>
          </template>

          <template #green>
            <div class="tabset-view__greenish-yellow">greenish-yellow</div>
          </template>

          <template #blue>
            <div class="tabset-view__blue">blue</div>
          </template>
        </p-tabset>
      </template>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { Tab } from '@/types'

import { useTabRoutes } from '@/composables'

// Example values for different sections
const basicSelected = ref('home')
const countsSelected = ref('inbox')
const secondarySelected = ref('home')
const headerSelected = ref('red')

// Interactive example
const useRouter = ref(false)
const useHeaderSlots = ref(false)
const showCounts = ref(false)
const secondary = ref(false)
const variant = ref<'default' | 'ai'>('default')

// Tab data for examples
const basicTabs: Tab[] = [
  { label: 'Home', value: 'home' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' },
]

const countsTabsData: Tab[] = [
  { label: 'Inbox', value: 'inbox', count: 5 },
  { label: 'Sent', value: 'sent', count: 12 },
  { label: 'Drafts', value: 'drafts', count: 3 },
]

const headerTabsData: Tab[] = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
]

type ExampleType = 'blue' | 'red' | 'green'

const tabs = computed(
  () =>
    [
      { label: 'Red', value: 'red', count: Math.round(Math.random() * 10), variant: variant.value },
      {
        label: 'Green',
        value: 'green',
        count: Math.round(Math.random() * 10),
        variant: variant.value,
      },
      { label: 'Blue', value: 'blue', count: Math.round(Math.random() * 10), variant: variant.value },
    ] as const satisfies Tab<ExampleType>[]
)

const selectedTab = ref<ExampleType>('red')

const { tabs: routerTabs, selected: routerSelected } = useTabRoutes([
  {
    label: 'red',
    count: Math.round(Math.random() * 10),
    route: { query: { color: 'red' } },
  },
  {
    label: 'green',
    count: Math.round(Math.random() * 10),
    route: { query: { color: 'greenish-yellow' } },
  },
  {
    label: 'blue',
    count: Math.round(Math.random() * 10),
    route: { query: { color: 'blue' } },
  },
])

// Code examples
const basicExample = {
  code: `<p-tabset
  v-model:selected="selectedTab"
  :tabs="tabs"
>
  <template #home>
    <div>Home content goes here</div>
  </template>
  <template #about>
    <div>About content goes here</div>
  </template>
  <template #contact>
    <div>Contact content goes here</div>
  </template>
</p-tabset>`,
  language: 'vue-html',
}

const countsExample = {
  code: `<p-tabset
  v-model:selected="selectedTab"
  :tabs="tabsWithCounts"
  show-counts
>
  <template #inbox>
    <div>Inbox with 5 unread messages</div>
  </template>
</p-tabset>`,
  language: 'vue-html',
}

const secondaryExample = {
  code: `<p-tabset
  v-model:selected="selectedTab"
  :tabs="tabs"
  secondary
>
  <template #home>
    <div>Secondary home content</div>
  </template>
</p-tabset>`,
  language: 'vue-html',
}

const headerSlotsExample = {
  code: `<p-tabset
  v-model:selected="selectedTab"
  :tabs="tabs"
>
  <template #red-header="{ selected }">
    <p-icon
      :style="{ color: selected ? 'red' : 'inherit' }"
      icon="paint-roller"
    />
  </template>

  <template #red>
    <div>Red content with custom header</div>
  </template>
</p-tabset>`,
  language: 'vue-html',
}

const routerExample = {
  code: `<p-tabset
  v-model:selected="routerSelected"
  :tabs="routerTabs"
>
  <router-view />
</p-tabset>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-tabset
  v-model:selected="selectedTab"
  :tabs="tabs"
  :show-counts="showCounts"
  :secondary="secondary"
>
  <!-- Custom header slots when enabled -->
  <template v-if="useHeaderSlots" #red-header="{ selected }">
    <p-icon :style="{ color: selected ? 'red' : 'inherit' }" icon="paint-roller" />
  </template>

  <!-- Tab content -->
  <template #red>
    <div>Red content</div>
  </template>
</p-tabset>`,
  language: 'vue-html',
}
</script>

<style>
.tabset-view__red {
  color: red;
}

.tabset-view__greenish-yellow {
  color: greenyellow;
}

.tabset-view__blue {
  color: blue;
}

.tabset-view__use-header-slots .polly-tabset--selected-red {
  --polly-tabset-selected-foreground-color: red;
}

.tabset-view__use-header-slots .polly-tabset--selected-greenish-yellow {
  --polly-tabset-selected-foreground-color: greenyellow;
}

.tabset-view__use-header-slots .polly-tabset--selected-blue {
  --polly-tabset-selected-foreground-color: blue;
}
</style>
