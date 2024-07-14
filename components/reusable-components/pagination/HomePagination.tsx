import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from './lib/data';
import Dropdown from './Dropdown';
import styles from './HomePagination.module.scss';

const HomePagination: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100];

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(currentPage, itemsPerPage);
      setItems(data.items);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    };

    loadItems();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const adjustCurrentPage = async () => {
      const data = await fetchItems(1, itemsPerPage);
      const newTotalPages = Math.ceil(data.total / itemsPerPage);

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      } else {
        setCurrentPage(1);
      }
    };
    adjustCurrentPage();
  }, [itemsPerPage, currentPage]);

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
        <Dropdown
          options={ITEMS_PER_PAGE_OPTIONS}
          value={itemsPerPage}
          onChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default HomePagination;
