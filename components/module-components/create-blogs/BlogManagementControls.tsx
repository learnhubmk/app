import React from 'react';
import Button from '../../reusable-components/button/Button';
import Input from '../../reusable-components/input/Input';
import styles from './BlogManagementControls.module.scss';
import ReusableDropdown from '../../reusable-components/reusable-dropdown/ReusableDropdown';

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

const TagManagementControls: React.FC<TagManagementControlsProps> = ({
  onAddClick,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.searchInputWrapper}>
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={setSearchTerm}
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
        buttonText="New Article"
        buttonClass={['addButton']}
      />
    </div>
  );
};

export default TagManagementControls;
