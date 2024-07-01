import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from './lib/data';
import Dropdown from './Dropdown';
import styles from './HomePagination.module.scss';

/* eslint no-unused-vars: "off" */
const HomePagination: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [TOTAL_PAGES, SET_TOTAL_PAGES] = useState(1);
  const [ITEMS_PER_PAGE, SET_ITEMS_PER_PAGE] = useState(25);

  const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100];

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(currentPage, ITEMS_PER_PAGE);
      setItems(data.items);
      SET_TOTAL_PAGES(Math.ceil(data.total / ITEMS_PER_PAGE));
    };

    loadItems();
  }, [currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    setCurrentPage(1);
  }, [ITEMS_PER_PAGE]);

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
          value={ITEMS_PER_PAGE}
          onChange={SET_ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default HomePagination;
