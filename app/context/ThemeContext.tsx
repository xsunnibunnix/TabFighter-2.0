import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  let localTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(mediaQuery.matches);
  const [theme, setTheme] = useState(localTheme !== null ? localTheme : `${mediaQuery.matches ? 'dark' : 'light'}`);

  useEffect(() => {
    if (localTheme !== null && darkMode && localTheme === 'light') {
      setDarkMode(() => false)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localTheme = localStorage.getItem("theme");
    setTheme(localTheme!);
    document.querySelector('html')?.setAttribute('data-theme', localTheme!);
  }, [theme]);
  
  mediaQuery.addEventListener('change', (e) => {
    setDarkMode(e.matches);
  })
  
  return <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, setTheme }}>{children}</ThemeContext.Provider>
};