<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="code-snippet">
    <div class="code-snippet__header">
      <span class="code-snippet__language">{{ displayLanguage }}</span>
    </div>
    <div
      class="code-snippet__content"
      v-html="highlightedCode"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { codeToHtml } from 'shiki'

const highlightedCode = ref<string>('')

const props = defineProps<{
  code?: string
  language?: string
}>()

const displayLanguage = computed(() => {
  const lang = props.language || 'vue-html'
  const languageMap: Record<string, string> = {
    'vue-html': 'Vue',
    vue: 'Vue',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    css: 'CSS',
    html: 'HTML',
    json: 'JSON',
  }
  return languageMap[lang] || lang.toUpperCase()
})

onMounted(async () => {
  if (!props.code) return

  highlightedCode.value = await codeToHtml(props.code.trim(), {
    lang: props.language || 'vue-html',
    theme: 'github-dark',
  })
})
</script>
<style>
.code-snippet {
  width: 100%;
  margin-top: var(--spacing-md);
  position: relative;
}

.code-snippet__header {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  z-index: 1;
}

.code-snippet__language {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--border-radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
}

.code-snippet__content pre {
  font-family: 'Fira Code', monospace;
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-base);
  overflow-x: auto;
  margin: 0;
}
</style>
