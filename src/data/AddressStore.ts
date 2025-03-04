import { create } from "zustand";
import { Address } from "../hooks/types";

interface AddressStore {
  address: Address;
  setAddress: (p: Address) => void;
  removeAddress: () => void;
}
const initialState = {
  id: '',
  name: '',
  longitude: 0,
  latitude: 0,
};

export const useAddressStore = create<AddressStore>()((set) => ({
  address: JSON.parse(<string>localStorage.getItem('address')) ?? initialState,
  setAddress: (p: Address) => set((state) => {
    localStorage.setItem('address', JSON.stringify(p));
    return ({ ...state, address: p });
  }),
  removeAddress: () => set(() => {
    localStorage.setItem('address', JSON.stringify(initialState));
    return ({ address: initialState });
  }),
}));