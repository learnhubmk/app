'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notification from './notification/notification';
import Style from './notification/notification.module.scss';

interface EmailFormProps {
  inputClassName?: string;
  buttonClassName?: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ inputClassName, buttonClassName }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  const handleSubmit = (values: { email: string }) => {
    if (values.email) {
      setNotificationMessage('Subscription successful!');
      setNotificationType('success');
      setShowNotification(true);
    } else {
      setNotificationMessage('Please enter a valid email address.');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  return (
    <div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            type="email"
            name="email"
            placeholder="Enter your email"
            className={inputClassName}
          />
          <ErrorMessage name="email">
            {(msg) => <div className={Style.error}>{msg}</div>}
          </ErrorMessage>
          <button type="submit" className={buttonClassName}>
            →
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EmailForm;
