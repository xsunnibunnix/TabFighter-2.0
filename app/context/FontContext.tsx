import React, { createContext, useState, useEffect, useContext } from 'react';

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
    setSmallActive(() => localText === 'sm' ? true : false);
    if (smallActive) {
      document.body.classList.contains('lg-window') ? document.body.classList.replace('lg-window', 'sm-window') : document.body.classList.add('sm-window');
    } else {
      document.body.classList.contains('sm-window') ? document.body.classList.replace('sm-window', 'lg-window') : document.body.classList.add('lg-window');
    }
  }, [smallActive]);

  return <FontContext.Provider value={{ smallActive, setSmallActive }}>{children}</FontContext.Provider>
}

export const useFontContext = () => {
  const fontContext = useContext(FontContext);
  if (!fontContext) {
    throw new Error('FontContext must be used within the FontContext Provider')
  }
  return fontContext;
}