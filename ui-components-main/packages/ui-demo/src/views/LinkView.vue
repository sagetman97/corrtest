<template>
  <component-demo-layout name="Link">
    <section-header
      title="Basic Usage"
      description="A link component that supports both internal routing and external links with customizable icons and states."
    />
    <component-example :code="basicLinkExample">
      <PForm>
        Where to
        <label>
          <input
            v-model="to"
            type="radio"
            :value="{ name: 'PButton' }"
          />
          PButton
        </label>
        <label>
          <input
            v-model="to"
            type="radio"
            :value="{ name: 'PBadge' }"
          />
          PBadge
        </label>
        <label>
          <input
            v-model="to"
            type="radio"
            value="https://google.com"
          />
          Google (External to application)
        </label>
        <PToggle
          v-model="showIcon"
          label="Custom Raccoon Icon"
        />
        <PToggle
          v-model="download"
          label="Is Download"
        />
        <PToggle
          v-model="disabled"
          label="Disabled"
        />
      </PForm>
      <PLink
        :to="to"
        :disabled="disabled"
        :download="download"
        :icon="showIcon ? 'raccoon' : ''"
      >
        Check out {{ to.name || to }}
      </PLink>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showIcon = ref(false)
const disabled = ref(false)
const download = ref(false)
const to = ref({ name: 'PButton' })

const basicLinkExample = {
  code: `<p-link
  :to="{ name: 'PButton' }"
  :disabled="false"
  :download="false"
  icon="raccoon"
>
  Check out PButton
</p-link>`,
  language: 'vue-html',
}
</script>

<style>
.chip-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-sm);
}
</style>
