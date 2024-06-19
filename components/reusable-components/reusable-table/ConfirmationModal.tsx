import React from 'react';
import style from './confirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ message, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <p>{message}</p>
        <div className={style.buttons}>
          <button type="button" onClick={onConfirm}>
            Confirm
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
