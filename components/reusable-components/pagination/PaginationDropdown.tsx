import React from 'react';
import ReusableDropdown from '../reusable-dropdown/ReusableDropdown';

const PaginationDropdown = ({
  setItemsPerPage,
}: {
  setItemsPerPage: (itemsPerPage: number) => void;
}) => {
  const itemsPerPage = [
    {
      id: 1,
      label: '25',
      onClick: () => {
        setItemsPerPage(25);
      },
    },
    {
      id: 2,
      label: '50',
      onClick: () => {
        setItemsPerPage(50);
      },
    },
    {
      id: 3,
      label: '100',
      onClick: () => {
        setItemsPerPage(100);
      },
    },
  ];

  return (
    <ReusableDropdown
      selectable
      placeholder="Прикази по страна"
      icon={<i className="bi bi-caret-down-fill" />}
      items={itemsPerPage}
    />
  );
};

export default PaginationDropdown;
