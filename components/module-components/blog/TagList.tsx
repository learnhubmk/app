/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Tag } from '../../reusable-components/_Types';
import styles from './TagList.module.scss';

interface TagListProps {
  selectedTags: Tag[];
  onRemoveTag: (tagId: string) => void;
  isEditMode?: boolean;
}

const TagList = ({ selectedTags, onRemoveTag, isEditMode }: TagListProps) => {
  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.selectedTags}>
        {selectedTags.length === 0 ? (
          <div>Немаш селектирано тагови</div>
        ) : (
          selectedTags.map((tag) => (
            <div key={tag.id} className={styles.selectedTag}>
              {isEditMode && (
                <div
                  aria-label="Remove"
                  className={styles.removeTag}
                  onClick={() => onRemoveTag(tag.id)}
                >
                  <i className="bi bi-x" />
                </div>
              )}{' '}
              {tag.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagList;
