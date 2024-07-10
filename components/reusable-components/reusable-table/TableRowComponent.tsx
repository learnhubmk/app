/* eslint-disable no-unused-vars */

import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';

interface DropdownItem {
  id: string;
  label: string;
}

interface TableRowComponentProps<T> {
  data: T;
  isChecked?: boolean;
  onCheckboxChange: (id: string) => void;
  displayFields: (keyof T)[];
}

const TableRowComponent = <T extends { id: string }>({
  data,
  isChecked,
  onCheckboxChange,
  displayFields,
}: TableRowComponentProps<T>) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(data.id);
  };

  const dropdownItems: DropdownItem[] = [
    { id: 'view', label: 'View' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' },
  ];

  return (
    <tr className={style.rowComponent}>
      {isChecked && (
        <td aria-label="Checkbox">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </td>
      )}
      {displayFields.map((field) => (
        <td key={field as string}>{String(data[field])}</td>
      ))}
      <td className={style.actionCell} aria-label="Actions">
        <ActionDropdown dropdownItems={dropdownItems} />
      </td>
    </tr>
  );
};

export default TableRowComponent;
