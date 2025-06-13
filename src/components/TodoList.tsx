import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TodoItem } from "./TodoItem";
import { useParams } from "react-router";
import { useEffect } from "react";

type TodoListParams = {
  id?: string;
};

export function TodoList() {
  const { id } = useParams<TodoListParams>();
  const todos = useLiveQuery(() => db.todos.toArray());

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

  return (
    <ul className="w-full">
      {todos?.map((todo) => (
        <TodoItem
          active={todo.id.toString() === id}
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
}
