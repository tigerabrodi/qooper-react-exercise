import styled from 'styled-components'
import { Textbox, Typography } from '../../components'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Status } from '../../helpers'
import { useUser } from '../../hooks'
import { TaskList } from './TaskList'
import { useTodo } from '../../hooks/useTodo'
import { createTask } from '../../services'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 632px;
`

const StyledTextbox = styled(Textbox)`
  margin-top: 64px;
`

const StyledTypography = styled(Typography)`
  margin-top: 32px;
`

const NoTasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`

const Form = styled.form`
  width: 100%;
`

const LoadingWrapper = styled.div`
  margin-top: 32px;
`

export function TodoRoute() {
  const [taskInputValue, setTaskInputValue] = useState('')

  const { currentUser } = useUser()
  const [addingTaskStatus, setAddingTaskStatus] = useState<Status>('idle')

  const { tasks, isFetchingTasks, setTasks } = useTodo()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (addingTaskStatus === 'success') {
      inputRef.current?.focus()
    }
  }, [addingTaskStatus])

  function handleTaskInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskInputValue(event.target.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!currentUser) return

    const isEmpty = taskInputValue.trim() === ''
    if (isEmpty) return

    setAddingTaskStatus('loading')

    const newTask = {
      content: taskInputValue,
      completed: false,
    }

    try {
      const addedTask = await createTask({ userId: currentUser.id, newTask })

      setTasks((prevTasks) => [...prevTasks, addedTask])
      setTaskInputValue('')
      setAddingTaskStatus('success')
    } catch (error) {
      setAddingTaskStatus('error')
    }
  }

  const NoTaskScreen = (
    <NoTasksWrapper>
      <Typography variant="Text1" color="purple">
        :(
      </Typography>
      <Typography variant="Text1" color="purple">
        There is no task yet!
      </Typography>
    </NoTasksWrapper>
  )

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <StyledTextbox
          placeholder="Type a task and press Enter to add"
          ariaLabel="Type a task and press Enter to add"
          name="newTask"
          id="newTask"
          type="text"
          ref={inputRef}
          disabled={addingTaskStatus === 'loading'}
          fullWidth
          value={taskInputValue}
          onChange={handleTaskInputChange}
        />
      </Form>
      <StyledTypography variant="Heading">Tasks</StyledTypography>
      {isFetchingTasks ? (
        <LoadingWrapper role="alert" aria-label="loading">
          <Typography variant="Text1">Loading...</Typography>
        </LoadingWrapper>
      ) : tasks.length === 0 ? (
        NoTaskScreen
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Main>
  )
}
