import React, { createContext, useState, useEffect } from 'react';

interface FontContextProps {
  smallActive: boolean,
  setSmallActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const FontContext = createContext<FontContextProps | null>(null);

export default function FontProvider({ children }: { children: React.ReactNode }) {
  let localText = localStorage.getItem('text');
  const [smallActive, setSmallActive] = useState(localText ? (localText === 'sm' ? true : false): true);

  useEffect(() => {
    localStorage.setItem('text', smallActive ? 'sm' : 'lg');
    localText = localStorage.getItem('text');
    setSmallActive(() => localText === 'sm' ? true : false)
  }, [smallActive]);
  return <FontContext.Provider value={{ smallActive, setSmallActive }}>{children}</FontContext.Provider>
}