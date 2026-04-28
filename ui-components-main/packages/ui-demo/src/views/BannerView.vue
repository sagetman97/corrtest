<template>
  <component-demo-layout name="Banner">
    <section-header
      title="Basic Usage"
      description="A simple banner component"
    />
    <component-example :code="basicBannerExample" />

    <section-header
      title="Size"
      description="Banner icon size can be changed using the `size` prop."
    />
    <component-example :code="sizesBannerExample" />

    <section-header
      title="Variants"
      description="Changes the color scheme of the banner. Has 7 options: info, warning, error, success, outline, neutral, ai."
    />
    <component-example :code="variantBannerExample" />

    <section-header
      title="Expansion"
      description="Banners can be expanded to show more content"
    />
    <component-example :code="expansionBannerExample" />

    <section-header
      title="Close Button"
      description="Banners can include a close button using the `show-close` prop"
    />
    <component-example :code="closeBannerExample" />

    <section-header
      title="Actions"
      description="Banners can include action buttons"
    />
    <component-example :code="actionsBannerExample" />

    <section-header
      title="Stacked Actions"
      description="Actions can be stacked vertically using the stacked-actions prop"
    />
    <component-example :code="stackedActionsBannerExample" />

    <section-header
      title="Small Variant"
      description="Banners can be displayed in a compact form using the `banner-size` prop set to 'small'"
    />
    <component-example :code="smallBannerExample" />

    <section-header
      title="Small Variant with Actions"
      description="Small banners can also include actions"
    />
    <component-example :code="smallBannerActionsExample" />
  </component-demo-layout>
</template>

<script setup lang="ts">
const variants = [
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Success', value: 'success' },
  { label: 'Outline', value: 'outline' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'AI', value: 'ai' },
]
const sizes = [
  { label: 'Small', value: 'sm' },
  { label: 'Large', value: 'lg' },
  { label: '3X', value: '3x' },
]

const basicBannerExample = {
  code: `<p-banner
  title="Hello World!"
  message="This is a banner."
/>`,
  language: 'vue-html',
}

const sizesBannerExample = sizes
  .map(
    ({ value }) => `
<p-banner
  size="${value}"
  title="Hello World!"
  message="This is a banner."
/>
`
  )
  .join('')

const variantBannerExample = variants
  .map(
    ({ value }) => `
<p-banner
  variant="${value}"
  title="Hello World!"
  message="This is a banner."
/>
`
  )
  .join('')

const expansionBannerExample = {
  code: `<p-banner
  variant="ai"
  title="Hello World!"
  message="This is a banner."
>
  <template #expansion>
    <p>Expansion content goes here</p>
  </template>
</p-banner>`,
  language: 'vue-html',
}

const closeBannerExample = {
  code: `<p-banner
  variant="info"
  title="Dismissible Banner"
  message="This banner can be closed using the close button."
  show-close
  @close="() => console.log('Banner closed')"
/>

<p-banner
  variant="ai"
  title="Dismissible Banner with Expansion"
  message="This banner has both a close button and expansion content."
  show-close
  @close="() => console.log('Banner closed')"
>
  <template #expansion>
    <p>Expansion content goes here</p>
  </template>
</p-banner>`,
  language: 'vue-html',
}

const actionsBannerExample = {
  code: `<p-banner
  variant="info"
  title="Banner with Actions"
  message="This banner includes actions"
  show-close
  @close="() => console.log('Banner closed')"
>
  <template #actions>
    <p-button
      variant="primary"
      outline
      size="sm"
      @click="() => console.log('Primary action clicked')"
    >
      Primary
    </p-button>
    <p-button
      variant="accent"
      text
      size="sm"
      @click="() => console.log('Secondary action clicked')"
    >
      Secondary
    </p-button>
  </template>
</p-banner>`,
  language: 'vue-html',
}

const stackedActionsBannerExample = {
  code: `<p-banner
  variant="info"
  title="Banner with Stacked Actions"
  message="This banner shows actions in a stacked layout"
  show-close
  stacked-actions
  @close="() => console.log('Banner closed')"
>
  <template #actions>
    <p-button
      variant="primary"
      outline
      size="sm"
      @click="() => console.log('Primary action clicked')"
    >
      Primary
    </p-button>
    <p-button
      variant="accent"
      text
      size="sm"
      @click="() => console.log('Secondary action clicked')"
    >
      Secondary
    </p-button>
  </template>
</p-banner>`,
  language: 'vue-html',
}

const smallBannerExample = variants
  .map(
    ({ value }) => `
<p-banner
  variant="${value}"
  banner-size="small"
  message="This is a small banner."
/>
`
  )
  .join('\n')

const smallBannerActionsExample = {
  code: `<p-banner
  variant="info"
  banner-size="small"
  message="This is a small banner with actions."
  show-close
  @close="() => console.log('Banner closed')"
>
  <template #actions>
    <p-button
      variant="primary"
      outline
      size="sm"
      @click="() => console.log('Primary action clicked')"
    >
      Primary
    </p-button>
    <p-button
      variant="accent"
      text
      size="sm"
      @click="() => console.log('Secondary action clicked')"
    >
      Secondary
    </p-button>
  </template>
</p-banner>

<p-banner
  variant="ai"
  banner-size="small"
  message="This is a small banner with stacked actions."
  show-close
  stacked-actions
  @close="() => console.log('Banner closed')"
>
  <template #actions>
    <p-button
      variant="primary"
      outline
      size="sm"
      @click="() => console.log('Primary action clicked')"
    >
      Primary
    </p-button>
    <p-button
      variant="accent"
      text
      size="sm"
      @click="() => console.log('Secondary action clicked')"
    >
      Secondary
    </p-button>
  </template>
</p-banner>`,
  language: 'vue-html',
}
</script>
