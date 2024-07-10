'use client';

import React, { useState, useMemo, useCallback } from 'react';
import styles from './Tags.module.scss';
import ReusableModal from '../../../components/reusable-components/reusable-modal/ReusableModal';
import Button from '../../../components/reusable-components/button/Button';

interface Tag {
  id: number;
  name: string;
}

const initialTags: Tag[] = [
  { id: 1, name: 'tag1' },
  { id: 2, name: 'tag2' },
  { id: 3, name: 'tag3' },
];

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [deletingTagId, setDeletingTagId] = useState<number | null>(null);
  const [editedTagName, setEditedTagName] = useState('');

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tags, searchTerm]);

  const handleAddTag = useCallback(() => {
    // Implement add tag functionality
    console.log('Add tag clicked');
  }, []);

  const handleEditTag = useCallback(
    (id: number) => {
      const tagToEdit = tags.find((tag) => tag.id === id);
      if (!tagToEdit) return;
      setEditingTagId(id);
      setEditedTagName(tagToEdit.name);
    },
    [tags]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingTagId(null);
    setEditedTagName('');
  }, []);

  const handleSaveChanges = useCallback(
    (id: number) => {
      setTags((prevTags) =>
        prevTags.map((tag) => (tag.id === id ? { ...tag, name: editedTagName } : tag))
      );
      setEditingTagId(null);
      setEditedTagName('');
    },
    [editedTagName]
  );

  const confirmDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== deletingTagId));
    setDeletingTagId(null);
  }, [deletingTagId]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={styles.searchInput}
        />

        <Button
          type="button"
          buttonText="Add Tag"
          buttonClass={['addButton']}
          onClick={() => handleAddTag()}
        />
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
                      <Button
                        type="button"
                        buttonText="Save changes"
                        buttonClass={['saveButton']}
                        onClick={() => handleSaveChanges(tag.id)}
                      />

                      <Button
                        type="button"
                        buttonText="Cancel"
                        buttonClass={['deleteButton']}
                        onClick={handleCancelEdit}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        buttonText="Edit"
                        buttonClass={['editButton']}
                        onClick={() => handleEditTag(tag.id)}
                      />

                      <Button
                        type="button"
                        buttonText="Delete"
                        buttonClass={['deleteButton']}
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setDeletingTagId(tag.id);
                        }}
                      />
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
        onPrimaryButtonClick={confirmDelete}
      />
    </div>
  );
};

export default TagsPage;
