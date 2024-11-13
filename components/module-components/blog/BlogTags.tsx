/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState } from 'react';
import styles from './BlogTags.module.scss';
import AddTags, { TagObject } from './AddTags';

const BlogTags = () => {
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);

  return (
    <>
      <AddTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <div className={styles.tagsWrapper}>
        Tags:
        <div className={styles.selectedTags}>
          {selectedTags.length === 0 ? (
            <div>No tags selected</div>
          ) : (
            selectedTags.map((tag) => (
              <div key={tag.id} className={styles.selectedTag}>
                <div
                  aria-label="Remove"
                  className={styles.removeTag}
                  onClick={() =>
                    setSelectedTags((prevValues) => prevValues.filter((item) => item.id !== tag.id))
                  }
                >
                  <i className="bi bi-x" />
                </div>{' '}
                {tag.name}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BlogTags;
