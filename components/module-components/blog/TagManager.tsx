import React, { useState, forwardRef } from 'react';
import { Tag } from '../../reusable-components/_Types';
import TagInput from './TagInput';
import TagList from './TagList';

interface TagManagerProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  isAdmin?: boolean;
  isEditMode?: boolean;
}

export interface TagManagerRef {
  clearInput: () => void;
}

const TagManager = forwardRef<TagManagerRef, TagManagerProps>((props, ref) => {
  const { selectedTags, onTagsChange, isAdmin, isEditMode } = props;

  const [searchTag, setSearchTag] = useState<string>('');

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  const clearSearchInput = () => {
    setSearchTag('');
  };

  React.useImperativeHandle(ref, () => ({
    clearInput: () => {
      clearSearchInput();
    },
  }));

  const handleSearchTagChange = (value: string) => {
    setSearchTag(value);
  };

  return (
    <>
      <TagList selectedTags={selectedTags} onRemoveTag={handleRemoveTag} isEditMode={isEditMode} />
      <TagInput
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
        isAdmin={isAdmin}
        isEditMode={isEditMode}
        searchTag={searchTag}
        onSearchTagChange={handleSearchTagChange}
        onClearSearch={clearSearchInput}
      />
    </>
  );
});

TagManager.displayName = 'TagManager';
export default TagManager;
