'use client';

import React, { useState } from 'react';
import Notification from './notification/notification';

interface EmailFormProps {
  inputClassName?: string;
  buttonClassName?: string;
}

const EmailForm = ({ inputClassName, buttonClassName }: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      setNotificationMessage('Subscription successful!');
      setNotificationType('success');
    } else {
      setNotificationMessage('Please enter a valid email address.');
      setNotificationType('error');
    }
    setShowNotification(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {showNotification ? (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={handleNotificationClose}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
            className={inputClassName}
          />
          <button type="submit" className={buttonClassName}>
            →
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailForm;
