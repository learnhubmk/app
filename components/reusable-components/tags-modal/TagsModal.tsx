/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './TagsModal.module.scss';
import ReusableModal from '../reusable-modal/ReusableModal';

interface TagSearchProps {
  existingTags: string[];
  selectedTags: string[];
  setSelectedTags: (items: string[]) => void;
  onClose: () => void;
  isOpen: boolean;
}

const TagsModal = ({
  existingTags,
  selectedTags,
  setSelectedTags,
  onClose,
  isOpen,
}: TagSearchProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(selectedTags);
  const [searchTag, setSearchTag] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSkills(selectedTags);
    }
  }, [isOpen, selectedTags]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTag(query);

    if (query) {
      const filtered = existingTags.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedSkills.includes(tag)) {
      setSelectedSkills([...selectedSkills, tag]);
    }
    setSearchTag('');
    setFilteredTags([]);
  };

  const removeTag = (tag: string) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== tag));
  };

  const handleSave = () => {
    setSelectedTags(selectedSkills);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ReusableModal
      title="Add Skill"
      isOpen={isOpen}
      onClose={handleCancel}
      onPrimaryButtonClick={handleSave}
      onSecondaryButtonClick={handleCancel}
    >
      <div className={styles.modalContent}>
        <input
          id="searchTagInput"
          type="text"
          value={searchTag}
          onChange={handleSearchChange}
          placeholder="Search or add a tag"
          className={styles.searchInput}
          name="searchTagInput"
        />
        {searchTag && (
          <div className={styles.dropdown}>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <div key={tag} onClick={() => addTag(tag)} className={styles.tagItem}>
                  {tag}
                </div>
              ))
            ) : (
              <div onClick={() => addTag(searchTag)} className={styles.tagItem}>
                Add {searchTag}
              </div>
            )}
          </div>
        )}
        <div className={styles.selectedTags}>
          {selectedSkills.map((skill) => (
            <span key={skill} className={styles.tag}>
              <span className={styles.removeTag} onClick={() => removeTag(skill)}>
                <i className="bi bi-x" />
              </span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </ReusableModal>
  );
};

export default TagsModal;
