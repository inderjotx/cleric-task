import { createContext, useContext, type ReactNode } from "react";
import {
  useStackSelection,
  type UseStackSelectionReturn,
} from "../hooks/useStackSelection";

const StackBuilderContext = createContext<UseStackSelectionReturn | null>(null);

interface StackBuilderProviderProps {
  children: ReactNode;
}

export const StackBuilderProvider = ({ children }: StackBuilderProviderProps) => {
  const stackSelection = useStackSelection();

  return (
    <StackBuilderContext.Provider value={stackSelection}>
      {children}
    </StackBuilderContext.Provider>
  );
};

export const useStackBuilder = (): UseStackSelectionReturn => {
  const context = useContext(StackBuilderContext);

  if (!context) {
    throw new Error(
      "useStackBuilder must be used within a StackBuilderProvider"
    );
  }

  return context;
};
