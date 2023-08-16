import React, { createContext, useState } from 'react';

interface FontContextProps {
  smallActive: boolean,
  setSmallActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const FontContext = createContext<FontContextProps | null>(null);

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const [smallActive, setSmallActive] = useState(true);
  return <FontContext.Provider value={{ smallActive, setSmallActive }}>{children}</FontContext.Provider>
}