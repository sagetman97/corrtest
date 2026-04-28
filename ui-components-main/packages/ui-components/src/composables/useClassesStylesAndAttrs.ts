import { Ref, ref, useAttrs, watchEffect } from 'vue'

import { AttrsValue, ClassValue, StyleValue } from '@/types/attributes'

export type UseClassesStylesAndAttrs = {
  classes: Ref<ClassValue>
  styles: Ref<StyleValue>
  attrs: Ref<AttrsValue>
}

export function useClassesStylesAndAttrs(): UseClassesStylesAndAttrs {
  const classes: Ref<ClassValue> = ref({})
  const styles: Ref<StyleValue> = ref([])
  const attrs: Ref<AttrsValue> = ref({})
  const attributes = useAttrs()

  watchEffect(() => {
    const { class: newClasses, style: newStyles, ...newAttrs } = attributes

    classes.value = newClasses as ClassValue
    styles.value = newStyles as StyleValue
    attrs.value = newAttrs
  })

  return {
    classes,
    styles,
    attrs,
  }
}
