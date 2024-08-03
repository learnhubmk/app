'use client';

import React, { useState } from 'react';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import TagTable from '../../../components/module-components/tags/TagTable';

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'NextJS' },
  ]);
  const [showAddTag, setShowAddTag] = useState(false);

  const addTag = (newTag: string) => {
    console.log(newTag);
  };

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      <TagTable handleDelete={() => {}} handleEdit={() => {}} tags={tags} />
    </div>
  );
};

export default Tags;
