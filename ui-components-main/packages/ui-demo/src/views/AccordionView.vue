<template>
  <component-demo-layout name="Accordion">
    <section-header
      title="Basic Usage"
      description="A simple accordion component"
    />
    <component-example :code="accordionExample" />

    <section-header
      title="Variants"
      description="Changes the color scheme of the accordion. Has 2 options: primary, secondary."
    />
    <component-example :code="accordionVariantExample" />

    <section-header
      title="Disabled"
      description="Accordions can be disabled using the `disabled` prop. Disabled accordions will not be clickable or expandable."
    />
    <component-example :code="disabledAccordionExample" />

    <section-header
      title="Hide Icon"
      description="Accordions can have the icon hidden using the `hide-icon` prop."
    />
    <component-example :code="hideIconExample" />

    <section-header
      title="Summary"
      description="Accordions can have a summary section using the `summary` slot."
    />
    <component-example :code="accordionSummaryExample" />

    <section-header
      title="Slots"
      description="The accordion component has several slots that can be used to customize the accordion. Each slot has access to the `expanded` and `toggle` props."
    />
    <component-example :code="accordionSlotsExample" />

    <section-header
      title="Custom Toggle"
      description="The accordion component can be customized to use a custom toggle button."
    />
    <component-example>
      <p-accordion>
        <template #header="{ toggle }">
          <p-button @click="toggle">Custom Toggle</p-button>
        </template>
        Accordion Content
      </p-accordion>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
const accordionExample = {
  code: `<p-accordion
  title="Basic Accordion"
>
  Accordion Content
</p-accordion>`,
  language: 'vue-html',
}

const accordionVariantExample = {
  code: `<p-accordion
  title="Primary Accordion"
  variant="primary"
>
  Accordion Content
</p-accordion>
<p-accordion
  title="Secondary Accordion"
  variant="secondary"
>
  Accordion Content
</p-accordion>`,
  language: 'vue-html',
}

const disabledAccordionExample = {
  code: `<p-accordion
  title="Disabled Accordion"
  disabled
>
  Accordion Content
</p-accordion>`,
  language: 'vue-html',
}

const hideIconExample = {
  code: `<p-accordion
  title="Accordion with Icon Hidden"
  hide-icon
>
  Accordion Content
</p-accordion>`,
  language: 'vue-html',
}

const accordionSummaryExample = {
  code: `<p-accordion
  title="Accordion with Summary"
>
  <template #summary>
    Accordion Summary
  </template>
  Accordion Content
</p-accordion>`,
  language: 'vue-html',
}

const accordionSlotsExample = {
  code: `<p-accordion>
  <template #title>
    Accordion Title Slot
  </template>

  <template #icon="{ expanded }">
    <p-icon icon="arrow-right" family="duotone" :class="{ 'p-rotate-90': expanded }" />
  </template>

  <template #default>
    Accordion Content Slot
  </template>
</p-accordion>`,
  language: 'vue-html',
}
</script>
