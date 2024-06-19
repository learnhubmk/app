import React from 'react';
import Input from '../../reusable-components/input/Input';
import style from './search.module.scss';

const Search: React.FC = () => {
  return (
    <div className={style.search}>
      <Input type="string" placeholder="Search" icon={<i className="bi bi-search" />} />
    </div>
  );
};

export default Search;
