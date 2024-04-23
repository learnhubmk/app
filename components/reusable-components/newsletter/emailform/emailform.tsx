'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Notification from '../../notification/notification';
import Style from '../../notification/notification.module.scss';

interface EmailFormProps {
  inputClassName?: string;
  buttonClassName?: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ inputClassName, buttonClassName }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address!')
        .required('Email is required!')
        .matches(emailRegex, 'Invalid email format'),
    }),
    onSubmit: (values) => {
      if (values.email.match(emailRegex)) {
        setNotificationMessage('✅ Subscription successful!');
        setNotificationType('success');
        setShowNotification(true);
      } else {
        setNotificationMessage('Please enter a valid email address.');
        setNotificationType('error');
        setShowNotification(true);
      }
    },
  });

  return (
    <div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
          duration={5000}
        />
      )}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className={inputClassName}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className={Style.error}>{formik.errors.email}</div>
        )}
        <button type="submit" className={buttonClassName}>
          →
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
