import React from 'react';
import Button from '../../reusable-components/button/Button';
import styles from './BlogManagementControls.module.scss';
import ReusableDropdown from '../../reusable-components/reusable-dropdown/ReusableDropdown';
import Search from '../SearchAndFilter/Search';

interface TagManagementControlsProps {
  onAddClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const filterBy = [
  {
    id: 1,
    label: 'Прикажи ги сите',
    onClick: () => {},
  },
  {
    id: 2,
    label: 'Admin',
    onClick: () => {},
  },
  {
    id: 3,
    label: 'Content Manager',
    onClick: () => {},
  },
  {
    id: 4,
    label: 'Member',
    onClick: () => {},
  },
];

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
        <ReusableDropdown
          placeholder="Филтрирај"
          icon={<i className="bi bi-caret-down-fill" />}
          items={filterBy}
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
