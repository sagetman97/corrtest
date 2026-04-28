<template>
  <component-demo-layout
    class="card-view"
    name="Card"
  >
    <section-header
      title="Basic Usage"
      description="A simple card component."
    />
    <p-card
      title="Card Title"
      subtitle="Check out these cool cats"
      class="card-view__card"
    >
      <img
        class="card-view__cat"
        src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
        alt="Cat"
        width="100%"
      />
      <template #footer>These cats are cool</template>
    </p-card>
    <code-snippet :code="basicCardExample" />

    <section-header
      title="Slots"
      description="Cards have a bunch of slots that can be used to customize the title, subtitle, actions, and footer. The example below is the same as the basic example above but using slots instead of props. and adding an action button."
    />
    <p-card class="card-view__card">
      <img
        ref="catElement"
        class="card-view__cat"
        src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
        alt="Cat"
        width="100%"
      />
      <template #title>Card Title</template>
      <template #subtitle>Check out these cool cats with a long subtitle that will run into the actions</template>
      <template #actions>
        <p-button
          :is-loading="catLoading"
          @click="randomCat"
        >
          New Cat
        </p-button>
      </template>
      <template #footer>These cats are cool</template>
    </p-card>
    <code-snippet :code="slotsCardExample" />

    <section-header
      title="Actions and Back Button"
      description="The actions slot is used to add actions to the card. It is rendered in the top right corner of the card. A back button can be displayed allowing the card to navigate 'back' somewhere."
    />
    <p-card
      class="card-view__card"
      title="Card With Actions and Back Button"
      :show-back="true"
      back-text="custom back text"
    >
      <img
        class="card-view__cat"
        src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
        alt="Cat"
        width="100%"
      />
      <template #actions>
        <p-button>Action</p-button>
      </template>
    </p-card>
    <code-snippet :code="actionsCardExample" />

    <section-header
      title="AI Variant"
      description="The AI variant is used for cards that are part of the AI experience."
    />
    <p-card
      class="card-view__card"
      title="AI Card"
      variant="ai"
    >
      <img
        class="card-view__cat"
        src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
        alt="Cat"
        width="100%"
      />
    </p-card>
    <code-snippet :code="aiCardExample" />
    <section-header
      title="Scrollable card"
      description="Cards can be scrollable. The footer will be sticky."
    />
    <p-card
      class="card-view__card scrollable-card"
      title="Scrollable Card"
    >
      <div class="scrollable-card__overflow">
        <p>Long content</p>
      </div>
      <template #footer>These cats are cool</template>
    </p-card>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const catElement = ref<HTMLImageElement>()

let catLoading = ref(false)
async function randomCat(): Promise<void> {
  if (!catElement.value) {
    return
  }
  catLoading.value = true
  catElement.value.src = await fetchNextImage()
  catLoading.value = false
}

function fetchNextImage(): Promise<string> {
  return fetch('https://api.thecatapi.com/v1/images/search')
    .then((response) => response.json())
    .then(([image]) => image.url)
}

const basicCardExample = {
  code: `<p-card
  title="Card Title"
  subtitle="Check out these cool cats"
  class="card-view__card"
>
  <img
    class="card-view__cat"
    src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
    alt="Cat"
    width="100%"
  />
  <template #footer>These cats are cool</template>
</p-card>`,
  language: 'vue-html',
}

const slotsCardExample = {
  code: `<p-card
  title="Card Title"
  subtitle="Check out these cool cats"
  class="card-view__card"
>
  <img
    class="card-view__cat"
    src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
    alt="Cat"
    width="100%"
  />
  <template #title>Card Title</template>
  <template #subtitle>Check out these cool cats</template>
  <template #actions>
    <p-button >Action</p-button>
  </template>
  <template #footer>These cats are cool</template>
</p-card>`,
  language: 'vue-html',
}

const actionsCardExample = {
  code: `<p-card
  title="Card With Actions and Back Button"
  :show-back="true"
  back-text="custom back text"
  class="card-view__card"
>
  <img
    class="card-view__cat"
    src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
    alt="Cat"
    width="100%"
  />
  <template #actions>
    <p-button >Action</p-button>
  </template>
</p-card>`,
  language: 'vue-html',
}

const aiCardExample = {
  code: `<p-card
  title="AI Card"
  variant="ai"
  class="card-view__card"
>
  <img
    class="card-view__cat"
    src="https://media.tenor.com/zqzxOu6FZk0AAAAM/hey-cat.gif"
    alt="Cat"
    width="100%"
  />
</p-card>`,
  language: 'vue-html',
}
</script>

<style>
.card-view__card {
  margin-top: var(--spacing-md);
}

.card-view__cat {
  border-radius: var(--border-radius-md);
}

.scrollable-card {
  height: 300px;
}

.scrollable-card .scrollable-card__overflow {
  min-height: 1000px;
}
</style>
