/* eslint-disable react/no-array-index-key */
import React from 'react';
import style from './reusableTable.module.scss';
import TableRowComponent from './TableRowComponent';

interface SortState<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

export const handleSort = <T extends { id: string }>(
  field: keyof T,
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>[]>>
) => {
  setSortState((prevSortState) => {
    const existingSort = prevSortState.find((sort) => sort.field === field);
    const newOrder = existingSort && existingSort.order === 'asc' ? 'desc' : 'asc';
    return [{ field, order: newOrder }];
  });
};

export const renderSkeletonLoader = <T extends { id: string }>(
  headers: (keyof T)[],
  renderActions?: (item: T) => React.ReactNode,
  renderActionsDropdown?: (item: T) => React.ReactNode
) => {
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

export const renderNoDataRow = (
  headers: string[],
  renderActions?: boolean,
  renderActionsDropdown?: boolean,
  message: string = 'Нема податоци'
) => {
  return (
    <tr>
      <td colSpan={headers.length + (renderActions || renderActionsDropdown ? 1 : 0)}>
        <div className={style.noDataMessage}>{message}</div>
      </td>
    </tr>
  );
};

export const renderTableContent = <T extends { id: string }>(
  isLoading: boolean,
  data: T[],
  headers: (keyof T)[],
  renderActions?: (item: T) => React.ReactNode,
  sortedData: T[],
  renderActionsDropdown?: (item: T) => React.ReactNode,
  renderEditInput?: (item: T) => React.ReactNode,
  editingTagId?: string | null,
  onRowClick?: (id: string) => void
) => {
  if (isLoading) {
    return renderSkeletonLoader(headers, renderActions, renderActionsDropdown);
  }

  if (data.length === 0) {
    return renderNoDataRow(headers as string[], !!renderActions, !!renderActionsDropdown);
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
