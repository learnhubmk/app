'use client';

import React from 'react';
import { PaginationProvider } from './PaginationContext';
import HomePaginationContent from './HomePaginationContent';

const HomePagination: React.FC = () => {
  return (
    <PaginationProvider>
      <HomePaginationContent />
    </PaginationProvider>
  );
};

export default HomePagination;
