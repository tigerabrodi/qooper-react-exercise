import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react'
import { Status, Task } from '../helpers'
import { useUser } from '../hooks'
import { getTasks } from '../services'

export type TodoContextType = {
  isFetchingTasks: boolean
  tasks: Array<Task>
  setTasks: Dispatch<SetStateAction<Array<Task>>>
}

export const TodoContext = createContext<TodoContextType | null>(null)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [fetchingTaskStatus, setFetchingTaskStatus] =
    useState<Status>('loading')

  const { currentUser } = useUser()

  useEffect(() => {
    async function fetchTasks() {
      if (!currentUser) return

      try {
        const tasks = await getTasks({ currentUser })
        setTasks(tasks)
        setFetchingTaskStatus('success')
      } catch (error) {
        setFetchingTaskStatus('error')
      }
    }

    fetchTasks()
  }, [currentUser])

  const isFetchingTasks = fetchingTaskStatus === 'loading'

  return (
    <TodoContext.Provider value={{ isFetchingTasks, tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  )
}
