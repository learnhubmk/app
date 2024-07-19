'use client';

import React, { useState } from 'react';
import styles from './Tags.module.scss';
import TagManagementControls from './TagManagementControls';
import TagTable from './TagTable';
import AddTag from './AddTag';

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
    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = tags.length > 0 ? (parseInt(tags[tags.length - 1].id, 10) + 1).toString() : '1';
    setTags([...tags, { id: newId, name: newTag }]);
    return true;
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable tags={tags} onDelete={handleDelete} />
    </div>
  );
};

export default Tags;
