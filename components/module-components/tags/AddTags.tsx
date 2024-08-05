import React, { useState } from 'react';
import styles from './addTags.module.scss';
import Input from '../../reusable-components/input/Input';
import Button from '../../reusable-components/button/Button';

const AddTags = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    console.log(searchTerm);
  };

  return (
    <div className={styles.controls}>
      <Input type="text" placeholder="Search tags..." value={searchTerm} onChange={setSearchTerm} />

      <Button
        onClick={() => handleAdd()}
        type="button"
        buttonText="Add Tag"
        buttonClass={['addButton']}
      />
    </div>
  );
};

export default AddTags;
