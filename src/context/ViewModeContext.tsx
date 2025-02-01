
import React, { createContext, useState, useEffect, ReactNode } from "react";

type ViewMode = "grid" | "list";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
}
const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

interface ViewModeProviderProps {
  children: ReactNode;
}

export const ViewModeProvider: React.FC<ViewModeProviderProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    const savedViewMode = sessionStorage.getItem("viewMode");
    if (savedViewMode) {
      setViewMode(savedViewMode as ViewMode);
    }
  }, [])
  useEffect(() => {
    sessionStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = (): ViewModeContextType => {
  const context = React.useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
};
