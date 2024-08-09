import { create } from "zustand";

export type State = {
  search: string;
};

export type Actions = {
  getSearch: () => string;
  setSearch: (val: string) => void;
};

export const useSearchStore = create<State & Actions>((set, get) => ({
  search: "",
  setSearch: (val) =>
    set(() => ({
      search: val,
    })),
  getSearch: () => get().search,
}));
