// components/reusable-components/pagination/HomePagination.tsx
import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from './lib/data';
import Pagination from './StructurePagination';
import Dropdown from './Dropdown';
import styles from './HomePagination.module.scss';

const HomePagination: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const options = [25, 50, 100];

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(currentPage, itemsPerPage);
      setItems(data.items);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    };

    loadItems();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className={styles.container}>
      <h1>Items</h1>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            {item.name}
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Dropdown options={options} value={itemsPerPage} onChange={setItemsPerPage} />
      </div>
    </div>
  );
};

export default HomePagination;
