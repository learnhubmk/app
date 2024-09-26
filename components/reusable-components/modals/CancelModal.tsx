import React, { KeyboardEvent } from 'react';
import styles from './CancelModal.module.scss';

interface CancelModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onHide();
    }
  };

  return (
    <div className={styles.cancelModalOverlay}>
      <div className={styles.cancelModal}>
        <div
          className={styles.closeModal}
          onClick={onHide}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        />
        <h2 className={styles.modalTitle}>Unsaved Changes</h2>
        <p>You have unsaved changes. Are you sure you want to discard them?</p>
        <div className={styles.modalBtns}>
          <button type="button" className={styles.cancelButton} onClick={onConfirm}>
            Discard Changes
          </button>
          <button type="button" className={styles.cancelButton} onClick={onHide}>
            Continue Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
