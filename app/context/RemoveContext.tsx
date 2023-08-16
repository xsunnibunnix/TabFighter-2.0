import React, { createContext, useState } from 'react';

interface RemoveContextProps {
  tabToDelete: number | null,
  setTabToDelete: React.Dispatch<React.SetStateAction<number>>
}

export const RemoveContext = createContext<RemoveContextProps | null>(null);

export default function RemoveProvider({ children }: { children: React.ReactNode }) {
  const [tabToDelete, setTabToDelete] = useState<number>(Infinity);
  return <RemoveContext.Provider value={{ tabToDelete, setTabToDelete }}>{children}</RemoveContext.Provider>
}