import { App } from '../../app'
import {
  createFakeTask,
  createFakeUser,
  render,
  screen,
  userEvent,
  within,
} from '../../test'
import { it, expect } from 'vitest'
import { loginUser } from '../../test/utils'

const fakeUser = createFakeUser()

it('Should add, edit and delete tasks', async () => {
  const firstTask = createFakeTask()
  const editedFirstTask = createFakeTask()
  const secondTask = createFakeTask()

  render(<App />)

  await loginUser(fakeUser)

  expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument()
  const navigation = screen.getByRole('navigation')
  const welcomeMessage = within(navigation).getByText(
    `Welcome, ${fakeUser.firstName}`
  )
  expect(welcomeMessage).toBeInTheDocument()
  expect(screen.getByText('No tasks yet')).toBeInTheDocument()

  // Create first task
  const taskInput = screen.getByLabelText('Type a task and press Enter to add')
  await userEvent.type(taskInput, firstTask.content)
  await userEvent.type(taskInput, '{enter}')

  expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument()

  const listItem = screen.getByRole('listitem')
  expect(listItem).toHaveTextContent(firstTask.content)

  // Edit first task
  const editButton = within(listItem).getByRole('button', {
    name: `Edit task ${firstTask.content}`,
  })
  await userEvent.click(editButton)

  const editInput = within(listItem).getByLabelText(
    `Edit task ${firstTask.content}`
  )
  await userEvent.clear(editInput)
  await userEvent.type(editInput, editedFirstTask.content)
  await userEvent.type(editInput, '{enter}')

  expect(
    within(listItem).queryByLabelText(`Edit task ${firstTask.content}`)
  ).not.toBeInTheDocument()
  expect(listItem).not.toHaveTextContent(firstTask.content)
  expect(listItem).toHaveTextContent(editedFirstTask.content)

  // Create second task
  await userEvent.type(taskInput, secondTask.content)
  await userEvent.type(taskInput, '{enter}')

  expect(screen.getAllByRole('listitem').length).toBe(2)

  expect(screen.getByText(editedFirstTask.content)).toBeInTheDocument()
  expect(screen.getByText(secondTask.content)).toBeInTheDocument()

  // Delete tasks
  const deleteFirstTaskButton = screen.getByRole('button', {
    name: `Delete task ${editedFirstTask.content}`,
  })
  await userEvent.click(deleteFirstTaskButton)
  expect(screen.queryByText(editedFirstTask.content)).not.toBeInTheDocument()

  const deleteSecondTaskButton = screen.getByRole('button', {
    name: `Delete task ${secondTask.content}`,
  })
  await userEvent.click(deleteSecondTaskButton)
  expect(screen.queryByText(secondTask.content)).not.toBeInTheDocument()

  expect(screen.getByText('No tasks yet')).toBeInTheDocument()
})

it('Should not add task if input is empty', async () => {
  render(<App />)

  await loginUser(fakeUser)

  const SPACE = ' '

  const taskInput = screen.getByLabelText('Type a task and press Enter to add')
  await userEvent.type(taskInput, SPACE)
  await userEvent.type(taskInput, '{enter}')
  expect(screen.getByText('No tasks yet')).toBeInTheDocument()
})
