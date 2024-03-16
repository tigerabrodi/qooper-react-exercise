import styled from "styled-components";
import { TaskItem } from "./TaskItem";
import { Task } from "../../helpers";

const TasksWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  row-gap: 2px;
  width: 100%;
`;

export function TaskList({ tasks }: { tasks: Array<Task> }) {
  return (
    <TasksWrapper>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </TasksWrapper>
  );
}
