'use client';

import React from 'react';
import ContactForm from './ContactForm';
import SpinningLogoCircle from './SpinningLogoCircle';
import style from './contact.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`${style.contactContainer} ${theme}`}>
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
      </div>
    </div>
  );
};

export default Contact;
