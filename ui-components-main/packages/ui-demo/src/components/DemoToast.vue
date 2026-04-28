<template>
  <p-toast
    :id="id"
    class="demo-toast"
  >
    <template #icon>
      <p-icon
        icon="fire"
        family="duotone"
        size="5x"
      />
    </template>

    <p-form>
      <p-toggle
        v-model="toggleValue"
        label="Things are working"
        label-position="top"
      />

      <p-input
        v-model="stringValue"
        label="Who are you?"
      />

      <a href="/">Send it!</a>
    </p-form>

    <template #close="{ close }">
      <p-button
        outline
        @click="close"
      >
        Dismiss
      </p-button>
    </template>
  </p-toast>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{ id: string }>()

const toggleValue = ref(false)
const stringValue = ref<string>()
</script>

<style>
.demo-toast {
  background-color: #e1fccb;
}
</style>
