<template>
  <PAccordion
    v-model:expanded="open"
    class="polly-navigation-group"
  >
    <template #header="{ toggle, expanded }">
      <slot
        name="header"
        :toggle="toggle"
        :expanded="expanded"
      >
        <PNavigationItem
          class="polly-navigation-group__collapsed-button"
          v-bind="buttonAttrs"
          :label="label"
          :collapsed-label="collapsedLabel"
          icon-position="left"
          @click="toggle"
        />
      </slot>
    </template>
    <template v-if="items.length">
      <div class="polly-navigation-group__open-content">
        <template
          v-for="item in items"
          :key="item.label"
        >
          <PNavigationItem
            v-if="item.show ?? true"
            v-bind="item"
            @selected="() => emit('selected', item)"
          />
        </template>
      </div>
    </template>
  </PAccordion>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

import { ButtonProps, isButtonProp, NavigationGroupProps, NavigationItemProps, PNavigationGroupSlots } from '@/types'

import { PNavigationItem } from '@/components/navigation'
import { splitProps } from '@/utilities'

defineSlots<PNavigationGroupSlots>()
const props = withDefaults(defineProps<NavigationGroupProps>(), {
  show: true,
})

const open = defineModel('open', { type: Boolean, default: false })

const emit = defineEmits<{
  selected: [value: NavigationItemProps]
}>()
const buttonAttrs = ref<Partial<ButtonProps>>({})

watchEffect(() => {
  buttonAttrs.value = splitProps(props, isButtonProp)
})
</script>

<style>
.polly-navigation-group {
  --polly-navigation-group-border-color: transparent;
  --polly-navigation-subsection-color: v-bind(props.color ?? '#FFF');

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: var(--border-radius-md);
  transition: all 100ms ease-in-out;
  background-color: var(--colors-background-uncommon-nav-section-default);
  border: none;
}

.polly-navigation-group.polly-accordion--expanded .polly-transition-expand {
  padding-bottom: var(--spacing-md);
}

.polly-accordion__content::-webkit-scrollbar {
  width: 14px;
}

.polly-accordion__content::-webkit-scrollbar-thumb {
  background-color: var(--colors-border-common-active);
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 8px;
}

.polly-accordion__content::-webkit-scrollbar-track {
  background-color: transparent;
}

@media (hover: hover) and (pointer: fine) {
  .polly-navigation-group:hover {
    background-color: var(--colors-background-uncommon-nav-section-active);
  }
}

.polly-navigation-group.polly-accordion--expanded {
  background-color: var(--colors-background-uncommon-nav-section-active);
}

.polly-navigation-group .polly-accordion__content {
  padding: 0;
}

.polly-navigation-group > .polly-button {
  gap: 0;
}

.polly-navigation-group > .polly-button .polly-icon {
  color: var(--polly-navigation-subsection-color);
  padding: 0;
}

.polly-navigation-group .polly-navigation-group__collapsed-button.polly-button {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-background-color: transparent;
  font-size: var(--font-size-md);
}

@media (hover: hover) and (pointer: fine) {
  .polly-navigation-group .polly-navigation-group__collapsed-button.polly-button:hover .polly-button__contents {
    font-weight: 600;
  }

  .polly-navigation-group .polly-navigation-group__collapsed-button.polly-button:hover .polly-button__icon {
    font-weight: 400;
  }
}

.polly-navigation-group__open-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.polly-navigation-group--collapsed {
  align-items: center;
  padding: 2px 0;
}

.polly-navigation-group__open-content .polly-button {
  --polly-button-border-radius: 0;
  border-top-left-radius: var(--border-radius-xs);
  border-bottom-left-radius: var(--border-radius-xs);
  margin-left: var(--spacing-md);
}

.polly-navigation-group .polly-button {
  border-right: 3px solid transparent;
  font-size: var(--font-size-sm);
}

.polly-navigation-group .polly-navigation-item.polly-button.router-link-active {
  background-color: var(--colors-background-uncommon-nav-subsection-active);
  border-right: 3px solid var(--polly-navigation-subsection-color);
  font-weight: var(--font-weight-bold);
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .polly-navigation-group {
    width: 100%;
    border-radius: 0;
  }
  .polly-navigation-group .polly-button {
    border-radius: 0;
  }

  .polly-navigation-group__open-content .polly-button {
    border-radius: 0;
    margin-left: 0;
  }
}
</style>
