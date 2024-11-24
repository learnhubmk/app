import React, { useState } from 'react';
import styles from './Pagination.module.scss';

export interface DropdownOption {
  id: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  onSelect: (selectedOption: DropdownOption) => void;
  initialSelected?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, initialSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((option) => option.id === initialSelected) || options[0]
  );

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.buttonPosition}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.dropdownButton}
      >
        <span>{selected.label}</span>
        <span className={`${styles.dropdownArrow} ${isOpen ? styles.rotated : styles.default}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className={styles.buttonUlStyle}>
          {options.map((option) => (
            <li key={option.id} style={{ padding: '0.5rem 1rem' }}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={styles.buttonNumberStyle}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
