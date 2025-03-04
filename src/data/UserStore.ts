import { create } from "zustand";
import { User, Product } from "../hooks/types";

interface UserStore {
  user: User;
  addItem: (p: number) => void,
  removeItem: (p: number) => void,
  setUser: (u: User) => void;
  removeUser: () => void;
}
const initialState = {
  id: '',
  fullName: '',
  email: '',
  jwt: '',
  favourites: []
};

export const useUserStore = create<UserStore>()((set) => ({
  user: JSON.parse(<string>localStorage.getItem('user')) ?? initialState,
  setUser: (u: User) => set((state) => {
    localStorage.setItem('user', JSON.stringify(u));
    return ({ ...state, user: u });
  }),
  addItem: (id) => {    
    set(state => {
      state.user.favourites.push(id)
      localStorage.setItem('user', JSON.stringify(state.user));
      // console.log('updatedUser:', state.user);
      return ({ user: state.user })
    })
  },
  removeItem: (id) => {
    set(state => {
      const updatedFavourites = state.user.favourites.filter(p => p !== id);
      const updatedUser = { ...state.user, favourites: updatedFavourites }
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // console.log('updatedUser:', updatedUser);
      return ({ user: updatedUser });
    })
  },
  removeUser: () => set(() => {
    localStorage.setItem('user', JSON.stringify(initialState));
    return ({ user: initialState });
  }),
}));