import { create } from "zustand";
import { TodoProps } from "../components/todo/editable-todo";

export type State = {
  storeTodos: TodoProps[];
  otherTodos: TodoProps[];
  favoriteTodos: TodoProps[];
};

export type Actions = {
  setStoreTodos: (todos: TodoProps[]) => void;
  getTodos: () => TodoProps[];
  filter: () => void;
  updateStoreTodos: (todos: TodoProps[]) => void;
  unfavoriteTodo: (id: number) => void;
  favoriteTodo: (id: number) => void;
  createTodo: (todo: TodoProps) => void;
  deleteTodo: (todo: TodoProps) => void;
};

export const useTodoStore = create<State & Actions>((set, get) => ({
  storeTodos: [],
  otherTodos: [],
  favoriteTodos: [],

  setStoreTodos: (todos) => {
    set(() => ({ storeTodos: todos }));
    get().filter();
  },

  getTodos: () => get().storeTodos,

  updateStoreTodos: (todos) => {
    set((state) => ({ storeTodos: [...state.storeTodos, ...todos] }));
    get().filter();
  },

  createTodo: (todo) => {
    set((state) => ({ storeTodos: [todo, ...state.storeTodos] }));
    get().filter();
  },

  deleteTodo: (todo) => {
    const filteredTodoArray = get().storeTodos.filter((t) => t !== todo.id);
    set(() => ({ storeTodos: filteredTodoArray }));
    get().filter();
  },

  favoriteTodo: (id: number) => {
    const foundIndex = get().otherTodos.findIndex((t) => t.id === id);
    get().otherTodos[foundIndex].favorite = true;
    get().filter();
  },

  unfavoriteTodo: (id: number) => {
    const foundIndex = get().favoriteTodos.findIndex((t) => t.id === id);
    get().favoriteTodos[foundIndex].favorite = false;
    get().filter();
  },

  filter: () => {
    const favs: TodoProps[] = [];
    const others: TodoProps[] = [];
    get().storeTodos.forEach((t) => {
      if (t.favorite) favs.push(t);
      else others.push(t);
    });

    set(() => ({
      favoriteTodos: favs,
      otherTodos: others,
    }));
  },
}));
