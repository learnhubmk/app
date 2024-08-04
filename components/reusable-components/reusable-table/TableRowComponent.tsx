import React, { ReactNode } from 'react';
import style from './tableRowComponent.module.scss';
import Input from '../input/Input';

interface TableRowComponentProps<T> {
  data: T;
  displayFields: (keyof T)[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: ReactNode;
  editingTagId: string | null;
  renderEditInput: (item: T) => React.ReactNode;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  renderActions,
  renderActionsDropdown,
  editingTagId,
  renderEditInput,
}: TableRowComponentProps<T>) => {
  return (
    <tr className={style.rowComponent}>
      {displayFields.map((field) => (
        <td key={field as string} className={style.column}>
          {editingTagId === data.id && field === 'name' ? (
            <div className={style.editTags}>{renderEditInput(data)}</div>
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
