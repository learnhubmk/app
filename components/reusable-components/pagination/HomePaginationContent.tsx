import React, { useCallback, useEffect } from 'react';
import { usePagination } from './PaginationContext';
import Dropdown from './Dropdown';
import ReusableTable from '../reusable-table/ReusableTable';
import styles from './Pagination.module.scss';

const HomePaginationContent: React.FC = () => {
  const { items, setItems, itemsPerPage, setItemsPerPage } = usePagination();

  const fetchPosts = useCallback(
    async (limit: number) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching posts:', error); // eslint-disable-line no-console
      }
    },
    [setItems]
  );

  useEffect(() => {
    fetchPosts(itemsPerPage);
  }, [itemsPerPage, fetchPosts]);

  const handleDropdownSelect = (selectedOption: { id: string; label: string }) => {
    setItemsPerPage(parseInt(selectedOption.id, 10));
  };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <ReusableTable<any>
        headers={['id', 'title']}
        displayNames={{ id: 'ID', title: 'Title' }}
        data={items}
      />
      <div className={styles.controls}>
        <Dropdown
          options={[
            { id: '25', label: '25' },
            { id: '50', label: '50' },
            { id: '100', label: '100' },
          ]}
          onSelect={handleDropdownSelect}
        />
      </div>
    </div>
  );
};

export default HomePaginationContent;
