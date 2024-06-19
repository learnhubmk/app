import React, { useEffect } from 'react';
import style from './reusableModal.module.scss';
import Button from '../button/Button';

interface ReusableModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const ReusableModal = ({ title, description, isOpen, onClose = () => {} }: ReusableModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={style.overlay}
      aria-label="Close modal"
      role="button"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={style.modal}>
        <div className={style.closeButton}>
          <Button
            type="button"
            icon={<i className="bi bi-x" />}
            buttonClass={['closeBtn']}
            onClick={onClose}
          />
        </div>
        <div className={style.modalContentWrapper}>
          <div className={style.modalContent}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <div className={style.modalButtons}>
            <Button
              type="button"
              buttonText="Cancel"
              buttonClass={['primaryButton']}
              onClick={onClose}
            />
            <Button
              type="button"
              buttonText="Deactivate"
              buttonClass={['secondaryButton', 'deactivateButton']}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
