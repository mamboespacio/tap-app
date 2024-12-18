import { create } from "zustand";
import { User } from "../hooks/types";

interface UserStore {
  user: User;
  setUser: (p: User) => void;
  removeUser: () => void;
}
const initialState = {
  id: '',
  fullName: '',
  email: '',
  jwt: '',
};

export const useUserStore = create<UserStore>()((set) => ({
  user: JSON.parse(<string>localStorage.getItem('user')) ?? initialState,
  setUser: (p: User) => set((state) => {
    localStorage.setItem('user', JSON.stringify(p));
    return ({ ...state, user: p });
  }),
  removeUser: () => set(() => {
    localStorage.setItem('user', JSON.stringify(initialState));
    return ({ user: initialState });
  }),
}));