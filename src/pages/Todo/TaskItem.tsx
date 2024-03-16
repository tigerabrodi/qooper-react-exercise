import styled from 'styled-components'
import { Input, Typography } from '../../components'
import { Task, Status, BASE_API_URL } from '../../helpers'
import { useUser } from '../../hooks'
import { FormEvent, useState } from 'react'
import { useTodo } from '../../hooks/useTodo'
import { useClickAway } from '@uidotdev/usehooks'

const TaskItemWrapper = styled.li<{ $isDeleting: boolean }>`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.grayMedium};
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ $isDeleting }) => ($isDeleting ? 0.5 : 1)};
`

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grayDark};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`

const EditButton = styled.button`
  width: 560px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
  background-color: transparent;

  &:disabled {
    opacity: 0.5;
  }
`

const EditForm = styled.form`
  width: 560px;
  height: 40px;
`

export function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskContent, setEditTaskContent] = useState(task.content)
  const [editingTaskStatus, setEditingTaskStatus] = useState<Status>('idle')
  const [isDeletingTaskStatus, setIsDeletingTaskStatus] =
    useState<Status>('idle')

  const { currentUser } = useUser()
  const { setTasks } = useTodo()

  const ref = useClickAway<HTMLFormElement>(() => {
    setIsEditing(false)
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!currentUser) return

    const isEmpty = editTaskContent.trim() === ''
    if (isEmpty) return

    const isSameContent = editTaskContent === task.content
    if (isSameContent) {
      setIsEditing(false)
      return
    }

    setEditingTaskStatus('loading')

    const newTask = {
      content: editTaskContent,
      completed: false,
    }

    try {
      const response = await fetch(
        `${BASE_API_URL}/users/${currentUser.id}/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newTask),
        }
      )

      if (!response.ok) {
        setEditingTaskStatus('error')
        throw new Error('Failed to create task')
      }

      const addedTask = (await response.json()) as Task

      setTasks((prev) =>
        prev.map((task) => (task.id === addedTask.id ? addedTask : task))
      )

      setIsEditing(false)
      setEditingTaskStatus('success')
    } catch (error) {
      console.error(error)
      setEditingTaskStatus('error')
    }
  }

  async function handleDelete() {
    if (!currentUser) return

    setIsDeletingTaskStatus('loading')

    try {
      const response = await fetch(
        `${BASE_API_URL}/users/${currentUser.id}/tasks/${task.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        setIsDeletingTaskStatus('error')
        throw new Error('Failed to delete task')
      }

      setTasks((prev) => prev.filter((t) => t.id !== task.id))

      setIsDeletingTaskStatus('success')
    } catch (error) {
      setIsDeletingTaskStatus('error')
      console.error(error)
    }
  }

  return (
    <TaskItemWrapper $isDeleting={isDeletingTaskStatus === 'loading'}>
      {isEditing ? (
        <EditForm onSubmit={handleSubmit} ref={ref}>
          <Input
            ariaLabel="Edit task"
            name="task"
            type="text"
            placeholder="Type a task and press Enter to add"
            disabled={editingTaskStatus === 'loading'}
            fullWidth
            autoFocus
            value={editTaskContent}
            onChange={(event) => setEditTaskContent(event.target.value)}
          />
        </EditForm>
      ) : (
        <EditButton
          onClick={() => setIsEditing(true)}
          disabled={isDeletingTaskStatus === 'loading'}
        >
          <Typography variant="Text1">{task.content}</Typography>
        </EditButton>
      )}

      <DeleteButton
        onClick={handleDelete}
        disabled={isDeletingTaskStatus === 'loading'}
      >
        <Typography variant="Text2" color="white">
          X
        </Typography>
      </DeleteButton>
    </TaskItemWrapper>
  )
}
