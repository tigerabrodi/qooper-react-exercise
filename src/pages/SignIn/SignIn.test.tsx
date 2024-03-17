import { App } from '../../app'
import { createFakeUser, render, screen, userEvent, within } from '../../test'
import { it, expect } from 'vitest'
import { loginUser } from '../../test/utils'

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
})

it('Login and logout', async () => {
  const fakeUser = createFakeUser()

  render(<App />)

  expect(
    screen.getByRole('heading', { name: 'Login to your account' })
  ).toBeInTheDocument()

  await loginUser(fakeUser)

  const navigation = screen.getByRole('navigation')
  const welcomeMessage = within(navigation).getByText(
    `Welcome, ${fakeUser.firstName}`
  )
  expect(welcomeMessage).toBeInTheDocument()

  const logoutButton = within(navigation).getByRole('button', {
    name: 'LOGOUT',
  })

  expect(logoutButton).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Login to your account' })
  ).not.toBeInTheDocument()

  await userEvent.click(logoutButton)

  expect(
    screen.queryByRole('heading', { name: 'Tasks' })
  ).not.toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'Login to your account' })
  ).toBeInTheDocument()
})
