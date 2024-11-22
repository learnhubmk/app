import React, { useState } from 'react';

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
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        <span>{selected.label}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            listStyle: 'none',
            margin: 0,
            padding: '0.5rem 0',
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <li key={option.id} style={{ padding: '0.5rem 1rem' }}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                }}
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
