import { useLiveQuery } from "dexie-react-hooks";
import { TodoItem } from "./TodoItem";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getAllTodosByPriority } from "../lib/todos";
import React from "react";
import { capitalize } from "../lib/string";

type TodoListParams = {
  id?: string;
};

export function TodoList() {
  const { id } = useParams<TodoListParams>();
  const todosByPriority = useLiveQuery(() => getAllTodosByPriority(), [], {});

  // Scroll to the active todo item if an id is provided
  useEffect(() => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });

  return Object.entries(todosByPriority).map(([priority, todos]) => (
    <React.Fragment key={priority}>
      <div className="text-xl font-bold">{capitalize(priority)}</div>
      <ul className="w-full">
        {todos.map((todo) => (
          <TodoItem
            active={todo.id.toString() === id}
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </React.Fragment>
  ));
}
