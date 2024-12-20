import { create } from "zustand";
import { Cart, CartItem } from "../hooks/types";

interface CartStore extends Cart {
  addItem: (p: CartItem) => void,
  removeItem: (id: number) => void,
  removeAll: () => void,
  increaseQuantity: (id: number) => void,
  decreaseQuantity: (id: number) => void
}

export const useCartStore = create<CartStore>()((set) => ({
  products: JSON.parse(<string>localStorage.getItem('cart')) ?? [],
  addItem: (p) => {    
    set(state => {
      if (state.products.map(p => p.product.id).includes(p.product.id)) {
        state.increaseQuantity(p.product.id);
      } else {
        state.products.push(p);
      }
      localStorage.setItem('cart', JSON.stringify(state.products));
      console.log(state.products);
      return ({ products: state.products })
    })
  },
  removeItem: (id) => {
    set(state => {
      const updatedCart = state.products.filter(p => p.product.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return ({ products: updatedCart });
    })
  },
  removeAll: () => set(() => {
    localStorage.setItem('cart', '[]');
    return ({ products: [] });
  }),
  increaseQuantity: (id) => {
    set(state => {
      const updatedCart = state.products.map(p => {
        if (p.product.id === id) {
          p.quantity++;
          return p;
        }
        return p;
      })

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return ({ products: updatedCart });
    })
  },
  decreaseQuantity: (id) => {
    set(state => {
      const updatedCart = state.products.filter(p => {
        if (p.product.id === id && p.quantity > 0) {
          p.quantity--;
          if (p.quantity <= 0) {
            return false;
          }
        }
        return true;
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return ({ products: updatedCart });
    })
  }
}));