import { create } from 'zustand';
import Category from '../interfaces/Category.interface';
import { getCategories } from './loaders';

interface CategoryStoreState {
  categories: [];
  fetch: () => void;
//   setCategory: (payload: Category) => void;
//   removeCategory: () => void;
}
const useCategoryStore = create<CategoryStoreState>()((set) => ({
  categories: [],
  fetch: async () => {
    const response = await getCategories();
    console.log('algo');
    //set({ categories: await response.json() })
  },
}));

export default useCategoryStore;