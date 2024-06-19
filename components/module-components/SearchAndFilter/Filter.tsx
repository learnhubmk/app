/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import style from './filter.module.scss';

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
  ContentManager = 'content-manager',
}

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={style.filter}>
      <select className={style.dropdown} value={selectedOption} onChange={handleChange}>
        {Object.values(UserRole).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
