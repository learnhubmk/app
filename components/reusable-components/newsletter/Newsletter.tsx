'use client';

import React from 'react';
import styles from './newsletter.module.scss';
import EmailForm from './emailform/emailform';
import CaptchaWidget from '../turnstile-captcha/CaptchaWidget';
import { useTheme } from '../../../app/context/themeContext';

const handleCaptchaSuccess = () => {};

const handleCaptchaError = () => {};

const Newsletter: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.newsletterContainer} ${theme}`}>
      <div className={styles.contentContainer}>
        <p>Претплати се на нашиот</p>
      </div>
      <div className={styles.newsletterText}>
        <p>Newsletter</p>
        <span className={`${styles.ellipse} ${styles.ellipsePosition}`} />
        <span className={`${styles.newsletterSection} ${styles.inputContainer}`}>
          <EmailForm inputClassName={styles.newsletterSection} buttonClassName={styles.button} />
          <CaptchaWidget onSuccess={handleCaptchaSuccess} onError={handleCaptchaError} />
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
