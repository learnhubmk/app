'use client';

import React, { useState, useMemo } from 'react';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';
import TableHead from './TableHead';

interface ReusableTableProps<T> {
  headers: (keyof T)[];
  displayNames: { [key in keyof T]?: string };
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: React.ReactNode;
  editingId: string | null;
  onEdit: (id: string, field: keyof T, value: string) => void;
}

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

const ReusableTable = <T extends { id: string }>({
  headers,
  displayNames,
  data,
  renderActions,
  renderActionsDropdown,
  editingId,
  onEdit,
}: ReusableTableProps<T>): React.JSX.Element => {
  const [sortState, setSortState] = useState<SortState<T>[]>([]);

  const handleSort = (field: keyof T) => {
    setSortState((prevSortState) => {
      const existingSort = prevSortState.find((sort) => sort.field === field);
      const newOrder = existingSort && existingSort.order === 'asc' ? 'desc' : 'asc';
      return [{ field, order: newOrder }];
    });
  };

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
          showActions={!!renderActions}
          showDropdownActions={!!renderActionsDropdown}
        />
        <tbody>
          {sortedData.map((item) => (
            <TableRowComponent<T>
              key={item.id}
              data={item}
              displayFields={headers}
              renderActions={renderActions}
              renderActionsDropdown={renderActionsDropdown}
              isEditing={editingId === item.id}
              onEdit={(field, value) => onEdit(item.id, field, value)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
