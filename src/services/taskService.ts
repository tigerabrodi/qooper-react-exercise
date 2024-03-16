import { CurrentUser } from '../context'
import { BASE_API_URL } from '../helpers'

type UpdateTaskParams = {
  taskId: string
  newTask: { content: string; completed: boolean }
  currentUser: CurrentUser
}

export async function updateTask({
  taskId,
  newTask,
  currentUser,
}: UpdateTaskParams) {
  if (!currentUser) return

  const response = await fetch(
    `${BASE_API_URL}/users/${currentUser.id}/tasks/${taskId}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTask),
    }
  )
  if (!response.ok) {
    throw new Error('Failed to update task')
  }
  return await response.json()
}

type DeleteTaskParams = {
  taskId: string
  currentUser: CurrentUser
}

export async function deleteTask({ taskId, currentUser }: DeleteTaskParams) {
  if (!currentUser) return

  const response = await fetch(
    `${BASE_API_URL}/users/${currentUser.id}/tasks/${taskId}`,
    {
      method: 'DELETE',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}

type CreateTaskParams = {
  newTask: { content: string; completed: boolean }
  currentUser: CurrentUser
}

export async function createTask({ newTask, currentUser }: CreateTaskParams) {
  if (!currentUser) return

  const response = await fetch(
    `${BASE_API_URL}/users/${currentUser.id}/tasks`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTask),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  return await response.json()
}
