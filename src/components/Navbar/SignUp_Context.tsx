import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  username: string;
  setUsername: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isSignedUp: boolean;
  setIsSignedUp: (state: boolean) => void;
  selectedOption: 'investor' | 'startup' | null;
  setSelectedOption: (option: 'investor' | 'startup' | null) => void;
  isUserActive: boolean;
  toggleUserActive: () => void;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'investor' | 'startup' | null>(null);
  const [isUserActive, setIsUserActive] = useState(false);

  const toggleUserActive = () => setIsUserActive((prev) => !prev);

  return (
    <NavbarContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        currentStep,
        setCurrentStep,
        username,
        setUsername,
        phone,
        setPhone,
        password,
        setPassword,
        isSignedUp,
        setIsSignedUp,
        selectedOption,
        setSelectedOption,
        isUserActive,
        toggleUserActive,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = (): NavbarContextProps => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }
  return context;
};
