import styled from 'styled-components'
import { Textbox, Typography } from '../../components'
import { Task, Status } from '../../helpers'
import { useUser } from '../../hooks'
import { FormEvent, useState } from 'react'
import { useTodo } from '../../hooks/useTodo'
import { useClickAway } from '@uidotdev/usehooks'
import { deleteTask, updateTask } from '../../services'

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
  width: 544px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
  background-color: transparent;

  // 16px margin left + 1px for the border of the input to avoid flickering
  margin-left: 17px;

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

  async function handlEditSubmit(event: FormEvent<HTMLFormElement>) {
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
      const addedTask = await updateTask({
        userId: currentUser.id,
        taskId: task.id,
        newTask,
      })

      setTasks((prev) =>
        prev.map((task) => (task.id === addedTask.id ? addedTask : task))
      )

      setIsEditing(false)
      setEditingTaskStatus('success')
    } catch (error) {
      setEditingTaskStatus('error')
    }
  }

  async function handleDelete() {
    if (!currentUser) return

    setIsDeletingTaskStatus('loading')

    try {
      await deleteTask({ userId: currentUser.id, taskId: task.id })

      setTasks((prev) => prev.filter((t) => t.id !== task.id))

      setIsDeletingTaskStatus('success')
    } catch (error) {
      setIsDeletingTaskStatus('error')
    }
  }

  return (
    <TaskItemWrapper $isDeleting={isDeletingTaskStatus === 'loading'}>
      {isEditing ? (
        <EditForm onSubmit={handlEditSubmit} ref={ref}>
          <Textbox
            ariaLabel={`Edit task ${task.content}`}
            name="editTask"
            id="editTask"
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
          aria-label={`Edit task ${task.content}`}
        >
          <Typography variant="Text1">{task.content}</Typography>
        </EditButton>
      )}

      <DeleteButton
        onClick={handleDelete}
        aria-label={`Delete task ${task.content}`}
        disabled={isDeletingTaskStatus === 'loading'}
      >
        <Typography variant="Text2" color="white">
          X
        </Typography>
      </DeleteButton>
    </TaskItemWrapper>
  )
}
