<template>
  <Teleport to="body">
    <template
      v-for="(component, index) in components"
      :key="index"
    >
      <component :is="component" />
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { PConfirmationArea, PToastArea } from '@/components'

const components = [PToastArea, PConfirmationArea]
</script>
