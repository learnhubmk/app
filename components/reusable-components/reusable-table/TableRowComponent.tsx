import React, { ReactNode } from 'react';
import style from './tableRowComponent.module.scss';
import Input from '../input/Input';

interface TableRowComponentProps<T> {
  data: T;
  displayFields: (keyof T)[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: ReactNode;
  isEditing: boolean;
  onEdit: (field: keyof T, value: string) => void;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  renderActions,
  renderActionsDropdown,
  isEditing,
  onEdit,
}: TableRowComponentProps<T>) => {
  return (
    <tr className={style.rowComponent}>
      {displayFields.map((field) => (
        <td key={field as string}>
          {isEditing ? (
            <Input
              value={String(data[field])}
              type="text"
              placeholder=""
              onChange={(newValue: string) => onEdit(field, newValue)}
            />
          ) : (
            String(data[field])
          )}
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
