import { create } from "zustand";
import { Session } from "../hooks/types";

interface SessionStore {
  session: Session;
  setSession: (p: Session) => void;
  removeSession: () => void;
}
const initialState = {
  id: '',
  fullName: '',
  email: '',
  jwt: '',
};

export const useSessionStore = create<SessionStore>()((set) => ({
  session: JSON.parse(<string>localStorage.getItem('session')) ?? initialState,
  setSession: (p: Session) => set((state) => {
    localStorage.setItem('session', JSON.stringify(p));
    return ({ ...state, session: p });
  }),
  removeSession: () => set(() => {
    localStorage.setItem('session', JSON.stringify(initialState));
    return ({ session: initialState });
  }),
}));