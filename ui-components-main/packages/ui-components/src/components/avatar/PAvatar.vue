<template>
  <span
    ref="avatarRef"
    class="polly-avatar"
    :class="classes"
  >
    <div class="polly-avatar__icon-wrapper">
      <p-icon
        icon="circle"
        fa-style="solid"
        :size="size"
      />
      <div
        v-if="showStatus"
        class="polly-avatar__status"
      />
    </div>
    <div class="polly-avatar__content">
      <slot name="image">
        <strong class="polly-avatar__initials">{{ initials }}</strong>
      </slot>
    </div>
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue'

import { AvatarProps, AvatarSlots } from '@/types/avatar'

import { PIcon } from '@/components/icon'

const { size = 'lg', showStatus = false, fullName = '', variant = 'default' } = defineProps<AvatarProps>()

defineSlots<AvatarSlots>()

const avatarRef = useTemplateRef<HTMLElement>('avatarRef')
const parentBackgroundColor = ref('transparent')

onMounted(() => {
  const backgroundColor = findParentBackgroundColor()
  parentBackgroundColor.value = backgroundColor ?? 'transparent'
})

const classes = computed(() => {
  return [
    `polly-avatar--${size}`,
    `polly-avatar--${variant}`,
    {
      'polly-avatar--with-status': showStatus,
    },
  ]
})

const initials = computed(() => {
  if (!fullName) return ''

  const nameArray = fullName.trim().split(' ').filter(Boolean)
  if (!nameArray.length) return ''

  const firstInitial = nameArray[0][0].toUpperCase()
  const lastInitial = nameArray.length > 1 ? nameArray[nameArray.length - 1][0].toUpperCase() : ''

  return firstInitial + lastInitial
})

function findParentBackgroundColor(): string | undefined {
  if (!avatarRef.value) return

  let currentElement = avatarRef.value.parentElement
  let backgroundColor = 'white'
  let maxIterations = 10 // Prevent infinite loops

  while (currentElement && maxIterations > 0) {
    backgroundColor = window.getComputedStyle(currentElement).backgroundColor
    if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
      break
    }
    currentElement = currentElement.parentElement
    maxIterations--
  }

  return backgroundColor
}
</script>

<style>
.polly-avatar {
  position: relative;
  color: var(--colors-background-common-accent-light);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: visible;
}

.polly-avatar--ai {
  color: var(--colors-AI-mid);
}

.polly-avatar--ai .polly-avatar__initials {
  color: var(--colors-text-icon-light);
}

.polly-avatar__icon-wrapper {
  position: relative;
  display: inline-flex;
}

.polly-avatar__status {
  position: absolute;
  right: -2px;
  bottom: 0;
  height: 9px;
  width: 9px;
  border-radius: var(--border-radius-round);
  background-color: var(--colors-background-uncommon-online);
  transform: translate(25%, 25%);
  border: 1px solid v-bind(parentBackgroundColor);
}

.polly-avatar__content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.polly-avatar__initials {
  color: var(--colors-text-icon-medium);
  font-size: var(--font-size-xs);
  line-height: inherit;
  font-weight: var(--font-weight-medium);
}
</style>
