/* eslint-disable no-undef */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import style from './searchAndFilter.module.scss';
import Filter from './Filter';
import Search from './Search';
import DisplayNames from './DisplayNames';

const SearchAndFilter: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
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

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <div className={style.searchAndFilterWrapper}>
        <div className={style.searchAndFilter}>
          <Search searchValue={searchValue} handleInputChange={handleInputChange} />
          <Filter />
        </div>
        <DisplayNames filterValue={debouncedValue} />
      </div>
    </>
  );
};
export default SearchAndFilter;
