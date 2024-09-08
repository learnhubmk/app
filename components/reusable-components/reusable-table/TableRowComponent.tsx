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

  const handleActionEvent = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      event.type === 'click' ||
      (event as React.KeyboardEvent<HTMLButtonElement>).key === 'Enter' ||
      (event as React.KeyboardEvent<HTMLButtonElement>).key === ' '
    ) {
      event.stopPropagation();
    }
  };

  return (
    <tr
      className={style.rowComponent}
      onClick={handleRowClick}
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
            onClick={handleActionEvent}
            onKeyDown={handleActionEvent}
            tabIndex={0}
            aria-haspopup="true"
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
            onClick={handleActionEvent}
            onKeyDown={handleActionEvent}
            tabIndex={0}
            aria-haspopup="true"
          >
            {renderActions(data)}
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableRowComponent;
