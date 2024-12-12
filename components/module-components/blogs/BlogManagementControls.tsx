import React from 'react';
import Button from '../../reusable-components/button/Button';
import styles from './BlogManagementControls.module.scss';
import ReusableDropdown from '../../reusable-components/reusable-dropdown/ReusableDropdown';
import Search from '../SearchAndFilter/Search';

interface TagManagementControlsProps {
  setFilter: (filterBy: string) => void;
  onAddClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BlogManagementControls: React.FC<TagManagementControlsProps> = ({
  onAddClick,
  searchTerm,
  setSearchTerm,
  setFilter,
}) => {
  const filterBy = [
    {
      id: 1,
      label: 'published',
      onClick: () => {
        setFilter('published');
      },
    },
    {
      id: 2,
      label: 'in_review',
      onClick: () => {
        setFilter('in_review');
      },
    },
    {
      id: 3,
      label: 'draft',
      onClick: () => {
        setFilter('draft');
      },
    },
    {
      id: 4,
      label: 'archived',
      onClick: () => {
        setFilter('archived');
      },
    },
  ];

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
