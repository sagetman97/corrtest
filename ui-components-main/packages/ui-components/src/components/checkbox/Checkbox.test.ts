import Checkbox from './PCheckbox.vue'
import { render } from '@testing-library/vue'

describe('Checkbox', () => {
  test('Renders', () => {
    const checkbox = render(Checkbox)
    expect(checkbox)
  })
  test('Label', () => {
    const checkbox = render(Checkbox, {
      props: {
        label: `hello`,
      },
    })

    expect(checkbox.getByText('hello')).toBeInTheDocument()
  })
})
