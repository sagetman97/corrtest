<template>
  <component-demo-layout name="Base Page">
    <section-header
      title="Basic Usage"
      description="A simple base page component that provides layout structure and navigation elements."
    />
    <component-example :code="basicExample">
      <div class="base-page-demo">
        <p-base-page title="Example Page">
          <div class="demo-content">
            <h3>Welcome to Example Page</h3>
            <p>This is a basic page layout with a title and content area.</p>
            <div class="demo-placeholder" />
          </div>
        </p-base-page>
      </div>
    </component-example>

    <section-header
      title="With Controls"
      description="Base page can include controls in the header area"
    />
    <component-example :code="controlsExample">
      <div class="base-page-demo">
        <p-base-page title="Page with Controls">
          <template #controls>
            <p-button>Save</p-button>
            <p-button>Cancel</p-button>
          </template>
          <div class="demo-content">
            <h3>Edit Profile</h3>
            <p>This page demonstrates header controls for actions.</p>
            <div class="demo-form">
              <p-input
                label="Name"
                value="John Doe"
              />
              <p-input
                label="Email"
                value="john@example.com"
              />
            </div>
            <div class="demo-placeholder" />
          </div>
        </p-base-page>
      </div>
    </component-example>

    <section-header
      title="Two Column Layout"
      description="Base page supports a two-column layout with right panel"
    />
    <component-example :code="twoColumnExample">
      <div class="base-page-demo">
        <p-base-page title="Two Column Layout">
          <div class="demo-content">
            <h3>Main Content Area</h3>
            <p>This demonstrates a two-column layout with main content and side panel.</p>
            <div class="demo-placeholder" />
          </div>
          <template #right>
            <div class="demo-content demo-right">
              <h4>Side Panel</h4>
              <p>Additional information or controls can go here.</p>
              <div class="demo-placeholder" />
            </div>
          </template>
        </p-base-page>
      </div>
    </component-example>

    <section-header
      title="Breadcrumbs"
      description="Base page can display navigation breadcrumbs, but will always be hidden on mobile."
    />
    <component-example :code="breadcrumbsExample">
      <div class="base-page-demo">
        <p-base-page
          title="Page with Breadcrumbs"
          :bread-crumbs="breadcrumbs"
        >
          <div class="demo-content">
            <h3>Nested Page Example</h3>
            <p>Shows navigation context with breadcrumbs.</p>
            <div class="demo-placeholder" />
          </div>
        </p-base-page>
      </div>
    </component-example>
    <component-example :code="hideBreadcrumbsExample">
      <div class="base-page-demo">
        <p-base-page
          title="Page without Breadcrumbs"
          :bread-crumbs="[]"
        >
          <div class="demo-content">
            <h3>Nested Page Example</h3>
            <p>Shows navigation context with breadcrumbs.</p>
            <div class="demo-placeholder" />
          </div>
        </p-base-page>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Section', to: '/section' }, { label: 'Current Page' }]

const basicExample = {
  code: `<p-base-page title="Example Page">
    <div class="demo-content">
      <h3>Welcome to Example Page</h3>
      <p>This is a basic page layout with a title and content area.</p>
    </div>
</p-base-page>`,
  language: 'vue-html',
}

const controlsExample = {
  code: `<p-base-page title="Page with Controls">
  <template #controls>
    <p-button>Save</p-button>
    <p-button>Cancel</p-button>
  </template>
  <div class="demo-content">
    <h3>Edit Profile</h3>
    <p>This page demonstrates header controls for actions.</p>
    <div class="demo-form">
      <p-input label="Name" value="John Doe" />
      <p-input label="Email" value="john@example.com" />
    </div>
  </div>
</p-base-page>`,
  language: 'vue-html',
}

const twoColumnExample = {
  code: `<p-base-page title="Two Column Layout">
  <div class="demo-content">
    <h3>Main Content Area</h3>
    <p>This demonstrates a two-column layout with main content and side panel.</p>
  </div>
  <template #right>
    <div class="demo-content demo-right">
      <h4>Side Panel</h4>
      <p>Additional information or controls can go here.</p>
    </div>
  </template>
</p-base-page>`,
  language: 'vue-html',
}

const breadcrumbsExample = {
  code: `<p-base-page
  title="Page with Breadcrumbs"
  :bread-crumbs="breadcrumbs"
>
  <div class="demo-content">
    <h3>Nested Page Example</h3>
    <p>Shows navigation context with breadcrumbs.</p>
  </div>
</p-base-page>`,
  language: 'vue-html',
}

const hideBreadcrumbsExample = {
  code: `<p-base-page
  title="Page without Breadcrumbs"
  :bread-crumbs="false"
>
  <div class="demo-content">
    <h3>Nested Page Example</h3>
    <p>Shows navigation context with breadcrumbs.</p>
  </div>
</p-base-page>`,
  language: 'vue-html',
}
</script>

<style>
.base-page-demo {
  width: 100%;
  height: 400px;
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transform: scale(1);
  transform-origin: top center;
}

.base-page-demo .polly-base-page {
  height: 100%;
}

.base-page-demo .polly-base-page__main {
  width: 100%;
}

.base-page-demo .polly-card {
  border: 1px solid var(--colors-border-common-default);
}

.demo-right {
  padding: var(--spacing-md);
  border-left: 1px solid var(--colors-border-common-default);
  height: 100%;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.demo-content h3 {
  margin: 0;
  color: var(--colors-text-common);
}

.demo-content p {
  margin: 0;
  color: var(--colors-text-common-lighter);
}

.demo-placeholder {
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, var(--colors-background-common-lighter) 0%, var(--colors-background-common) 100%);
  border-radius: var(--border-radius-sm);
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Override component-example default styles */
.component-example {
  padding: var(--spacing-lg);
}
</style>
