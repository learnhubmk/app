import React, { KeyboardEvent } from 'react';
import styles from './CancelModal.module.scss';
import Button from '../button/Button';

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
        <h2 className={styles.modalTitle}>Незачувани промени</h2>
        <p>Имаш незачувани промени. Дали си сигурен дека сакаш да ги отфрлиш промените?</p>
        <div className={styles.modalBtns}>
          <Button
            buttonText="Продолжи со уредување"
            type="button"
            buttonClass={['primaryButton']}
            onClick={onHide}
          />
          <Button buttonText="Отфрли промени" type="button" buttonClass={[]} onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
