import { defineComponent, h, ref } from 'vue'

import { createStateWrapper } from '@cySupport/createStateWrapper'
import * as v from 'valibot'

import PInputFile from '@/components/inputFile/PInputFile.vue'
import { useValidation } from '@/composables'

const baseClass = '.polly-input-file'
const inputClass = '.polly-input-file__control'
const labelHeadingClass = '.polly-input-file__label-heading'
const messageClass = '.polly-input-file__message'
const selectButtonClass = '.polly-input-file__select-button'
const bannerClass = '.polly-banner'

describe('PInputFile', () => {
  it('renders basic file input', () => {
    cy.mount(PInputFile)
    cy.get(baseClass).should('exist')
    cy.get(inputClass).should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get(labelHeadingClass).should('contain.text', 'Select file or drag and drop here')
  })

  it('supports multiple files', () => {
    cy.mount(PInputFile, {
      props: {
        multiple: true,
      },
    })
    cy.get('input[type="file"]').should('have.attr', 'multiple')
    cy.get(labelHeadingClass).should('contain.text', 'Select files or drag and drop here')
  })

  it('handles custom label', () => {
    cy.mount(PInputFile, {
      props: {
        label: 'Upload your documents',
      },
    })
    cy.get(labelHeadingClass).should('contain.text', 'Upload your documents')
  })

  it('handles disabled state', () => {
    cy.mount(PInputFile, {
      props: {
        disabled: true,
      },
    })
    cy.get(baseClass).should('have.attr', 'aria-disabled', 'true')
    cy.get('input[type="file"]').should('be.disabled')
    cy.get(selectButtonClass).should('have.attr', 'aria-disabled', 'true')
  })

  it('displays message', () => {
    cy.mount(PInputFile, {
      props: {
        message: 'Maximum file size: 5MB',
      },
    })
    cy.get(messageClass).should('contain.text', 'Maximum file size: 5MB')
  })

  it('displays error messages', () => {
    cy.mount(PInputFile, {
      props: {
        errors: ['File too large', 'Invalid format'],
      },
    })
    cy.get(bannerClass).should('have.length', 2)
    cy.get(bannerClass).first().should('contain.text', 'File too large')
    cy.get(bannerClass).last().should('contain.text', 'Invalid format')
  })

  describe('File Type Validation', () => {
    it('accepts files with supported types (array)', () => {
      const supportedTypes = ['image/jpeg', 'image/png']
      cy.mount(PInputFile, {
        props: {
          supportedTypes,
          onChange: cy.spy().as('updateSpy'),
        },
      })

      // Create a file with supported type
      const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

      cy.get('input[type="file"]').then((input) => {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(validFile)
        input[0].files = dataTransfer.files
      })

      cy.get('input[type="file"]').trigger('change', { force: true })

      // Wait for the spy to be called and verify the result
      cy.get('@updateSpy')
        .should('have.been.called')
        .then((spy) => {
          const files = spy.lastCall.args[0]
          expect(files).to.have.length(1)
          expect(files[0].name).to.equal('test.jpg')
        })
    })

    it('rejects files with unsupported types', () => {
      const supportedTypes = ['image/jpeg', 'image/png']
      cy.mount(PInputFile, {
        props: {
          supportedTypes,
          onChange: cy.spy().as('updateSpy'),
        },
      })

      // Create a file with unsupported type
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      cy.get('input[type="file"]').then((input) => {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(invalidFile)
        input[0].files = dataTransfer.files
      })

      cy.get('input[type="file"]').trigger('change', { force: true })

      cy.get(bannerClass).should('contain.text', 'Format type not supported')
      cy.get('@updateSpy').should('not.have.been.called')
    })
  })

  describe('Drag and Drop', () => {
    it('shows valid state on dragenter with valid file', () => {
      cy.mount(PInputFile)

      // Simulate dragenter with valid file
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File([''], 'test.jpg', { type: 'image/jpeg' }))

      cy.get(baseClass).trigger('dragenter', {
        dataTransfer: dataTransfer,
      })

      cy.get(baseClass).should('have.class', 'polly-input-file--dragging').should('have.class', 'polly-input-file--valid')
    })

    it('shows invalid state on dragenter with invalid file', () => {
      cy.mount(PInputFile, {
        props: {
          supportedTypes: ['image/jpeg', 'image/png'],
        },
      })

      // Simulate dragenter with invalid file
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File([''], 'test.txt', { type: 'text/plain' }))

      cy.get(baseClass).trigger('dragenter', {
        dataTransfer: dataTransfer,
      })

      cy.get(baseClass).should('have.class', 'polly-input-file--dragging').should('have.class', 'polly-input-file--invalid')
    })

    it('removes drag states on dragleave', () => {
      cy.mount(PInputFile)

      cy.get(baseClass).trigger('dragenter').trigger('dragleave')

      cy.get(baseClass)
        .should('not.have.class', 'polly-input-file--dragging')
        .should('not.have.class', 'polly-input-file--valid')
        .should('not.have.class', 'polly-input-file--invalid')
    })
  })

  describe('Custom Slots', () => {
    it('supports custom icon slot', () => {
      cy.mount(PInputFile, {
        slots: {
          icon: '<div class="custom-icon">📁</div>',
        },
      })
      cy.get('.custom-icon').should('contain.text', '📁')
    })

    it('supports custom label slot', () => {
      cy.mount(PInputFile, {
        slots: {
          label: '<div class="custom-label">Drop files here</div>',
        },
      })
      cy.get('.custom-label').should('contain.text', 'Drop files here')
    })

    it('supports custom message slot', () => {
      cy.mount(PInputFile, {
        slots: {
          message: '<div class="custom-message">Custom message here</div>',
        },
      })
      cy.get('.custom-message').should('contain.text', 'Custom message here')
    })
  })

  describe('Validation', () => {
    it('shows errored state with state prop', () => {
      cy.mount(PInputFile, {
        props: {
          state: 'errored',
        },
      })

      cy.get(baseClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(inputClass).should('have.attr', 'aria-invalid', 'true')
    })

    it('shows errored state when errors array is provided', () => {
      cy.mount(PInputFile, {
        props: {
          errors: ['File is required'],
        },
      })

      cy.get(baseClass).should('have.attr', 'aria-invalid', 'true')
      cy.get(bannerClass).should('contain.text', 'File is required')
    })

    it('displays multiple error messages', () => {
      cy.mount(PInputFile, {
        props: {
          errors: ['File too large', 'Invalid format', 'Max files exceeded'],
        },
      })

      cy.get(bannerClass).should('have.length', 3)
      cy.get(bannerClass).eq(0).should('contain.text', 'File too large')
      cy.get(bannerClass).eq(1).should('contain.text', 'Invalid format')
      cy.get(bannerClass).eq(2).should('contain.text', 'Max files exceeded')
    })

    it('validates file size with custom validation', () => {
      const maxSizeBytes = 1024

      const TestComponent = defineComponent({
        setup() {
          const errors = ref<string[]>([])

          function handleChange(files: File[]) {
            const oversizedFiles = files.filter((file) => file.size > maxSizeBytes)
            if (oversizedFiles.length > 0) {
              errors.value = oversizedFiles.map((file) => `${file.name} exceeds maximum size of 1KB`)
            } else {
              errors.value = []
            }
          }

          return { errors, handleChange }
        },
        render() {
          return h(PInputFile, {
            errors: this.errors,
            onChange: this.handleChange,
          })
        },
      })

      cy.mount(TestComponent)

      const largeFile = new File(['a'.repeat(2048)], 'large-file.txt', { type: 'text/plain' })
      cy.get('input[type="file"]').then((input) => {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(largeFile)
        input[0].files = dataTransfer.files
      })
      cy.get('input[type="file"]').trigger('change', { force: true })

      cy.get(bannerClass).should('contain.text', 'large-file.txt exceeds maximum size of 1KB')
    })

    it('validates file count with custom validation', () => {
      const maxFiles = 2

      const TestComponent = defineComponent({
        setup() {
          const errors = ref<string[]>([])

          function handleChange(files: File[]) {
            if (files.length > maxFiles) {
              errors.value = [`Maximum ${maxFiles} files allowed, you selected ${files.length}`]
            } else {
              errors.value = []
            }
          }

          return { errors, handleChange }
        },
        render() {
          return h(PInputFile, {
            multiple: true,
            errors: this.errors,
            onChange: this.handleChange,
          })
        },
      })

      cy.mount(TestComponent)

      const files = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.txt', { type: 'text/plain' }),
      ]

      cy.get('input[type="file"]').then((input) => {
        const dataTransfer = new DataTransfer()
        files.forEach((file) => dataTransfer.items.add(file))
        input[0].files = dataTransfer.files
      })
      cy.get('input[type="file"]').trigger('change', { force: true })

      cy.get(bannerClass).should('contain.text', 'Maximum 2 files allowed, you selected 3')
    })

    it('clears errors when valid files are selected', () => {
      const TestComponent = defineComponent({
        setup() {
          const errors = ref<string[]>(['Previous error'])

          function handleChange(files: File[]) {
            if (files.length > 0) {
              errors.value = []
            }
          }

          return { errors, handleChange }
        },
        render() {
          return h(PInputFile, {
            errors: this.errors,
            onChange: this.handleChange,
          })
        },
      })

      cy.mount(TestComponent)

      cy.get(bannerClass).should('contain.text', 'Previous error')

      const validFile = new File(['content'], 'valid.txt', { type: 'text/plain' })
      cy.get('input[type="file"]').then((input) => {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(validFile)
        input[0].files = dataTransfer.files
      })
      cy.get('input[type="file"]').trigger('change', { force: true })

      cy.get(bannerClass).should('not.exist')
      cy.get(baseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('validates with valibot schema for file metadata', () => {
      const fileSchema = v.object({
        files: v.pipe(v.array(v.object({ name: v.string(), size: v.number() })), v.minLength(1, 'At least one file is required')),
      })

      const TestComponent = defineComponent({
        setup() {
          const errors = ref<string[]>([])
          const { validate, issues } = useValidation(fileSchema)

          function handleValidate() {
            const result = validate({ files: [] })
            if (!result) {
              errors.value = issues.value.map((issue) => issue.message)
            } else {
              errors.value = []
            }
          }

          return { errors, handleValidate }
        },
        render() {
          return h('div', [
            h(PInputFile, {
              errors: this.errors,
            }),
            h('button', { class: 'validate-btn', onClick: this.handleValidate }, 'Validate'),
          ])
        },
      })

      cy.mount(TestComponent)

      cy.get('.validate-btn').click()
      cy.get(bannerClass).should('contain.text', 'At least one file is required')
    })

    it('sets aria-invalid to false by default', () => {
      cy.mount(PInputFile)

      cy.get(baseClass).should('have.attr', 'aria-invalid', 'false')
    })

    it('sets aria-invalid to true when state is errored', () => {
      cy.mount(PInputFile, {
        props: {
          state: 'errored',
        },
      })

      cy.get(baseClass).should('have.attr', 'aria-invalid', 'true')
    })

    it('updates aria-invalid reactively when state prop changes', () => {
      cy.mount(createStateWrapper(PInputFile, {}))

      cy.get(baseClass).should('have.attr', 'aria-invalid', 'false')

      cy.get('.toggle-state').click()
      cy.get(baseClass).should('have.attr', 'aria-invalid', 'true')

      cy.get('.toggle-state').click()
      cy.get(baseClass).should('have.attr', 'aria-invalid', 'false')
    })
  })
})
