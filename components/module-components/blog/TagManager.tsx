'use client';

import TagInput, { TagObject } from './TagInput';
import TagList from './TagList';

interface TagManagerProps {
  selectedTags: TagObject[];
  onTagsChange: (tags: TagObject[]) => void;
  isAdmin?: boolean;
}

const TagManager = ({ selectedTags, onTagsChange, isAdmin = false }: TagManagerProps) => {
  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <TagList selectedTags={selectedTags} onRemoveTag={handleRemoveTag} />
      <TagInput selectedTags={selectedTags} onTagsChange={onTagsChange} isAdmin={isAdmin} />
    </>
  );
};

export default TagManager;
