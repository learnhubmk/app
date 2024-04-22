'use client';

import { useState } from 'react';
import style from './tagFilter.module.scss';

interface TagFilterProps {
  data: any;
}

const TagFilter = ({ data }: TagFilterProps) => {
  const [activeTag, setActiveTag] = useState<string[]>([]);
  const nonEmptyArrays = data.filter(
    (array: any) => Array.isArray(array.tags) && array.tags.length > 0
  );

  const allTags = nonEmptyArrays.reduce((acc: any, curr: any) => [...acc, ...curr.tags], []);

  const removeDuplicateTags = allTags.filter(
    (tag: any, index: any) => allTags.indexOf(tag) === index
  );

  const activeClickTag = (tag: string) => {
    if (activeTag.includes(tag)) {
      setActiveTag(activeTag.filter((t: string) => t !== tag));
    } else {
      setActiveTag([...activeTag, tag]);
    }
  };

  return (
    <>
      {removeDuplicateTags.map((tag: string) => (
        <button
          type="button"
          className={activeTag.includes(tag) ? style.active : style.tagButton}
          key={tag}
          onClick={() => activeClickTag(tag)}
        >
          {tag}
        </button>
      ))}
    </>
  );
};

export default TagFilter;
