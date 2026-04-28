<template>
  <p-card class="component-example">
    <template
      v-if="!!slots.header"
      #actions
    >
      <slot name="header" />
    </template>
    <slot>
      <component
        :is="compile(compiledCode)"
        v-if="compiledCode"
      />
    </slot>
  </p-card>
  <template v-if="Array.isArray(code)">
    <code-snippet
      v-for="(snippet, index) in code"
      :key="index"
      :code="snippet.code"
      :language="snippet.language"
    />
  </template>
  <code-snippet
    v-else-if="codeSnippet"
    :code="codeSnippet.code"
    :language="codeSnippet.language"
  />
  <code-snippet
    v-else-if="codeString"
    :code="codeString"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { compile } from 'vue/dist/vue.esm-bundler.js'

import CodeSnippet from './CodeSnippet.vue'

type CodeSnippet = {
  code: string
  language?: string
}

const props = defineProps<{
  code?: string | CodeSnippet | CodeSnippet[]
}>()

const isCodeSnippet = (val: unknown): val is CodeSnippet => {
  return typeof val === 'object' && val !== null && !Array.isArray(val) && 'code' in val
}

const codeString = computed(() => {
  return typeof props.code === 'string' ? props.code : undefined
})

const codeSnippet = computed(() => {
  return props.code && isCodeSnippet(props.code) ? props.code : undefined
})

const compiledCode = computed(() => {
  if (typeof props.code === 'string') {
    return props.code
  }
  if (props.code && isCodeSnippet(props.code)) {
    return props.code.code
  }
  return undefined
})

const slots = defineSlots<{
  header?(): unknown
  default?(): unknown
}>()
</script>
<style>
.component-example {
  margin-top: var(--spacing-md);
}

.component-example .polly-card__content {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: var(--spacing-base);
}
</style>
