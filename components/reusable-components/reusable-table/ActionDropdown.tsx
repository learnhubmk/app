import React, { useState } from 'react';
import style from './actionDropdown.module.scss';

interface ActionDropdownProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionDropdown = ({ onView, onEdit, onDelete }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'view':
        onView();
        break;
      case 'edit':
        onEdit();
        break;
      case 'delete':
        onDelete();
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
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
            onClick={() => handleAction('view')}
            onKeyDown={(e) => e.key === 'Enter' && handleAction('view')}
            className={style.dropdownItem}
          >
            View
          </button>
          <button
            type="button"
            aria-label="Edit"
            onClick={() => handleAction('edit')}
            onKeyDown={(e) => e.key === 'Enter' && handleAction('edit')}
            className={style.dropdownItem}
          >
            Edit
          </button>
          <button
            type="button"
            aria-label="Delete"
            onClick={() => handleAction('delete')}
            onKeyDown={(e) => e.key === 'Enter' && handleAction('delete')}
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
