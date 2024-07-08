/* eslint-disable no-unused-vars */
import React from 'react';
import style from './tableHead.module.scss';

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

interface TableHeadProps<T> {
  headers: (keyof T)[];
  sortState: SortState<T>;
  onSort: (field: keyof T) => void;
  displayNames: { [key in keyof T]?: string };
}

const TableHead = <T,>({
  headers,
  sortState,
  onSort,
  displayNames,
}: TableHeadProps<T>): React.JSX.Element => {
  const getSortOrder = (field: keyof T) => {
    return sortState.field === field ? sortState.order : null;
  };

  return (
    <thead className={style.tableHead}>
      <tr>
        <th aria-hidden="true" />

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
        <th aria-hidden="true" />
      </tr>
    </thead>
  );
};

export default TableHead;
