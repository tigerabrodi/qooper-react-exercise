import styled from "styled-components";
import { Input, Typography } from "../../components";
import { Task, Status, BASE_API_URL } from "../../helpers";
import { useUser } from "../../hooks";
import { FormEvent, useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const TaskItemWrapper = styled.li`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.grayMedium};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
`;

const EditButton = styled.button`
  width: 560px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
  background-color: transparent;
`;

const EditForm = styled.form`
  width: 560px;
  height: 40px;
`;

export function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskContent, setEditTaskContent] = useState(task.content);
  const [editingTaskStatus, setEditingTaskStatus] = useState<Status>("idle");

  const { currentUser } = useUser();
  const { setTasks } = useTodo();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser) return;

    const isEmpty = editTaskContent.trim() === "";
    if (isEmpty) return;

    const isSameContent = editTaskContent === task.content;
    if (isSameContent) {
      setIsEditing(false);
      return;
    }

    setEditingTaskStatus("loading");

    const newTask = {
      content: editTaskContent,
      completed: false,
    };

    try {
      const response = await fetch(
        `${BASE_API_URL}/users/${currentUser.id}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        setEditingTaskStatus("error");
        throw new Error("Failed to create task");
      }

      const addedTask = (await response.json()) as Task;

      setTasks((prev) =>
        prev.map((task) => (task.id === addedTask.id ? addedTask : task))
      );

      setIsEditing(false);
      setEditingTaskStatus("success");
    } catch (error) {
      console.error(error);
      setEditingTaskStatus("error");
    }
  }

  return (
    <TaskItemWrapper>
      {isEditing ? (
        <EditForm onSubmit={handleSubmit} onBlur={() => setIsEditing(false)}>
          <Input
            ariaLabel="Edit task"
            name="task"
            type="text"
            placeholder="Type a task and press Enter to add"
            disabled={editingTaskStatus === "loading"}
            fullWidth
            value={editTaskContent}
            onChange={(event) => setEditTaskContent(event.target.value)}
          />
        </EditForm>
      ) : (
        <EditButton onClick={() => setIsEditing(true)}>
          <Typography variant="Text1">{task.content}</Typography>
        </EditButton>
      )}

      <DeleteButton>
        <Typography variant="Text2" color="white">
          X
        </Typography>
      </DeleteButton>
    </TaskItemWrapper>
  );
}
