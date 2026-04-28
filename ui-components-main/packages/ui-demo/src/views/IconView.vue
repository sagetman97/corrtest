<template>
  <component-demo-layout name="Icons">
    <section-header
      title="Basic Usage"
      description="Icon component with FontAwesome integration, supporting different styles, sizes, and families."
    />
    <component-example :code="basicIconExample">
      <template #header>
        <div class="icon-view__controls">
          <p-select
            v-model="iconFaStyle"
            label-position="left"
            label="Fa-style"
            position="left"
            :options="styleOptions"
          />

          <p-select
            v-model="iconFamily"
            :disabled="iconFaStyle === 'brands'"
            :options="familyOptions"
            label="Icon-family"
            position="left"
            label-position="left"
          />
          <p-select
            v-model="iconSize"
            label="Size"
            label-position="left"
            position="left"
            :options="sizeOptions"
          />
          <p-input
            v-model="filter"
            label="Search"
            label-position="left"
          />
          <p-button
            icon="arrow-up-right-from-square"
            icon-position="right"
            to="https://fontawesome.com/search"
            target="_blank"
          >
            Font Awesome
          </p-button>
        </div>
      </template>
      <div class="polly-icons">
        <p-virtual-scroller
          :items="iconsFiltered"
          :item-key="(icon: string) => icon"
          :item-estimate-height="createUnitValue(120, 'px')"
          :chunk-size="50"
        >
          <template #default="{ item: icon }">
            <div
              class="polly-icons__icon-wrapper"
              @click="openIconModal(icon)"
            >
              <p-icon
                :icon="icon"
                :fa-style="iconFaStyle"
                :size="iconSize"
                :family="iconFamily"
                class="polly-icons__icon"
              />

              <p class="polly-icons__icon-name">{{ getIconLabel(icon) }}</p>
            </div>
          </template>
        </p-virtual-scroller>
        <div
          v-if="!iconsFiltered.length"
          class="icon-view__no-results"
        >
          <p-icon
            :icon="getRandomIcon()"
            size="4x"
            family="duotone"
          />
          No icons found
        </div>
      </div>
    </component-example>
    <p-modal
      v-model:is-open="isModalOpen"
      :title="selectedIcon"
    >
      <div class="icon-modal">
        <div class="icon-modal__preview">
          <p-icon
            :icon="selectedIcon"
            :fa-style="modalIconFaStyle"
            :size="modalIconSize"
            :family="modalIconFamily"
          />
        </div>

        <div class="icon-modal__controls">
          <p-select
            v-model="modalIconFaStyle"
            label="Fa-style"
            position="left"
            :options="styleOptions"
          />
          <p-select
            v-model="modalIconFamily"
            :options="familyOptions"
            position="left"
            label="Icon-family"
          />
          <p-select
            v-model="modalIconSize"
            label="Size"
            position="left"
            :options="sizeOptions"
          />
        </div>

        <code-snippet
          :code="selectedIconCode"
          language="html"
        />
      </div>
    </p-modal>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { FaStyle, IconFamily, IconProps } from '@/types'

import { createUnitValue } from '@/utilities'
import iconNames from '../assets/iconNames.json'

const iconFaStyle = ref<FaStyle>('regular')
const iconSize = ref<IconProps['size']>('xl')
const filter = ref('')
const iconFamily = ref<IconFamily>('classic')

const isModalOpen = ref(false)
const selectedIcon = ref('')

// Modal-specific controls (separate from main grid controls)
const modalIconFaStyle = ref<FaStyle>('regular')
const modalIconSize = ref<IconProps['size']>('xl')
const modalIconFamily = ref<IconFamily>('classic')

const familyOptions = [
  { value: 'classic', label: 'Classic' },
  { value: 'sharp', label: 'Sharp' },
  { value: 'duotone', label: 'Duotone' },
  { value: 'sharp-duotone', label: 'Sharp Duotone' },
]

