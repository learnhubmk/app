import React from 'react';

interface DropdownProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

/* eslint no-unused-vars: "off" */

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
