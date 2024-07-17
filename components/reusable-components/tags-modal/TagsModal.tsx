/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { ChangeEvent, useState } from 'react';
import styles from './TagsModal.module.scss';

interface TagSearchProps {
  existingTags: string[];
  selectedTags: string[];
  setSelectedTags: (items: string[]) => void;
  onClose: () => void;
}

const TagsModal = ({ existingTags, selectedTags, setSelectedTags, onClose }: TagSearchProps) => {
  const [searchTag, setSearchTag] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

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
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchTag('');
    setFilteredTags([]);
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((item) => item !== tag));
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <i aria-label="Close button" className="bi bi-x" />
        </button>
        {/* eslint-disable jsx-a11y/label-has-associated-control  */}
        <label className={styles.skillLabel} htmlFor="searchTagInput">
          Skill
        </label>
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
          {selectedTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              <span className={styles.removeTag} onClick={() => removeTag(tag)}>
                <i className="bi bi-x" />
              </span>{' '}
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsModal;
