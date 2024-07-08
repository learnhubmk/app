/* eslint-disable no-unused-vars */

import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';
import { UserData } from './ReusableTable';

interface DropdownItem {
  id: string;
  label: string;
}

interface TableRowComponentProps<T extends UserData> {
  data: T;
  isChecked: boolean;
  onCheckboxChange: (id: string) => void;
}

const TableRowComponent = <T extends UserData>({
  data,
  isChecked,
  onCheckboxChange,
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
      <td aria-label="Checkbox">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </td>
      <td>{data.first_name}</td>
      <td>{data.last_name}</td>
      <td>{data.role}</td>
      <td className={style.actionCell} aria-label="Actions">
        <ActionDropdown isDisabled={!isChecked} dropdownItems={dropdownItems} />
      </td>
    </tr>
  );
};

export default TableRowComponent;
