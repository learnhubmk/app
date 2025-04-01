import React from 'react';
import Button from '../../reusable-components/button/Button';
import styles from './tagManagementControls.module.scss';
import Search from '../SearchAndFilter/Search';

interface TagManagementControlsProps {
  onAddClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isAdmin: boolean;
}

const TagManagementControls: React.FC<TagManagementControlsProps> = ({
  onAddClick,
  searchTerm,
  setSearchTerm,
  isAdmin,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.searchInputWrapper}>
        <Search
          placeholder="Пребарај тагови..."
          handleInputChange={setSearchTerm}
          searchValue={searchTerm}
        />
      </div>
      {isAdmin && (
        <Button
          onClick={onAddClick}
          type="button"
          buttonText="Додади таг"
          buttonClass={['addButton']}
        />
      )}
    </div>
  );
};

export default TagManagementControls;
