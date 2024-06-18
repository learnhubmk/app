'use client';

import React, { useEffect, useState } from 'react';
import { fetchData } from './FetchData';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';

const ReusableTable = () => {
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

  return (
    <div className={style.tableWrapper}>
      <table className={style.reusableTable}>
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
