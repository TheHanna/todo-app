import { useForm, type SubmitHandler } from "react-hook-form";
import { db } from "../db/db";
import { Priority } from "../models/Priority";
import { useState } from "react";
import type { Todo } from "../models/Todo";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { TodoSuccessToast } from "./TodoSuccessToast";

export type TodoFormInputs = {
  title: string;
  notes: string;
  priority: Priority;
};

export function AddTodoForm() {
  const { state }: { state: Todo } = useLocation();
  const { register, handleSubmit, reset } = useForm<TodoFormInputs>({
    defaultValues: {
      title: state?.title ?? "",
      notes: state?.notes ?? "",
      priority: state?.priority ?? Priority.LOW,
    },
  });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(state);

  const clearForm = () => {
    setEditingTodo(null);
    reset();
    toast("Form cleared", { type: "info" });
  };

  const updateTodo = async (id: number, data: TodoFormInputs) => {
    await db.todos
      .update(id, {
        title: data.title,
        notes: data.notes,
        priority: data.priority,
      })
      .then(() => {
        toast(
          <TodoSuccessToast
            message="Todo updated successfully"
            id={id.toString()}
          />,
          { type: "success" },
        );
      })
      .catch(() => {
        toast("Failed to update todo", { type: "error" });
      });
  };

  const addTodo = async (data: TodoFormInputs) => {
    await db.todos
      .add({
        title: data.title,
        notes: data.notes,
        priority: data.priority,
        completed: false,
      })
      .then((id) => {
        toast(
          <TodoSuccessToast
            message="Todo added successfully"
            id={id.toString()}
          />,
          { type: "success" },
        );
        reset();
      })
      .catch(() => {
        toast("Failed to add todo", { type: "error" });
      });
  };

  const onSubmit: SubmitHandler<TodoFormInputs> = async (data) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, data);
    } else {
      await addTodo(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-y-2 w-full sm:w-1/2 md:w-1/3"
    >
      <label htmlFor="title">
        <span className="ml-2">
          Title <span className="text-red-500">*</span>
        </span>
        <input {...register("title")} id="title" className="w-full" />
      </label>
      <label htmlFor="notes">
        <span className="ml-2">Notes</span>
        <textarea {...register("notes")} id="notes" className="w-full" />
      </label>
      <label htmlFor="priority">
        <span className="ml-2">
          Priority <span className="text-red-500">*</span>
        </span>
        <select {...register("priority")} id="priority" className="w-full">
          {Object.values(Priority).map((priority) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">{editingTodo ? "Update Todo" : "Add Todo"}</button>
      <button type="reset" onClick={clearForm}>
        Clear Form
      </button>
    </form>
  );
}
