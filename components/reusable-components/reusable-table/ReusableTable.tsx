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

  const onView = () => {
    console.log('View clicked');
  };

  const onEdit = () => {
    console.log('Edit clicked');
  };

  const onDelete = () => {
    console.log('Delete clicked');
  };

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
            <TableRowComponent
              key={item.id}
              data={item}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
