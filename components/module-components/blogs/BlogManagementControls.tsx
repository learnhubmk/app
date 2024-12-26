import React from 'react';
import Button from '../../reusable-components/button/Button';
import styles from './BlogManagementControls.module.scss';
import Search from '../SearchAndFilter/Search';

interface TagManagementControlsProps {
  onAddClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BlogManagementControls: React.FC<TagManagementControlsProps> = ({
  onAddClick,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.searchInputWrapper}>
        <Search
          placeholder="Пребарај статии..."
          handleInputChange={setSearchTerm}
          searchValue={searchTerm}
        />
      </div>
      <Button
        onClick={onAddClick}
        type="button"
        buttonText="Нова Статија"
        buttonClass={['addButton']}
      />
    </div>
  );
};

export default BlogManagementControls;
