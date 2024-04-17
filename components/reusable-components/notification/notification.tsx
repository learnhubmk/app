import React, { useEffect, useState } from 'react';
import styles from './notification.module.scss';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration: number;
}

const Notification = ({ message, type, onClose, duration }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 100 / (duration / 1000));
    }, 800);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [duration, onClose]);

  return (
    <div className={styles.popup} style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className={`${styles.notification} ${styles[type]}`}>
        <p className={styles.message}>{message}</p>
        <div className={styles.timerBar} style={{ width: `${timeRemaining}%` }} />
      </div>
    </div>
  );
};

export default Notification;
