'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import TagTable from '../../../components/module-components/tags/TagTable';
import AddTag from '../../../components/module-components/tags/AddTag';

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

  const addTag = (newTag: string) => {
    // Code below is for testing purposes. To be changed when implemented with API.

    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = tags.length > 0 ? (parseInt(tags[tags.length - 1].id, 10) + 1).toString() : '1';
    setTags([...tags, { id: newId, name: newTag }]);
    return true;
  };

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable tags={tags} onDelete={handleDelete} handleEdit={() => {}} />
    </div>
  );
};

export default Tags;
