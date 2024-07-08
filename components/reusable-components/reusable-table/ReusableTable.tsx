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

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

const ReusableTable = <T extends UserData>({
  headers,
  displayNames,
}: ReusableTableHeadProps<T>): React.JSX.Element => {
  const [sortState, setSortState] = useState<SortState<T>>({
    field: 'first_name' as keyof T,
    order: 'asc',
  });
  const [data, setData] = useState<T[]>([]);
  const [sortedData, setSortedData] = useState<T[]>([]);
  const [checkedId, setCheckedId] = useState<string | null>(null);

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

  useEffect(() => {
    const sortData = () => {
      const sorted = [...data].sort((a, b) => {
        if (a[sortState.field] < b[sortState.field]) return sortState.order === 'asc' ? -1 : 1;
        if (a[sortState.field] > b[sortState.field]) return sortState.order === 'asc' ? 1 : -1;
        return 0;
      });
      setSortedData(sorted);
    };

    sortData();
  }, [data, sortState]);

  const handleCheckboxChange = (id: string) => {
    setCheckedId(id === checkedId ? null : id);
  };

  const handleSort = (field: keyof T) => {
    setSortState((prevSortState) => {
      const newOrder =
        prevSortState.field === field && prevSortState.order === 'asc' ? 'desc' : 'asc';
      return { field, order: newOrder };
    });
  };

  return (
    <div className={style.tableWrapper}>
      {sortedData.length > 0 ? (
        <table className={style.reusableTable}>
          <TableHead<T>
            headers={headers}
            sortState={sortState}
            onSort={handleSort}
            displayNames={displayNames}
          />
          <tbody>
            {sortedData.map((item) => (
              <TableRowComponent
                key={item.id}
                data={item}
                isChecked={checkedId === item.id}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={style.noDataMessage}>No data available</div>
      )}
    </div>
  );
};

export default ReusableTable;
