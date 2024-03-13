import React, { createContext, useState, useEffect, useContext } from 'react';

type ThemeContextProps = {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  let localTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(localTheme ? (localTheme === 'dark' ? true : false) : mediaQuery.matches);
  const [theme, setTheme] = useState(localTheme !== null ? localTheme : `${mediaQuery.matches ? 'dark' : 'light'}`);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localTheme = localStorage.getItem("theme");
    setTheme(localTheme!);
    document.querySelector('html')?.setAttribute('data-theme', localTheme!);
  }, [theme]);

  return <ThemeContext.Provider value={ { darkMode, setDarkMode, theme, setTheme } }>{ children }</ThemeContext.Provider>
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeContext must be used within the ThemeContext Provider')
  }
  return themeContext;
}