/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import style from './actionDropdown.module.scss';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
}
interface ActionDropdownProps {
  dropdownItems: DropdownItem[];
}

const ActionDropdown = ({ dropdownItems }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className={style.dropdown} ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Actions
      </button>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          {dropdownItems.map((item) => (
            <li key={item.id} className={style.dropdownItem}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;
