import { create } from 'zustand';

type AuthStep = 'registration' | 'verification' | 'login';

interface AuthModalState {
  isOpen: boolean;
  currentStep: AuthStep;
  openModal: (step: AuthStep) => void;
  closeModal: () => void;
  goToStep: (step: AuthStep) => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  currentStep: 'registration',
  openModal: (step) => set({ isOpen: true, currentStep: step }),
  closeModal: () => set({ isOpen: false }),
  goToStep: (step) => set({ currentStep: step }),
}));
