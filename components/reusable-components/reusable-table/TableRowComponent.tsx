import React from 'react';
import style from './tableRowComponent.module.scss';

interface TableRowComponentProps<T> {
  data: T;
  displayFields: (keyof T)[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: (item: T) => React.ReactNode;
  editingTagId?: string | null;
  renderEditInput?: (item: T) => React.ReactNode;
  onClick: (id: string) => void;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  renderActions,
  renderActionsDropdown,
  editingTagId,
  renderEditInput,
  onClick,
}: TableRowComponentProps<T>) => {
  const handleRowClick = () => {
    onClick(data.id);
  };

  const handleActionEvent = (
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.type === 'click' ||
      (event as React.KeyboardEvent).key === 'Enter' ||
      (event as React.KeyboardEvent).key === ' '
    ) {
      event.stopPropagation();
    }
  };

  return (
    <tr className={style.rowComponent} onClick={handleRowClick} style={{ cursor: 'pointer' }}>
      {displayFields.map((field) => (
        <td key={field as string} className={style.column}>
          {editingTagId === data.id && field === 'name' && renderEditInput ? (
            <div className={style.editTags}>{renderEditInput(data)}</div>
          ) : (
            String(data[field])
          )}
        </td>
      ))}

      {renderActionsDropdown && (
        <td className={style.actionCell} aria-label="Actions">
          <div
            role="button"
            tabIndex={0}
            onClick={handleActionEvent}
            onKeyDown={handleActionEvent}
            className={style.actionWrapper}
          >
            {renderActionsDropdown(data)}
          </div>
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
