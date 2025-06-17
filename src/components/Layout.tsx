import { ListBulletsIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export function Layout() {
  return (
    <>
      <nav className="bg-blue-500 text-white flex items-center gap-x-4 p-4 shadow-md">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold text-amber-500 underline"
              : "text-2xl font-bold"
          }
          viewTransition
        >
          Todo App
        </NavLink>
        <span className="text-3xl">|</span>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-2xl font-bold text-amber-500 underline"
              : "flex items-center text-2xl font-bold"
          }
          viewTransition
        >
          <PlusCircleIcon size={24} />
          <span>Add</span>
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-2xl font-bold text-amber-500 underline"
              : "flex items-center text-2xl font-bold"
          }
          viewTransition
        >
          <ListBulletsIcon size={24} />
          <span>List</span>
        </NavLink>
      </nav>
      <main className="p-4">
        <Outlet />
        <ToastContainer position="bottom-center" autoClose={2000} />
      </main>
    </>
  );
}
