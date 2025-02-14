/* eslint-disable no-undef */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import style from './searchAndFilter.module.scss';
import Filter from './Filter';
import Search from './Search';
import DisplayNames from './DisplayNames';
import { UserRole } from '../../../Types';

const SearchAndFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(Object.values(UserRole));
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (value: string) => {
    setSearchValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
  };

  const handleRoleChange = (roles: UserRole[]) => {
    setSelectedRoles(roles);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className={style.searchAndFilterWrapper}>
      <div className={style.searchAndFilter}>
        <Search searchValue={searchValue} handleInputChange={handleInputChange} />
        <Filter handleRoleChange={handleRoleChange} />
      </div>
      <DisplayNames filterValue={debouncedValue} selectedRoles={selectedRoles} />{' '}
    </div>
  );
};

export default SearchAndFilter;
