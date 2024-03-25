'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
// eslint-disable-next-line import/no-unresolved

interface ThemeContextType {
  theme: 'day' | 'night';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'day' | 'night'>('day');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'day' ? 'night' : 'day'));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
