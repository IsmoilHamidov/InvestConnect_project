import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
      {children}
    </div>,
    document.body
  );
};

export default ModalWrapper;
