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

const ReusableTable = <T extends { id: string }>({
  headers,
  displayNames,
}: ReusableTableHeadProps<T>): React.JSX.Element => {
  const [sortState, setSortState] = useState<SortState<T>[]>([]);
  const [data, setData] = useState<T[]>([]);

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
    setSortState((prevSortState) => {
      const existingSort = prevSortState.find((sort) => sort.field === field);
      const newOrder = existingSort && existingSort.order === 'asc' ? 'desc' : 'asc';
      return [{ field, order: newOrder }];
    });

    setData((prevData) => {
      return [...prevData].sort((a, b) => {
        const aField = a[field];
        const bField = b[field];
        const sortOrder = sortState.find((sort) => sort.field === field)?.order || 'asc';

        if (aField < bField) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aField > bField) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  return (
    <div className={style.tableWrapper}>
      {data.length > 0 ? (
        <table className={style.reusableTable}>
          <TableHead<T>
            headers={headers}
            sortState={sortState}
            onSort={handleSort}
            displayNames={displayNames}
          />
          <tbody>
            {data.map((item) => (
              <TableRowComponent<T>
                key={item.id}
                data={item}
                isChecked={checkedId === item.id}
                onCheckboxChange={handleCheckboxChange}
                displayFelds={headers}
                displayNames={displayNames}
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
