/* eslint-disable no-unused-vars */

import React, { ReactNode } from 'react';
import style from './tableRowComponent.module.scss';

interface TableRowComponentProps<T extends { id: string }> {
  data: T;
  displayFields: (keyof T)[];
  isChecked?: boolean;
  onCheckboxChange: (id: string) => void;
  showCheckbox?: boolean;
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: ReactNode; // Add renderActionsDropdown prop
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  isChecked,
  onCheckboxChange,
  showCheckbox,
  renderActions,
  renderActionsDropdown,
}: TableRowComponentProps<T>) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(data.id);
  };

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

      {renderActionsDropdown && (
        <td className={style.actionCell} aria-label="Actions">
          {renderActionsDropdown}
        </td>
      )}

      {renderActions && (
        <td className={style.actionCell}>
          <div className={style.actionButtons}>{renderActions(data)}</div>
        </td>
      )}
    </tr>
  );
};

export default TableRowComponent;
