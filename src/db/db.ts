import Dexie, { type EntityTable } from "dexie";

import type { Todo } from "../models/Todo";

const db = new Dexie("TodoDatabase") as Dexie & {
  todos: EntityTable<Todo, "id">;
};

db.version(1).stores({
  todos: "++id, title, notes, priority",
});

export { db };
