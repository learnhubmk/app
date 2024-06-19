import React, { useState, useRef, useEffect } from 'react';
import style from './actionDropdown.module.scss';

interface ActionDropdownProps {
  isDisabled: boolean;
}

const ActionDropdown = ({ isDisabled }: ActionDropdownProps) => {
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
      <button type="button" onClick={() => setIsOpen(!isOpen)} disabled={isDisabled}>
        Actions
      </button>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          <li className={style.dropdownItem}>View</li>
          <li className={style.dropdownItem}>Edit</li>
          <li className={style.dropdownItem}>Delete</li>
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;
