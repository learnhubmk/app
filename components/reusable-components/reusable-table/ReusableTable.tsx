/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import fetchData from './FetchData';
import TableHead from './TableHead';
import TableRowComponent from './TableRowComponent';
import style from './reusableTable.module.scss';

interface ReusableTableProps<T> {
  headers: (keyof T)[];
  displayNames: { [key in keyof T]?: string };
  fetchUrl: string;
}
/* eslint-disable-next-line no-unused-vars */
const ReusableTable = <T,>({
  headers,
  displayNames,
  fetchUrl,
}: ReusableTableProps<T>): React.JSX.Element => {
  const [sortField, setSortField] = useState<keyof T | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData<T>(fetchUrl);
        setData(response);
      } catch (error) {
        // eslint-disable-next-line no-console
      }
    };

    fetchDataFromApi();
  }, [fetchUrl]);

  const handleSort = (field: keyof T) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField) {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className={style.reusableTable}>
      <TableHead<T>
        headers={headers}
        sortField={sortField as keyof T}
        sortOrder={sortOrder}
        onSort={handleSort}
        displayNames={displayNames}
      />
      <tbody>
        {sortedData.map((item) => (
          <TableRowComponent key={(item as any).id} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
