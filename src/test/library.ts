import { render } from '@testing-library/react'
import { AppProviders } from '../context'
import { ReactElement } from 'react'

function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: AppProviders,
    ...options,
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
