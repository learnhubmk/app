/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState } from 'react';
import AddTags, { TagObject } from './TagInput';
import TagList from './TagList';

const TagManager = () => {
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);

  const handleRemoveTag = (tagId: number) => {
    setSelectedTags((prevValues) => prevValues.filter((item) => item.id !== tagId));
  };

  return (
    <>
      <TagList selectedTags={selectedTags} onRemoveTag={handleRemoveTag} />
      <AddTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
    </>
  );
};

export default TagManager;
