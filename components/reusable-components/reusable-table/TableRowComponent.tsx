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
  onClick?: (id: string) => void; // Optional onClick for row navigation
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  isChecked,
  onCheckboxChange,
  showCheckbox,
  renderActions,
  renderActionsDropdown,
  onClick,
}: TableRowComponentProps<T>) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(data.id);
  };

  const handleRowClick = () => {
    if (onClick) {
      onClick(data.id); // Navigate to blog details
    }
  };

  const handleActionEvent = (
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.type === 'click' ||
      (event as React.KeyboardEvent).key === 'Enter' ||
      (event as React.KeyboardEvent).key === ' '
    ) {
      event.stopPropagation(); // Prevent row click when interacting with action elements
    }
  };

  return (
    <tr
      className={style.rowComponent}
      onClick={handleRowClick} // Handle row click to navigate
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
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
          <div
            role="button"
            tabIndex={0}
            onClick={handleActionEvent}
            onKeyDown={handleActionEvent}
            aria-haspopup="true"
            className={style.dropdownWrapper}
          >
            {renderActionsDropdown}
          </div>
        </td>
      )}

      {renderActions && (
        <td className={style.actionCell}>
          <div
            role="button"
            tabIndex={0}
            onClick={handleActionEvent}
            onKeyDown={handleActionEvent}
            className={style.actionWrapper}
          >
            {renderActions(data)}
          </div>
        </td>
      )}
    </tr>
  );
};

export default TableRowComponent;
