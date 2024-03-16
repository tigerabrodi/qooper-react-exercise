export type User = {
  token: string;
  id: string;
  firstName: string;
};

export type Task = {
  id: string;
  content: string;
};

export type ClassNameProps = {
  className?: string;
};

export type Status = "idle" | "loading" | "success" | "error";
