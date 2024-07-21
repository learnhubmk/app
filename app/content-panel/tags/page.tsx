'use client';

import React from 'react';
import styles from './Tags.module.scss';
import TagManagementControls from './TagManagementControls';
import TagTable from './TagTable';
import AddTag from './AddTag';
import useTagManagement from './tagManagement';

const Tags = () => {
  const {
    tags,
    showAddTag,
    editingTagId,
    addTag,
    handleDelete,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
    setShowAddTag,
  } = useTagManagement();

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable
        tags={tags}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        editingTagId={editingTagId}
      />
    </div>
  );
};

export default Tags;
