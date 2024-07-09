'use client';

import React, { useState } from 'react';
import styles from './Tags.module.scss';
import ReusableModal from '../../../components/reusable-components/reusable-modal/ReusableModal';

const initialTags = [
  { id: 1, name: 'tag1' },
  { id: 2, name: 'tag2' },
  { id: 3, name: 'tag3' },
];

const TagsPage = () => {
  const [tags, setTags] = useState(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTag = () => {
    // Implement add tag functionality
    console.log('Add tag clicked');
  };

  const handleEditTag = (id) => {
    const tagToEdit = tags.find((tag) => tag.id === id);
    setEditingTagId(id);
    setEditedTagName(tagToEdit.name);
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setEditedTagName('');
  };

  const handleSaveChanges = (id) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, name: editedTagName } : tag)));
    setEditingTagId(null);
    setEditedTagName('');
  };

  const handleDeleteTag = (id) => {
    setIsDeleteModalOpen(true);
    console.log('Delete tag', id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <button type="button" onClick={handleAddTag} className={styles.addButton}>
          Add Tag
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.nameColumn}>Tag name</th>
            <th className={styles.actionsColumn}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTags.map((tag) => (
            <tr key={tag.id}>
              <td className={styles.nameColumn}>
                {editingTagId === tag.id ? (
                  <input
                    type="text"
                    value={editedTagName}
                    onChange={(e) => setEditedTagName(e.target.value)}
                    className={styles.editInput}
                  />
                ) : (
                  tag.name
                )}
              </td>
              <td className={styles.actionsColumn}>
                <div className={styles.actionButtons}>
                  {editingTagId === tag.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveChanges(tag.id)}
                        className={styles.saveButton}
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className={styles.deleteButton}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditTag(tag.id)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(tag.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReusableModal
        title="Deleting tag"
        description="Are you sure you want to delete this tag?"
        isOpen={isDeleteModalOpen}
        primaryButtonLabel="Delete"
        secondaryButtonLabel="Cancel"
        onClose={() => setIsDeleteModalOpen(false)}
        onPrimaryButtonClick={() => {
          setIsDeleteModalOpen(false);
          alert('deleted');
        }}
      />
    </div>
  );
};

export default TagsPage;
