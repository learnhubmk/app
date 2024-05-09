import { useEffect, useState } from 'react';

const useThemeDetector = () => {
  const getCurrentTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  const mListener = (e: any) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryList.addEventListener('change', mListener);
    return () => {
      mediaQueryList.removeEventListener('change', mListener);
    };
  }, []);

  return isDarkTheme;
};

export default useThemeDetector;
