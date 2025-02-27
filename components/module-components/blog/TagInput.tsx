/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './TagInput.module.scss';
import useGetTags from '../../../apis/queries/tags/getTags';
import useDebounce from '../../../utils/hooks/useDebounce';
import useAddNewTag from '../../../apis/mutations/tags/useAddNewTag';

export interface TagObject {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface TagInputProps {
  selectedTags: TagObject[];
  onTagsChange: (tags: TagObject[]) => void;
  isAdmin?: boolean;
}

const TagInput = ({ selectedTags, onTagsChange, isAdmin = false }: TagInputProps) => {
  const [searchTag, setSearchTag] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTag, 300);
  const { data } = useGetTags(debouncedSearchTerm);
  const addNewTagMutation = useAddNewTag();

  const filteredTags = data?.data ?? [];

  const addNewTag = async (tagName: string) => {
    const newTag = await addNewTagMutation.mutateAsync({ tagName });
    onTagsChange([...selectedTags, newTag.data as TagObject]);

    setSearchTag('');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const addTag = (tag: TagObject) => {
    if (!selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
    }
    setSearchTag('');
  };

  return (
    <div className={styles.modalContent}>
      <input
        id="searchTagInput"
        type="text"
        value={searchTag}
        onChange={handleSearchChange}
        placeholder="Пребарај или креирај таг"
        className={styles.searchInput}
        name="searchTagInput"
      />

      {debouncedSearchTerm && (
        <div className={styles.dropdown}>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag: TagObject) => (
              <div
                key={tag.id}
                onClick={() => addTag(tag)}
                className={styles.tagItem}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    addTag(tag);
                  }
                }}
              >
                {tag.name}
              </div>
            ))
          ) : (
            <>
              {isAdmin && (
                <div
                  className={styles.tagItem}
                  onClick={() => {
                    if (debouncedSearchTerm.trim()) {
                      addNewTag(debouncedSearchTerm);
                      return;
                    }
                    toast.error('Празни тагови не се дозволени');
                  }}
                >
                  Create new tag: "{debouncedSearchTerm}". <i className="bi bi-plus-lg" />
                </div>
              )}

              {!isAdmin && <div className={styles.tagItem}>No matching tags found</div>}
            </>
          )}
        </div>
      )}

      {/* {debouncedSearchTerm && (
        <div className={styles.dropdown}>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag: TagObject) => (
              <div
                key={tag.id}
                onClick={() => addTag(tag)}
                className={styles.tagItem}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    addTag(tag);
                  }
                }}
              >
                {tag.name}
              </div>
            ))
          ) : isAdmin ? (
            <div
              className={styles.tagItem}
              onClick={() => {
                if (debouncedSearchTerm.trim()) {
                  addNewTag(debouncedSearchTerm);
                  return;
                }
                toast.error('Празни тагови не се дозволени');
              }}
            >
              Create new tag: "{debouncedSearchTerm}". <i className="bi bi-plus-lg" />
            </div>
          ) : (
            <div className={styles.tagItem}>No matching tags found</div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default TagInput;
