'use client';

import React, { useEffect, useState } from 'react';
import fetchData from './FetchData';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';

const ReusableTable = () => {
  const [data, setData] = useState<any[]>([]);

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

  return (
    <div className={style.tableWrapper}>
      <table className={style.reusableTable}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRowComponent key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
