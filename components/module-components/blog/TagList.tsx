/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { TagObject } from './TagInput';
import styles from './TagList.module.scss';

interface TagListProps {
  selectedTags: TagObject[];
  onRemoveTag: (tagId: number) => void;
}

const TagList = ({ selectedTags, onRemoveTag }: TagListProps) => {
  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.selectedTags}>
        {selectedTags.length === 0 ? (
          <div>Немаш селектирано тагови</div>
        ) : (
          selectedTags.map((tag) => (
            <div key={tag.id} className={styles.selectedTag}>
              <div
                aria-label="Remove"
                className={styles.removeTag}
                onClick={() => onRemoveTag(tag.id)}
              >
                <i className="bi bi-x" />
              </div>{' '}
              {tag.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagList;
