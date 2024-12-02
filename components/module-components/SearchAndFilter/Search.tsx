/* eslint-disable no-unused-vars */

import React from 'react';
import Input from '../../reusable-components/input/Input';
import style from './search.module.scss';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className={style.search}>
      <Input
        type="text"
        placeholder="Search Blogs..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
    </div>
  );
};

export default Search;
