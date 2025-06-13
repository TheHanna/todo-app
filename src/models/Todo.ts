import type { Priority } from "./Priority";

interface Todo {
  id: number;
  title: string;
  notes: string;
  priority: Priority;
  completed: boolean;
}

export type { Todo };
