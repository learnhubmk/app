import React from 'react';
import styles from './CancelModal.module.scss';

interface CancelModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={styles.cancelModalOverlay}>
      <div className={styles.cancelModal}>
        <span className={styles.closeModal} onClick={onHide}></span>
        <h2 className={styles.modalTitle}>Unsaved Changes</h2>
        <p>You have unsaved changes. Are you sure you want to discard them?</p>
        <div className={styles.modalBtns}>
          <button className={styles.cancelButton} onClick={onConfirm}>
            Discard Changes
          </button>
          <button className={styles.cancelButton} onClick={onHide}>
            Continue Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
