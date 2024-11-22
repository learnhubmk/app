import React, { useEffect, useRef } from 'react';
import styles from './ReusableDropdown.module.scss';

type DropdownItem = {
  id: number;
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  items: DropdownItem[];
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ items, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className={styles.dropdownButton}>
        {placeholder}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {items.map((item) => (
            <li key={item.id} className={styles.dropdownItem}>
              <button
                type="button"
                className={styles.dropdownItemButton}
                onClick={() => handleItemClick(item.onClick)}
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
