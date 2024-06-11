import React, { useState, useEffect, useRef } from 'react';
import style from './actionDropdown.module.scss';

interface ActionDropdownProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionDropdown = ({ onView, onEdit, onDelete }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleView = () => {
    onView();
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

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
      <button
        aria-label="Actions"
        type="button"
        onClick={toggleDropdown}
        className={style.dropdownButton}
      >
        Actions
      </button>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          <button
            type="button"
            aria-label="View"
            onClick={handleView}
            className={style.dropdownItem}
          >
            View
          </button>
          <button
            type="button"
            aria-label="Edit"
            onClick={handleEdit}
            className={style.dropdownItem}
          >
            Edit
          </button>
          <button
            type="button"
            aria-label="Delete"
            onClick={handleDelete}
            className={style.dropdownItem}
          >
            Delete
          </button>
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;
