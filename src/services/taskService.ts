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

  try {
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
  } catch (error) {
    throw new Error(`An error occurred while updating the task: ${error}`)
  }
}

type DeleteTaskParams = {
  taskId: string
  currentUser: CurrentUser
}

export async function deleteTask({ taskId, currentUser }: DeleteTaskParams) {
  if (!currentUser) return

  try {
    const response = await fetch(
      `${BASE_API_URL}/users/${currentUser.id}/tasks/${taskId}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
  } catch (error) {
    throw new Error(`An error occurred while deleting the task: ${error}`)
  }
}

type CreateTaskParams = {
  newTask: { content: string; completed: boolean }
  currentUser: CurrentUser
}

export async function createTask({ newTask, currentUser }: CreateTaskParams) {
  if (!currentUser) return

  try {
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
  } catch (error) {
    throw new Error(`An error occurred while creating the task: ${error}`)
  }
}

type GetTasksParams = {
  currentUser: CurrentUser
}

export async function getTasks({ currentUser }: GetTasksParams) {
  if (!currentUser) return

  try {
    const response = await fetch(
      `${BASE_API_URL}/users/${currentUser.id}/tasks`
    )

    if (response.ok) {
      return await response.json()
    } else if (response.status === 404) {
      return []
    } else {
      throw new Error('Failed to fetch tasks')
    }
  } catch (error) {
    throw new Error(`An error occurred while fetching tasks: ${error}`)
  }
}
