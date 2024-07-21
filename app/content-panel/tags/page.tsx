'use client';

import React from 'react';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import TagTable from '../../../components/module-components/tags/TagTable';
import AddTag from '../../../components/module-components/tags/AddTag';
import useTagManagement from '../../../components/module-components/tags/tagManagement';

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
