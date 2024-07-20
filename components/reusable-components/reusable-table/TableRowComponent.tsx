/* eslint-disable no-unused-vars */

import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';

interface DropdownItem {
  id: string;
  label: string;
}

interface TableRowComponentProps<T extends { id: string }> {
  data: T;
  isChecked?: boolean;
  onCheckboxChange: (id: string) => void;
  displayFields: (keyof T)[];
  showCheckbox: boolean;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  isChecked,
  onCheckboxChange,
  displayFields,
  showCheckbox,
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
      {showCheckbox && (
        <td aria-label="Checkbox">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </td>
      )}
      {displayFields.map((field) => (
        <td key={field as string}>
          {Array.isArray(data[field])
            ? (data[field] as unknown as { name: string }[]).map((item) => item.name).join(', ')
            : String(data[field])}
        </td>
      ))}
      <td className={style.actionCell} aria-label="Actions">
        <ActionDropdown dropdownItems={dropdownItems} />
      </td>
    </tr>
  );
};

export default TableRowComponent;
