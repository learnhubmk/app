'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import Cookies from 'js-cookie';
import useThemeDetector from '../../utils/themeDetector';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isDarkTheme = useThemeDetector();
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (Cookies.get('theme') as 'dark' | 'light') || (isDarkTheme ? 'dark' : 'light');
    }
    return 'dark';
  });

  useEffect(() => {
    if (!themeLoaded && typeof window !== 'undefined') {
      const storedTheme = Cookies.get('theme');
      if (storedTheme) {
        setTheme(storedTheme as 'dark' | 'light');
      } else {
        setTheme(isDarkTheme ? 'dark' : 'light');
      }
      setThemeLoaded(true);
    }
  }, [isDarkTheme, themeLoaded]);

  useEffect(() => {
    if (themeLoaded && typeof window !== 'undefined') {
      document.body.className = theme;
      Cookies.set('theme', theme, { expires: 365 });
    }
  }, [theme, themeLoaded]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {themeLoaded ? children : null}
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
