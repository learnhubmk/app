// components/Filter.tsx
import React, { useState } from 'react';
import style from './filter.module.scss';

const options = ['Admin', 'Member', 'Content Manager'];

const Filter: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={style.filter}>
      <select className={style.dropdown} value={selectedOption} onChange={handleChange}>
        <option value="" disabled hidden>
          Filter
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
