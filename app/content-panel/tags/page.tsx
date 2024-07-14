'use client';

import React from 'react';
import styles from './Tags.module.scss';
import AddTags from './AddTags';
import TagTable from './TagTable';

const Tags = () => {
  return (
    <div className={styles.container}>
      <AddTags />
      <TagTable />
    </div>
  );
};

export default Tags;
