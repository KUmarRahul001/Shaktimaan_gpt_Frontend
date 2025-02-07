import React, { createContext, useContext, useEffect } from 'react';
import { useTheme } from '../store/theme';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: storedTheme, setTheme } = useTheme();
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (storedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(storedTheme);
    }
  }, [storedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: storedTheme as Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}