/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import style from './filter.module.scss';

export enum UserRole {
  Admin = 'Admin',
  Member = 'Member',
  ContentManager = 'Content Manager',
}

interface FilterProps {
  handleRoleChange: (roles: UserRole[]) => void;
}

const Filter: React.FC<FilterProps> = ({ handleRoleChange }) => {
  const [selectedOption, setSelectedOption] = useState<UserRole>(UserRole.Member);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value as UserRole;
    setSelectedOption(selectedRole);
    if (selectedRole === UserRole.Member) {
      handleRoleChange(Object.values(UserRole).filter((role) => role !== UserRole.Member));
    } else {
      handleRoleChange([selectedRole]);
    }
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
