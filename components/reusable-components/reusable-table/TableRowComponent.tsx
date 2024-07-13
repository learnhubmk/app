import React from 'react';
import style from './tableRowComponent.module.scss';

interface TableRowComponentProps<T> {
  data: T;
  displayFields: (keyof T)[];
  renderActions?: (item: T) => React.ReactNode;
}

const TableRowComponent = <T extends { id: string }>({
  data,
  displayFields,
  renderActions,
}: TableRowComponentProps<T>) => {
  return (
    <tr className={style.rowComponent}>
      {displayFields.map((field) => (
        <td key={field as string}>{String(data[field])}</td>
      ))}
      {renderActions && (
        <td className={style.actionCell}>
          <div className={style.actionButtons}>{renderActions(data)}</div>
        </td>
      )}
    </tr>
  );
};

export default TableRowComponent;