const styleOptions = [
  { value: 'light', label: 'Light' },
  { value: 'thin', label: 'Thin' },
  { value: 'solid', label: 'Solid' },
  { value: 'regular', label: 'Regular' },
  { value: 'brands', label: 'Brands' },
]

const sizeOptions = [
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'default' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: '2x', label: '2x' },
  { value: '3x', label: '3x' },
  { value: '4x', label: '4x' },
  { value: '5x', label: '5x' },
  { value: '6x', label: '6x' },
  { value: '7x', label: '7x' },
  { value: '8x', label: '8x' },
  { value: '9x', label: '9x' },
  { value: '10x', label: '10x' },
]

const iconsFiltered = computed(() => {
  const iconKeys = Object.keys(iconNames)

  return iconKeys.filter((iconKey: string) => {
    const iconData = iconNames[iconKey as keyof typeof iconNames]

    //if brand is selected, default the family to classic
    if (iconFaStyle.value === 'brands') {
      iconFamily.value = 'classic'
    }

    // Check if the icon supports the selected family
    const familyStyles = iconData.families[iconFamily.value as keyof typeof iconData.families]
    if (!familyStyles) {
      return false
    }

    // Check if the icon supports the selected style within that family
    if (!familyStyles.includes(iconFaStyle.value)) {
      return false
    }

    // Filter by search term (check icon key and label)
    if (filter.value) {
      const searchLower = filter.value.toLowerCase()
      const matchesKey = iconKey.toLowerCase().includes(searchLower)
      const matchesLabel = iconData.label.toLowerCase().includes(searchLower)

      return matchesKey || matchesLabel
    }

    return true
  })
})

function getIconLabel(iconKey: string): string {
  const iconData = iconNames[iconKey as keyof typeof iconNames]
  return iconData?.label || iconKey
}

const selectedIconCode = computed(() => {
  return `<p-icon
  icon="${selectedIcon.value}"
  fa-style="${modalIconFaStyle.value}"
  size="${modalIconSize.value}"
  family="${modalIconFamily.value}"
/>`
})

function openIconModal(icon: string): void {
  selectedIcon.value = icon
  // Initialize modal controls with current main grid values
  modalIconFaStyle.value = iconFaStyle.value
  modalIconSize.value = iconSize.value
  modalIconFamily.value = iconFamily.value
  isModalOpen.value = true
}

const basicIconExample = {
  code: `<p-icon
  icon="star"
  fa-style="light"
  size="xl"
  family="classic"
/>`,
  language: 'vue-html',
}

function getRandomIcon(): string {
  const iconKeys = Object.keys(iconNames)
  const randomIndex = Math.floor(Math.random() * iconKeys.length)
  return iconKeys[randomIndex] as string
}
</script>

<style>
.icon-view__controls {
  display: grid;
  grid-template-columns: var(--grid-3-col);
  gap: var(--spacing-sm);
  width: 100%;
  align-items: center;
}

.polly-icons {
  height: 600px;
}

.polly-icons .polly-virtual-scroller {
  display: grid;
  grid-template-columns: var(--grid-6-col);
  justify-content: center;
  grid-auto-rows: min-content;
  gap: var(--spacing-sm);
}

.polly-icons__icon-wrapper {
  padding: var(--spacing-sm);
  display: flex;
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-sm);
  aspect-ratio: 1/1;
  gap: var(--spacing-xs);
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: var(--colors-text-icon-medium);
  transition: border-color 100ms ease-in-out;
  cursor: pointer;
}

.polly-icons__icon-wrapper:hover {
  border-color: var(--colors-border-common-active);
}

.polly-icons__icon-wrapper:active {
  background-color: var(--colors-background-common-default-grey);
}

.polly-icons__icon-name {
  font-size: var(--font-size-xs);
  color: var(--colors-text-icon-medium);
  text-align: center;
}

.icon-modal {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.icon-modal__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-sm);
  background-color: var(--colors-background-common-default-grey);
  font-size: 4rem;
}

.icon-modal__controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.icon-view__no-results {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 1.5rem;
  color: var(--colors-text-icon-medium);
}
</style>
