/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './TagInput.module.scss';
import useGetTags from '../../../apis/queries/tags/getTags';
import useDebounce from '../../../utils/hooks/useDebounce';
import useAddNewTag from '../../../apis/mutations/tags/useAddNewTag';

export interface TagObject {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface TagInputProps {
  selectedTags: TagObject[];
  onTagsChange: (tags: TagObject[]) => void;
}

const TagInput = ({ selectedTags, onTagsChange }: TagInputProps) => {
  const [searchTag, setSearchTag] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<TagObject[]>([]);

  const debouncedSearchTerm = useDebounce(searchTag, 300);
  const { data } = useGetTags(debouncedSearchTerm);

  const addNewTagMutation = useAddNewTag();

  const addNewTag = async (tagName: string) => {
    const newTag = await addNewTagMutation.mutateAsync({ tagName });
    onTagsChange([...selectedTags, newTag.data as TagObject]);

    setSearchTag('');
    setFilteredTags([]);
  };

  useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const filteredTags = data.data.filter((tag: { name: string }) =>
        tag.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      setFilteredTags(filteredTags);
    }
  }, [debouncedSearchTerm, data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const addTag = (tag: TagObject) => {
    if (!selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
    }
    setSearchTag('');
    setFilteredTags([]);
  };

  return (
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
            <div
              className={styles.tagItem}
              onClick={() => {
                addNewTag(debouncedSearchTerm);
              }}
            >
              Create new tag: "{debouncedSearchTerm}". <i className="bi bi-plus-lg" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagInput;
