import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let localTheme = localStorage.getItem("theme");

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(mediaQuery.matches);
  console.log(darkMode)
  const [theme, setTheme] = useState(localTheme ? localTheme : `${mediaQuery.matches ? 'dark' : 'light'}`);
  mediaQuery.addEventListener('change', (e) => {
    setDarkMode(e.matches);
  })

  useEffect(() => {
    localStorage.setItem('theme', theme!);
    let localTheme = localStorage.getItem("theme");
    document.querySelector('html')?.setAttribute('data-theme', localTheme!);
}, [theme]);
  
  return <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, setTheme }}>{children}</ThemeContext.Provider>
};