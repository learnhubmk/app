/* eslint-disable react/no-array-index-key */

'use client';

import React, { useState, useMemo } from 'react';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';
import TableHead from './TableHead';
import Pagination, { defaultMeta } from '../pagination/Pagination';
import { MetaData } from '../../../Types';

interface ReusableTableProps<T> {
  paginationData: MetaData;
  setPaginationPage: (page: number) => void;
  headers: (keyof T)[];
  displayNames: { [key in keyof T]?: string };
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
  renderActionsDropdown?: (item: T) => React.ReactNode;
  editingTagId?: string | null;
  renderEditInput?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  onRowClick?: (id: string) => void;
}

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

const ReusableTable = <T extends { id: string }>({
  paginationData,
  setPaginationPage,
  isLoading,
  headers,
  displayNames,
  data,
  renderActions,
  renderActionsDropdown,
  editingTagId,
  renderEditInput,
  onRowClick,
}: ReusableTableProps<T>): React.JSX.Element => {
  const [sortState, setSortState] = useState<SortState<T>[]>([]);

  const handleSort = (field: keyof T) => {
    setSortState((prevSortState) => {
      const existingSort = prevSortState.find((sort) => sort.field === field);
      const newOrder = existingSort && existingSort.order === 'asc' ? 'desc' : 'asc';
      return [{ field, order: newOrder }];
    });
  };

  const renderSkeletonLoader = () => {
    const skeletonRows = Array.from({ length: 5 });

    return skeletonRows.map((_, rowIndex) => (
      <tr key={`skeleton-row-${rowIndex}`} className={style.skeletonRow}>
        {headers.map((__, colIndex) => (
          <td key={`skeleton-cell-${rowIndex}-${colIndex}`}>
            <div className={style.skeletonCell} />
          </td>
        ))}
        {(renderActions || renderActionsDropdown) && (
          <td key={`skeleton-action-${rowIndex}`}>
            <div className={style.skeletonCell} />
          </td>
        )}
      </tr>
    ));
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

  const renderNoDataRow = (message: string) => {
    return (
      <tr>
        <td colSpan={headers.length + (renderActions || renderActionsDropdown ? 1 : 0)}>
          <div className={style.noDataMessage}>{message}</div>
        </td>
      </tr>
    );
  };

  const renderTableContent = () => {
    if (isLoading) {
      return renderSkeletonLoader();
    }

    if (data.length === 0) {
      return renderNoDataRow('Нема податоци');
    }

    return sortedData.map((item) => (
      <TableRowComponent<T>
        onClick={() => onRowClick && onRowClick(item.id)}
        key={item.id}
        data={item}
        displayFields={headers}
        renderActions={renderActions}
        renderActionsDropdown={renderActionsDropdown}
        editingTagId={editingTagId}
        renderEditInput={renderEditInput}
      />
    ));
  };

  return (
    <>
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
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
      <Pagination meta={paginationData || defaultMeta} setPage={setPaginationPage} />
    </>
  );
};

export default ReusableTable;
