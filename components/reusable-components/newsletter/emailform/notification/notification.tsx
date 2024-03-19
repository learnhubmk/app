import React, { useEffect, useState } from 'react';
import styles from './notification.module.scss';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.popup} style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className={`${styles.notification} ${styles[type]}`}>
        {type === 'success' && <p className={styles.success}>{message}</p>}
        {type === 'error' && <p className={styles.error}>{message}</p>}
      </div>
    </div>
  );
};

export default Notification;
