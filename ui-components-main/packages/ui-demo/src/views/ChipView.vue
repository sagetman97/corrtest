<template>
  <component-demo-layout name="Chip">
    <section-header
      title="Variants"
      description="Chip component with different variants."
    />
    <component-example :code="variantsExample">
      <div class="chip-view">
        <p-chip
          variant="primary"
          icon="star"
          family="duotone"
        >
          Primary
        </p-chip>
        <p-chip
          variant="white"
          icon="heart"
          family="duotone"
        >
          White
        </p-chip>
        <p-chip
          variant="gray"
          icon="check"
          family="duotone"
        >
          Gray
        </p-chip>
        <p-chip
          variant="accent"
          icon="bolt"
          family="duotone"
        >
          Accent
        </p-chip>
      </div>
    </component-example>

    <section-header
      title="With Icons"
      description="Chips can display icons."
    />
    <component-example :code="iconsExample">
      <div class="chip-view">
        <p-chip
          variant="primary"
          icon="sparkles"
          family="duotone"
        >
          Primary
        </p-chip>
        <p-chip
          variant="white"
          icon="circle-user"
          family="duotone"
        >
          White
        </p-chip>
        <p-chip
          variant="gray"
          icon="tag"
          family="duotone"
        >
          Gray
        </p-chip>
        <p-chip
          variant="accent"
          icon="wand-magic-sparkles"
          family="duotone"
        >
          Accent
        </p-chip>
      </div>
    </component-example>

    <section-header
      title="Dismissible"
      description="Chips can be dismissible."
    />
    <component-example :code="dismissibleExample">
      <div class="chip-view">
        <p-chip
          variant="primary"
          icon="star"
          family="duotone"
          :dismissible="true"
        >
          Primary
        </p-chip>
        <p-chip
          variant="white"
          icon="heart"
          family="duotone"
          :dismissible="true"
        >
          White
        </p-chip>
        <p-chip
          variant="gray"
          icon="check"
          family="duotone"
          :dismissible="true"
        >
          Gray
        </p-chip>
        <p-chip
          variant="accent"
          icon="bolt"
          family="duotone"
          :dismissible="true"
        >
          Accent
        </p-chip>
      </div>
    </component-example>

    <section-header
      title="Disabled"
      description="Chips can be disabled."
    />
    <component-example :code="disabledExample">
      <div class="chip-view">
        <p-chip
          variant="primary"
          icon="star"
          family="duotone"
          :disabled="true"
        >
          Primary
        </p-chip>
        <p-chip
          variant="white"
          icon="heart"
          family="duotone"
          :disabled="true"
        >
          White
        </p-chip>
        <p-chip
          variant="gray"
          icon="check"
          family="duotone"
          :disabled="true"
        >
          Gray
        </p-chip>
        <p-chip
          variant="accent"
          icon="bolt"
          family="duotone"
          :dismissible="true"
          :disabled="true"
        >
          Accent
        </p-chip>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
const variantsExample = {
  code: `<p-chip variant="primary" icon="star" family="duotone" >Primary</p-chip>
<p-chip variant="white" icon="heart" family="duotone" >White</p-chip>
<p-chip variant="gray" icon="check" family="duotone" >Gray</p-chip>
<p-chip variant="accent" icon="bolt" family="duotone" >Accent</p-chip>`,
  language: 'vue-html',
}

const iconsExample = {
  code: `<p-chip variant="primary" icon="sparkles" family="duotone" >Primary</p-chip>
<p-chip variant="white" icon="circle-user" family="duotone" >White</p-chip>
<p-chip variant="gray" icon="tag" family="duotone" >Gray</p-chip>
<p-chip variant="accent" icon="wand-magic-sparkles" family="duotone" >Accent</p-chip>`,
  language: 'vue-html',
}

const dismissibleExample = {
  code: `<p-chip variant="primary" icon="star" family="duotone"  :dismissible="true">Primary</p-chip>
<p-chip variant="white" icon="heart" family="duotone"  :dismissible="true">White</p-chip>
<p-chip variant="gray" icon="check" family="duotone"  :dismissible="true">Gray</p-chip>
<p-chip variant="accent" icon="bolt" family="duotone"  :dismissible="true">Accent</p-chip>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-chip variant="primary" icon="star" family="duotone"  :disabled="true">Primary</p-chip>
<p-chip variant="white" icon="heart" family="duotone"  :disabled="true">White</p-chip>
<p-chip variant="gray" icon="check" family="duotone"  :disabled="true">Gray</p-chip>
<p-chip variant="accent" icon="bolt" family="duotone"  :disabled="true">Accent</p-chip>`,
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
