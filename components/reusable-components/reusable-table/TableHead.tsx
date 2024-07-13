import React from 'react';
import style from './tableHead.module.scss';

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

interface TableHeadProps<T> {
  headers: (keyof T)[];
  sortState: SortState<T>[];
  onSort: (field: keyof T) => void;
  displayNames: { [key in keyof T]?: string };
  showActions: boolean;
}

const TableHead = <T,>({
  headers,
  sortState,
  onSort,
  displayNames,
  showActions,
}: TableHeadProps<T>): React.JSX.Element => {
  const getSortOrder = (field: keyof T) => {
    const sort = sortState.find((sort) => sort.field === field);
    return sort ? sort.order : null;
  };

  return (
    <thead className={style.tableHead}>
      <tr>
        {headers.map((header) => (
          <th
            key={header as string}
            className={style.tableHeaderCell}
            onClick={() => onSort(header)}
          >
            {displayNames[header]}
            <span className={style.sortArrow}> {getSortOrder(header) === 'asc' ? ' ▲' : ' ▼'}</span>
          </th>
        ))}
        {showActions && <th>Actions</th>}
      </tr>
    </thead>
  );
};

export default TableHead;
