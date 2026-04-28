<template>
  <i
    class="polly-icon"
    :class="classes"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { IconProps } from '@/types'

const { family = 'classic', size = 'auto', faStyle, icon, iconClasses, spin } = defineProps<IconProps>()

const classes = computed(() => {
  const faStyleValue: IconProps['faStyle'] = faStyle ?? (family === 'duotone' ? 'solid' : 'light')
  const styleClass = !['kit-duotone', 'kit'].includes(family) ? `fa-${faStyleValue}` : false

  return [`fa-${family}`, styleClass, `fa-${icon}`, `polly-icon--${size}`, iconClasses, { 'fa-spin': spin }]
})
</script>

<style>
.polly-icon {
  --fa-width: var(--polly-icon-font-size);
  height: var(--polly-icon-font-size);
  font-size: var(--polly-icon-font-size);
  text-align: center;
  transition: all 100ms ease-in-out;
}

.polly-icon--auto {
  --polly-icon-font-size: inherit;
}
.polly-icon--xxs {
  --polly-icon-font-size: 0.5rem;
}
.polly-icon--xs {
  --polly-icon-font-size: 0.75rem;
}
.polly-icon--sm {
  --polly-icon-font-size: 0.875rem;
}
.polly-icon--md {
  --polly-icon-font-size: 1rem;
}
.polly-icon--lg {
  --polly-icon-font-size: 1.25rem;
}
.polly-icon--xl {
  --polly-icon-font-size: 1.5rem;
}
.polly-icon--xxl {
  --polly-icon-font-size: 1.75rem;
}
.polly-icon--2x {
  --polly-icon-font-size: 2rem;
}
.polly-icon--2_5x {
  --polly-icon-font-size: 2.5rem;
}
.polly-icon--3x {
  --polly-icon-font-size: 3rem;
}
.polly-icon--4x {
  --polly-icon-font-size: 4rem;
}
.polly-icon--5x {
  --polly-icon-font-size: 5rem;
}
.polly-icon--6x {
  --polly-icon-font-size: 6rem;
}
.polly-icon--7x {
  --polly-icon-font-size: 7rem;
}
.polly-icon--8x {
  --polly-icon-font-size: 8rem;
}
.polly-icon--9x {
  --polly-icon-font-size: 9rem;
}
.polly-icon--10x {
  --polly-icon-font-size: 10rem;
}
</style>
