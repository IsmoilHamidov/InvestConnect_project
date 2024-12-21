import { create } from 'zustand';

type AuthStep = 'registration' | 'verification' | 'login';

interface AuthModalState {
  isOpen: boolean;
  currentStep: AuthStep;
  user: { id: string; username: string } | null; // Add user details here
  openModal: (step: AuthStep) => void;
  closeModal: () => void;
  goToStep: (step: AuthStep) => void;
  setUser: (user: { id: string; username: string } | null) => void; // Setter for user
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  currentStep: 'registration',
  user: null,
  openModal: (step) => set({ isOpen: true, currentStep: step }),
  closeModal: () => set({ isOpen: false }),
  goToStep: (step) => set({ currentStep: step }),
  setUser: (user) => set({ user }),
}));
