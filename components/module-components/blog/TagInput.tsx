import React, { ChangeEvent } from 'react';
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
  searchTag: string;
  onSearchTagChange: (value: string) => void;
  onClearSearch: () => void;
}

const TagInput: React.FC<TagInputProps> = (props) => {
  const {
    selectedTags,
    onTagsChange,
    isAdmin = false,
    isEditMode = false,
    searchTag,
    onSearchTagChange,
    onClearSearch,
  } = props;

  const debouncedSearchTerm = useDebounce(searchTag, 300);
  const { data } = useGetTags(debouncedSearchTerm);
  const addNewTagMutation = useAddNewTag();

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
    try {
      const newTag = await addNewTagMutation.mutateAsync({ tagName });
      onTagsChange([...selectedTags, newTag.data as Tag]);
      onClearSearch();
    } catch (error) {
      console.error('Failed to add new tag:', error);
      toast.error('Грешка при додавање на таг.');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTagChange(e.target.value);
  };

  const addTag = (tag: Tag) => {
    if (!isEditMode) {
      toast.error('Тагови може да се додаваат само во едит мод');
      return;
    }
    if (!selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
    }
    onClearSearch();
  };

  const handleCreateTagClick = () => {
    if (!isAdmin) {
      toast.error('Тагот не е пронајден, само администраторите може да креираат нов таг');
      onClearSearch();
      return;
    }
    if (!isEditMode) {
      toast.error('Тагови може да се додаваат само во едит мод');
      return;
    }
    if (debouncedSearchTerm.trim()) {
      addNewTag(debouncedSearchTerm);
    } else {
      toast.error('Празни тагови не се дозволени');
    }
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
                role="button"
                tabIndex={0}
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
              onClick={handleCreateTagClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCreateTagClick();
                }
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
};

export default TagInput;
