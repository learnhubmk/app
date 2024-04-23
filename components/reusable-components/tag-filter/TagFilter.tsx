'use client';

import style from './tagFilter.module.scss';
import { useTagFilterContext } from '../../../app/context/tagFilterContext';

interface TagFilterProps {
  data: any[];
}

const TagFilter = ({ data }: TagFilterProps) => {
  const { selectedTags, toggleTag } = useTagFilterContext();

  const nonEmptyArrays = data.filter(
    (array: any) => Array.isArray(array.tags) && array.tags.length > 0
  );

  const allTags = nonEmptyArrays.reduce((acc: string[], curr: any) => [...acc, ...curr.tags], []);

  const removeDuplicateTags = allTags.filter(
    (tag: any, index: any) => allTags.indexOf(tag) === index
  );

  return (
    <>
      {removeDuplicateTags.map((tag: string) => (
        <button
          type="button"
          className={selectedTags.includes(tag) ? style.active : style.tagButton}
          key={tag}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </button>
      ))}
    </>
  );
};

export default TagFilter;
