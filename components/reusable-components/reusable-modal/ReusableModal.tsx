import React from 'react';
import style from './reusableModal.module.scss';
import Button from '../button/Button';

interface ReusableModalProps {
  title: string;
  description?: string;
}

const ReusableModal = ({ title, description }: ReusableModalProps) => {
  return (
    <div className={style.modal}>
      <div className={style.closeButton}>
        <Button
          type="button"
          icon={<i className="bi bi-x-circle-fill" />}
          buttonClass={['closeButton', 'orangeLink']}
        />
      </div>
      <div className={style.modalContentWrapper}>
        <div className={style.modalContent}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className={style.modalButtons}>
          <Button type="button" buttonText="Confirm" buttonClass={['primaryButton']} />
          <Button type="button" buttonText="Cancel" buttonClass={['secondaryButton']} />
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
