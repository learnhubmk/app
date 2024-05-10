import { useEffect, useState } from 'react';

const useThemeDetector = () => {
  const getCurrentTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  const themeChangeListener = (event: any) => {
    setIsDarkTheme(event.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryList.addEventListener('change', themeChangeListener);
    return () => {
      mediaQueryList.removeEventListener('change', themeChangeListener);
    };
  }, []);

  return isDarkTheme;
};

export default useThemeDetector;
