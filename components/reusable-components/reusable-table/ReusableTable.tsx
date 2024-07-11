'use client';

/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useMemo } from 'react';
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

const ReusableTable = <T extends { id: string }>({
  headers,
  displayNames,
}: ReusableTableHeadProps<T>): React.JSX.Element => {
  const [sortState, setSortState] = useState<SortState<T>[]>([]);
  const [data, setData] = useState<T[]>([]);
  const [checkedId, setCheckedId] = useState<string | null>(null);

  const handleCheckboxChange = (id: string) => {
    setCheckedId(id === checkedId ? null : id);
  };

  const handleSort = (field: keyof T) => {
    setSortState((prevSortState) => {
      const existingSort = prevSortState.find((sort) => sort.field === field);
      const newOrder = existingSort && existingSort.order === 'asc' ? 'desc' : 'asc';
      return [{ field, order: newOrder }];
    });
  };

  useEffect(() => {
    if (sortState.length > 0) {
      const sortedData = data.slice().sort((a, b) => {
        const sort = sortState[0];
        if (a[sort.field] > b[sort.field]) {
          return sort.order === 'asc' ? 1 : -1;
        }
        if (a[sort.field] < b[sort.field]) {
          return sort.order === 'asc' ? -1 : 1;
        }
        return 0;
      });
      setData(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  const sortedData = useMemo(() => {
    if (sortState.length > 0) {
      return [...data].sort((a, b) => {
        const sort = sortState[0];
        if (a[sort.field] > b[sort.field]) {
          return sort.order === 'asc' ? 1 : -1;
        }
        if (a[sort.field] < b[sort.field]) {
          return sort.order === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortState]);

  if (data?.length === 0) {
    return <div className={style.noDataMessage}>No data available</div>;
  }

  return (
    <div className={style.tableWrapper}>
      <table className={style.reusableTable}>
        <TableHead<T>
          headers={headers}
          sortState={sortState}
          onSort={handleSort}
          displayNames={displayNames}
        />
        <tbody>
          {sortedData.map((item) => (
            <TableRowComponent<T>
              key={item.id}
              data={item}
              isChecked={checkedId === item.id}
              onCheckboxChange={handleCheckboxChange}
              displayFields={headers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
