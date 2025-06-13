import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { AddTodoForm } from "./components/AddTodoForm.tsx";
import { TodoList } from "./components/TodoList.tsx";
import { Layout } from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "add",
        Component: AddTodoForm,
      },
      {
        path: "todos/:id?",
        Component: TodoList,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
