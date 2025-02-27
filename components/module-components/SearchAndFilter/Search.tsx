/* eslint-disable no-unused-vars */

import React from 'react';
import Input from '../../reusable-components/input/Input';
import style from './search.module.scss';

interface SearchProps {
  handleInputChange: (value: string) => void;
  searchValue: string;
  placeholder?: string;
}

const Search = ({ handleInputChange, searchValue, placeholder = 'Пребарувај...' }: SearchProps) => {
  const onChange = (value: string) => {
    handleInputChange(value);
  };

  return (
    <Input
      className={style.search}
      type="string"
      placeholder={placeholder}
      value={searchValue}
      onChange={onChange}
    />
  );
};

export default Search;
