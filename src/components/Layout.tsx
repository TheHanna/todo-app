import { NavLink, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export function Layout() {
  return (
    <>
      <nav className="bg-blue-500 text-white flex items-center gap-x-4 p-4 shadow-md">
        <span className="text-3xl font-bold underline decoration-amber-500">
          Todo App
        </span>
        <span className="text-3xl">|</span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold text-amber-500 underline"
              : "text-2xl font-bold"
          }
          viewTransition
        >
          Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold text-amber-500 underline"
              : "text-2xl font-bold"
          }
          viewTransition
        >
          Add Todo
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold text-amber-500 underline"
              : "text-2xl font-bold"
          }
          viewTransition
        >
          Todo List
        </NavLink>
      </nav>
      <main className="p-4">
        <Outlet />
        <ToastContainer position="bottom-center" autoClose={2000} />
      </main>
    </>
  );
}
