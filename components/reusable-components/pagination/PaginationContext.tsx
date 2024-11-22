import React, { createContext, useContext, useMemo, useState } from 'react';

interface PaginationContextProps {
  items: any[];
  setItems: (items: any[]) => void;
  itemsPerPage: number;
  setItemsPerPage: (perPage: number) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedPerPage = localStorage.getItem('itemsPerPage');
    return savedPerPage ? parseInt(savedPerPage, 10) : 25;
  });

  const value = useMemo(
    () => ({
      items,
      setItems,
      itemsPerPage,
      setItemsPerPage,
    }),
    [items, setItems, itemsPerPage, setItemsPerPage]
  );

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};
