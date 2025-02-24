import TagInput, { TagObject } from './TagInput';
import TagList from './TagList';

interface TagManagerProps {
  selectedTags: TagObject[];
  onTagsChange: (tags: TagObject[]) => void;
}

const TagManager = ({ selectedTags, onTagsChange }: TagManagerProps) => {
  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <TagList selectedTags={selectedTags} onRemoveTag={handleRemoveTag} />
      <TagInput selectedTags={selectedTags} onTagsChange={onTagsChange} />
    </>
  );
};

export default TagManager;
