import { HttpResponse, http } from 'msw'
import { BASE_API_URL, User } from '../helpers'
import { faker } from '@faker-js/faker'

type UserFormData = {
  firstName: string
}

type TaskFormData = {
  content: string
}

export const handlers = [
  // Get user
  http.post(`${BASE_API_URL}/users`, async ({ request }) => {
    const formData = (await request.json()) as UserFormData

    const mockUserResponse: User = {
      id: faker.string.uuid(),
      firstName: formData.firstName,
      token: faker.string.uuid(),
    }
    return HttpResponse.json(mockUserResponse, { status: 200 })
  }),

  // Get tasks
  http.get(`${BASE_API_URL}/users/:userId/tasks`, () => {
    return HttpResponse.json([], { status: 200 })
  }),

  // Update task
  http.put(
    `${BASE_API_URL}/users/:userId/tasks/:taskId`,
    async ({ request, params }) => {
      const formData = (await request.json()) as TaskFormData

      const updatedTask = {
        id: params.taskId,
        content: formData.content,
      }

      return HttpResponse.json(updatedTask, { status: 200 })
    }
  ),

  // Create task
  http.post(`${BASE_API_URL}/users/:userId/tasks`, async ({ request }) => {
    const formData = (await request.json()) as TaskFormData

    const newTask = {
      id: faker.string.uuid(),
      content: formData.content,
    }

    return HttpResponse.json(newTask, { status: 200 })
  }),

  http.delete(`${BASE_API_URL}/users/:userId/tasks/:taskId`, () => {
    return HttpResponse.json({}, { status: 200 })
  }),
]
