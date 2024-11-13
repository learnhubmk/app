'use client';

import { useState } from 'react';
import styles from './BlogTags.module.scss';
import AddTags, { TagObject } from './AddTags';

const BlogTags = () => {
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);

  return (
    <div className={styles.addSkillWrapper}>
      <AddTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <div className={styles.tagsWrapper}>
        Tags:
        <div className={styles.selectedTags}>
          {selectedTags.length === 0 ? (
            <div>No tags selected</div>
          ) : (
            selectedTags.map((tag) => (
              <div key={tag.id} className={styles.selectedTags}>
                <button
                  aria-label="Remove"
                  className={styles.removeTag}
                  type="button"
                  onClick={() =>
                    setSelectedTags((prevValues) => prevValues.filter((item) => item.id !== tag.id))
                  }
                >
                  <i className="bi bi-x" />
                </button>{' '}
                {tag.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTags;
