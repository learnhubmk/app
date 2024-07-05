'use client';

/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { fetchData } from './FetchData';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';
import TableHead from './TableHead';

interface ReusableTableHeadProps<T> {
  headers: (keyof T)[];
  displayNames: { [key in keyof T]?: string };
}

const ReusableTable = <T,>({
  headers,
  displayNames,
}: ReusableTableHeadProps<T>): React.JSX.Element => {
  const [sortField, setSortField] = useState<keyof T | ''>(headers[0]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [data, setData] = useState<any[]>([]);
  const [checkedId, setCheckedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setCheckedId(id === checkedId ? null : id);
  };

  const handleSort = (field: keyof T) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField) {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={style.tableWrapper}>
      <table className={style.reusableTable}>
        <TableHead<T>
          headers={headers}
          sortField={sortField as keyof T}
          sortOrder={sortOrder}
          onSort={handleSort}
          displayNames={displayNames}
        />
        <tbody>
          {data.map((item) => (
            <TableRowComponent
              key={item.id}
              data={item}
              isChecked={checkedId === item.id}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
