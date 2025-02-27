import React, { useEffect } from 'react';
import style from './reusableModal.module.scss';
import Button from '../button/Button';

interface ReusableModalProps {
  title: string;
  description?: string;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonClass?: string;
  primaryButtonLabel?: string;
  primaryButtonClass?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

const ReusableModal = ({
  title,
  description,
  children,
  isOpen,
  secondaryButtonLabel = 'Cancel',
  secondaryButtonClass = 'secondaryButton',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonLabel = 'Proceed',
  primaryButtonClass = 'primaryButton',
  onClose = () => {},
}: ReusableModalProps) => {
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
            {children}
          </div>
          <div className={style.modalButtons}>
            <Button
              type="button"
              buttonText={primaryButtonLabel}
              buttonClass={[primaryButtonClass]}
              onClick={onPrimaryButtonClick || onClose}
            />
            <Button
              type="button"
              buttonText={secondaryButtonLabel}
              buttonClass={[secondaryButtonClass]}
              onClick={onSecondaryButtonClick || onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
