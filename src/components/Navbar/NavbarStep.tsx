import React from "react";

import { useAuthModalStore } from "@/store/authModalStore";

// import Login from './Login';
import { Registration } from "./Registration";
import { Verification } from "./Verification";
import { HiX } from "react-icons/hi";
import { LoginModal } from "./Login";

export const NavbarStep = () => {
  const { isOpen, currentStep, closeModal, goToStep } = useAuthModalStore();

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case "registration":
        return <Registration onNext={() => goToStep("verification")} />;
      case "verification":
        return <Verification onNext={() => goToStep("login")} />;
      case "login":
        return <LoginModal onNext={() => goToStep("login")} />;
      default:
        return null;
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 "
          onClick={closeModal}
        >
          <HiX size={24} />
        </button>
        {renderStep()}
      </div>
    </div>
  );
};
