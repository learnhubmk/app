import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from './lib/data';
import { DropdownItem } from '../reusable-table/ActionDropdown';
import styles from './HomePagination.module.scss';
import ActionDropdownWrapper from './ActionDropdownWrapper';

const HomePagination: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100];

  const dropdownItems: DropdownItem[] = ITEMS_PER_PAGE_OPTIONS.map((option) => ({
    id: option.toString(),
    label: option.toString(),
  }));

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

  const handleDropdownSelect = (item: DropdownItem) => {
    setItemsPerPage(parseInt(item.label, 10));
  };

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
        <ActionDropdownWrapper dropdownItems={dropdownItems} onItemSelect={handleDropdownSelect} />
      </div>
    </div>
  );
};

export default HomePagination;
