import React from 'react';
import Button from '../../reusable-components/button/Button';
import Input from '../../reusable-components/input/Input';
import styles from './tagManagementControls.module.scss';

interface TagManagementControlsProps {
  onAddClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

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
          placeholder="Пребарувај тагови..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Button
        onClick={onAddClick}
        type="button"
        buttonText="Додади таг"
        buttonClass={['addButton']}
      />
    </div>
  );
};

export default TagManagementControls;
