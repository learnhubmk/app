import React from 'react';

interface StructurePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/* eslint no-unused-vars: "off" */
const StructurePagination: React.FC<StructurePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button type="button" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default StructurePagination;
