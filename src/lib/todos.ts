import { db } from "../db/db";
import { Priority, PriorityOrder } from "../models/Priority";

const getAllTodos = async () => {
  return db.todos.toArray();
};

export const getAllTodosByPriority = async () => {
  const todos = await getAllTodos();
  const todosByPriority = todos.reduce(
    (acc, todo) => {
      if (!acc[todo.priority]) {
        acc[todo.priority] = [];
      }
      acc[todo.priority].push(todo);
      return acc;
    },
    {} as Record<Priority, typeof todos>,
  );

  const sortedEntriesByPriority = Object.entries(todosByPriority).sort(
    ([priorityA], [priorityB]) => {
      const orderA = PriorityOrder[priorityA as Priority];
      const orderB = PriorityOrder[priorityB as Priority];
      return orderA - orderB;
    },
  );

  const sortedTodosByPriority = Object.fromEntries(sortedEntriesByPriority);
  return sortedTodosByPriority;
};
