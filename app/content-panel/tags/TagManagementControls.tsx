import React, { useState } from 'react';
import Button from '../../../components/reusable-components/button/Button';
import Input from '../../../components/reusable-components/input/Input';
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
          placeholder="Search tags..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Button onClick={onAddClick} type="button" buttonText="Add Tag" buttonClass={['addButton']} />
    </div>
  );
};

export default TagManagementControls;
