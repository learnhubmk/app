'use client';

import React from 'react';
import style from './searchAndFilter.module.scss';
import Filter from './Filter';
import Search from './Search';

const SearchAndFilter = () => {
  return (
    <div className={style.searchAndFilter}>
      <Search />
      <Filter />
    </div>
  );
};
export default SearchAndFilter;
