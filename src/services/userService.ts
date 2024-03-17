import { BASE_API_URL } from '../helpers'

type CreateUserParams = {
  username: string
  firstName: string
  lastName: string
}

export async function createUser(userData: CreateUserParams) {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`An error occurred while creating the user: ${error}`)
  }
}
