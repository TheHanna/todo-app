import { useRef } from "react";
import { db } from "../db/db";
import type { Todo } from "../models/Todo";
import { twMerge } from "tailwind-merge";
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "@phosphor-icons/react";
import { Priority } from "../models/Priority";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type TodoItemProps = {
  todo: Todo;
  active: boolean;
  className?: string;
};

const deleteTodo = async (id: number) => {
  await db.todos
    .delete(id)
    .then(() => {
      toast("Todo deleted successfully", { type: "success" });
    })
    .catch(() => {
      toast("Failed to delete todo", { type: "error" });
    });
};

const updateTodo = async (id: number, data: Partial<Todo>) => {
  await db.todos.update(id, data);
};

export function TodoItem({ todo, active, className = "" }: TodoItemProps) {
  const navigate = useNavigate();
  const todoRef = useRef<HTMLLIElement>(null);

  const removeTodo = () => {
    todoRef.current?.addEventListener("animationend", () =>
      deleteTodo(todo.id),
    );
    todoRef.current?.classList.add("animate-jump-out");
  };

  const editTodo = () => {
    navigate("/add", {
      state: { ...todo },
      viewTransition: true,
    });
  };

  const completeTodo = () => {
    todoRef.current?.addEventListener("animationend", () =>
      updateTodo(todo.id, { completed: true }),
    );
    todoRef.current?.classList.add("animate-shake");
  };

  const uncompleteTodo = () => {
    todoRef.current?.addEventListener("animationend", () =>
      updateTodo(todo.id, { completed: false }),
    );
    todoRef.current?.classList.add("animate-shake");
  };

  return (
    <li
      ref={todoRef}
      id={todo.id.toString()}
      className={twMerge(
        className,
        "flex items-center justify-between p-4 mb-2 rounded shadow",
        todo.completed ? "bg-green-500" : getPriorityBackground(todo.priority),
        active && getPriorityBorder(todo.priority),
      )}
    >
      <section className="flex justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold">{todo.title}</h2>
          <p className="text-gray-600">{todo.notes}</p>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={todo.completed ? uncompleteTodo : completeTodo}
            title={todo.completed ? "Mark Incomplete" : "Mark Complete"}
          >
            {todo.completed ? (
              <XIcon
                size={24}
                weight="bold"
                className="text-gray-500 cursor-pointer"
              />
            ) : (
              <CheckIcon
                size={24}
                weight="bold"
                className="text-green-500 cursor-pointer"
              />
            )}
          </button>
          <button onClick={editTodo} title="Edit Todo">
            <PencilIcon
              size={24}
              weight="bold"
              className="text-blue-500 cursor-pointer"
            />
          </button>
          <button onClick={removeTodo} title="Delete Todo">
            <TrashIcon
              size={24}
              weight="bold"
              className="text-red-500 cursor-pointer"
            />
          </button>
        </div>
      </section>
    </li>
  );
}

const getPriorityBackground = (priority: string) => {
  switch (priority) {
    case Priority.LOW:
      return "bg-blue-100";
    case Priority.MEDIUM:
      return "bg-amber-100";
    case Priority.HIGH:
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case Priority.LOW:
      return "border-2 border-blue-500";
    case Priority.MEDIUM:
      return "border-2 border-amber-500";
    case Priority.HIGH:
      return "border-2 border-red-500";
    default:
      return "border-2 border-gray-500";
  }
};
