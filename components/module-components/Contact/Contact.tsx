'use client';

import React from 'react';
import ContactForm from './ContactForm';
import SpinningLogoCircle from './SpinningLogoCircle';
import style from './contact.module.scss';
import CaptchaWidget from '../../reusable-components/turnstile-captcha/CaptchaWidget';

const handleCaptchaSuccess = () => {};

const handleCaptchaError = () => {};

const Contact: React.FC = () => {
  return (
    <div className={style.contactContainer}>
      <div>
        <p className={style.contactTitle}>Контактирај нé</p>
        <SpinningLogoCircle />
      </div>
      <div className={style.contactSection}>
        <ContactForm
          inputClassName={style.contactSection}
          buttonClassName={style.button}
          textareaClassName={style.textarea}
          cfTurnstileResponse="cfTurnstileResponse"
        />
        <CaptchaWidget onSuccess={handleCaptchaSuccess} onError={handleCaptchaError} />
      </div>
    </div>
  );
};

export default Contact;
