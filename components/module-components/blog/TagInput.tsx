/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { ChangeEvent, useState, forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import styles from './TagInput.module.scss';
import useGetTags from '../../../apis/queries/tags/getTags';
import useDebounce from '../../../utils/hooks/useDebounce';
import useAddNewTag from '../../../apis/mutations/tags/useAddNewTag';
import { Tag } from '../../reusable-components/_Types';

interface TagInputProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  isAdmin?: boolean;
  isEditMode?: boolean;
}

export interface TagInputRef {
  clearInput: () => void;
}

const TagInput = forwardRef<TagInputRef, TagInputProps>((props, ref) => {
  const { selectedTags, onTagsChange, isAdmin = false, isEditMode = false } = props;
  const [searchTag, setSearchTag] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTag, 300);
  const { data } = useGetTags(debouncedSearchTerm);
  const addNewTagMutation = useAddNewTag();

  useImperativeHandle(ref, () => ({
    clearInput: () => setSearchTag(''),
  }));

  const filteredTags = data?.data ?? [];

  const addNewTag = async (tagName: string) => {
    if (!isEditMode) {
      toast.error('Тагови може да се додаваат само во едит мод');
      return;
    }
    if (!isAdmin) {
      toast.error('Само администратори може да креираат нови тагови');
      return;
    }
    const newTag = await addNewTagMutation.mutateAsync({ tagName });
    onTagsChange([...selectedTags, newTag.data as Tag]);
    setSearchTag('');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const addTag = (tag: Tag) => {
    if (!isEditMode) {
      toast.error('Тагови може да се додаваат само во едит мод');
      return;
    }
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
        placeholder={isAdmin ? 'Пребарај или креирај таг' : 'Пребарај таг'}
        className={styles.searchInput}
        name="searchTagInput"
        disabled={!isEditMode}
      />

      {debouncedSearchTerm && (
        <div className={styles.dropdown}>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag: Tag) => (
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
              onClick={(e) => {
                e.stopPropagation();
                if (!isAdmin) {
                  toast.error(
                    'Тагот не е пронајден, само администраторите може да креираат нов таг'
                  );
                  setSearchTag('');
                  return;
                }
                if (!isEditMode) {
                  toast.error('Тагови може да се додаваат само во едит мод');
                  return;
                }
                if (debouncedSearchTerm.trim()) {
                  addNewTag(debouncedSearchTerm);
                  return;
                }
                toast.error('Празни тагови не се дозволени');
              }}
            >
              {isAdmin ? `Create new tag: "${debouncedSearchTerm}". ` : 'Нема пронајдено тагови'}
              {isAdmin && <i className="bi bi-plus-lg" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
