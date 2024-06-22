/* eslint-disable no-unused-vars */
import React from 'react';
import style from './tableHead.module.scss';

interface TableHeadProps<T> {
  headers: (keyof T)[];
  sortField: keyof T;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof T) => void;
  displayNames: { [key in keyof T]?: string };
}

const TableHead = <T,>({
  headers,
  sortField,
  sortOrder,
  onSort,
  displayNames,
}: TableHeadProps<T>): React.JSX.Element => {
  return (
    <thead className={style.tableHead}>
      <tr>
        <th className={style.tableHeaderCell}>
          <label htmlFor="selectAllCheckbox">
            <input id="selectAllCheckbox" type="checkbox" aria-label="Select all" />
            Select All
          </label>
        </th>
        {headers.map((header) => (
          <th
            key={header as string}
            className={style.tableHeaderCell}
            onClick={() => onSort(header)}
          >
            {displayNames[header]}
            {sortField === header && (
              <span className={style.sortArrow}>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
            )}
          </th>
        ))}
        <th className={style.tableHeaderCell}>ACTIONS</th>
      </tr>
    </thead>
  );
};

export default TableHead;
