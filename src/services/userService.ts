import { BASE_API_URL } from '../helpers'

type CreateUserParams = {
  username: string
  firstName: string
  lastName: string
}

export async function createUser(userData: CreateUserParams) {
  const response = await fetch(`${BASE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  return await response.json()
}
