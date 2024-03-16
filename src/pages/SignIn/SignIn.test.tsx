import { App } from '../../app'
import { createFakeUser, render, screen, userEvent } from '../../test'
import { it, expect } from 'vitest'

it('Form validation should work', async () => {
  const fakeUser = createFakeUser()

  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'LOGIN' }))

  expect(screen.getByText('Username is required')).toBeInTheDocument()
  expect(screen.getByText('First name is required')).toBeInTheDocument()
  await userEvent.type(screen.getByLabelText('username'), fakeUser.username)

  expect(screen.queryByText('Username is required')).not.toBeInTheDocument()
  expect(screen.getByText('First name is required')).toBeInTheDocument()

  await userEvent.type(screen.getByLabelText('first name'), fakeUser.firstName)
  expect(screen.queryByText('First name is required')).not.toBeInTheDocument()

  screen.debug()
})
