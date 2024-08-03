import React, { useState } from 'react';
import Button from '../../reusable-components/button/Button';
import Input from '../../reusable-components/input/Input';
import styles from './tagManagementControls.module.scss';

interface TagSearchProps {
  onAddClick: () => void;
}

const TagManagementControls: React.FC<TagSearchProps> = ({ onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
