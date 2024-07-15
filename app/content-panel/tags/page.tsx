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
    // Code below is for testing purposes. To be changed when implemented with API.

    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = (parseInt(tags[tags.length - 1].id, 10) + 1).toString();
    setTags([...tags, { id: newId, name: newTag }]);
    return true;
  };

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable tags={tags} setTags={setTags} />
    </div>
  );
};

export default Tags;
