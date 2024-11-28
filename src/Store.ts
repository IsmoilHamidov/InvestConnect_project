import create from 'zustand';

// Define your store
interface AppState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

// Create the store using Zustand's create method
export const useStore = create<AppState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
