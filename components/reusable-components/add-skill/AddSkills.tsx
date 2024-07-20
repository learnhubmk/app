'use client';

import { useState } from 'react';
import styles from './AddSkill.module.scss';
import TagsModal from '../tags-modal/TagsModal';

const existingTags = [
  'JavaScript',
  'React',
  'Next.js',
  'CSS',
  'HTML',
  'Node.js',
  'Java',
  'C#',
  'PHP',
];

const AddSkill = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={styles.addSkillWrapper}>
      <button type="button" onClick={openModal} className={styles.addButton}>
        + Add Skill
      </button>
      {showModal && (
        <TagsModal
          existingTags={existingTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          onClose={closeModal}
        />
      )}
      <div className={styles.selectedTags}>
        {selectedTags.map((tag) => (
          <div key={tag} className={styles.selectedTag}>
            <button
              aria-label="Remove"
              className={styles.removeTag}
              type="button"
              onClick={() => setSelectedTags(selectedTags.filter((item) => item !== tag))}
            >
              <i className="bi bi-x" />
            </button>{' '}
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSkill;
