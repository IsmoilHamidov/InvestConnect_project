import { create } from "zustand";

// Описываем интерфейс стора
interface ProductsFiltersStore {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  selectedMinPrice: string;
  setSelectedMinPrice: (price: string) => void;

  selectedMaxPrice: string;
  setSelectedMaxPrice: (price: string) => void;
}

// Создаём Zustand-стор с типизацией
export const useProductsFiltersStore = create<ProductsFiltersStore>((set) => ({
  selectedLocation: "",
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  selectedMinPrice: "",
  setSelectedMinPrice: (price) => set({ selectedMinPrice: price }),
  
  selectedMaxPrice: "",
  setSelectedMaxPrice: (price) => set({ selectedMaxPrice: price }),
}));