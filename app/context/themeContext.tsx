'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSun: boolean;
  setIsSun: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSun, setIsSun] = useState(true);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'dark';
    return storedTheme === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const handleClick = () => {
    toggleTheme();
    setIsSun((prevIsSun) => {
      const newIsSun = !prevIsSun;
      localStorage.setItem('isSun', String(newIsSun));
      return newIsSun;
    });
  };
  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedIsSun = localStorage.getItem('isSun');
    if (storedIsSun !== null) {
      setIsSun(storedIsSun === 'true');
    }
  }, []);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, toggleTheme, isSun, setIsSun, handleClick }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
