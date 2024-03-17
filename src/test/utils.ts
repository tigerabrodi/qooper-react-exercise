import { userEvent, screen } from '.'

export async function loginUser(fakeUser: {
  username: string
  firstName: string
  lastName: string
}) {
  await userEvent.type(screen.getByLabelText('username'), fakeUser.username)
  await userEvent.type(screen.getByLabelText('first name'), fakeUser.firstName)
  await userEvent.type(screen.getByLabelText('last name'), fakeUser.firstName)

  await userEvent.click(screen.getByRole('button', { name: 'LOGIN' }))
}
