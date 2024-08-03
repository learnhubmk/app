'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import TagTable from '../../../components/module-components/tags/TagTable';

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  const [showAddTag, setShowAddTag] = useState(false);
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'NextJS' },
  ]);

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
    toast.success('Тагот беше успешно избришан.');
  };

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      <TagTable tags={tags} handleEdit={() => {}} onDelete={handleDelete} />
    </div>
  );
};

export default Tags;
