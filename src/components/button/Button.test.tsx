import { expect, it } from 'vitest'
import { Button } from '.'
import { render, screen } from '../../test'

it('renders correctly', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
