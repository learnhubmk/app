'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface CursorContextType {
  position: { x: number; y: number };
  hideCursor: boolean;
  setHideCursor: Dispatch<SetStateAction<boolean>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      position,
      hideCursor,
      setHideCursor,
    }),
    [position, hideCursor, setHideCursor]
  );

  return <CursorContext.Provider value={contextValue}>{children}</CursorContext.Provider>;
};
