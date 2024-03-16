import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { BASE_API_URL, Status, Task } from "../helpers";
import { useUser } from "../hooks";

export type TodoContextType = {
  isFetchingTasks: boolean;
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Array<Task>>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [fetchingTaskStatus, setFetchingTaskStatus] =
    useState<Status>("loading");

  const { currentUser } = useUser();

  useEffect(() => {
    async function fetchTasks() {
      if (!currentUser) return;

      try {
        const response = await fetch(
          `${BASE_API_URL}/users/${currentUser.id}/tasks`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks = (await response.json()) as Task[];
        setTasks(tasks);
        setFetchingTaskStatus("success");
      } catch (error) {
        console.error(error);
        setFetchingTaskStatus("error");
      }
    }

    fetchTasks();
  }, [currentUser]);

  const isFetchingTasks = fetchingTaskStatus === "loading";

  return (
    <TodoContext.Provider value={{ isFetchingTasks, tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
}
