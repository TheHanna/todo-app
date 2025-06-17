import type { Priority } from "./Priority";

export type Todo = {
  id: number;
  title: string;
  notes: string;
  priority: Priority;
  completed: boolean;
};
