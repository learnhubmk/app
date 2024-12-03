import React, { useEffect, useRef, useState } from 'react';
import styles from './ReusableDropdown.module.scss';

type DropdownItem = {
  id: number;
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  items: DropdownItem[];
  placeholder?: string;
  icon?: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ items, placeholder = 'Select an option', icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className={styles.dropdownButton}>
        {selectedItem ? selectedItem.label : placeholder}
        {icon && <span className={styles.icon}>{icon}</span>}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {items.map((item) => (
            <li key={item.id} className={styles.dropdownItem}>
              <button
                type="button"
                className={styles.dropdownItemButton}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
