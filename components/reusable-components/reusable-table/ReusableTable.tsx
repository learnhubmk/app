/* eslint-disable no-unused-vars */

import React, { useState, useMemo } from 'react';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';
import TableHead from './TableHead';

interface ReusableTableProps<T> {
  headers: (keyof T)[];
  displayNames: { [key in keyof T]?: string };
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: (item: T) => React.ReactNode;
  onRowClick?: (id: string) => void;
}

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

const ReusableTable = <T extends { id: string }>(
  props: ReusableTableProps<T>
): React.JSX.Element => {
  const { headers, displayNames, data, renderActions, renderActionsDropdown, onRowClick } = props;
  const [sortState, setSortState] = useState<SortState<T>[]>([]);
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

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedData = useMemo(() => {
    if (sortState.length > 0) {
      return [...data].sort((a, b) => {
        const sort = sortState[0];
        const aValue = getNestedValue(a, sort.field as string);
        const bValue = getNestedValue(b, sort.field as string);

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sort.order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        if (aValue > bValue) {
          return sort.order === 'asc' ? 1 : -1;
        }
        if (aValue < bValue) {
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
        <TableHead
          headers={headers}
          sortState={sortState}
          onSort={handleSort}
          displayNames={displayNames as { [key in keyof T]?: string }}
          showActions={!!renderActions}
          showDropdownActions={!!renderActionsDropdown}
        />
        <tbody>
          {sortedData.map((item) => (
            <TableRowComponent<T>
              onClick={() => onRowClick && onRowClick(item.id)}
              key={item.id}
              data={item}
              isChecked={checkedId === item.id}
              onCheckboxChange={handleCheckboxChange}
              displayFields={headers}
              showCheckbox={false}
              renderActions={renderActions}
              renderActionsDropdown={renderActionsDropdown && renderActionsDropdown(item)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
