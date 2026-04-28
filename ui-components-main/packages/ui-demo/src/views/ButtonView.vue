<template>
  <component-demo-layout name="Button">
    <section-header
      title="Basic Usage"
      description="A simple button component"
    />
    <component-example :code="basicButtonExample" />

    <section-header
      title="Variants"
      description="Changes the color scheme of the button. Has 3 options: primary, accent, and error."
    />
    <component-example :code="variantButtonExample" />

    <section-header
      title="Outline"
      description="Can be used to create a secondary style of button with an outline."
    />
    <component-example :code="outlineButtonExample" />

    <section-header
      title="Text"
      description="Creates a button with no background color. Similar to outline button, but without the outline."
    />
    <component-example :code="textButtonExample" />

    <section-header
      title="Lite"
      description="Used to create a barebones button, no padding or background. Can be used inline with text."
    />
    <component-example :code="liteButtonExample" />

    <section-header
      title="Round"
      description="Creates a round button, typically used with an icon"
    />
    <component-example :code="roundButtonExample" />

    <section-header title="Button Sizes" />
    <component-example :code="sizesButtonExample" />

    <section-header
      title="Icons"
      description="Any FontAwesome icon name can be passed in the `icon` prop. You can also change the style using `fa-style` prop"
    />
    <component-example :code="iconsButtonExample" />
    <section-header
      title="Links"
      description="Buttons can be used as links if you pass in a `to` prop, it will be rendered as a `router-link`"
    />
    <component-example :code="linkButtonExample" />
    <section-header
      title="Loading"
      description="Buttons have a built in loading state using the `isLoading` prop, that can display a spinner icon, or custom loading text using the `loadingText` prop`. While a button is loading, it will be disabled."
    />
    <component-example :code="loadingButtonExample">
      <p-button is-loading> Loading </p-button>

      <p-button
        loading-text="Loading..."
        :is-loading="isLoading"
        @click="toggleLoading"
      >
        Click to Toggle Loading
      </p-button>
    </component-example>

    <section-header
      title="Disabled"
      description="Buttons can be disabled using the `disabled` prop. Disabled buttons will not be clickable, and will not emit any events. They also will not be keyboard accessible."
    />
    <component-example :code="disabledButtonExample" />
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicButtonExample = {
  code: `<p-button>
  Basic Button
</p-button>`,
  language: 'vue-html',
}

const variantButtonExample = {
  code: `<p-button
  variant="primary"
>
  Primary
</p-button>

<p-button
  variant="accent"
>
  Accent
</p-button>

<p-button
  variant="error"
>
  Error
</p-button>`,
  language: 'vue-html',
}

const outlineButtonExample = {
  code: `<p-button
  variant="primary"
  outline
>
  Primary
</p-button>

<p-button
  variant="accent"
  outline
>
  Accent
</p-button>

<p-button
  variant="error"
  outline
>
  Error
</p-button>`,
  language: 'vue-html',
}

const textButtonExample = {
  code: `<p-button
  variant="primary"
  text
>
  Primary
</p-button>

<p-button
  variant="accent"
  text
>
  Accent
</p-button>

<p-button
  variant="error"
  text
>
  Error
</p-button>`,
  language: 'vue-html',
}

const liteButtonExample = {
  code: `<p-button
  variant="primary"
  lite
>
  Primary
</p-button>

<p-button
  variant="accent"
  lite
>
  Accent
</p-button>

<p-button
  variant="error"
  lite
>
  Error
</p-button>
<p-button
  variant="accent"
  lite
  family="duotone"
  icon="circle-chevron-left"
>
  Go Back
</p-button>`,
  language: 'vue-html',
}

const roundButtonExample = {
  code: `<p-button
  variant="primary"
  icon="raccoon"
  round
/>

<p-button
  variant="accent"
  icon="raccoon"
  round
/>

<p-button
  variant="error"
  icon="raccoon"
  round
/>`,
  language: 'vue-html',
}
const sizesButtonExample = {
  code: `<p-button
  size="xs"
>
  XSmall
</p-button>

<p-button
  size="sm"
>
  Small
</p-button>

<p-button
  size="md"
>
  Default
</p-button>

<p-button
  size="lg"
>
  Large
</p-button>

<p-button
  size="xl"
>
  XLarge
</p-button>`,
  language: 'vue-html',
}

const iconsButtonExample = {
  code: `<p-button
  variant="primary"
  icon="raccoon"
>
  Left Icon
</p-button>

<p-button
  variant="accent"
  icon="raccoon"
  icon-position="right"
>
  Right Icon
</p-button>

<p-button
  variant="accent"
  icon="circle-chevron-left"
  size="xs"
  family="duotone"
  lite
>
  Go Back
</p-button>

<p-button icon="gear" lite/>`,
  language: 'vue-html',
}

const linkButtonExample = {
  code: `<p-button
  variant="accent"
  text
  to="/p-button#links"
  icon="chevron-right"
  icon-position="right"
  size="xs"
>
  Check Out Button Links
</p-button>`,
  language: 'vue-html',
}

const isLoading = ref(false)
function toggleLoading() {
  isLoading.value = !isLoading.value
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

const loadingButtonExample = {
  code: `<p-button
  is-loading
>
  Loading
</p-button>

<p-button
  loading-text="Loading..."
  :is-loading="isLoading"
  @click="isLoading = !isLoading"
>
  Click to Toggle Loading
</p-button>`,
  language: 'vue-html',
}

const disabledButtonExample = {
  code: `<p-button
  disabled
  @click="alert('click')"
>
  Disabled
</p-button>
<p-button
  disabled
  outline
>
  Disabled Outline
</p-button>
<p-button
  disabled
  text
>
  Disabled Text
</p-button>
<p-button
  disabled
  lite
>
  Disabled Lite
</p-button>`,
  language: 'vue-html',
}
</script>
