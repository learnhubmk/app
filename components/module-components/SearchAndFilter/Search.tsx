/* eslint-disable no-unused-vars */

import React from 'react';
import Input from '../../reusable-components/input/Input';
import style from './search.module.scss';

interface SearchProps {
  handleInputChange: (value: string) => void;
  searchValue: string;
}

const Search = ({ handleInputChange, searchValue }: SearchProps) => {
  const onChange = (value: string) => {
    handleInputChange(value);
  };

  return (
    <div className={style.search}>
      <Input
        type="string"
        placeholder="Search"
        icon={<i className="bi bi-search" />}
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
