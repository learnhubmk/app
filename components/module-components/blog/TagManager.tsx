import React, { forwardRef, useRef } from 'react';
import { Tag } from '../../reusable-components/_Types';
import TagInput, { TagInputRef } from './TagInput';
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
  const tagInputRef = useRef<TagInputRef>(null);

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  React.useImperativeHandle(ref, () => ({
    clearInput: () => {
      tagInputRef.current?.clearInput();
    },
  }));

  return (
    <>
      <TagList selectedTags={selectedTags} onRemoveTag={handleRemoveTag} isEditMode={isEditMode} />
      <TagInput
        ref={tagInputRef}
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
        isAdmin={isAdmin}
        isEditMode={isEditMode}
      />
    </>
  );
});

export default TagManager;
