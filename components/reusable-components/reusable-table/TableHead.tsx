/* eslint-disable no-unused-vars */

import React from 'react';
import style from './tableHead.module.scss';

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface TableHeadProps {
  headers: (keyof UserData)[];
  sortField: keyof UserData;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof UserData) => void;
}

const displayNames: { [key in keyof UserData]?: string } = {
  first_name: 'First Name',
  last_name: 'Last Name',
  role: 'Role',
};

const TableHead: React.FC<TableHeadProps> = ({ headers, sortField, sortOrder, onSort }) => {
  return (
    <thead className={style.tableHead}>
      <tr>
        {headers.map((header) => (
          <th key={header} className={style.tableHeaderCell} onClick={() => onSort(header)}>
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
