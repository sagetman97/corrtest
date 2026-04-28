<template>
  <component-demo-layout name="Avatar">
    <section-header
      title="Basic Usage"
      description="A simple avatar component that displays initials or an image"
    />
    <component-example :code="basicAvatarExample" />

    <section-header
      title="Sizes"
      description="Avatars come in different sizes"
    />
    <component-example :code="sizeAvatarExample" />

    <section-header
      title="Variants"
      description="Different color variants are available"
    />
    <component-example :code="variantAvatarExample" />

    <section-header
      title="Status"
      description="Avatars can show an online status indicator"
    />
    <component-example :code="statusAvatarExample" />

    <section-header
      title="Custom Image"
      description="You can provide a custom image using the image slot"
    />
    <component-example :code="imageAvatarExample">
      <p-avatar size="xxl">
        <template #image>
          <img
            src="/jira-favicon-scaled.png"
            width="20"
            alt="Polly Logo"
          />
        </template>
      </p-avatar>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
const basicAvatarExample = {
  code: `<p-avatar full-name="John Doe" />`,
  language: 'vue-html',
}

const sizeAvatarExample = {
  code: `<p-avatar
  full-name="John Doe"
  size="sm"
/>

<p-avatar
  full-name="John Doe"
  size="md"
/>

<p-avatar
  full-name="John Doe"
  size="lg"
/>

<p-avatar
  full-name="John Doe"
  size="xl"
/>`,
  language: 'vue-html',
}

const variantAvatarExample = {
  code: `<p-avatar
  full-name="John Doe"
  variant="default"
/>

<p-avatar
  full-name="John Doe"
  variant="ai"
/>`,
  language: 'vue-html',
}

const statusAvatarExample = {
  code: `<p-avatar
  full-name="John Doe"
  show-status
/>`,
  language: 'vue-html',
}

const imageAvatarExample = {
  code: `<p-avatar>
  <template #image>
    <img
      src="/jira-favicon-scaled.png"
      width="40"
      alt="Polly Logo"
    />
  </template>
</p-avatar>`,
  language: 'vue-html',
}
</script>

<style>
.component-example {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}
</style>
