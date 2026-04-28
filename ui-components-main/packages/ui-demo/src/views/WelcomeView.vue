<template>
  <component-demo-layout
    class="welcome-view"
    name="Welcome"
    default-title=""
  >
    <section-header
      title="Welcome to Polly UI Components"
      :description="`Version ${version || 'Development'}`"
    />

    <component-example :code="introExample">
      <div class="welcome-intro">
        <p>
          Polly UI Components is a comprehensive design system and component library built with Vue 3 and TypeScript. It provides a consistent, accessible, and
          customizable set of UI components for building modern web applications.
        </p>

        <h3>Key Features:</h3>
        <ul>
          <li><strong>Vue 3 & TypeScript</strong> - Built with the latest Vue 3 Composition API and full TypeScript support</li>
          <li><strong>Accessible</strong> - WCAG compliant components with proper ARIA attributes</li>
          <li><strong>Customizable</strong> - Extensive CSS custom properties for theming and customization</li>
          <li><strong>Responsive</strong> - Mobile-first design that works across all devices</li>
          <li><strong>Form Validation</strong> - Built-in validation with Valibot integration</li>
          <li><strong>Dark Mode</strong> - Full dark mode support out of the box</li>
        </ul>

        <h3>Getting Started:</h3>
        <p>Explore the different sections to learn about the components and customization options:</p>
        <div class="welcome-sections">
          <div class="section-card">
            <h4>CSS Variables</h4>
            <p>Customize the design system using CSS custom properties for colors, spacing, typography, and more.</p>
            <p-button
              variant="accent"
              text
              to="/css-variables/colors"
            >
              Explore CSS Variables →
            </p-button>
          </div>
          <div class="section-card">
            <h4>Components</h4>
            <p>Browse the full library of UI components with live examples and code snippets.</p>
            <p-button
              variant="accent"
              text
              to="/p-button"
            >
              View Components →
            </p-button>
          </div>
          <div class="section-card">
            <h4>Form Examples</h4>
            <p>See how to build complex forms with validation, error handling, and accessibility.</p>
            <p-button
              variant="accent"
              text
              to="/form"
            >
              View Form Examples →
            </p-button>
          </div>
        </div>
      </div>
    </component-example>

    <section-header
      title="Installation"
      description="Add Polly UI Components to your project"
    />
    <component-example>
      <div class="installation-section">
        <h3>Bun</h3>
        <pre><code>bun install @pollyex/ui-components</code></pre>

        <h3>Import in your app</h3>
        <pre><code>import { createApp } from 'vue'
import PollyComponents from '@pollyex/ui-components'
import '@pollyex/ui-components/style.css'

const app = createApp(App)
app.use(PollyComponents)
app.mount('#app')</code></pre>
      </div>
    </component-example>

    <section-header
      title="Quick Example"
      description="A simple example to get you started"
    />
    <component-example :code="quickExample">
      <div class="quick-example">
        <p-form @submit="handleSubmit">
          <p-input
            v-model="exampleValue"
            label="Your Name"
            placeholder="Enter your name"
          />
          <p-button> Submit </p-button>
        </p-form>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const version = import.meta.env.VITE_VERSION
const exampleValue = ref<string | null>(null)

function handleSubmit() {
  alert('Hello, ' + exampleValue.value + '!')
}

const introExample = `
// Polly UI Components provides:
// - 40+ production-ready components
// - Full TypeScript support
// - Comprehensive accessibility
// - Extensive customization options
`

const quickExample = [
  {
    code: `<p-form @submit="handleSubmit">
  <p-input
    v-model="name"
    label="Your Name"
    placeholder="Enter your name"
  />
  <p-button>
    Submit
  </p-button>
</p-form>`,
    language: 'vue-html',
  },
  {
    code: `import { ref } from 'vue'

const name = ref('')

function handleSubmit() {
  alert('Hello, ' + name.value + '!')
}`,
    language: 'typescript',
  },
]
</script>

<style>
.welcome-intro {
  max-width: none;
}

.welcome-intro ul {
  margin: var(--spacing-base) 0;
  padding-left: var(--spacing-lg);
}

.welcome-intro li {
  margin-bottom: var(--spacing-sm);
}

.welcome-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.section-card {
  padding: var(--spacing-lg);
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-lg);
  background: var(--colors-background-common-white);
}

.section-card h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--colors-text-icon-dark);
  font-size: var(--font-size-lg);
}

.section-card p {
  margin: 0 0 var(--spacing-base) 0;
  color: var(--colors-text-icon-medium);
}

.installation-section h3 {
  margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
  color: var(--colors-text-icon-dark);
}

.installation-section h3:first-child {
  margin-top: 0;
}

.installation-section pre {
  background: var(--colors-grey-900);
  color: var(--colors-grey-white);
  padding: var(--spacing-base);
  border-radius: var(--border-radius-base);
  overflow-x: auto;
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-base) 0;
}

.installation-section code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.quick-example {
  max-width: 400px;
}
</style>
