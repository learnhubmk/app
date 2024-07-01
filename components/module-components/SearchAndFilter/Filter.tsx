/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useMemo } from 'react';
import style from './filter.module.scss';

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
  ContentManager = 'content-manager',
}

interface FilterProps {
  handleRoleChange: (roles: UserRole[]) => void;
}

const Filter = ({ handleRoleChange }: FilterProps) => {
  const [selectedOption, setSelectedOption] = useState<UserRole | ''>('');

  const userRoleOptions = useMemo(() => Object.values(UserRole), []);

  useEffect(() => {
    handleRoleChange(selectedOption === '' ? userRoleOptions : [selectedOption]);
  }, [selectedOption, userRoleOptions, handleRoleChange]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value as UserRole;
    setSelectedOption(selectedRole);
  };

  return (
    <div className={style.filter}>
      <select className={style.dropdown} value={selectedOption} onChange={handleChange}>
        <option value="">All Roles</option>
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
