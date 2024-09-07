/* eslint-disable no-unused-vars */

import React from 'react';
import style from './tableRowComponent.module.scss';

interface TableRowComponentProps<T extends { id: string }> {
  data: T;
  displayFields: (keyof T)[];
  isChecked?: boolean;
  onCheckboxChange: (id: string) => void;
  showCheckbox?: boolean;
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: React.ReactNode;
  onClick?: (id: string) => void;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  isChecked,
  onCheckboxChange,
  showCheckbox = false,
  renderActions,
  renderActionsDropdown,
  onClick,
}: TableRowComponentProps<T>) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(data.id);
  };

  const handleRowClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  const handleActionClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click from being triggered
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleActionClick(event as any);
    }
  };

  return (
    <tr
      className={style.rowComponent}
      onClick={handleRowClick} // Handle row click
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {showCheckbox && (
        <td aria-label="Checkbox">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </td>
      )}
      {displayFields.map((field) => (
        <td key={String(field)}>
          {Array.isArray(data[field])
            ? (data[field] as { name: string }[]).map((item) => item.name).join(', ')
            : String(data[field])}
        </td>
      ))}
      {renderActionsDropdown && (
        <td className={style.actionCell} aria-label="Actions">
          <button
            type="button"
            onClick={handleActionClick}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Make button focusable
            aria-haspopup="true" // Indicate a dropdown menu
          >
            {renderActionsDropdown}
          </button>
        </td>
      )}
      {renderActions && (
        <td className={style.actionCell}>
          <button
            type="button"
            className={style.actionButtons}
            onClick={handleActionClick}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Make button focusable
            aria-haspopup="true" // Indicate a dropdown menu
          >
            {renderActions(data)}
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableRowComponent;
