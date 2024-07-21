import React, { useState } from 'react';
import Button from '../../../components/reusable-components/button/Button';
import Input from '../../../components/reusable-components/input/Input';
import styles from './addTags.module.scss';

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
