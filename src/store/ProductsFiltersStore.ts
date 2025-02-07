import { create } from 'zustand';

interface ProductsFiltersStore {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  selectedMinPrice: string;
  setSelectedMinPrice: (price: string) => void;

  selectedMaxPrice: string;
  setSelectedMaxPrice: (price: string) => void;

  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;

  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  refetch: () => void;
  setRefetch: (refetchFn: () => void) => void;
}

export const useProductsFiltersStore = create<ProductsFiltersStore>((set) => ({
  selectedLocation: '',
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  selectedCategory: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  selectedMinPrice: '',
  setSelectedMinPrice: (price) => set({ selectedMinPrice: price }),

  selectedMaxPrice: '',
  setSelectedMaxPrice: (price) => set({ selectedMaxPrice: price }),

  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),

  itemsPerPage: (() => {
    const savedItems = sessionStorage.getItem('itemsPerPage');
    return savedItems ? Number(savedItems) : 9;
  })(),
  setItemsPerPage: (items) => {
    sessionStorage.setItem('itemsPerPage', items.toString());
    set({ itemsPerPage: items });
  },

  currentPage: 0,
  setCurrentPage: (page) => set({ currentPage: page }),

// refetch
  refetch: () => {},
  setRefetch: (refetchFn) => set({ refetch: refetchFn }),
}));
