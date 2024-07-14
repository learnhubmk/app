'use client';

import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import Filter from '../SearchAndFilter/Filter';
import Search from '../SearchAndFilter/Search';
import style from './createBlogs.module.scss';

const CreateBlogs = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <Search handleInputChange={() => {}} searchValue="Search" />
        <div className={style.rightContainer}>
          <Filter handleRoleChange={() => {}} />
          <Button
            href=""
            type="button"
            buttonText="Search"
            buttonClass={['primaryButton']}
            moveIcon
          />
        </div>
      </div>
      <ReusableTable />
    </div>
  );
};

export default CreateBlogs;
