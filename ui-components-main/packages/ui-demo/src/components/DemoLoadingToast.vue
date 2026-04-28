<template>
  <p-toast
    :id="id"
    :dismissible="false"
    class="demo-loading-toast"
  >
    <template #icon>
      <p-icon
        icon="spinner-third"
        class="custom-icon fa-spin"
        family="duotone"
        size="2x"
      />
    </template>
    This is a loading message and will go away when loading is complete (~5 seconds)
  </p-toast>
</template>

<script lang="ts" setup>
defineProps<{ id: string }>()
</script>

<style>
.custom-icon {
  color: var(--colors-text-icon-accent);
}
</style>
