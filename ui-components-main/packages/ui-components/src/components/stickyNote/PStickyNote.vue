<template>
  <div
    class="polly-sticky-note"
    :class="classes"
  >
    <template v-if="isEditing">
      <div class="polly-sticky-note__message">
        <div class="polly-sticky-note__message--hide">
          {{ message }}
        </div>

        <p-form @submit="saveNote">
          <p-textarea
            v-model="editedMessage"
            class="polly-sticky-note__form-input"
            :rows="6"
          />

          <div class="polly-sticky-note__form-actions">
            <p-button
              outline
              class="polly-sticky-note__form-cancel"
              @click="cancelEditing"
            >
              Cancel
            </p-button>
            <p-button type="submit"> Save Changes </p-button>
          </div>
        </p-form>
      </div>
    </template>

    <template v-else>
      <template v-if="hasMessage">
        <slot>
          <div class="polly-sticky-note__message">
            {{ message }}
          </div>
        </slot>
      </template>

      <template v-if="hasContext">
        <slot name="context">
          <div
            v-if="!!context"
            class="polly-sticky-note__context"
          >
            <span class="polly-sticky-note__author">
              {{ context.author }}
            </span>

            <span class="polly-sticky-note__date">
              {{ dateFormatted }}
            </span>
          </div>
        </slot>
      </template>

      <template v-if="hasActions">
        <p-split-button
          class="polly-sticky-note__actions-icon"
          show-input-icons
          :options="[
            { label: 'Edit', value: 'edit', icon: 'pen-to-square' },
            { label: 'Delete', value: 'delete', icon: 'trash-can', variant: 'destructive' },
          ]"
          position="right"
          @selected="handleAction"
        >
          <template #target="{ toggle }">
            <p-icon-button
              icon="circle-ellipsis-vertical"
              @click="toggle"
            />
          </template>
        </p-split-button>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { format } from 'date-fns'

import { StickyNoteEmits, StickyNoteProps, StickyNoteSlots } from '@/types'

import { hasValue } from '@/utilities'

const props = defineProps<StickyNoteProps>()

const emits = defineEmits<StickyNoteEmits>()

const slots = defineSlots<StickyNoteSlots>()

const editedMessage = ref(props.message)
const isEditing = ref(false)

const dateFormatted = computed(() => {
  if (!props.context?.date) {
    return undefined
  }

  const formatter = new Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })

  const formattedDate = format(props.context.date, 'EEE MM/dd/yyyy')
  const timeWithZone = formatter.format(props.context.date)

  return `${formattedDate} • ${timeWithZone}`
})

const hasMessage = computed(() => !!slots.default || hasValue(props.message))
const hasContext = computed(() => !!slots.context || !!props.context)
const hasActions = computed(() => !props.disabled)

const classes = computed(() => ({
  'polly-sticky-note--has-message': hasMessage.value,
  'polly-sticky-note--has-context': !isEditing.value && hasContext.value,
  'polly-sticky-note--has-actions': !isEditing.value && hasActions.value,
}))

function startEditing(): void {
  editedMessage.value = props.message
  isEditing.value = true
}

function cancelEditing(): void {
  editedMessage.value = props.message
  isEditing.value = false
}

function saveNote(): void {
  emits('save', editedMessage.value)
  isEditing.value = false
}

function deleteNote(): void {
  emits('delete')
}

function handleAction(action: string): void {
  switch (action) {
    case 'edit':
      return startEditing()
    case 'delete':
      return deleteNote()
  }
}
</script>

<style>
.polly-sticky-note {
  position: relative;
  border-radius: var(--spacing-sm);
  background-color: var(--colors-background-uncommon-sticky-note);
  display: grid;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: var(--spacing-base);
}

.polly-sticky-note--has-message {
  grid-template-areas: 'message message';
}

.polly-sticky-note--has-context {
  grid-template-areas: 'context context';
}

.polly-sticky-note--has-actions {
  grid-template-areas: 'actions actions';
}

.polly-sticky-note--has-message.polly-sticky-note--has-actions {
  grid-template-areas: 'message actions';
}

.polly-sticky-note--has-message.polly-sticky-note--has-context {
  grid-template-areas:
    'message message'
    'context context';
}

.polly-sticky-note--has-context.polly-sticky-note--has-actions {
  grid-template-areas: 'context actions';
}

.polly-sticky-note--has-message.polly-sticky-note--has-context.polly-sticky-note--has-actions {
  grid-template-areas:
    'message actions'
    'context context';
}

.polly-sticky-note__message {
  grid-area: message;
  word-break: break-word;
  padding: var(--spacing-base);
}

.polly-sticky-note__message--hide {
  opacity: 0;
  height: 0;
}

.polly-sticky-note__context {
  grid-area: context;
  display: flex;
  padding: var(--spacing-base);
  flex-direction: column;
  gap: var(--spacing-xxs);
  align-items: flex-start;
  font-size: var(--font-size-xs);
}

.polly-sticky-note__date {
  color: var(--colors-text-icon-medium);
}

.polly-sticky-note__actions-icon {
  grid-area: actions;
  display: flex;
  align-self: start;
}

.polly-sticky-note__form-actions {
  width: 100%;
  display: flex;
  gap: var(--spacing-base);
  justify-content: center;
}

.polly-sticky-note__form-input {
  width: 100%;
}

.polly-sticky-note__form-cancel {
  background-color: var(--colors-background-common-white);
}
</style>
