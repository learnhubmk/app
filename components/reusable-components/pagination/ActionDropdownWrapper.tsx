import React, { useEffect, useRef } from 'react';
import ActionDropdown, { DropdownItem } from '../reusable-table/ActionDropdown';

interface ActionDropdownWrapperProps {
  dropdownItems: DropdownItem[];
  onItemSelect: (item: DropdownItem) => void;
}

const ActionDropdownWrapper: React.FC<ActionDropdownWrapperProps> = ({
  dropdownItems,
  onItemSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleItemClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const itemId = target.getAttribute('data-id');
      if (itemId) {
        const selectedItem = dropdownItems.find((item) => item.id === itemId);
        if (selectedItem) {
          onItemSelect(selectedItem);
        }
      }
    };

    const currentDropdownRef = dropdownRef.current;
    if (currentDropdownRef) {
      currentDropdownRef.addEventListener('click', handleItemClick);
    }

    return () => {
      if (currentDropdownRef) {
        currentDropdownRef.removeEventListener('click', handleItemClick);
      }
    };
  }, [dropdownItems, onItemSelect]);

  return (
    <div ref={dropdownRef}>
      <ActionDropdown dropdownItems={dropdownItems} />
    </div>
  );
};

export default ActionDropdownWrapper;
