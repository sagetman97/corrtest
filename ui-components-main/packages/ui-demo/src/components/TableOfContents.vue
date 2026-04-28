<template>
  <nav class="table-of-contents">
    <ul class="table-of-contents__links">
      <h3 class="table-of-contents__title">Sections</h3>
      <li
        v-for="section in sections"
        :key="section.label"
        class="table-of-contents__link"
      >
        <a
          :href="section.link"
          class="table-of-contents__link-anchor"
        >
          {{ section.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

import { useEventListener } from '@/composables'

useEventListener(window, 'scroll', findActiveLink)

const anchors = ref<NodeListOf<Element>>()
const activeLink = ref<Element | undefined>()

onMounted(async () => {
  anchors.value = document.querySelectorAll('.section-header__link')

  // Wait for the DOM to render before activating the first link
  await nextTick()

  findActiveLink()
})

const links = computed(() => {
  return document.querySelectorAll('.table-of-contents__link-anchor')
})

const sections = computed(() => {
  if (!anchors.value) return []

  return [...anchors.value].map((anchor) => {
    return {
      label: anchor.textContent ?? '',
      link: `#${anchor.id}`,
    }
  })
})

function findActiveLink() {
  const targetAnchor = getTargetAnchor()

  // Only update if the active element has changed
  if (activeLink.value === targetAnchor) return

  // Remove active class from previous link
  if (activeLink.value) {
    activeLink.value.classList.remove('active')
  }

  // Add active class to new link
  if (targetAnchor) {
    targetAnchor.classList.add('active')
  }

  activeLink.value = targetAnchor
}

function getTargetAnchor(): Element | undefined {
  if (!anchors.value || !links.value) return

  let targetAnchor = getFirstTableOfContentsLink() ?? getLastTableOfContentsLink()

  if (targetAnchor) return targetAnchor

  for (let index = anchors.value.length - 1; index >= 0; index--) {
    const anchor = anchors.value[index]
    if (!anchor) return

    if (anchor instanceof HTMLElement && window.scrollY > anchor.offsetTop - 30) {
      return links.value[index]
    }
  }
}

function getFirstTableOfContentsLink(): Element | undefined {
  if (!anchors.value || !links.value) return

  const firstAnchor = anchors.value[0]

  if (firstAnchor instanceof HTMLElement && window.scrollY >= 0 && window.scrollY < firstAnchor.offsetTop - 30) {
    return links.value[0]
  }
}

function getLastTableOfContentsLink(): Element | undefined {
  if (!anchors.value || !links.value) return

  if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
    return links.value[anchors.value.length - 1]
  }
}
</script>

<style>
.table-of-contents {
  display: block;
  position: relative;
  flex-shrink: 0;
}

.table-of-contents__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-extra-bold);
  margin: 0;
  padding-inline: var(--spacing-md);
}

.table-of-contents__links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  position: sticky;
  top: 0;
  align-self: flex-start;
  min-width: 75px;
}

.table-of-contents__link-anchor {
  transition: opacity 100ms ease-in-out;
  text-decoration: none;
  color: var(--colors-text-icon-dark);
  opacity: 0.5;
  font-size: var(--font-size-sm);
  flex: 1;
  border-radius: var(--border-radius-xs);
  padding-inline: var(--spacing-md);
  font-weight: var(--font-weight-medium);
  position: relative;
}

.table-of-contents__link-anchor.active {
  opacity: 1;
}

.table-of-contents__link-anchor::before {
  transition: opacity 100ms ease-in-out;
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--colors-text-icon-dark);
  width: 4px;
  opacity: 0;
  border-radius: var(--border-radius-xs);
}

.table-of-contents__link-anchor.active::before {
  opacity: 1;
}

.table-of-contents__link-anchor:hover {
  color: var(--colors-text-icon-dark);
}
</style>
