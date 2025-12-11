import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoCategory = "Today" | "Tomorrow" | "Week" | "Month";
type TodoPriority = "Critical" | "High" | "Medium" | "Low";

export type Todo = {
  name: string;
  isCompleted: boolean;
  category: TodoCategory;
  priority: TodoPriority;
};

export type CompletedTodos = {
  name: string;
  completedTods: boolean;
  date: string;
};

type TodoState = {
  todos: Todo[];
  completedTodos: CompletedTodos[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (index: number) => void;
  removeTodo: (index: number) => void;
  removeAllTodo: () => void;
  editTodo: (index: number, updatedTodo: Partial<Todo>) => void; // 👈 new
};


const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      completedTodos: [],

      addTodo: (todo) => {
        set((state) => ({
          todos: [...state.todos, todo],
        }));
      },

      toggleTodo: (index) => {
        set((state) => ({
          todos: state.todos.map((todo, i) =>
            i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
          ),
        }));
      },

      removeTodo: (index) => {
        set((state) => ({
          todos: state.todos.filter((_, i) => i !== index),
        }));
      },

      removeAllTodo: () => {
        set(() => ({
          todos: [],
        }));
      },

      editTodo: (index, updatedTodo) => {
        set((state) => ({
          todos: state.todos.map((todo, i) =>
            i === index ? { ...todo, ...updatedTodo } : todo
          ),
        }));
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
export default useTodoStore;
