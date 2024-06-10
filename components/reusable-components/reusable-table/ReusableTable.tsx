'use client';

import React, { useEffect, useState } from 'react';
import fetchData from './FetchData';
import TableHead, { UserData } from './TableHead';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';

const ReusableTable: React.FC = () => {
  const headers: (keyof UserData)[] = ['first_name', 'last_name', 'role'];
  const [sortField, setSortField] = useState<keyof UserData>('first_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  const handleSort = (field: keyof UserData) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table className={style.reusableTable}>
      <TableHead
        headers={headers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
      <tbody>
        {sortedData.map((item) => (
          <TableRowComponent key={item.id} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
