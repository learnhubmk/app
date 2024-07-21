'use client';

import React from 'react';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import AddTags from '../../../components/module-components/tags/AddTags';
import TagTable from '../../../components/module-components/tags/TagTable';

const Tags = () => {
  return (
    <div className={styles.container}>
      <AddTags />
      <TagTable />
    </div>
  );
};

export default Tags;
